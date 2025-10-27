"use client";

import { FileTrigger } from "@/components/ui/file-trigger";

export default function AcceptedTypesFileTrigger() {
  return <FileTrigger acceptedFileTypes={["image/png"]} />;
}
