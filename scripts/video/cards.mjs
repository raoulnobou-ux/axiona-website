import { chromium } from 'playwright-core';
import { readFileSync } from 'fs';
const L = '/home/user/axiona-website/node_modules/lucide-react/dist/esm/icons/';
async function icon(name, size = 150, stroke = 1.4, color = '#ffffff') {
  const { __iconData } = await import(L + name + '.mjs');
  const inner = __iconData.node.map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).filter(([k]) => k !== 'key').map(([k, v]) => `${k}="${v}"`).join(' ')}/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}
const sym = readFileSync('/home/user/axiona-website/public/brand/axiona-symbol.svg', 'utf8');
const fonts = '<style>' + readFileSync(new URL('./fonts-inline.css', import.meta.url), 'utf8') + '</style>';
const trails = (op = 1) => `<svg viewBox="0 0 576 1024" width="576" height="1024" style="position:absolute;inset:0" fill="none">
${[0,1,2,3,4,5].map(i => `<path d="M-60 ${1080 - i*46} C 160 ${980 - i*50}, 360 ${640 - i*40}, 640 ${180 - i*60}" stroke="#4FD1F0" stroke-opacity="${(0.42 - i*0.06)*op}" stroke-width="${i ? 1 : 1.6}"/>`).join('')}</svg>`;
const navy = `background:radial-gradient(520px 420px at 78% 18%,rgba(79,209,240,.28),transparent 62%),linear-gradient(160deg,#0B2A4A 0%,#0d3556 55%,#14607F 100%)`;
const brandTop = `<div style="position:absolute;top:64px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:12px">${sym.replace('<svg ', '<svg width="34" height="35" ')}<span style="font:700 22px Sora;letter-spacing:.14em;color:#fff">AXIONA</span></div>`;
// Icône centrée dans un halo, au-dessus de la bande des sous-titres (y 760–920 laissée libre)
const iconCard = (ic, extra = '') => `<div style="position:relative;width:576px;height:1024px;overflow:hidden;${navy}">${trails()}${brandTop}
<div style="position:absolute;left:0;right:0;top:250px;display:flex;justify-content:center">
<div style="position:relative;width:300px;height:300px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle,rgba(79,209,240,.22),rgba(79,209,240,0) 70%);">
<div style="position:absolute;inset:40px;border-radius:50%;border:1px solid rgba(255,255,255,.18)"></div>${ic}</div></div>${extra}</div>`;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 576, height: 1024 } });
async function shot(html, out) {
  await p.setContent(`<!doctype html><html><head>${fonts}<style>*{margin:0;box-sizing:border-box}</style></head><body>${html}</body></html>`);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
  await p.screenshot({ path: out });
}
await shot(iconCard(await icon('user-minus')), 'scripts/video/cards/A.png');
await shot(iconCard(await icon('phone-incoming')), 'scripts/video/cards/B.png');
await shot(iconCard(await icon('phone-missed')), 'scripts/video/cards/C.png');
await shot(iconCard(await icon('log-out')), 'scripts/video/cards/D.png');
// E : « Et si… » → le symbole AXIONA + onde vocale
await shot(iconCard(`<div style="display:flex;flex-direction:column;align-items:center;gap:18px">${`<div style="padding:18px;border-radius:28px;background:#fff;box-shadow:0 20px 50px -12px rgba(0,0,0,.45),0 0 0 1px rgba(79,209,240,.35)">${sym.replace('<svg ', '<svg width="96" height="100" ')}</div>`}${await icon('audio-lines', 70, 1.6, '#4FD1F0')}</div>`), 'scripts/video/cards/E.png');
// Carte titre (remplace l'écran noir 28.3 s – 30.8 s)
await shot(`<div style="position:relative;width:576px;height:1024px;overflow:hidden;${navy}">${trails()}
<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 56px">
${`<div style="padding:18px;border-radius:26px;background:#fff;box-shadow:0 20px 50px -12px rgba(0,0,0,.45),0 0 0 1px rgba(79,209,240,.35)">${sym.replace('<svg ', '<svg width="84" height="88" ')}</div>`}
<span style="margin-top:36px;display:inline-block;padding:8px 18px;border-radius:999px;border:1px solid rgba(79,209,240,.6);color:#4FD1F0;font:600 15px Sora;letter-spacing:.16em">DÉMO EN DIRECT</span>
<p style="margin-top:26px;font:700 50px/1.05 Sora;letter-spacing:-.02em;color:#fff">Agent IA vocal</p>
<p style="margin-top:16px;font:500 22px/1.4 'Instrument Sans';color:rgba(255,255,255,.78)">Prise de rendez-vous<br>pour un salon de coiffure</p>
</div></div>`, 'scripts/video/cards/title.png');
// Carte de fin
await shot(`<div style="position:relative;width:576px;height:1024px;overflow:hidden;background:radial-gradient(560px 460px at 80% 10%,rgba(79,209,240,.22),transparent 62%),linear-gradient(170deg,#fff 45%,#EAF3F8)">
<svg viewBox="0 0 576 1024" width="576" height="1024" style="position:absolute;inset:0" fill="none">${[0,1,2,3,4].map(i => `<path d="M-60 ${1080 - i*46} C 160 ${980 - i*50}, 360 ${640 - i*40}, 640 ${180 - i*60}" stroke="#4FD1F0" stroke-opacity="${0.55 - i*0.09}" stroke-width="${i ? 1 : 1.6}"/>`).join('')}</svg>
<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 48px">
${sym.replace('<svg ', '<svg width="150" height="156" ')}
<p style="margin-top:28px;font:700 54px Sora;letter-spacing:.08em;color:#0B2A4A">AXIONA</p>
<p style="margin-top:6px;font:600 15px Sora;letter-spacing:.24em;color:#14607F">GLOBAL AI TECHNOLOGIES</p>
<p style="margin-top:56px;font:600 30px/1.25 Sora;letter-spacing:-.01em;color:#0B2A4A">Là où l’IA rencontre l’avenir.</p>
<p style="margin-top:14px;font:500 20px 'Instrument Sans';color:#4A5D70">Agents IA · Automatisation · Logiciels</p>
<p style="margin-top:40px;font:500 18px 'Instrument Sans';color:#14607F">Buea, Cameroun</p>
</div></div>`, 'scripts/video/cards/end.png');
await b.close();
