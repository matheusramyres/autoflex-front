import { clsx } from 'clsx';
import {
  Activity,
  Box,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { moneyFormatter } from '../../utils/formatters';

interface CardProps {
  variant: 'money' | 'material' | 'product';
  variation: number | undefined;
  value: number | undefined;
}

export const CardData = ({ value, variant, variation }: CardProps) => {
  return (
    <article className={clsx(' w-full px-6 py-4.5', 'bg-erp-hover rounded-xl')}>
      <div className="flex justify-between items-center mb-4.5">
        <div className="w-12 h-12 rounded-lg bg-erp-brand-hover flex justify-center items-center">
          {variant === 'money' ? (
            <DollarSign size={24} color="#50A2FF" />
          ) : variant === 'product' ? (
            <Box size={24} color="#50A2FF" />
          ) : (
            <Activity size={24} color="#50A2FF" />
          )}
        </div>
        <div
          className={clsx(
            'flex justify-center',
            variation && variation > 0 ? 'text-erp-green' : 'text-erp-red',
          )}
        >
          {variation && variation > 0 ? <TrendingUp /> : <TrendingDown />}
          <span className="ml-1.5">{`${variation}%`}</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-erp-muted font-semibold mb-2">
          {variant === 'money'
            ? 'Valor Total da Produção'
            : variant === 'product'
              ? 'Produtos Ativos'
              : 'Utilização de Materiais'}
        </p>
        <p className="text-[28px] text-text-base font-bold">
          {variant === 'money'
            ? `${moneyFormatter(value)}`
            : variant === 'product'
              ? value
              : `${value}%`}
        </p>
      </div>
    </article>
  );
};
