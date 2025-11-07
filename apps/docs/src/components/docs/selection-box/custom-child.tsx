"use client";

import {
  Selectionbox,
  SelectionboxItem,
  SelectionboxLabel,
  SelectionboxDescription,
} from "@/components/ui/selection-box";
import { Cpu, Zap, Database } from "lucide-react";

export default function CustomChildSelectionBox() {
  return (
    <Selectionbox columns={3} gap={4} selectionMode="single">
      <SelectionboxItem
        textValue="basic"
        className="border-none shadow-none bg-transparent min-w-40"
      >
        <div className="flex flex-col items-start p-0 space-y-2">
          <Cpu className="size-6 text-primary" />
          <SelectionboxLabel>Basic Plan</SelectionboxLabel>
          <SelectionboxDescription>
            Great for small personal projects.
          </SelectionboxDescription>
        </div>
      </SelectionboxItem>

      <SelectionboxItem
        textValue="pro"
        className="border-none shadow-none bg-transparent min-w-40"
      >
        <div className="flex flex-col items-start p-0 space-y-2">
          <Zap className="size-6 text-primary" />
          <SelectionboxLabel>Pro Plan</SelectionboxLabel>
          <SelectionboxDescription>
            Advanced tools for growing teams.
          </SelectionboxDescription>
        </div>
      </SelectionboxItem>

      <SelectionboxItem
        textValue="enterprise"
        className="border-none shadow-none bg-transparent min-w-40"
      >
        <div className="flex flex-col items-start p-0 space-y-2">
          <Database className="size-6 text-primary" />
          <SelectionboxLabel>Enterprise</SelectionboxLabel>
          <SelectionboxDescription>
            Full features and dedicated support.
          </SelectionboxDescription>
        </div>
      </SelectionboxItem>
    </Selectionbox>
  );
}
