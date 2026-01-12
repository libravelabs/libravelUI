import * as ButtonBasic from "@/components/examples/core/button/basic.demo";
import * as ToggleGroupBasic from "@/components/examples/core/toggle-group/basic.demo";
import * as ToggleBasic from "@/components/examples/core/toggle/basic.demo";
import * as DropZoneBasic from "@/components/examples/core/drop-zone/basic.demo";
import * as DisclosureBasic from "@/components/examples/core/disclosure/basic.demo";
import * as PaginationBasic from "@/components/examples/core/pagination/basic.demo";

export const registry = {
  "button/basic.demo": ButtonBasic,
  "toggle-group/basic.demo": ToggleGroupBasic,
  "toggle/basic.demo": ToggleBasic,
  "drop-zone/basic.demo": DropZoneBasic,
  "disclosure/basic.demo": DisclosureBasic,
  "pagination/basic.demo": PaginationBasic,
} as const;

export type RegistryKey = keyof typeof registry;
