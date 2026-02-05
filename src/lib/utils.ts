import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, locale: string = 'zh-CN'): string {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrency(value: number, locale: string = 'zh'): string {
  const config: Record<string, { currency: string; locale: string }> = {
    zh: { currency: 'CNY', locale: 'zh-CN' },
    en: { currency: 'USD', locale: 'en-US' },
    ja: { currency: 'JPY', locale: 'ja-JP' },
  };

  const { currency, locale: numberLocale } = config[locale] || config.zh;

  return new Intl.NumberFormat(numberLocale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, locale: string = 'zh-CN'): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
