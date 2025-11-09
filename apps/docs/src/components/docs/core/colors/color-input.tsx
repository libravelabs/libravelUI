"use client";

import { ColorInput } from "@/components/ui/core/colors";

export default function ColorInputBasic() {
  return (
    <>
      <ColorInput defaultValue="#8cf0cd" />{" "}
      <ColorInput pickMode defaultValue="#8cf0cd" />{" "}
    </>
  );
}
