"use client";

import { Playground } from "@/components/playground";
import { BasicCommandBase, BasicCommandCode } from "./basic-command";
import {
  WithModalCommandBase,
  WithModalCommandCode,
} from "./with-modal-command";

export function BasicComand() {
  return <Playground preview={<BasicCommandBase />} code={BasicCommandCode} />;
}

export function WithModalCommand() {
  return (
    <Playground
      preview={<WithModalCommandBase />}
      code={WithModalCommandCode}
    />
  );
}
