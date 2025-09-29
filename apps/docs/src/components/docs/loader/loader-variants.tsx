"use client";

import { Loader } from "@/components/ui/loader";

export function LoaderVariantsBase() {
  return (
    <div className="flex gap-6">
      <Loader variant="ring" />
      <Loader variant="spin" />
      <Loader variant="bars" />
    </div>
  );
}

export const LoaderVariantsCode = `"use client";

import { Loader } from "@/components/ui/loader";

export function LoaderVariants() {
  return (
    <div className="flex gap-6">
      <Loader variant="ring" />
      <Loader variant="spin" />
      <Loader variant="bars" />
    </div>
  );
}
`;
