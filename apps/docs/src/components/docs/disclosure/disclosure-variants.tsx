"use client";

import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
  DisclosureProps,
} from "@/components/ui/disclosure";
import { Select } from "@/components/ui/select";

interface VariantsBaseProps {
  variant: DisclosureProps["variant"];
  size: DisclosureProps["size"];
  onVariantChange: (v: DisclosureProps["variant"]) => void;
  onSizeChange: (s: DisclosureProps["size"]) => void;
}

export function DisclosureVariantsBase({
  variant,
  size,
  onVariantChange,
  onSizeChange,
}: VariantsBaseProps) {
  return (
    <section className="flex flex-col gap-4 w-full min-h-48">
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
            onVariantChange(key as DisclosureProps["variant"])
          }
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          aria-label="Select Disclosure Variant"
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
            onSizeChange(key as DisclosureProps["size"])
          }
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          aria-label="Select Disclosure Size"
        />
      </div>

      <Disclosure variant={variant} size={size} className="m-auto">
        <DisclosureTrigger>
          What payment methods are accepted?
        </DisclosureTrigger>
        <DisclosureContent>
          <p>
            We accept all major credit cards, including Visa, MasterCard, and
            American Express. You can also pay using PayPal or bank transfer,
            depending on your region.
          </p>
        </DisclosureContent>
      </Disclosure>
    </section>
  );
}

export function getDisclosureVariantsCode({
  variant,
  size,
}: {
  variant: DisclosureProps["variant"];
  size: DisclosureProps["size"];
}) {
  return `"use client";

import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
  DisclosureProps,
} from "@/components/ui/disclosure";

export function DisclosureVariants() {
  return (
      <Disclosure variant="${variant}" size="${size}">
        <DisclosureTrigger>
          What payment methods are accepted?
        </DisclosureTrigger>
        <DisclosureContent>
          <p>
            We accept all major credit cards, including Visa, MasterCard, and
            American Express. You can also pay using PayPal or bank transfer,
            depending on your region.
          </p>
        </DisclosureContent>
      </Disclosure>
  );
}`;
}
