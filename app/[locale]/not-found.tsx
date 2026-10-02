import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getDictionary } from '@/content';
import type { Locale } from '@/i18n/routing';
import { Symbol } from '@/components/Symbol';

export default function NotFound() {
  const t = getDictionary(useLocale() as Locale);
  return (
    <section className="bg-lumiere">
      <div className="container-ax flex min-h-[80svh] flex-col items-start justify-center pt-24">
        <Symbol className="h-16 w-auto" />
        <h1 className="h-section mt-8">{t.notFound.title}</h1>
        <p className="lead mt-3">{t.notFound.text}</p>
        <Link href="/" className="btn btn-primary mt-8">
          {t.notFound.back}
        </Link>
      </div>
    </section>
  );
}
