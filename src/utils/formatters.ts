export const moneyFormatter = (value: number | undefined) => {
  if (!value) return;
  const formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return formatter;
};
