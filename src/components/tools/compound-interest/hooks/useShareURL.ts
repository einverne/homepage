import { useCallback } from 'react';
import type { CalculatorInput, CompoundFrequency, AdditionalFrequency } from '../types';
import { DEFAULT_INPUT } from '../types';

const FREQUENCY_SHORT: Record<CompoundFrequency, string> = {
  yearly: 'y',
  quarterly: 'q',
  monthly: 'm',
  daily: 'd',
};

const FREQUENCY_FROM_SHORT: Record<string, CompoundFrequency> = {
  y: 'yearly',
  q: 'quarterly',
  m: 'monthly',
  d: 'daily',
};

const ADDITIONAL_FREQUENCY_SHORT: Record<AdditionalFrequency, string> = {
  yearly: 'y',
  quarterly: 'q',
  monthly: 'm',
};

const ADDITIONAL_FREQUENCY_FROM_SHORT: Record<string, AdditionalFrequency> = {
  y: 'yearly',
  q: 'quarterly',
  m: 'monthly',
};

export function useShareURL() {
  const encodeParams = useCallback((input: CalculatorInput): string => {
    const params = new URLSearchParams();

    params.set('p', input.principal.toString());
    params.set('r', input.annualRate.toString());
    params.set('y', input.years.toString());
    params.set('f', FREQUENCY_SHORT[input.compoundFrequency]);

    if (input.additionalAmount > 0) {
      params.set('a', input.additionalAmount.toString());
      params.set('af', ADDITIONAL_FREQUENCY_SHORT[input.additionalFrequency]);
      params.set('as', input.additionalStartYear.toString());
    }

    return params.toString();
  }, []);

  const decodeParams = useCallback((search: string): Partial<CalculatorInput> => {
    const params = new URLSearchParams(search);
    const result: Partial<CalculatorInput> = {};

    const p = params.get('p');
    if (p) {
      const principal = parseFloat(p);
      if (!isNaN(principal) && principal >= 0) {
        result.principal = principal;
      }
    }

    const r = params.get('r');
    if (r) {
      const rate = parseFloat(r);
      if (!isNaN(rate) && rate >= 0 && rate <= 200) {
        result.annualRate = rate;
      }
    }

    const y = params.get('y');
    if (y) {
      const years = parseInt(y, 10);
      if (!isNaN(years) && years >= 1 && years <= 100) {
        result.years = years;
      }
    }

    const f = params.get('f');
    if (f && FREQUENCY_FROM_SHORT[f]) {
      result.compoundFrequency = FREQUENCY_FROM_SHORT[f];
    }

    const a = params.get('a');
    if (a) {
      const additional = parseFloat(a);
      if (!isNaN(additional) && additional >= 0) {
        result.additionalAmount = additional;
      }
    }

    const af = params.get('af');
    if (af && ADDITIONAL_FREQUENCY_FROM_SHORT[af]) {
      result.additionalFrequency = ADDITIONAL_FREQUENCY_FROM_SHORT[af];
    }

    const as = params.get('as');
    if (as) {
      const startYear = parseInt(as, 10);
      if (!isNaN(startYear) && startYear >= 1) {
        result.additionalStartYear = startYear;
      }
    }

    return result;
  }, []);

  const generateShareURL = useCallback((input: CalculatorInput): string => {
    const params = encodeParams(input);
    const baseURL = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    return `${baseURL}?${params}`;
  }, [encodeParams]);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const getInputFromURL = useCallback((): CalculatorInput => {
    if (typeof window === 'undefined') {
      return DEFAULT_INPUT;
    }

    const search = window.location.search;
    if (!search) {
      return DEFAULT_INPUT;
    }

    const decoded = decodeParams(search);
    return {
      ...DEFAULT_INPUT,
      ...decoded,
    };
  }, [decodeParams]);

  return {
    encodeParams,
    decodeParams,
    generateShareURL,
    copyToClipboard,
    getInputFromURL,
  };
}
