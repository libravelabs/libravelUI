"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
  ModalTrigger,
} from "@/components/ui/modal";
import { Input } from "@/components/ui/field";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function BasicModal() {
  return (
    <Modal>
      <ModalTrigger variant="destructive">Delete</ModalTrigger>
      <ModalContent blurred>
        {({ close }) => (
          <>
            <ModalHeader
              title="Delete project"
              description="This action will permanently delete the project from your
                  dashboard."
            />
            <ModalBody className="px-2">
              <Input
                autoFocus
                id="delete-project"
                variant="destructive"
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
                variant="destructive"
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
