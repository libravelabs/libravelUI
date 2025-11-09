"use client";

import { Separator } from "@/components/ui/core/separator";

export default function WithTextSeparator() {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <Separator text="Or continue with" />
      <Separator
        orientation="vertical"
        className="h-42"
        text="Or continue with"
      />
    </div>
  );
}
