export const formatNum = (n: number): string => {
  return new Intl.NumberFormat("pt-BR").format(n);
};
