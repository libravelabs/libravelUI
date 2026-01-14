"use client";

import { Heading, type HeadingProps } from "@/components/ui/core/heading";

export default function HeadingExample({ level, children }: HeadingProps) {
  return <Heading level={level}>{children}</Heading>;
}

export const controls = {
  children: {
    type: "text",
    defaultValue: "Sphinx of black quartz, judge my vow.",
  },
  level: {
    type: "select",
    defaultValue: 1,
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
      { label: "6", value: 6 },
    ],
  },
};
