"use client";

import { Loader } from "@/components/ui/loader";

export function LoaderColorsBase() {
  return (
    <div className="flex gap-6">
      <Loader variant="spin" size="md" color="foreground" />
      <Loader variant="spin" size="md" color="primary" />
      <Loader variant="spin" size="md" color="secondary" />
      <Loader variant="spin" size="md" color="success" />
      <Loader variant="spin" size="md" color="warning" />
      <Loader variant="spin" size="md" color="destructive" />
    </div>
  );
}

export const LoaderColorsCode = `"use client";

import { Loader } from "@/components/ui/loader";

export function LoaderColors() {
  return (
    <div className="flex gap-6">
      <Loader variant="spin" size="md" color="foreground" />
      <Loader variant="spin" size="md" color="primary" />
      <Loader variant="spin" size="md" color="secondary" />
      <Loader variant="spin" size="md" color="success" />
      <Loader variant="spin" size="md" color="warning" />
      <Loader variant="spin" size="md" color="destructive" />
    </div>
  );
}
`;
