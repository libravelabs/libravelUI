"use client";

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";

interface DialogSizesBaseProps {
  size: keyof typeof dialogSizes;
  onSizeChange: (size: keyof typeof dialogSizes) => void;
}

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

export function DialogSizesBase({ size, onSizeChange }: DialogSizesBaseProps) {
  return (
    <div className="flex flex-col gap-4 w-full min-h-48">
      <Select
        items={Object.entries(dialogSizes).map(([id, label]) => ({
          id,
          label,
        }))}
        selectedKey={size}
        onSelectionChange={(key) =>
          onSizeChange(key as keyof typeof dialogSizes)
        }
        classNames={{ trigger: "min-w-32", content: "min-w-32" }}
        aria-label="Select Dialog Size"
      />

      <Dialog>
        <DialogTrigger variant="outline" className="m-auto">
          Open {size.toUpperCase()}
        </DialogTrigger>
        <DialogContent size={size}>
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

export function getDialogSizesCode(size: string) {
  return `"use client";

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";

export function DialogSizes() {
  return (
    <Dialog>
      <DialogTrigger variant="outline">
        Open ${size.toUpperCase()}
      </DialogTrigger>
      <DialogContent size="${size}">
        <DialogHeader title="Dialog Size: ${size.toUpperCase()}" />
        <DialogBody>
          <p>
            This dialog is rendered with the <strong>${size}</strong> size.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
`;
}
