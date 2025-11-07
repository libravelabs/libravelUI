"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ToastTypes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        size="sm"
        variant="destructive"
        onPress={() => toast.error("The registration failed")}
      >
        Error
      </Button>
      <Button
        size="sm"
        className="bg-green-500"
        onPress={() => toast.success("The registration was successful.")}
      >
        Success
      </Button>
      <Button
        size="sm"
        className="bg-amber-500"
        onPress={() => toast.warning("There was an issue during registration")}
      >
        Warning
      </Button>
      <Button
        size="sm"
        onPress={() => toast.info("Email is already registered.")}
      >
        Info
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: "Deleting database...",
            success: "Database deleted.",
            error: "Failed to delete database.",
          });
        }}
      >
        Promise / Loading
      </Button>
    </div>
  );
}
