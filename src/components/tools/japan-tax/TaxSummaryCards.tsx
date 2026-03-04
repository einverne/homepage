import React from 'react';
import { Wallet, Receipt, Building2, Shield, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { TaxBreakdown } from './types';
import { formatJPY, formatManYen } from './utils';

interface TaxSummaryCardsProps {
  breakdown: TaxBreakdown;
  translations: {
    takeHome: string;
    incomeTax: string;
    residentTax: string;
    socialInsurance: string;
    effectiveRate: string;
    monthly: string;
  };
}

export function TaxSummaryCards({ breakdown, translations: t }: TaxSummaryCardsProps) {
  const cards = [
    {
      title: t.takeHome,
      value: formatJPY(breakdown.takeHome),
      subtitle: `${t.monthly} ${formatJPY(breakdown.monthlyTakeHome)}`,
      icon: Wallet,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      title: t.incomeTax,
      value: formatJPY(breakdown.incomeTaxWithSurtax),
      subtitle: formatManYen(breakdown.incomeTaxWithSurtax),
      icon: Receipt,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      title: t.residentTax,
      value: formatJPY(breakdown.residentTax),
      subtitle: formatManYen(breakdown.residentTax),
      icon: Building2,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950',
    },
    {
      title: t.socialInsurance,
      value: formatJPY(breakdown.socialInsurance),
      subtitle: formatManYen(breakdown.socialInsurance),
      icon: Shield,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      title: t.effectiveRate,
      value: `${breakdown.effectiveRate.toFixed(1)}%`,
      subtitle: `${formatJPY(breakdown.totalDeductions)}`,
      icon: TrendingDown,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      {cards.map((card, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1 min-w-0">
                <p className="text-xs text-muted-foreground">{card.title}</p>
                <p className="text-lg font-bold truncate">{card.value}</p>
                <p className="text-xs text-muted-foreground truncate">{card.subtitle}</p>
              </div>
              <div className={`p-1.5 rounded-lg ${card.bgColor} shrink-0`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
