import { CheckIcon, MinusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';

interface FeatureRow {
  label: string;
  shipfast: boolean;
  supa: boolean;
  free: boolean;
  pro: boolean;
}

const STACK_ROWS: FeatureRow[] = [
  {
    label: 'Auth (login, verify, reset)',
    shipfast: true,
    supa: true,
    free: true,
    pro: true,
  },
  {
    label: 'Stripe subscriptions + portal',
    shipfast: true,
    supa: true,
    free: true,
    pro: true,
  },
  {
    label: 'Email templates (transactional)',
    shipfast: true,
    supa: true,
    free: true,
    pro: true,
  },
  { label: 'File uploads', shipfast: false, supa: true, free: true, pro: true },
  { label: 'MDX blog', shipfast: true, supa: false, free: true, pro: true },
  {
    label: 'Dark / light theme',
    shipfast: true,
    supa: true,
    free: true,
    pro: true,
  },
  {
    label: 'Multi-tenancy',
    shipfast: false,
    supa: true,
    free: false,
    pro: true,
  },
];

const WORKFLOW_ROWS: FeatureRow[] = [
  {
    label: '40+ Claude Code skills',
    shipfast: false,
    supa: false,
    free: false,
    pro: true,
  },
  {
    label: '11 custom agents',
    shipfast: false,
    supa: false,
    free: false,
    pro: true,
  },
  {
    label: 'MCP server configs',
    shipfast: false,
    supa: false,
    free: false,
    pro: true,
  },
  {
    label: 'AI / Claude module',
    shipfast: false,
    supa: false,
    free: false,
    pro: true,
  },
];

function Cell({ active, colClass }: { active: boolean; colClass?: string }) {
  return (
    <td className={cn('px-4 py-3 text-center', colClass)}>
      {active ? (
        <CheckIcon className="mx-auto h-4 w-4 text-emerald-500" />
      ) : (
        <MinusIcon className="text-border mx-auto h-4 w-4" />
      )}
    </td>
  );
}

function FeatureRow({ row }: { row: FeatureRow }) {
  return (
    <tr className="border-border border-b last:border-0">
      <td className="text-foreground py-3 pr-4 pl-4 text-sm sm:pl-6">
        {row.label}
      </td>
      <Cell active={row.shipfast} />
      <Cell active={row.supa} />
      <Cell active={row.free} colClass="bg-emerald-500/5" />
      <Cell active={row.pro} colClass="bg-primary/5" />
    </tr>
  );
}

export function Comparison() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            They charge $199&ndash;$261 for the stack.
            <br />
            We give it away.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            The Claude Code workflow layer does not exist anywhere else &mdash;
            at any price.
          </p>
        </div>

        <div className="border-border mt-12 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-border bg-muted/40 border-b">
                <th className="text-muted-foreground py-4 pr-4 pl-4 text-left text-xs font-semibold tracking-widest uppercase sm:pl-6">
                  Feature
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
                    supastarter
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-red-400">
                    $261
                  </div>
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
              </tr>
            </thead>

            <tbody>
              {STACK_ROWS.map((row) => (
                <FeatureRow key={row.label} row={row} />
              ))}

              <tr className="bg-muted/50">
                <td
                  colSpan={5}
                  className="text-muted-foreground py-2 pr-4 pl-4 text-xs font-semibold tracking-widest uppercase sm:pl-6"
                >
                  Claude Code workflow &mdash; not available anywhere else
                </td>
              </tr>

              {WORKFLOW_ROWS.map((row) => (
                <FeatureRow key={row.label} row={row} />
              ))}

              <tr className="border-border bg-muted/30 border-t">
                <td className="text-foreground py-4 pr-4 pl-4 text-sm font-semibold sm:pl-6">
                  Price
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="rounded-md bg-red-500/10 px-2.5 py-1 text-sm font-bold text-red-400">
                    $199
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="rounded-md bg-red-500/10 px-2.5 py-1 text-sm font-bold text-red-400">
                    $261
                  </span>
                </td>
                <td className="bg-emerald-500/5 px-4 py-4 text-center">
                  <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 text-sm font-bold text-emerald-500">
                    Free
                  </span>
                </td>
                <td className="bg-primary/5 px-4 py-4 text-center">
                  <span className="bg-primary/15 text-primary rounded-md px-2.5 py-1 text-sm font-bold">
                    $149
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground mt-4 text-center text-xs">
          Competitor pricing from their public pricing pages. Feature coverage
          based on default packages.
        </p>
      </Container>
    </section>
  );
}
