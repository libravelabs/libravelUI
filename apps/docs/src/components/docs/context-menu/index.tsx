"use client";

import { Playground } from "@/components/playground";
import {
  BasicContextMenuBase,
  BasicContextMenuCode,
} from "./basic-context-menu";
import {
  WithCardContextMenuBase,
  WithCardContextMenuCode,
} from "./with-card-context-menu";

export function BasicContextMenu() {
  return (
    <Playground
      preview={<BasicContextMenuBase />}
      code={BasicContextMenuCode}
    />
  );
}

export function WithCardContextMenu() {
  return (
    <Playground
      preview={<WithCardContextMenuBase />}
      code={WithCardContextMenuCode}
    />
  );
}
