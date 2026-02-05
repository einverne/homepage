import { useMemo } from 'react';
import type {
  CalculatorInput,
  CalculatorResult,
  YearlyResult,
  Summary,
} from '../types';
import { FREQUENCY_VALUES, ADDITIONAL_FREQUENCY_VALUES } from '../types';

export function useCalculator(input: CalculatorInput): CalculatorResult {
  return useMemo(() => {
    const {
      principal,
      annualRate,
      years,
      compoundFrequency,
      additionalAmount,
      additionalFrequency,
      additionalStartYear,
    } = input;

    const rate = annualRate / 100;
    const n = FREQUENCY_VALUES[compoundFrequency];
    const additionalPerYear = additionalAmount * ADDITIONAL_FREQUENCY_VALUES[additionalFrequency];

    const yearlyResults: YearlyResult[] = [];
    let currentBalance = principal;
    let totalAdditionalPrincipal = 0;
    const doublingYears: number[] = [];
    let nextDoublingTarget = principal * 2;

    for (let year = 1; year <= years; year++) {
      const startBalance = currentBalance;

      // Calculate compound interest for the year
      const compoundFactor = Math.pow(1 + rate / n, n);
      let endBalance = startBalance * compoundFactor;

      // Add additional principal if applicable
      let yearlyAdditional = 0;
      if (additionalAmount > 0 && year >= additionalStartYear) {
        yearlyAdditional = additionalPerYear;
        endBalance += yearlyAdditional;
        totalAdditionalPrincipal += yearlyAdditional;
      }

      const interest = endBalance - startBalance - yearlyAdditional;
      const growthRate = ((endBalance - startBalance) / startBalance) * 100;

      // Simple interest calculation for comparison
      const simpleInterestBalance = principal + principal * rate * year + totalAdditionalPrincipal;

      // Check for doubling
      while (endBalance >= nextDoublingTarget) {
        doublingYears.push(year);
        nextDoublingTarget *= 2;
      }

      yearlyResults.push({
        year,
        startBalance,
        interest,
        additionalPrincipal: yearlyAdditional,
        endBalance,
        growthRate,
        simpleInterestBalance,
      });

      currentBalance = endBalance;
    }

    const finalAmount = currentBalance;
    const totalPrincipal = principal + totalAdditionalPrincipal;
    const totalInterest = finalAmount - totalPrincipal;
    const totalReturn = (totalInterest / totalPrincipal) * 100;
    const returnMultiple = finalAmount / principal;
    const doublingCount = doublingYears.length;

    const summary: Summary = {
      finalAmount,
      totalPrincipal,
      totalInterest,
      totalReturn,
      doublingCount,
      doublingYears,
      returnMultiple,
    };

    return {
      yearlyResults,
      summary,
    };
  }, [input]);
}

export function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number,
  compoundsPerYear: number
): number {
  return principal * Math.pow(1 + rate / compoundsPerYear, compoundsPerYear * years);
}
