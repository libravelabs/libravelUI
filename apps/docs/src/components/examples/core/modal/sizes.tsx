"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  type ModalContentProps,
} from "@/components/ui/core/modal";
import { Button } from "@/components/ui/core/button";

export default function ModalSizes() {
  const sizes: ModalContentProps["size"][] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
  ];

  return (
    <div className="grid gap-4 p-4">
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Modal key={size}>
            <ModalTrigger tone="outline">{size?.toUpperCase()}</ModalTrigger>
            <ModalContent size={size}>
              {({ close }) => (
                <>
                  <ModalHeader>
                    <ModalTitle>{size?.toUpperCase()} Modal</ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      This modal demonstrates how content scales with the size
                      of the modal. The current modal size is{" "}
                      <strong>{size}</strong>.
                    </p>
                  </ModalBody>
                  <ModalFooter className="flex justify-end gap-2">
                    <Button tone="secondary" onClick={close}>
                      Cancel
                    </Button>
                    <Button>Confirm</Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        ))}
      </div>
    </div>
  );
}
