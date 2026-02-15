import clsx from 'clsx';

type Variant = 'totalMaterials' | 'stockLow' | 'totalStock';

interface MaterialCardProps {
  title: string;
  variant: Variant;
  value: number;
}
export const MaterialCard = ({ title, value, variant }: MaterialCardProps) => {
  const valueColors = {
    totalMaterials: 'text-[#ffffff]',
    stockLow: 'text-[#FF6467]',
    totalStock: 'text-[#47A2F9]',
  };
  return (
    <div className="w-full min-h-21.5 bg-erp-hover px-6 py-3.5 rounded-xl">
      <p className="text-sm font-semibold text-erp-muted mb-3.5">{title}</p>
      <p className={clsx('text-2xl  font-bold', valueColors[variant])}>
        {variant !== 'totalStock'
          ? value
          : `${value.toLocaleString('pt-BR')} unidades`}
      </p>
    </div>
  );
};
