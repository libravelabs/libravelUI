"use client";

import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
  type DisclosureProps,
} from "@/components/ui/disclosure";
import { Select } from "@/components/ui/select";
import { useState } from "react";

export default function DisclosureVariants() {
  const [variant, setVariant] = useState("default");
  const [size, setSize] = useState("sm");

  return (
    <section className="flex flex-col gap-4 w-full min-h-48 px-2">
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
            setVariant(key as DisclosureProps["variant"])
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
          onSelectionChange={(key) => setSize(key as DisclosureProps["size"])}
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
