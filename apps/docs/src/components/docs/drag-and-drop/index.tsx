"use client";

import { Playground } from "@/components/playground";
import {
  BasicDragAndDropBase,
  BasicDragAndDropCode,
} from "./basic-drag-and-drop";
import {
  AcceptedTypeDragAndDropBase,
  AcceptedTypeDragAndDropCode,
} from "./accepted-drag-and-drop";
import {
  ControlledDragAndDropBase,
  ControlledDragAndDropCode,
} from "./controlled-drag-and-drop";
import {
  CustomBuildDragAndDropBase,
  CustomBuildDragAndDropCode,
} from "./custom-build-dnd";

export function BasicDragAndDrop() {
  return (
    <Playground
      preview={<BasicDragAndDropBase />}
      code={BasicDragAndDropCode}
    />
  );
}

export function AcceptedTypeDragAndDrop() {
  return (
    <Playground
      preview={<AcceptedTypeDragAndDropBase />}
      code={AcceptedTypeDragAndDropCode}
    />
  );
}

export function ControlledDragAndDrop() {
  return (
    <Playground
      preview={<ControlledDragAndDropBase />}
      code={ControlledDragAndDropCode}
    />
  );
}

export function CustomBuildDragAndDrop() {
  return (
    <Playground
      preview={<CustomBuildDragAndDropBase />}
      code={CustomBuildDragAndDropCode}
    />
  );
}
