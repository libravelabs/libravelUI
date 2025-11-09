"use client";

import { useState } from "react";
import {
  DragAndDrop,
  type FileState,
} from "@/components/ui/core/drag-and-drop";
import { toast } from "sonner";
import { Button } from "@/components/ui/core/button";

export default function ControlledDragAndDrop() {
  const [files, setFiles] = useState<FileState[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <div className="grid gap-4">
      <DragAndDrop
        maxSize={1}
        hidePreview
        hideClearButton
        disableErrorMessage
        files={files}
        errors={errors}
        onFilesChange={setFiles}
        onErrorsChange={setErrors}
        onFileAdd={(file) => toast(`Added: ${file.file.name}`)}
        onFileRemove={(file) => toast(`Removed: ${file.file.name}`)}
        onClear={() => toast("All files cleared")}
        description="Drag ’n’ drop your files here, or click if you’re feeling fancy."
      />
      {errors.length > 0 && (
        <div className="text-sm text-destructive font-medium">
          {errors.map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      )}
      <div className="space-y-4">
        <h3 className="font-semibold">Current Files:</h3>
        <ul className="list-disc ms-6">
          {files.map((f) => (
            <li key={f.file.name}>{f.file.name}</li>
          ))}
        </ul>
        {files.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => {
              setFiles([]);
              setErrors([]);
            }}
            className="w-full"
          >
            Delete Files
          </Button>
        )}
      </div>
    </div>
  );
}
