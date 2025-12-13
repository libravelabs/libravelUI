"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/core/button";

export default function ToastActions() {
  return (
    <div className="flex gap-3">
      <Button
        tone="outline"
        size="sm"
        onPress={() =>
          toast("You received a new like!", {
            action: {
              label: "View",
              onClick: () => alert("Viewed"),
            },
          })
        }
      >
        Action
      </Button>
      <Button
        tone="outline"
        size="sm"
        onPress={() =>
          toast("You received a new like!", {
            action: {
              label: "View",
              onClick: () => alert("Viewed"),
            },
            cancel: {
              label: "Cancel",
              onClick: () => alert("Cancelled"),
            },
          })
        }
      >
        Do or Not
      </Button>
      <Button
        tone="outline"
        size="sm"
        onPress={() =>
          toast("You received a new like!", {
            cancel: {
              label: "Cancel",
              onClick: () => alert("Cancelled"),
            },
          })
        }
      >
        Cancel
      </Button>
    </div>
  );
}
