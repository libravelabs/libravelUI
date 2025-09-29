"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
} from "@/components/ui/accordion";
import { Select } from "@/components/ui/select";

interface VariantsBaseProps {
  variant: AccordionProps["variant"];
  size: AccordionProps["size"];
  onVariantChange: (v: AccordionProps["variant"]) => void;
  onSizeChange: (s: AccordionProps["size"]) => void;
}

export function AccordionVariantsBase({
  variant,
  size,
  onVariantChange,
  onSizeChange,
}: VariantsBaseProps) {
  return (
    <section className="space-y-4 w-full min-h-72">
      <div className="flex flex-wrap gap-2">
        <Select
          items={[
            { id: "default", label: "Default" },
            { id: "ghost", label: "Ghost" },
            { id: "outline", label: "Outline" },
            { id: "solid", label: "Solid" },
            { id: "muted", label: "Muted" },
            { id: "separated", label: "Separated" },
          ]}
          selectedKey={variant}
          onSelectionChange={(key) =>
            onVariantChange(key as AccordionProps["variant"])
          }
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          aria-label="Select Accordion Variant"
        />

        <Select
          items={[
            { id: "sm", label: "Small" },
            { id: "md", label: "Medium" },
            { id: "lg", label: "Large" },
            { id: "full", label: "Full Width" },
          ]}
          selectedKey={size}
          onSelectionChange={(key) =>
            onSizeChange(key as AccordionProps["size"])
          }
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          aria-label="Select Accordion Size"
        />
      </div>

      <Accordion multiple variant={variant} size={size} className="mx-auto">
        <AccordionItem>
          <AccordionTrigger>What is this Accordion?</AccordionTrigger>
          <AccordionContent>
            This Accordion component allows you to expand and collapse sections
            of content, helping organize information efficiently.
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
          <AccordionTrigger>
            Can I open multiple items at once?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely — with the <code>multiple</code> prop set to true,
            multiple items can be expanded simultaneously.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>How can I customize the styles?</AccordionTrigger>
          <AccordionContent>
            You can customize styles by using the <code>variant</code> and{" "}
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
    </section>
  );
}

export function getVariantsCode({
  variant,
  size,
}: {
  variant: AccordionProps["variant"];
  size: AccordionProps["size"];
}) {
  return `"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function AccordionVariants() {
  return (
      <Accordion multiple variant="${variant}" size="${size}" className="mx-auto">
        <AccordionItem>
          <AccordionTrigger>What is this Accordion?</AccordionTrigger>
          <AccordionContent>
            This Accordion component allows you to expand and collapse sections
            of content, helping organize information efficiently.
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
          <AccordionTrigger>
            Can I open multiple items at once?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely — with the <code>multiple</code> prop set to true,
            multiple items can be expanded simultaneously.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>How can I customize the styles?</AccordionTrigger>
          <AccordionContent>
            You can customize styles by using the <code>variant</code> and{" "}
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
}`;
}
