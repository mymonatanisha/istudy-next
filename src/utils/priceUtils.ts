/**
 * Price formatting utility
 * Formats prices without currency symbol (currency unspecified)
 */

export function formatPrice(value: number | string | undefined | null, opts?: { decimals?: number }): string {
  if (value === null || value === undefined || value === '') return '';
  const num = typeof value === 'string' ? Number(value) : value;
  if (Number.isNaN(num)) return String(value);
  const decimals = opts?.decimals ?? 2;
  // returns string without any currency symbol
  return num.toFixed(decimals);
}
