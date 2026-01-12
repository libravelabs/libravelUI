"use client";

import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
  type DisclosureProps,
} from "@/components/ui/core/disclosure";

const tones: { value: string; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "ghost", label: "Ghost" },
  { value: "outline", label: "Outline" },
  { value: "solid", label: "Solid" },
  { value: "muted", label: "Muted" },
  { value: "separated", label: "Separated" },
];

const sizes: { value: string; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
];

export default function DisclosureBasic({
  tone = "default",
  size = "md",
  isDisabled = false,
}: DisclosureProps) {
  return (
    <Disclosure tone={tone} size={size} isDisabled={isDisabled}>
      <DisclosureTrigger>What’s included in the Pro plan?</DisclosureTrigger>
      <DisclosureContent>
        <p>
          The Pro plan includes unlimited projects, advanced analytics, priority
          support, and integrations with third-party tools like Slack and Google
          Drive.
        </p>
      </DisclosureContent>
    </Disclosure>
  );
}

export const controls = {
  tone: {
    type: "select",
    options: tones,
    defaultValue: "default",
    label: "Tone",
  },
  size: {
    type: "select",
    options: sizes,
    defaultValue: "md",
    label: "Size",
  },
  isDisabled: {
    type: "boolean",
    defaultValue: false,
    label: "Disabled",
  },
};
