"use client";

import { FileTrigger } from "@/components/ui/file-trigger";

export default function MediaCaptureFileTrigger() {
  return (
    <div className="grid gap-4">
      <FileTrigger defaultCamera="user" />
      <FileTrigger defaultCamera="environment" />
    </div>
  );
}
