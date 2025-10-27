"use client";

import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";
import BasicCommand from "./basic";

export default function WithModalCommand() {
  return (
    <Modal>
      <ModalTrigger variant="outline">Open Command</ModalTrigger>
      <ModalContent blurred showCloseButton={false} className="p-0">
        <BasicCommand />
      </ModalContent>
    </Modal>
  );
}
