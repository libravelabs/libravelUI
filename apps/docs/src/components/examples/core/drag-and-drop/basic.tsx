"use client";

import { DragAndDrop } from "@/components/ui/core/drag-and-drop";
import { toast } from "sonner";

export default function BasicDragAndDrop() {
  return (
    <div className="grid gap-4">
      <DragAndDrop
        multiple
        onError={(msg) => toast.error("Error:" + msg)}
        onFileAdd={(file) => toast.success("Added:" + file.file.name)}
        onFileRemove={(file) => toast.success("Removed:" + file.file.name)}
        onClear={() => toast.success("Cleared all")}
      />
    </div>
  );
}
