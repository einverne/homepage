import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TaxChartDataPoint } from './types';
import { formatJPYNumber, formatManYen } from './utils';

interface TaxTableProps {
  data: TaxChartDataPoint[];
  selectedSalary: number;
  translations: {
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
}

export function TaxTable({ data, selectedSalary, translations: t }: TaxTableProps) {
  const [showAll, setShowAll] = useState(false);

  const displayData = showAll ? data : data.filter((_, i) => i % 2 === 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t.title}</CardTitle>
          <div className="flex gap-1 text-xs">
            <button
              onClick={() => setShowAll(false)}
              className={`px-2 py-1 rounded ${!showAll ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
            >
              {t.showInterval}
            </button>
            <button
              onClick={() => setShowAll(true)}
              className={`px-2 py-1 rounded ${showAll ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
            >
              {t.showAll}
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2 font-medium text-muted-foreground">{t.salary}</th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">{t.takeHome}</th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">{t.incomeTax}</th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">{t.residentTax}</th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">{t.socialInsurance}</th>
                <th className="text-right py-2 px-2 font-medium text-muted-foreground">{t.effectiveRate}</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row) => {
                const isSelected = Math.abs(row.salary - selectedSalary) < 250000;
                return (
                  <tr
                    key={row.salary}
                    className={`border-b last:border-0 ${
                      isSelected
                        ? 'bg-primary/10 font-medium'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <td className="py-2 px-2">{formatManYen(row.salary)}</td>
                    <td className="text-right py-2 px-2 text-green-600 dark:text-green-400">
                      {formatJPYNumber(row.takeHome)}
                    </td>
                    <td className="text-right py-2 px-2">{formatJPYNumber(row.incomeTax)}</td>
                    <td className="text-right py-2 px-2">{formatJPYNumber(row.residentTax)}</td>
                    <td className="text-right py-2 px-2">{formatJPYNumber(row.socialInsurance)}</td>
                    <td className="text-right py-2 px-2 text-red-600 dark:text-red-400">
                      {row.effectiveRate.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
