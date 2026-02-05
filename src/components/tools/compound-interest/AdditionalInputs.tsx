import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { CalculatorInput, AdditionalFrequency } from './types';

interface AdditionalInputsProps {
  input: CalculatorInput;
  onChange: (updates: Partial<CalculatorInput>) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  translations: {
    additionalInvestment: string;
    additionalAmount: string;
    additionalFrequency: string;
    additionalStartYear: string;
    frequency: {
      yearly: string;
      quarterly: string;
      monthly: string;
    };
  };
}

export function AdditionalInputs({
  input,
  onChange,
  isOpen,
  onOpenChange,
  translations: t,
}: AdditionalInputsProps) {
  const handleNumberChange = (
    field: keyof CalculatorInput,
    value: string,
    min: number,
    max: number
  ) => {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      onChange({ [field]: parsed });
    } else if (value === '') {
      onChange({ [field]: min });
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover:underline">
        {t.additionalInvestment}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-2">
        <div className="space-y-2">
          <Label htmlFor="additionalAmount">{t.additionalAmount}</Label>
          <Input
            id="additionalAmount"
            type="number"
            min={0}
            max={99999999}
            value={input.additionalAmount}
            onChange={(e) =>
              handleNumberChange('additionalAmount', e.target.value, 0, 99999999)
            }
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalFrequency">{t.additionalFrequency}</Label>
          <Select
            value={input.additionalFrequency}
            onValueChange={(value: AdditionalFrequency) =>
              onChange({ additionalFrequency: value })
            }
          >
            <SelectTrigger id="additionalFrequency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yearly">{t.frequency.yearly}</SelectItem>
              <SelectItem value="quarterly">{t.frequency.quarterly}</SelectItem>
              <SelectItem value="monthly">{t.frequency.monthly}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalStartYear">{t.additionalStartYear}</Label>
          <Input
            id="additionalStartYear"
            type="number"
            min={1}
            max={input.years}
            value={input.additionalStartYear}
            onChange={(e) =>
              handleNumberChange('additionalStartYear', e.target.value, 1, input.years)
            }
            className="text-right"
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
