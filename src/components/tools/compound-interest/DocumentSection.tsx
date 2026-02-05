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
    whatIsCompound: string;
    whatIsCompoundContent: string;
    formula: string;
    formulaContent: string;
    howToUse: string;
    howToUseContent: string;
    keyPoints: string;
    keyPointsContent: string;
    importance: string;
    importanceContent: string;
  };
}

export function DocumentSection({ translations: t }: DocumentSectionProps) {
  const sections = [
    { id: 'what-is-compound', title: t.whatIsCompound, content: t.whatIsCompoundContent },
    { id: 'formula', title: t.formula, content: t.formulaContent },
    { id: 'how-to-use', title: t.howToUse, content: t.howToUseContent },
    { id: 'key-points', title: t.keyPoints, content: t.keyPointsContent },
    { id: 'importance', title: t.importance, content: t.importanceContent },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">FAQ</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="text-left">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
