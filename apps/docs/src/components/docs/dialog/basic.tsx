"use client";

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseIcon,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BasicDialog() {
  return (
    <Dialog>
      <DialogTrigger variant="secondary">Open Dialog</DialogTrigger>

      <DialogContent isBlurred>
        {({ close }) => (
          <>
            <DialogCloseIcon isDismissable />

            <DialogHeader
              title="Confirmation"
              description="Are you sure you want to proceed with this action?"
            />

            <DialogBody>
              <p>
                This action cannot be undone. Please confirm if you want to
                continue. If you&apos;re unsure, feel free to cancel.
              </p>
            </DialogBody>

            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <Button onPress={close} type="submit">
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
