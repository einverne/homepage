import React, { useState, useCallback } from 'react';
import { Share2, RotateCcw, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SalaryInput } from './SalaryInput';
import { TaxSummaryCards } from './TaxSummaryCards';
import { TaxTrendChart } from './TaxTrendChart';
import { TaxTable } from './TaxTable';
import { DocumentSection } from './DocumentSection';
import { useTaxCalculator } from './hooks/useTaxCalculator';
import type { TaxInput } from './types';
import { DEFAULT_TAX_INPUT } from './types';

export interface JapanTaxTranslations {
  title: string;
  subtitle: string;
  inputs: {
    annualSalary: string;
    age: string;
    ageUnder40: string;
    age40Plus: string;
    salaryUnit: string;
  };
  summary: {
    takeHome: string;
    incomeTax: string;
    residentTax: string;
    socialInsurance: string;
    effectiveRate: string;
    monthly: string;
  };
  chart: {
    title: string;
    takeHome: string;
    incomeTax: string;
    residentTax: string;
    socialInsurance: string;
    totalDeductions: string;
    salary: string;
    amount: string;
    effectiveRate: string;
  };
  table: {
    title: string;
    salary: string;
    takeHome: string;
    incomeTax: string;
    residentTax: string;
    socialInsurance: string;
    totalDeductions: string;
    effectiveRate: string;
    showAll: string;
    showInterval: string;
  };
  actions: {
    share: string;
    reset: string;
    copied: string;
  };
  docs: {
    title: string;
    taxSystem: string;
    taxSystemContent: string;
    incomeTax: string;
    incomeTaxContent: string;
    residentTax: string;
    residentTaxContent: string;
    socialInsurance: string;
    socialInsuranceContent: string;
    deductions: string;
    deductionsContent: string;
    disclaimer: string;
    disclaimerContent: string;
  };
}

interface JapanTaxCalculatorProps {
  locale: string;
  translations: JapanTaxTranslations;
}

export function JapanTaxCalculator({
  locale,
  translations: t,
}: JapanTaxCalculatorProps) {
  const [input, setInput] = useState<TaxInput>(DEFAULT_TAX_INPUT);
  const [copied, setCopied] = useState(false);

  const result = useTaxCalculator(input);

  const handleInputChange = useCallback((updates: Partial<TaxInput>) => {
    setInput((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleReset = useCallback(() => {
    setInput(DEFAULT_TAX_INPUT);
  }, []);

  const handleShare = useCallback(async () => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams({
      salary: input.annualSalary.toString(),
      over40: input.isOver40 ? '1' : '0',
    });
    const url = `${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(window.location.origin + url);
      window.history.replaceState({}, '', url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  }, [input]);

  // Load from URL on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const salary = params.get('salary');
    const over40 = params.get('over40');
    if (salary) {
      setInput((prev) => ({
        ...prev,
        annualSalary: Math.max(1000000, Math.min(30000000, parseInt(salary) || prev.annualSalary)),
        isOver40: over40 === '1',
      }));
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-3">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">{t.inputs.annualSalary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <SalaryInput
                  input={input}
                  onChange={handleInputChange}
                  translations={t.inputs}
                />

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleShare}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        {t.actions.copied}
                      </>
                    ) : (
                      <>
                        <Share2 className="h-4 w-4 mr-2" />
                        {t.actions.share}
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t.actions.reset}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-9 space-y-6">
            {/* Summary Cards */}
            <TaxSummaryCards
              breakdown={result.breakdown}
              translations={t.summary}
            />

            {/* Chart */}
            <TaxTrendChart
              data={result.chartData}
              selectedSalary={input.annualSalary}
              locale={locale}
              translations={t.chart}
            />

            {/* Table */}
            <TaxTable
              data={result.chartData}
              selectedSalary={input.annualSalary}
              translations={t.table}
            />
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-12">
          <DocumentSection translations={t.docs} />
        </div>
      </div>
    </div>
  );
}
