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
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

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
            <ModalTrigger variant="outline">{size?.toUpperCase()}</ModalTrigger>
            <ModalContent size={size}>
              {({ close }) => (
                <>
                  <ModalHeader>
                    <ModalTitle>{size?.toUpperCase()} Modal</ModalTitle>
                  </ModalHeader>
                  <ModalBody className="flex flex-col gap-4">
                    <p>
                      This modal demonstrates how content scales with the size
                      of the modal. The current modal size is{" "}
                      <strong>{size}</strong>.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-100 rounded">Info Card 1</div>
                      <div className="p-4 bg-gray-100 rounded">Info Card 2</div>
                      <div className="p-4 bg-gray-100 rounded">Info Card 3</div>
                      <div className="p-4 bg-gray-100 rounded">Info Card 4</div>
                    </div>
                  </ModalBody>
                  <ModalFooter className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={close}>
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
