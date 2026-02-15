import { STOCK_THRESHOLDS } from '../constants/stock';

export type StockStatus = 'LOW' | 'MEDIUM' | 'GOOD';

export function getStockStatus(stock: number): {
  label: string;
  status: StockStatus;
  className: string;
} {
  if (stock <= STOCK_THRESHOLDS.LOW) {
    return {
      label: 'Baixo',
      status: 'LOW',
      className: 'bg-red-500/20 text-red-400 border border-red-500/30',
    };
  }

  if (stock <= STOCK_THRESHOLDS.MEDIUM) {
    return {
      label: 'Médio',
      status: 'MEDIUM',
      className: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    };
  }

  return {
    label: 'Bom',
    status: 'GOOD',
    className: 'bg-green-500/20 text-green-400 border border-green-500/30',
  };
}
