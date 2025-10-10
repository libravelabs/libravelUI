"use client";

import { Playground } from "@/components/playground";
import {
  BasicMultipleSelectBase,
  BasicMultipleSelectCode,
} from "./basic-multiple-select";

export function BasicMultipleSelect() {
  return (
    <Playground
      preview={<BasicMultipleSelectBase />}
      code={BasicMultipleSelectCode}
    />
  );
}
