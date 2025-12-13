"use client";

import { FileTrigger } from "@/components/ui/core/file-trigger";

export default function AcceptedTypesFileTrigger() {
  return <FileTrigger acceptedFileTypes={["image/png"]} />;
}
