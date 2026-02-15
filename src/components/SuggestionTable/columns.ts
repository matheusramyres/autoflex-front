import type { ColumnDef } from '@tanstack/react-table';
import type { ProductionSuggestion } from '../../types/ProductionSuggestion';
import { moneyFormatter } from '../../utils/formatters';

export const columns: ColumnDef<ProductionSuggestion>[] = [
  {
    accessorKey: 'productName',
    header: 'Produto',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
  },
  {
    accessorKey: 'unitPrice',
    header: 'Preço Unitário',
    cell: (info) => moneyFormatter(info.getValue<number>()),
  },
  {
    accessorKey: 'totalValue',
    header: 'Valor Total',
    cell: (info) => moneyFormatter(info.getValue<number>()),
  },
];
