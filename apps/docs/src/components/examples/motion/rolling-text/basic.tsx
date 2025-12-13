"use client";

import { RollingText } from "@/components/ui/motion/rolling-text";

export default function BasicRollingText() {
  return (
    <h1 className="text-4xl font-bold">
      Make your app{" "}
      <RollingText className="px-2 rounded-md bg-primary text-primary-foreground">
        <span>shine</span>
        <span>move</span>
        <span>stand out</span>
        <span>come alive</span>
      </RollingText>{" "}
      with libravelUI
    </h1>
  );
}
