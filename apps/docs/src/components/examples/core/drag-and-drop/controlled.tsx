"use client";

import * as React from "react";
import { DragAndDrop } from "@/components/ui/core/drag-and-drop";

type Status = "uploading" | "completed" | "error";

interface FileState {
  id: string;
  file: File;
  preview: string;
  progress?: number;
  status?: Status;
}

export default function DragAndDropControlledShowcase() {
  const [files, setFiles] = React.useState<FileState[]>([]);
  const [errors, setErrors] = React.useState<string[]>([]);

  const startUpload = (file: FileState) => {
    let progress = 0;

    const interval = window.setInterval(() => {
      progress += 10;

      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                progress: Math.min(progress, 100),
                status: progress >= 100 ? "completed" : "uploading",
              }
            : f
        )
      );

      if (progress >= 100) {
        window.clearInterval(interval);
      }
    }, 300);
  };

  return (
    <DragAndDrop
      multiple
      acceptedFileType="image/*"
      files={files}
      errors={errors}
      onFilesChange={setFiles}
      onErrorsChange={setErrors}
      onFileAdd={(file) => {
        setFiles((prev) => [
          ...prev,
          { ...file, progress: 0, status: "uploading" },
        ]);
        startUpload(file);
      }}
      onFileRemove={(file) => {
        setFiles((prev) => prev.filter((f) => f.id !== file.id));
      }}
      onClear={() => {
        setFiles([]);
        setErrors([]);
      }}
    />
  );
}
