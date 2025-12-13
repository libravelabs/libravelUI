"use client";

import { toast, type ToastT } from "sonner";
import { Button } from "@/components/ui/core/button";

export default function ToastPositions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {positions.map((position) => (
        <Button
          size="sm"
          tone="outline"
          key={position}
          onPress={() =>
            toast("The registration is successful, click here to continue.", {
              position,
            })
          }
        >
          {position}
        </Button>
      ))}
    </div>
  );
}

const positions: ToastT["position"][] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];
