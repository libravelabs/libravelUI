"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function BasicButtonBase() {
  return (
    <Button onPress={() => toast.info("Pressed", { position: "top-center" })}>
      Button
    </Button>
  );
}

export const BasicButtonCode = `"use client";

import { Button } from "@/components/ui/button";

export function BasicButton() {
  return <Button onPress={() => toast.info("Pressed", { position: 'top-center' })}>Button</Button>;
}
`;
