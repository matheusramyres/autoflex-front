import type { ColumnDef } from '@tanstack/react-table';
import type { RawMaterial } from '../../types/RawMaterial';
import { getStockStatus } from '../../utils/stockStatus';

export const columns: ColumnDef<RawMaterial>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Material',
  },
  {
    accessorKey: 'stockQuantity',
    header: 'Quantidade em estoque',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row) => {
      const stock = row.row.original.stockQuantity;
      const { label, className } = getStockStatus(stock);

      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}
        >
          {label}
        </span>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
  },
];
