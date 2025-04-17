export const formatRupiah = (value: number | string): string => {
  if (!value) return "Rp. 0";
  return `Rp. ${Number(value)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};