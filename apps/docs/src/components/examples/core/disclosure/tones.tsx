"use client";

import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
  type DisclosureProps,
} from "@/components/ui/core/disclosure";

export default function DisclosureTones({
  tone = "default",
  size = "sm",
}: DisclosureProps) {
  return (
    <Disclosure tone={tone} size={size} className="m-auto">
      <DisclosureTrigger>What payment methods are accepted?</DisclosureTrigger>
      <DisclosureContent>
        <p>
          We accept all major credit cards, including Visa, MasterCard, and
          American Express. You can also pay using PayPal or bank transfer,
          depending on your region.
        </p>
      </DisclosureContent>
    </Disclosure>
  );
}
