"use client";

import { Heading } from "@/components/ui/heading";

export default function HeadingSizes() {
  return (
    <div className="grid gap-4 text-center">
      <Heading size={1}>Sphinx of black quartz, judge my vow.</Heading>
      <Heading size={2}>Sphinx of black quartz, judge my vow.</Heading>
      <Heading size={3}>Sphinx of black quartz, judge my vow.</Heading>
      <Heading size={4}>Sphinx of black quartz, judge my vow.</Heading>
    </div>
  );
}
