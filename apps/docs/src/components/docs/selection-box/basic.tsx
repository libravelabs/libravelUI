"use client";

import { Selectionbox, SelectionboxItem } from "@/components/ui/selection-box";

export default function BasicSelectionBox() {
  return (
    <Selectionbox selectionMode="multiple">
      <SelectionboxItem
        label="Collaboration Tools"
        description="Enable shared editing, comments, and real-time presence."
      />
      <SelectionboxItem
        label="Advanced Permissions"
        description="Control access with fine-grained roles and scopes."
      />
      <SelectionboxItem
        label="Automation"
        description="Trigger workflows and scheduled tasks effortlessly."
      />
      <SelectionboxItem
        label="Audit Logging"
        description="Track all user activity for compliance and security."
      />
    </Selectionbox>
  );
}
