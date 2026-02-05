import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatNumber, formatPercent, cn } from '@/lib/utils';
import type { YearlyResult } from './types';

interface DataTableProps {
  data: YearlyResult[];
  doublingYears: number[];
  locale: string;
  translations: {
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
}

type IntervalType = 'all' | '5' | '10';

export function DataTable({ data, doublingYears, locale, translations: t }: DataTableProps) {
  const [interval, setInterval] = useState<IntervalType>('all');

  const filteredData = data.filter((item) => {
    if (interval === 'all') return true;
    if (interval === '5') return item.year % 5 === 0 || item.year === 1;
    if (interval === '10') return item.year % 10 === 0 || item.year === 1;
    return true;
  });

  const isDoublingYear = (year: number) => doublingYears.includes(year);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t.title}</CardTitle>
          <div className="flex gap-1">
            <Button
              variant={interval === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setInterval('all')}
            >
              {t.showAll}
            </Button>
            <Button
              variant={interval === '5' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setInterval('5')}
            >
              5{t.showInterval}
            </Button>
            <Button
              variant={interval === '10' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setInterval('10')}
            >
              10{t.showInterval}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-2 text-center font-medium">{t.year}</th>
                <th className="py-2 px-2 text-right font-medium">{t.startBalance}</th>
                <th className="py-2 px-2 text-right font-medium">{t.interest}</th>
                <th className="py-2 px-2 text-right font-medium">{t.additional}</th>
                <th className="py-2 px-2 text-right font-medium">{t.endBalance}</th>
                <th className="py-2 px-2 text-right font-medium">{t.growthRate}</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr
                  key={row.year}
                  className={cn(
                    'border-b hover:bg-muted/50 transition-colors',
                    isDoublingYear(row.year) && 'bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-100'
                  )}
                >
                  <td className="py-2 px-2 text-center">
                    {row.year}
                    {isDoublingYear(row.year) && (
                      <span className="ml-1 text-amber-600 dark:text-amber-400 font-bold">★</span>
                    )}
                  </td>
                  <td className="py-2 px-2 text-right">
                    {formatNumber(row.startBalance, locale)}
                  </td>
                  <td className="py-2 px-2 text-right text-green-600">
                    +{formatNumber(row.interest, locale)}
                  </td>
                  <td className="py-2 px-2 text-right text-blue-600">
                    {row.additionalPrincipal > 0
                      ? `+${formatNumber(row.additionalPrincipal, locale)}`
                      : '-'}
                  </td>
                  <td className="py-2 px-2 text-right font-semibold">
                    {formatNumber(row.endBalance, locale)}
                  </td>
                  <td className="py-2 px-2 text-right">
                    {formatPercent(row.growthRate, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {doublingYears.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-amber-600 dark:text-amber-400">★</span> = Doubling year
          </p>
        )}
      </CardContent>
    </Card>
  );
}
