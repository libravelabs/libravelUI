"use client";

import { Link, type LinkProps } from "@/components/ui/core/link";

export default function LinkExample({
  href = "https://www.imdb.com/title/tt6348138/",
  children = "The Missing Link",
  tone = "default",
  isDisabled = false,
}: LinkProps) {
  return (
    <Link href={href} target="_blank" tone={tone} isDisabled={isDisabled}>
      {children}
    </Link>
  );
}

export const controls = {
  href: {
    type: "text",
    defaultValue: "https://www.imdb.com/title/tt6348138/",
    showDefault: true,
  },
  children: {
    type: "text",
    defaultValue: "The Missing Link",
  },
  tone: {
    type: "select",
    options: [
      { label: "Default", value: "default" },
      { label: "Primary", value: "primary" },
      { label: "Secondary", value: "secondary" },
      { label: "Underline", value: "underline" },
    ],
    defaultValue: "default",
  },
  isDisabled: {
    label: "Disabled",
    type: "boolean",
    defaultValue: false,
  },
};
