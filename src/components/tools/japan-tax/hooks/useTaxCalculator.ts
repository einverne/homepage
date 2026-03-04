import { useMemo } from 'react';
import type { TaxInput, TaxBreakdown, TaxChartDataPoint, TaxCalculatorResult } from '../types';
import {
  INCOME_TAX_BRACKETS,
  RECONSTRUCTION_SURTAX_RATE,
  SOCIAL_INSURANCE,
  BASIC_DEDUCTION_INCOME_TAX,
  BASIC_DEDUCTION_RESIDENT_TAX,
  RESIDENT_TAX_RATE,
  RESIDENT_TAX_PER_CAPITA,
  CHART_SALARY_MIN,
  CHART_SALARY_MAX,
  CHART_SALARY_STEP,
} from '../types';

/**
 * Calculate Employment Income (給与所得) from gross salary using 2025 rules.
 * The Employment Income Deduction (給与所得控除) is applied here.
 */
function calcEmploymentIncome(gross: number): number {
  if (gross <= 650999) return 0;
  if (gross <= 1899999) return gross - 650000;

  const B = Math.floor(gross / 4 / 1000) * 1000;
  if (gross <= 3599999) return B * 2.8 - 80000;
  if (gross <= 6599999) return B * 3.2 - 440000;
  if (gross <= 8499999) return gross * 0.9 - 1100000;
  return gross - 1950000;
}

/**
 * Calculate social insurance premiums (社会保険料) - employee share.
 */
function calcSocialInsurance(annualSalary: number, isOver40: boolean) {
  const monthlySalary = annualSalary / 12;

  const healthBase = Math.min(monthlySalary, SOCIAL_INSURANCE.healthMonthlyCap) * 12;
  const pensionBase = Math.min(monthlySalary, SOCIAL_INSURANCE.pensionMonthlyCap) * 12;

  const healthRate = isOver40
    ? SOCIAL_INSURANCE.healthWithNursingRate
    : SOCIAL_INSURANCE.healthRate;

  const healthInsurance = Math.floor(healthBase * healthRate);
  const pensionInsurance = Math.floor(pensionBase * SOCIAL_INSURANCE.pensionRate);
  const employmentInsurance = Math.floor(annualSalary * SOCIAL_INSURANCE.employmentRate);

  return {
    healthInsurance,
    pensionInsurance,
    employmentInsurance,
    total: healthInsurance + pensionInsurance + employmentInsurance,
  };
}

/**
 * Calculate income tax (所得税) using progressive brackets.
 */
function calcIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  for (const bracket of INCOME_TAX_BRACKETS) {
    if (taxableIncome <= bracket.limit) {
      return Math.floor(taxableIncome * bracket.rate - bracket.deduction);
    }
  }
  return 0;
}

/**
 * Calculate the full tax breakdown for a given salary.
 */
function calcTaxBreakdown(input: TaxInput): TaxBreakdown {
  const { annualSalary, isOver40 } = input;

  // Step 1: Social Insurance
  const si = calcSocialInsurance(annualSalary, isOver40);

  // Step 2: Employment Income (after employment income deduction)
  const employmentIncome = calcEmploymentIncome(annualSalary);
  const employmentIncomeDeduction = annualSalary - employmentIncome;

  // Step 3: Income Tax (課税所得金額は1,000円未満切り捨て)
  const incomeTaxableIncome = Math.floor(Math.max(0, employmentIncome - si.total - BASIC_DEDUCTION_INCOME_TAX) / 1000) * 1000;
  const incomeTax = calcIncomeTax(incomeTaxableIncome);
  const incomeTaxWithSurtax = Math.floor(incomeTax * (1 + RECONSTRUCTION_SURTAX_RATE));

  // Step 4: Resident Tax (課税所得金額は1,000円未満切り捨て)
  const residentTaxableIncome = Math.floor(Math.max(0, employmentIncome - si.total - BASIC_DEDUCTION_RESIDENT_TAX) / 1000) * 1000;
  const residentTaxIncomePortion = Math.floor(residentTaxableIncome * RESIDENT_TAX_RATE);
  const residentTax = residentTaxableIncome > 0
    ? residentTaxIncomePortion + RESIDENT_TAX_PER_CAPITA
    : 0;

  // Step 5: Totals
  const totalDeductions = si.total + incomeTaxWithSurtax + residentTax;
  const takeHome = annualSalary - totalDeductions;
  const effectiveRate = annualSalary > 0 ? (totalDeductions / annualSalary) * 100 : 0;

  return {
    grossSalary: annualSalary,
    employmentIncome,
    employmentIncomeDeduction,
    socialInsurance: si.total,
    healthInsurance: si.healthInsurance,
    pensionInsurance: si.pensionInsurance,
    employmentInsurance: si.employmentInsurance,
    incomeTaxableIncome,
    incomeTax,
    incomeTaxWithSurtax,
    residentTaxableIncome,
    residentTax,
    totalDeductions,
    takeHome,
    effectiveRate,
    monthlyTakeHome: Math.floor(takeHome / 12),
  };
}

/**
 * Generate chart data points across salary range.
 */
function generateChartData(isOver40: boolean): TaxChartDataPoint[] {
  const dataPoints: TaxChartDataPoint[] = [];

  for (let salary = CHART_SALARY_MIN; salary <= CHART_SALARY_MAX; salary += CHART_SALARY_STEP) {
    const breakdown = calcTaxBreakdown({ annualSalary: salary, isOver40 });
    dataPoints.push({
      salary,
      takeHome: breakdown.takeHome,
      incomeTax: breakdown.incomeTaxWithSurtax,
      residentTax: breakdown.residentTax,
      socialInsurance: breakdown.socialInsurance,
      totalDeductions: breakdown.totalDeductions,
      effectiveRate: Math.round(breakdown.effectiveRate * 10) / 10,
    });
  }

  return dataPoints;
}

export function useTaxCalculator(input: TaxInput): TaxCalculatorResult {
  return useMemo(() => {
    const breakdown = calcTaxBreakdown(input);
    const chartData = generateChartData(input.isOver40);
    return { breakdown, chartData };
  }, [input.annualSalary, input.isOver40]);
}
