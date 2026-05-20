import {
  CheckIcon,
  MinusIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';

type CellValue = true | false | 'partial' | string;

interface FeatureRow {
  label: string;
  free: CellValue;
  pro: CellValue;
  shipfast: CellValue;
  makerkit: CellValue;
  supa: CellValue;
}

const MAIN_ROWS: FeatureRow[] = [
  {
    label: 'Price',
    free: '$0',
    pro: '$0–$149',
    shipfast: '$199',
    makerkit: '$299–$599',
    supa: '$261–$1,124',
  },
  {
    label: 'Open source',
    free: true,
    pro: 'partial',
    shipfast: false,
    makerkit: false,
    supa: false,
  },
  {
    label: 'Stripe checkout + subscriptions',
    free: true,
    pro: true,
    shipfast: true,
    makerkit: true,
    supa: true,
  },
  {
    label: 'Customer portal',
    free: true,
    pro: true,
    shipfast: true,
    makerkit: true,
    supa: true,
  },
  {
    label: 'Auth (login, verify, reset)',
    free: true,
    pro: true,
    shipfast: true,
    makerkit: true,
    supa: true,
  },
  {
    label: 'Email templates',
    free: true,
    pro: true,
    shipfast: true,
    makerkit: true,
    supa: true,
  },
  {
    label: 'File uploads',
    free: true,
    pro: true,
    shipfast: 'partial',
    makerkit: true,
    supa: true,
  },
  {
    label: 'Multi-tenancy',
    free: false,
    pro: true,
    shipfast: false,
    makerkit: 'Top tier',
    supa: 'Top tier',
  },
];

const WORKFLOW_ROWS: FeatureRow[] = [
  {
    label: 'Claude Code skills (40+)',
    free: '10 core',
    pro: true,
    shipfast: false,
    makerkit: false,
    supa: false,
  },
  {
    label: 'Custom agents',
    free: false,
    pro: true,
    shipfast: false,
    makerkit: false,
    supa: false,
  },
  {
    label: 'MCP server configs',
    free: 'Basic',
    pro: true,
    shipfast: false,
    makerkit: false,
    supa: false,
  },
  {
    label: 'AI / Claude integration',
    free: false,
    pro: true,
    shipfast: 'Mentioned',
    makerkit: 'Mentioned',
    supa: 'Mentioned',
  },
];

const DETAIL_ROWS: FeatureRow[] = [
  {
    label: 'Drizzle ORM',
    free: true,
    pro: true,
    shipfast: false,
    makerkit: true,
    supa: true,
  },
  {
    label: 'Lifetime updates',
    free: false,
    pro: true,
    shipfast: true,
    makerkit: 'Limited',
    supa: 'Top tier',
  },
  {
    label: 'Refund window',
    free: 'n/a',
    pro: '14 days',
    shipfast: '14 days',
    makerkit: '30 days',
    supa: '30 days',
  },
  {
    label: 'Best for',
    free: 'Anyone',
    pro: 'Claude Code users',
    shipfast: 'Indie hackers',
    makerkit: 'Modular stack',
    supa: 'Serious founders',
  },
];

interface CompetitorNarrative {
  name: string;
  price: string;
  text: string;
  href: string;
}

const NARRATIVES: CompetitorNarrative[] = [
  {
    name: 'ShipFast',
    price: '$199',
    text: "ShipFast is the brand leader -- great for fast Twitter indie hackers, weaker on architecture (uses Mongoose, single-file modules). We're free at feature parity, and Pro adds the Claude Code layer ShipFast has no answer to.",
    href: '/vs/shipfast',
  },
  {
    name: 'MakerKit',
    price: '$299–$599',
    text: 'MakerKit is the technical standard -- modular, well-documented, swap-in Supabase/Drizzle/Prisma. Stronger architecture than ShipFast. Our differentiator: same architecture quality, free at the feature layer, and Claude Code-native instead of generic AI mentions.',
    href: '/vs/makerkit',
  },
  {
    name: 'supastarter',
    price: '$261–$1,124',
    text: 'supastarter targets serious founders with i18n, multi-tenancy, background jobs. Highest-priced competitor. We match the feature depth and beat them on price (free -> $149 vs $261-$1,124) and on Claude Code workflow integration.',
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

function TableRow({ row }: { row: FeatureRow }) {
  return (
    <tr className="border-border border-b last:border-0">
      <td className="text-foreground py-3 pr-4 pl-4 text-sm sm:pl-6">
        {row.label}
      </td>
      <Cell value={row.free} colClass="bg-emerald-500/5" />
      <Cell value={row.pro} colClass="bg-primary/5" />
      <Cell value={row.shipfast} />
      <Cell value={row.makerkit} />
      <Cell value={row.supa} />
    </tr>
  );
}

export function Comparison() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            How we stack up against the boilerplate market.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            The honest comparison. Free for free, paid for paid &mdash;
            here&apos;s where each starter wins.
          </p>
        </div>

        <div className="border-border mt-12 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr className="border-border bg-muted/40 border-b">
                <th className="text-muted-foreground py-4 pr-4 pl-4 text-left text-xs font-semibold tracking-widest uppercase sm:pl-6">
                  Feature
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
                    $149
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
              {MAIN_ROWS.map((row) => (
                <TableRow key={row.label} row={row} />
              ))}

              <tr className="bg-muted/50">
                <td
                  colSpan={6}
                  className="text-muted-foreground py-2 pr-4 pl-4 text-xs font-semibold tracking-widest uppercase sm:pl-6"
                >
                  Claude Code workflow &mdash; not available anywhere else
                </td>
              </tr>

              {WORKFLOW_ROWS.map((row) => (
                <TableRow key={row.label} row={row} />
              ))}

              <tr className="bg-muted/50">
                <td
                  colSpan={6}
                  className="text-muted-foreground py-2 pr-4 pl-4 text-xs font-semibold tracking-widest uppercase sm:pl-6"
                >
                  Details
                </td>
              </tr>

              {DETAIL_ROWS.map((row) => (
                <TableRow key={row.label} row={row} />
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground mt-4 text-center text-xs">
          Competitor pricing from their public pricing pages. Feature coverage
          based on default packages.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {NARRATIVES.map((n) => (
            <div key={n.name} className="border-border rounded-xl border p-6">
              <div className="mb-3 flex items-baseline gap-2">
                <h3 className="text-foreground text-base font-semibold">
                  vs {n.name}
                </h3>
                <span className="text-xs font-medium text-red-400">
                  {n.price}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {n.text}
              </p>
              <Link
                href={n.href}
                className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
              >
                Full comparison
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
