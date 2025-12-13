"use client";

import { Loader } from "@/components/ui/core/loader";

export default function LoaderColors() {
  return (
    <div className="flex gap-6">
      <Loader size="md" color="foreground" />
      <Loader size="md" color="primary" />
      <Loader size="md" color="secondary" />
      <Loader size="md" color="success" />
      <Loader size="md" color="warning" />
      <Loader size="md" color="destructive" />
    </div>
  );
}
