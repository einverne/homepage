import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DocumentSectionProps {
  translations: {
    title: string;
    taxSystem: string;
    taxSystemContent: string;
    incomeTax: string;
    incomeTaxContent: string;
    residentTax: string;
    residentTaxContent: string;
    socialInsurance: string;
    socialInsuranceContent: string;
    deductions: string;
    deductionsContent: string;
    disclaimer: string;
    disclaimerContent: string;
  };
}

export function DocumentSection({ translations: t }: DocumentSectionProps) {
  const items = [
    { key: 'taxSystem', title: t.taxSystem, content: t.taxSystemContent },
    { key: 'incomeTax', title: t.incomeTax, content: t.incomeTaxContent },
    { key: 'residentTax', title: t.residentTax, content: t.residentTaxContent },
    { key: 'socialInsurance', title: t.socialInsurance, content: t.socialInsuranceContent },
    { key: 'deductions', title: t.deductions, content: t.deductionsContent },
    { key: 'disclaimer', title: t.disclaimer, content: t.disclaimerContent },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.key} value={item.key}>
              <AccordionTrigger className="text-sm font-medium">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className="text-sm text-muted-foreground prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
