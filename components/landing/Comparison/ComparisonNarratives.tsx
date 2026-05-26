import { getTranslations } from 'next-intl/server';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { NARRATIVE_DATA } from './comparisonData';

export async function ComparisonNarratives() {
  const t = await getTranslations('landing.comparison');

  return (
    <div className="mt-16 grid gap-6 sm:grid-cols-3">
      {NARRATIVE_DATA.map((n) => (
        <div
          key={n.narrativeKey}
          className="border-border rounded-xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-3 flex items-baseline gap-2">
            <h3 className="text-foreground text-base font-semibold">
              vs {t(`narratives.${n.narrativeKey}.name`)}
            </h3>
            <span className="text-xs font-medium text-red-400">{n.price}</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t(`narratives.${n.narrativeKey}.text`)}
          </p>
          <Link
            href={n.href}
            className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            {t('fullComparison')}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      ))}
    </div>
  );
}
