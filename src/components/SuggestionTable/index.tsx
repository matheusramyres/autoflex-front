import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { clsx } from 'clsx';
import { useState } from 'react';
import { SkeletonRow } from '../../skeleton/SkeletonRow/SkeletonRow';
import type { ProductionSuggestion } from '../../types/ProductionSuggestion';
import { columns } from './columns';

type ProductionProps = {
  data: ProductionSuggestion[];
  loading: boolean;
};

export function ProductionSuggestionTable({ data, loading }: ProductionProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full mt-6 bg-erp-hover rounded-[10px] overflow-x-auto">
      <header className="pl-5 pt-6.5 pb-6 border-b border-erp-subtle">
        <p className="text-[20px] text-white font-bold">
          Sugestões de Produção
        </p>
        <p className="text-sm text-erp-muted font-normal">
          Recomendações de produção otimizadas com base nos materiais
          disponíveis.
        </p>
      </header>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={clsx(
                    'bg-erp-main p-2 cursor-pointer',
                    'text-erp-muted text-sm text-left font-normal',
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={clsx(
                      'border-t border-erp-subtle',
                      'p-4 text-sm font-semibold',
                      cell.id.includes('totalValue') ? 'text-[#47A2F9]' : '',
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
