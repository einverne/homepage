import React, { useState, useCallback } from 'react';
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
    salaryYen: string;
  };
}

function clampSalary(value: number): number {
  return Math.min(Math.max(value, SALARY_MIN), SALARY_MAX);
}

export function SalaryInput({ input, onChange, translations: t }: SalaryInputProps) {
  const salaryInMan = Math.round(input.annualSalary / 10000);

  // Local state for the yen input to allow free typing
  const [yenInputValue, setYenInputValue] = useState(input.annualSalary.toString());
  const [isYenFocused, setIsYenFocused] = useState(false);

  const handleYenChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setYenInputValue(raw);
    const parsed = parseInt(raw.replace(/,/g, ''));
    if (!isNaN(parsed) && parsed > 0) {
      onChange({ annualSalary: clampSalary(parsed) });
    }
  }, [onChange]);

  const handleYenBlur = useCallback(() => {
    setIsYenFocused(false);
    setYenInputValue(input.annualSalary.toString());
  }, [input.annualSalary]);

  const handleYenFocus = useCallback(() => {
    setIsYenFocused(true);
    setYenInputValue(input.annualSalary.toString());
  }, [input.annualSalary]);

  // Sync yen input when salary changes externally (slider, man input) and field is not focused
  const displayYenValue = isYenFocused ? yenInputValue : input.annualSalary.toLocaleString();

  return (
    <div className="space-y-5">
      {/* Annual Salary - Man unit */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">{t.annualSalary}</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={salaryInMan}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 0;
              onChange({ annualSalary: clampSalary(val * 10000) });
            }}
            className="w-24 text-right"
            min={SALARY_MIN / 10000}
            max={SALARY_MAX / 10000}
          />
          <span className="text-sm text-muted-foreground">{t.salaryUnit}</span>
        </div>

        {/* Direct yen input */}
        <div className="flex items-center gap-2">
          <Input
            type="text"
            inputMode="numeric"
            value={displayYenValue}
            onChange={handleYenChange}
            onFocus={handleYenFocus}
            onBlur={handleYenBlur}
            className="flex-1 text-right"
            placeholder="5,000,000"
          />
          <span className="text-sm text-muted-foreground">{t.salaryYen}</span>
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
