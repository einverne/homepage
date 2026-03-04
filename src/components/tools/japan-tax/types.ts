export interface TaxInput {
  annualSalary: number;
  isOver40: boolean;
}

export interface TaxBreakdown {
  grossSalary: number;
  employmentIncome: number;
  employmentIncomeDeduction: number;
  socialInsurance: number;
  healthInsurance: number;
  pensionInsurance: number;
  employmentInsurance: number;
  incomeTaxableIncome: number;
  incomeTax: number;
  incomeTaxWithSurtax: number;
  residentTaxableIncome: number;
  residentTax: number;
  totalDeductions: number;
  takeHome: number;
  effectiveRate: number;
  monthlyTakeHome: number;
}

export interface TaxChartDataPoint {
  salary: number;
  takeHome: number;
  incomeTax: number;
  residentTax: number;
  socialInsurance: number;
  totalDeductions: number;
  effectiveRate: number;
}

export interface TaxCalculatorResult {
  breakdown: TaxBreakdown;
  chartData: TaxChartDataPoint[];
}

export const DEFAULT_TAX_INPUT: TaxInput = {
  annualSalary: 5000000,
  isOver40: false,
};

// 2025 Income Tax Brackets (所得税)
export const INCOME_TAX_BRACKETS = [
  { limit: 1950000, rate: 0.05, deduction: 0 },
  { limit: 3300000, rate: 0.10, deduction: 97500 },
  { limit: 6950000, rate: 0.20, deduction: 427500 },
  { limit: 9000000, rate: 0.23, deduction: 636000 },
  { limit: 18000000, rate: 0.33, deduction: 1536000 },
  { limit: 40000000, rate: 0.40, deduction: 2796000 },
  { limit: Infinity, rate: 0.45, deduction: 4796000 },
] as const;

// Reconstruction Surtax (復興特別所得税) 2.1% until 2037
export const RECONSTRUCTION_SURTAX_RATE = 0.021;

// Social Insurance Rates (FY2025, Tokyo, Employee Share)
export const SOCIAL_INSURANCE = {
  healthRate: 0.04955,        // 健康保険 (under 40, Tokyo)
  healthWithNursingRate: 0.0575, // 健康保険 + 介護保険 (40-64, Tokyo)
  pensionRate: 0.0915,        // 厚生年金
  employmentRate: 0.0055,     // 雇用保険 (general business)
  healthMonthlyCap: 1390000,  // 標準報酬月額 upper limit
  pensionMonthlyCap: 650000,  // 標準報酬月額 upper limit
} as const;

// Basic Deduction (基礎控除) 2025
export const BASIC_DEDUCTION_INCOME_TAX = 580000;  // 所得税用
export const BASIC_DEDUCTION_RESIDENT_TAX = 430000; // 住民税用

// Resident Tax (住民税)
export const RESIDENT_TAX_RATE = 0.10;         // 所得割 10%
export const RESIDENT_TAX_PER_CAPITA = 5000;   // 均等割 5,000 JPY

// Chart salary range
export const CHART_SALARY_MIN = 2000000;
export const CHART_SALARY_MAX = 20000000;
export const CHART_SALARY_STEP = 500000;

// Input slider range
export const SALARY_MIN = 1000000;
export const SALARY_MAX = 30000000;
export const SALARY_STEP = 100000;
