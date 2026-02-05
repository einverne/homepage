export type CompoundFrequency = 'yearly' | 'quarterly' | 'monthly' | 'daily';
export type AdditionalFrequency = 'yearly' | 'quarterly' | 'monthly';

export interface CalculatorInput {
  principal: number;
  annualRate: number;
  years: number;
  compoundFrequency: CompoundFrequency;
  additionalAmount: number;
  additionalFrequency: AdditionalFrequency;
  additionalStartYear: number;
}

export interface YearlyResult {
  year: number;
  startBalance: number;
  interest: number;
  additionalPrincipal: number;
  endBalance: number;
  growthRate: number;
  simpleInterestBalance: number;
}

export interface Summary {
  finalAmount: number;
  totalPrincipal: number;
  totalInterest: number;
  totalReturn: number;
  doublingCount: number;
  doublingYears: number[];
  returnMultiple: number;
}

export interface CalculatorResult {
  yearlyResults: YearlyResult[];
  summary: Summary;
}

export const DEFAULT_INPUT: CalculatorInput = {
  principal: 100000,
  annualRate: 4.0,
  years: 30,
  compoundFrequency: 'monthly',
  additionalAmount: 0,
  additionalFrequency: 'yearly',
  additionalStartYear: 1,
};

export const FREQUENCY_VALUES: Record<CompoundFrequency, number> = {
  yearly: 1,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

export const ADDITIONAL_FREQUENCY_VALUES: Record<AdditionalFrequency, number> = {
  yearly: 1,
  quarterly: 4,
  monthly: 12,
};
