import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TaxInput } from './types';
import { SALARY_MIN, SALARY_MAX, SALARY_STEP } from './types';

interface SalaryInputProps {
  input: TaxInput;
  onChange: (updates: Partial<TaxInput>) => void;
  translations: {
    annualSalary: string;
    age: string;
    ageUnder40: string;
    age40Plus: string;
    salaryUnit: string;
  };
}

export function SalaryInput({ input, onChange, translations: t }: SalaryInputProps) {
  const salaryInMan = Math.round(input.annualSalary / 10000);

  return (
    <div className="space-y-5">
      {/* Annual Salary */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">{t.annualSalary}</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={salaryInMan}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 0;
              onChange({ annualSalary: Math.min(Math.max(val * 10000, SALARY_MIN), SALARY_MAX) });
            }}
            className="w-24 text-right"
            min={SALARY_MIN / 10000}
            max={SALARY_MAX / 10000}
          />
          <span className="text-sm text-muted-foreground">{t.salaryUnit}</span>
        </div>
        <input
          type="range"
          min={SALARY_MIN}
          max={SALARY_MAX}
          step={SALARY_STEP}
          value={input.annualSalary}
          onChange={(e) => onChange({ annualSalary: parseInt(e.target.value) })}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{(SALARY_MIN / 10000).toFixed(0)}{t.salaryUnit}</span>
          <span>{(SALARY_MAX / 10000).toFixed(0)}{t.salaryUnit}</span>
        </div>
      </div>

      {/* Age Group Toggle */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">{t.age}</Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange({ isOver40: false })}
            className={`flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${
              !input.isOver40
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {t.ageUnder40}
          </button>
          <button
            type="button"
            onClick={() => onChange({ isOver40: true })}
            className={`flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${
              input.isOver40
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {t.age40Plus}
          </button>
        </div>
      </div>
    </div>
  );
}
