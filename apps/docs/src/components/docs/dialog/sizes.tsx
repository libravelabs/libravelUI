"use client";

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogContent,
  type DialogContentProps,
} from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { useState } from "react";

const dialogSizes = {
  xs: "Extra Small",
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "Extra Large",
  "2xl": "2XL",
  "3xl": "3XL",
  "4xl": "4XL",
  "5xl": "5XL",
  full: "Full",
} as const;

export default function DialogSizes() {
  const [size, setSize] = useState("lg");

  return (
    <div className="flex flex-col gap-4 w-full min-h-48 px-2 md:px-4">
      <Select
        items={Object.entries(dialogSizes).map(([id, label]) => ({
          id,
          label,
        }))}
        selectedKey={size}
        onSelectionChange={(key) => setSize(key as keyof typeof dialogSizes)}
        classNames={{ trigger: "max-w-32" }}
        aria-label="Select Dialog Size"
      />

      <Dialog>
        <DialogTrigger variant="outline" className="m-auto">
          Open {size.toUpperCase()}
        </DialogTrigger>
        <DialogContent size={size as DialogContentProps["size"]}>
          <DialogHeader title={`Dialog Size: ${size.toUpperCase()}`} />
          <DialogBody>
            <p>
              This dialog is rendered with the <strong>{size}</strong> size.
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
