import { getTranslations } from 'next-intl/server';
import {
  CheckIcon,
  MinusIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';
import { FadeIn } from './FadeIn';

type CellValue = true | false | 'partial' | string;

interface FeatureRow {
  key: string;
  free: CellValue;
  pro: CellValue;
  shipfast: CellValue;
  makerkit: CellValue;
  supa: CellValue;
}

function buildMainRows(isFreeProPlan: boolean): FeatureRow[] {
  return [
    {
      key: 'price',
      free: '$0',
      pro: isFreeProPlan ? '$0–$149' : '$149',
      shipfast: '$199',
      makerkit: '$299–$599',
      supa: '$261–$1,124',
    },
    {
      key: 'openSource',
      free: true,
      pro: 'partial',
      shipfast: false,
      makerkit: false,
      supa: false,
    },
    {
      key: 'stripeCheckout',
      free: true,
      pro: true,
      shipfast: true,
      makerkit: true,
      supa: true,
    },
    {
      key: 'customerPortal',
      free: true,
      pro: true,
      shipfast: true,
      makerkit: true,
      supa: true,
    },
    {
      key: 'auth',
      free: true,
      pro: true,
      shipfast: true,
      makerkit: true,
      supa: true,
    },
    {
      key: 'emailTemplates',
      free: true,
      pro: true,
      shipfast: true,
      makerkit: true,
      supa: true,
    },
    {
      key: 'fileUploads',
      free: true,
      pro: true,
      shipfast: 'partial',
      makerkit: true,
      supa: true,
    },
    {
      key: 'multiTenancy',
      free: false,
      pro: true,
      shipfast: false,
      makerkit: 'Top tier',
      supa: 'Top tier',
    },
  ];
}

const WORKFLOW_ROWS: FeatureRow[] = [
  {
    key: 'claudeSkills',
    free: '10 core',
    pro: true,
    shipfast: false,
    makerkit: false,
    supa: false,
  },
  {
    key: 'customAgents',
    free: false,
    pro: true,
    shipfast: false,
    makerkit: false,
    supa: false,
  },
  {
    key: 'mcpConfigs',
    free: 'Basic',
    pro: true,
    shipfast: false,
    makerkit: false,
    supa: false,
  },
  {
    key: 'aiIntegration',
    free: false,
    pro: true,
    shipfast: 'Mentioned',
    makerkit: 'Mentioned',
    supa: 'Mentioned',
  },
];

const DETAIL_ROWS: FeatureRow[] = [
  {
    key: 'drizzle',
    free: true,
    pro: true,
    shipfast: false,
    makerkit: true,
    supa: true,
  },
  {
    key: 'lifetimeUpdates',
    free: false,
    pro: true,
    shipfast: true,
    makerkit: 'Limited',
    supa: 'Top tier',
  },
  {
    key: 'refundWindow',
    free: 'n/a',
    pro: '14 days',
    shipfast: '14 days',
    makerkit: '30 days',
    supa: '30 days',
  },
  {
    key: 'bestFor',
    free: 'Anyone',
    pro: 'Claude Code users',
    shipfast: 'Indie hackers',
    makerkit: 'Modular stack',
    supa: 'Serious founders',
  },
];

interface CompetitorNarrativeData {
  narrativeKey: 'shipfast' | 'makerkit' | 'supastarter';
  price: string;
  href: string;
}

const NARRATIVE_DATA: CompetitorNarrativeData[] = [
  { narrativeKey: 'shipfast', price: '$199', href: '/vs/shipfast' },
  { narrativeKey: 'makerkit', price: '$299–$599', href: '/vs/makerkit' },
  {
    narrativeKey: 'supastarter',
    price: '$261–$1,124',
    href: '/vs/supastarter',
  },
];

function Cell({ value, colClass }: { value: CellValue; colClass?: string }) {
  return (
    <td className={cn('px-4 py-3 text-center', colClass)}>
      {value === true ? (
        <CheckIcon className="mx-auto h-4 w-4 text-emerald-500" />
      ) : value === false ? (
        <MinusIcon className="text-border mx-auto h-4 w-4" />
      ) : value === 'partial' ? (
        <AlertTriangleIcon className="mx-auto h-4 w-4 text-amber-400" />
      ) : (
        <span className="text-muted-foreground text-xs">{value}</span>
      )}
    </td>
  );
}

function TableRow({ row, label }: { row: FeatureRow; label: string }) {
  return (
    <tr className="border-border border-b last:border-0">
      <td className="text-foreground py-3 pr-4 pl-4 text-sm sm:pl-6">
        {label}
      </td>
      <Cell value={row.free} colClass="bg-emerald-500/5" />
      <Cell value={row.pro} colClass="bg-primary/5" />
      <Cell value={row.shipfast} />
      <Cell value={row.makerkit} />
      <Cell value={row.supa} />
    </tr>
  );
}

interface Props {
  isFreeProPlan: boolean;
}

export async function Comparison({ isFreeProPlan }: Props) {
  const t = await getTranslations('landing.comparison');
  const mainRows = buildMainRows(isFreeProPlan);
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
              {t('heading')}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              {t('subheading')}
            </p>
          </div>
        </FadeIn>

        <div className="border-border mt-12 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr className="border-border bg-muted/40 border-b">
                <th className="text-muted-foreground py-4 pr-4 pl-4 text-left text-xs font-semibold tracking-widest uppercase sm:pl-6">
                  {t('colFeature')}
                </th>
                <th className="bg-emerald-500/10 px-4 py-4 text-center">
                  <div className="text-foreground text-sm font-semibold">
                    This &middot; Free
                  </div>
                  <div className="mt-0.5 text-xs font-bold text-emerald-500">
                    $0
                  </div>
                </th>
                <th className="bg-primary/10 px-4 py-4 text-center">
                  <div className="text-primary text-sm font-semibold">
                    This &middot; Pro
                  </div>
                  <div className="text-primary mt-0.5 text-xs font-bold">
                    {isFreeProPlan ? '$0–$149' : '$149'}
                  </div>
                </th>
                <th className="px-4 py-4 text-center">
                  <div className="text-foreground text-sm font-semibold">
                    ShipFast
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-red-400">
                    $199
                  </div>
                </th>
                <th className="px-4 py-4 text-center">
                  <div className="text-foreground text-sm font-semibold">
                    MakerKit
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-red-400">
                    $299+
                  </div>
                </th>
                <th className="px-4 py-4 text-center">
                  <div className="text-foreground text-sm font-semibold">
                    supastarter
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-red-400">
                    $261+
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {mainRows.map((row) => (
                <TableRow
                  key={row.key}
                  row={row}
                  label={t(`rows.${row.key}`)}
                />
              ))}

              <tr className="bg-muted/50">
                <td
                  colSpan={6}
                  className="text-muted-foreground py-2 pr-4 pl-4 text-xs font-semibold tracking-widest uppercase sm:pl-6"
                >
                  {t('sectionWorkflow')}
                </td>
              </tr>

              {WORKFLOW_ROWS.map((row) => (
                <TableRow
                  key={row.key}
                  row={row}
                  label={t(`rows.${row.key}`)}
                />
              ))}

              <tr className="bg-muted/50">
                <td
                  colSpan={6}
                  className="text-muted-foreground py-2 pr-4 pl-4 text-xs font-semibold tracking-widest uppercase sm:pl-6"
                >
                  {t('sectionDetails')}
                </td>
              </tr>

              {DETAIL_ROWS.map((row) => (
                <TableRow
                  key={row.key}
                  row={row}
                  label={t(`rows.${row.key}`)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground mt-4 text-center text-xs">
          {t('disclaimer')}
        </p>

        <FadeIn delay={0.1}>
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
                  <span className="text-xs font-medium text-red-400">
                    {n.price}
                  </span>
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
        </FadeIn>
      </Container>
    </section>
  );
}
