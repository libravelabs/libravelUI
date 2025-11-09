"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/core/button";

export default function BasicToast() {
  return (
    <Button
      size="sm"
      onPress={() =>
        toast("The registration is successful, click here to continue.")
      }
    >
      Click for toast
    </Button>
  );
}
