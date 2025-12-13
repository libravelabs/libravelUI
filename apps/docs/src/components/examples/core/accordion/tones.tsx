"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
} from "@/components/ui/core/accordion";

export default function AccordionTones({
  tone = "default",
  size = "sm",
}: AccordionProps) {
  return (
    <Accordion multiple tone={tone} size={size} className="mx-auto">
      <AccordionItem>
        <AccordionTrigger>What is this Accordion?</AccordionTrigger>
        <AccordionContent>
          This Accordion component allows you to expand and collapse sections of
          content, helping organize information efficiently.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes! It is built with accessibility in mind, supporting keyboard
          navigation and screen readers out of the box.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>Can I open multiple items at once?</AccordionTrigger>
        <AccordionContent>
          Absolutely — with the <code>multiple</code> prop set to true, multiple
          items can be expanded simultaneously.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>How can I customize the styles?</AccordionTrigger>
        <AccordionContent>
          You can customize styles by using the <code>tone</code> and{" "}
          <code>size</code> props to adjust appearance and layout.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger>
          Does it support keyboard navigation?
        </AccordionTrigger>
        <AccordionContent>
          Yes, the component fully supports keyboard navigation and follows
          WAI-ARIA best practices.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
