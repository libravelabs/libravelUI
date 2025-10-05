"use client";

import { Separator } from "@/components/ui/separator";

export function WithTextSeparatorBase() {
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

export const WithTextSeparatorCode = `"use client";

import { Separator } from "@/components/ui/separator";

export function WithTextSeparator() {
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
`;
