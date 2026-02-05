import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import type { Summary } from './types';

interface EarningsPieChartProps {
  summary: Summary;
  locale: string;
  translations: {
    title: string;
    principal: string;
    earnings: string;
  };
}

const COLORS = ['#3b82f6', '#10b981'];

export function EarningsPieChart({ summary, locale, translations: t }: EarningsPieChartProps) {
  const data = [
    { name: t.principal, value: summary.totalPrincipal },
    { name: t.earnings, value: summary.totalInterest },
  ];

  const total = summary.totalPrincipal + summary.totalInterest;

  const CustomTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; payload: { name: string; value: number } }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = ((item.value / total) * 100).toFixed(1);
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium">{item.name}</p>
          <p className="text-sm">{formatCurrency(item.value, locale)}</p>
          <p className="text-sm text-muted-foreground">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
