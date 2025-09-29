"use client";

import { Loader } from "@/components/ui/loader";

export function LoaderSizesBase() {
  return (
    <div className="flex gap-6">
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
      <Loader size="xl" />
    </div>
  );
}

export const LoaderSizesCode = `"use client";

import { Loader } from "@/components/ui/loader";

export function LoaderSizes() {
  return (
    <div className="flex gap-6">
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
      <Loader size="xl" />
    </div>
  );
}
`;
