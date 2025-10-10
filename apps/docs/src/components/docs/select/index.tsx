"use client";

import { Playground } from "@/components/playground";
import { BasicSelectBase, BasicSelectCode } from "./basic-select";
import {
  SearchableSelectBase,
  SearchableSelectCode,
} from "./searchable-select";
import { GroupedSelectBase, GroupedSelectCode } from "./grouped-select";

export function BasicSelect() {
  return <Playground preview={<BasicSelectBase />} code={BasicSelectCode} />;
}

export function SearchableSelect() {
  return (
    <Playground
      preview={<SearchableSelectBase />}
      code={SearchableSelectCode}
    />
  );
}

export function GroupedSelect() {
  return (
    <Playground preview={<GroupedSelectBase />} code={GroupedSelectCode} />
  );
}
