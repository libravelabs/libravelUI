"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
  ModalTrigger,
} from "@/components/ui/core/modal";
import { Input } from "@/components/ui/core/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/core/button";

export default function BasicModal() {
  return (
    <Modal>
      <ModalTrigger tone="destructive">Delete</ModalTrigger>
      <ModalContent blurred>
        {({ close }) => (
          <>
            <ModalHeader
              title="Delete project"
              description="This action will permanently delete the project from your
                  dashboard."
            />
            <ModalBody className="p-2.5">
              <Input
                autoFocus
                id="delete-project"
                tone="destructive"
                aria-label="Name"
                label={
                  <span>
                    Type <strong>delete my project</strong> below to confirm
                    your project deletion.
                  </span>
                }
              />
            </ModalBody>
            <ModalFooter>
              <ModalClose />
              <Button
                onClick={() => {
                  toast.promise(
                    new Promise((resolve) => setTimeout(resolve, 2000)),
                    {
                      loading: "Deleting project...",
                      success: "Project deleted.",
                      error: "Failed to delete project.",
                    }
                  );

                  close();
                }}
                tone="destructive"
              >
                Save changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
