import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TaxChartDataPoint } from './types';
import { formatJPY } from './utils';

interface TaxTrendChartProps {
  data: TaxChartDataPoint[];
  selectedSalary: number;
  locale: string;
  translations: {
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
}

export function TaxTrendChart({ data, selectedSalary, locale, translations: t }: TaxTrendChartProps) {
  const formatYAxis = (value: number) => {
    if (locale === 'en') {
      if (value >= 1000000) return `¥${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `¥${(value / 1000).toFixed(0)}K`;
      return `¥${value}`;
    }
    if (value >= 10000) return `${(value / 10000).toFixed(0)}万`;
    return `${value}`;
  };

  const formatXAxis = (value: number) => {
    if (locale === 'en') {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    return `${(value / 10000).toFixed(0)}万`;
  };

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number; name: string; color: string; dataKey: string }>;
    label?: number;
  }) => {
    if (active && payload && payload.length && label) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3 max-w-xs">
          <p className="font-medium mb-2">{t.salary}: {formatJPY(label)}</p>
          {payload.map((entry, index) => {
            if (entry.dataKey === 'effectiveRate') return null;
            return (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {entry.name}: {formatJPY(entry.value)}
              </p>
            );
          })}
          {payload.find(p => p.dataKey === 'effectiveRate') && (
            <p className="text-sm text-red-500 mt-1 border-t pt-1">
              {t.effectiveRate}: {payload.find(p => p.dataKey === 'effectiveRate')?.value}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="salary"
                tickFormatter={formatXAxis}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="amount"
                tickFormatter={formatYAxis}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="rate"
                orientation="right"
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 50]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              {/* Reference line for selected salary */}
              <ReferenceLine
                yAxisId="amount"
                x={selectedSalary}
                stroke="#666"
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />

              {/* Stacked areas for tax components */}
              <Area
                yAxisId="amount"
                type="monotone"
                dataKey="socialInsurance"
                name={t.socialInsurance}
                fill="#8b5cf6"
                fillOpacity={0.15}
                stroke="#8b5cf6"
                strokeWidth={1.5}
                stackId="deductions"
              />
              <Area
                yAxisId="amount"
                type="monotone"
                dataKey="residentTax"
                name={t.residentTax}
                fill="#f59e0b"
                fillOpacity={0.15}
                stroke="#f59e0b"
                strokeWidth={1.5}
                stackId="deductions"
              />
              <Area
                yAxisId="amount"
                type="monotone"
                dataKey="incomeTax"
                name={t.incomeTax}
                fill="#2563eb"
                fillOpacity={0.15}
                stroke="#2563eb"
                strokeWidth={1.5}
                stackId="deductions"
              />

              {/* Take-home line */}
              <Line
                yAxisId="amount"
                type="monotone"
                dataKey="takeHome"
                name={t.takeHome}
                stroke="#10b981"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />

              {/* Effective rate line */}
              <Line
                yAxisId="rate"
                type="monotone"
                dataKey="effectiveRate"
                name={t.effectiveRate}
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
