export function formatJPY(value: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatJPYNumber(value: number): string {
  return new Intl.NumberFormat('ja-JP', {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatManYen(value: number): string {
  const man = Math.round(value / 10000);
  return `${man.toLocaleString()}万`;
}
