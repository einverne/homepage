import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CalculatorInput, CompoundFrequency } from './types';

interface BasicInputsProps {
  input: CalculatorInput;
  onChange: (updates: Partial<CalculatorInput>) => void;
  translations: {
    principal: string;
    annualRate: string;
    years: string;
    compoundFrequency: string;
    frequency: {
      yearly: string;
      quarterly: string;
      monthly: string;
      daily: string;
    };
  };
}

export function BasicInputs({ input, onChange, translations: t }: BasicInputsProps) {
  const handleNumberChange = (
    field: keyof CalculatorInput,
    value: string,
    min: number,
    max: number,
    isFloat: boolean = false
  ) => {
    const parsed = isFloat ? parseFloat(value) : parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      onChange({ [field]: parsed });
    } else if (value === '') {
      onChange({ [field]: min });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="principal">{t.principal}</Label>
        <Input
          id="principal"
          type="number"
          min={0}
          max={999999999}
          value={input.principal}
          onChange={(e) => handleNumberChange('principal', e.target.value, 0, 999999999)}
          className="text-right"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="annualRate">{t.annualRate} (%)</Label>
        <Input
          id="annualRate"
          type="number"
          min={0}
          max={200}
          step={0.1}
          value={input.annualRate}
          onChange={(e) => handleNumberChange('annualRate', e.target.value, 0, 200, true)}
          className="text-right"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="years">{t.years}</Label>
        <Input
          id="years"
          type="number"
          min={1}
          max={100}
          value={input.years}
          onChange={(e) => handleNumberChange('years', e.target.value, 1, 100)}
          className="text-right"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="compoundFrequency">{t.compoundFrequency}</Label>
        <Select
          value={input.compoundFrequency}
          onValueChange={(value: CompoundFrequency) => onChange({ compoundFrequency: value })}
        >
          <SelectTrigger id="compoundFrequency">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yearly">{t.frequency.yearly}</SelectItem>
            <SelectItem value="quarterly">{t.frequency.quarterly}</SelectItem>
            <SelectItem value="monthly">{t.frequency.monthly}</SelectItem>
            <SelectItem value="daily">{t.frequency.daily}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
