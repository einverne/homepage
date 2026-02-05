import React from 'react';
import { TrendingUp, PiggyBank, Calculator, Repeat } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatPercent } from '@/lib/utils';
import type { Summary } from './types';

interface KPICardsProps {
  summary: Summary;
  principal: number;
  locale: string;
  translations: {
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
}

export function KPICards({ summary, principal, locale, translations: t }: KPICardsProps) {
  const {
    finalAmount,
    totalReturn,
    returnMultiple,
    doublingCount,
    doublingYears,
    totalPrincipal,
  } = summary;

  const growthPercent = ((finalAmount - principal) / principal) * 100;

  const cards = [
    {
      title: t.finalAmount,
      value: formatCurrency(finalAmount, locale),
      subtitle: `${t.comparedToInitial} +${formatPercent(growthPercent, locale)}`,
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: t.totalReturn,
      value: formatCurrency(summary.totalInterest, locale),
      subtitle: `${t.principalAmount} ${formatCurrency(totalPrincipal, locale)}`,
      icon: PiggyBank,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: t.returnMultiple,
      value: `${returnMultiple.toFixed(2)}x`,
      subtitle: `${summary.totalReturn.toFixed(1)}% ${t.totalReturn}`,
      icon: Calculator,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      title: t.doublingCount,
      value: `${doublingCount} ${t.times}`,
      subtitle: doublingYears.length > 0
        ? `${t.years} ${doublingYears.join('/')}`
        : '-',
      icon: Repeat,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground truncate">{card.subtitle}</p>
              </div>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
