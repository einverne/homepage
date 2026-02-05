import React, { useState, useEffect, useCallback } from 'react';
import { Share2, RotateCcw, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BasicInputs } from './BasicInputs';
import { AdditionalInputs } from './AdditionalInputs';
import { KPICards } from './KPICards';
import { TrendChart } from './TrendChart';
import { EarningsPieChart } from './EarningsPieChart';
import { DataTable } from './DataTable';
import { DocumentSection } from './DocumentSection';
import { useCalculator } from './hooks/useCalculator';
import { useShareURL } from './hooks/useShareURL';
import type { CalculatorInput } from './types';
import { DEFAULT_INPUT } from './types';
import { debounce } from '@/lib/utils';

interface CompoundInterestCalculatorProps {
  locale: string;
  translations: CompoundInterestTranslations;
}

export interface CompoundInterestTranslations {
  title: string;
  subtitle: string;
  inputs: {
    principal: string;
    annualRate: string;
    years: string;
    compoundFrequency: string;
    additionalAmount: string;
    additionalFrequency: string;
    additionalStartYear: string;
  };
  frequency: {
    yearly: string;
    quarterly: string;
    monthly: string;
    daily: string;
  };
  kpi: {
    finalAmount: string;
    totalReturn: string;
    returnMultiple: string;
    doublingCount: string;
    comparedToInitial: string;
    principalAmount: string;
    doublingYears: string;
    times: string;
    years: string;
  };
  chart: {
    title: string;
    compoundLine: string;
    simpleLine: string;
    principalLine: string;
    year: string;
    amount: string;
  };
  pieChart: {
    title: string;
    principal: string;
    earnings: string;
  };
  table: {
    title: string;
    year: string;
    startBalance: string;
    interest: string;
    additional: string;
    endBalance: string;
    growthRate: string;
    showAll: string;
    showInterval: string;
  };
  actions: {
    share: string;
    reset: string;
    copied: string;
    additionalInvestment: string;
  };
  docs: {
    whatIsCompound: string;
    whatIsCompoundContent: string;
    formula: string;
    formulaContent: string;
    howToUse: string;
    howToUseContent: string;
    keyPoints: string;
    keyPointsContent: string;
    importance: string;
    importanceContent: string;
  };
}

export function CompoundInterestCalculator({
  locale,
  translations: t,
}: CompoundInterestCalculatorProps) {
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_INPUT);
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { generateShareURL, copyToClipboard, getInputFromURL } = useShareURL();
  const result = useCalculator(input);

  // Load input from URL on mount
  useEffect(() => {
    const urlInput = getInputFromURL();
    setInput(urlInput);
    if (urlInput.additionalAmount > 0) {
      setIsAdditionalOpen(true);
    }
  }, [getInputFromURL]);

  const handleInputChange = useCallback((updates: Partial<CalculatorInput>) => {
    setInput((prev) => ({ ...prev, ...updates }));
  }, []);

  const debouncedInputChange = useCallback(
    debounce((updates: Partial<CalculatorInput>) => {
      handleInputChange(updates);
    }, 300),
    [handleInputChange]
  );

  const handleReset = useCallback(() => {
    setInput(DEFAULT_INPUT);
    setIsAdditionalOpen(false);
    // Clear URL params
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleShare = useCallback(async () => {
    const url = generateShareURL(input);
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      // Update URL
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', url);
      }
      setTimeout(() => setCopied(false), 2000);
    }
  }, [input, generateShareURL, copyToClipboard]);

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
          {/* Input Panel - Left Side */}
          <div className="lg:col-span-4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">{t.inputs.principal}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <BasicInputs
                  input={input}
                  onChange={handleInputChange}
                  translations={{
                    principal: t.inputs.principal,
                    annualRate: t.inputs.annualRate,
                    years: t.inputs.years,
                    compoundFrequency: t.inputs.compoundFrequency,
                    frequency: t.frequency,
                  }}
                />

                <div className="border-t pt-4">
                  <AdditionalInputs
                    input={input}
                    onChange={handleInputChange}
                    isOpen={isAdditionalOpen}
                    onOpenChange={setIsAdditionalOpen}
                    translations={{
                      additionalInvestment: t.actions.additionalInvestment,
                      additionalAmount: t.inputs.additionalAmount,
                      additionalFrequency: t.inputs.additionalFrequency,
                      additionalStartYear: t.inputs.additionalStartYear,
                      frequency: {
                        yearly: t.frequency.yearly,
                        quarterly: t.frequency.quarterly,
                        monthly: t.frequency.monthly,
                      },
                    }}
                  />
                </div>

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

          {/* Output Panel - Right Side */}
          <div className="lg:col-span-8 space-y-6">
            {/* KPI Cards */}
            <KPICards
              summary={result.summary}
              principal={input.principal}
              locale={locale}
              translations={t.kpi}
            />

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <TrendChart
                  data={result.yearlyResults}
                  principal={input.principal}
                  locale={locale}
                  translations={t.chart}
                />
              </div>
              <div className="md:col-span-1">
                <EarningsPieChart
                  summary={result.summary}
                  locale={locale}
                  translations={t.pieChart}
                />
              </div>
            </div>

            {/* Data Table */}
            <DataTable
              data={result.yearlyResults}
              doublingYears={result.summary.doublingYears}
              locale={locale}
              translations={t.table}
            />
          </div>
        </div>

        {/* Documentation Section */}
        <div className="mt-12">
          <DocumentSection translations={t.docs} />
        </div>
      </div>
    </div>
  );
}
