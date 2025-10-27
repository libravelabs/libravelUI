"use client";

import { DragAndDrop } from "@/components/ui/drag-and-drop";
import { File } from "lucide-react";

export default function AcceptedTypeDragAndDrop() {
  return (
    <DragAndDrop
      acceptedFileType={[
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/html",
        "application/json",
        "text/javascript",
        "application/x-rar-compressed",
      ]}
      icon={<File size={48} className="text-primary" />}
      label="Select or drag a file"
      description="Accepted formats: PDF, DOCX, HTML, JSON, JS, RAR"
      badge="Documents Only"
    />
  );
}
