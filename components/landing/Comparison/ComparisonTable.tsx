import { getTranslations } from 'next-intl/server';
import { CheckIcon, MinusIcon, AlertTriangleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  buildMainRows,
  WORKFLOW_ROWS,
  DETAIL_ROWS,
  type CellValue,
  type FeatureRow,
} from './comparisonData';

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

export async function ComparisonTable({ isFreeProPlan }: Props) {
  const t = await getTranslations('landing.comparison');
  const mainRows = buildMainRows(isFreeProPlan);

  return (
    <div className="border-border mt-12 overflow-x-auto rounded-2xl border">
      <table className="w-full min-w-[820px] border-collapse">
        <thead>
          <tr className="border-border bg-muted/40 border-b">
            <th className="text-muted-foreground py-4 pr-4 pl-4 text-left text-xs font-semibold tracking-widest uppercase sm:pl-6">
              {t('colFeature')}
            </th>
            <th className="bg-emerald-500/10 px-4 py-4 text-center">
              <div className="text-foreground text-sm font-semibold">
                CCB &middot; Free
              </div>
              <div className="mt-0.5 text-xs font-bold text-emerald-500">
                $0
              </div>
            </th>
            <th className="bg-primary/10 px-4 py-4 text-center">
              <div className="text-primary text-sm font-semibold">
                CCB &middot; Pro
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
            <TableRow key={row.key} row={row} label={t(`rows.${row.key}`)} />
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
            <TableRow key={row.key} row={row} label={t(`rows.${row.key}`)} />
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
            <TableRow key={row.key} row={row} label={t(`rows.${row.key}`)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
