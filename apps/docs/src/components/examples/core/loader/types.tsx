"use client";

import { Loader } from "@/components/ui/core/loader";

export default function LoaderTypes() {
  return (
    <div className="flex gap-6">
      <Loader type="ring" />
      <Loader type="spin" />
      <Loader type="bars" />
    </div>
  );
}
