import { NextResponse } from 'next/server';
import { branchSlugs } from '@/content/branches';
import { LIMITS, validateContact, type ContactPayload } from '@/lib/contact';

/**
 * Reçoit le formulaire et le transmet au webhook CONTACT_WEBHOOK_URL
 * (n8n, Make, Zapier...). Sans webhook configuré, répond 503 : le formulaire
 * propose alors l'envoi par WhatsApp.
 */

// Limitation simple par IP (mémoire de l'instance, au mieux).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

const clip = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Pot de miel anti-robots : champ caché qui doit rester vide.
  if (typeof body.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const branch = clip(body.branch, LIMITS.branch);
  const payload: ContactPayload = {
    name: clip(body.name, LIMITS.name),
    company: clip(body.company, LIMITS.company) || undefined,
    contact: clip(body.contact, LIMITS.contact),
    branch: (branchSlugs as string[]).includes(branch) ? branch : undefined,
    message: clip(body.message, LIMITS.message),
    locale: body.locale === 'en' ? 'en' : 'fr',
    page: clip(body.page, 200) || undefined,
  };

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: 'validation', fields: errors }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (process.env.CONTACT_WEBHOOK_SECRET) headers['X-Axiona-Secret'] = process.env.CONTACT_WEBHOOK_SECRET;
    const res = await fetch(webhook, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...payload, source: 'axiona-website', receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] webhook error', err);
    return NextResponse.json({ ok: false, error: 'webhook_failed' }, { status: 502 });
  }
}
