"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BasicButton() {
  return (
    <Button onPress={() => toast.info("Pressed", { position: "top-center" })}>
      Button
    </Button>
  );
}
