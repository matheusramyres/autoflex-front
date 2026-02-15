import type { ColumnDef } from '@tanstack/react-table';
import type { Product } from '../../types/ProductType';
import { moneyFormatter } from '../../utils/formatters';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Produto',
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: (info) => moneyFormatter(info.getValue<number>()),
  },
  {
    accessorKey: 'rawMaterialQuantity',
    header: 'Qtd Materiais',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
  },
];
