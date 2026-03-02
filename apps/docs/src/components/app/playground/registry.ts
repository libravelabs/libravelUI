import * as ButtonBasic from "@/components/examples/core/button/basic.demo";
import * as ToggleGroupBasic from "@/components/examples/core/toggle-group/basic.demo";
import * as ToggleBasic from "@/components/examples/core/toggle/basic.demo";
import * as DropZoneBasic from "@/components/examples/core/drop-zone/basic.demo";
import * as DisclosureBasic from "@/components/examples/core/disclosure/basic.demo";
import * as PaginationBasic from "@/components/examples/core/pagination/basic.demo";
import * as TextFieldBasic from "@/components/examples/core/text-field/basic.demo";
import * as InputBasic from "@/components/examples/core/input/basic.demo";
import * as AccordionBasic from "@/components/examples/core/accordion/basic.demo";
import * as TabsBasic from "@/components/examples/core/tabs/basic.demo";
import * as LinkBasic from "@/components/examples/core/link/basic.demo";
import * as LoaderBasic from "@/components/examples/core/loader/basic.demo";
import * as CheckboxBasic from "@/components/examples/core/checkbox/basic.demo";
import * as HeadingBasic from "@/components/examples/core/heading/basic.demo";
import * as AvatarBasic from "@/components/examples/core/avatar/basic.demo";
import * as AvatarInitials from "@/components/examples/core/avatar/initials.demo";
import * as SliderBasic from "@/components/examples/core/slider/basic.demo";
import * as TooltipBasic from "@/components/examples/core/tooltip/basic.demo";

export const registry = {
  "button/basic.demo": ButtonBasic,
  "toggle-group/basic.demo": ToggleGroupBasic,
  "toggle/basic.demo": ToggleBasic,
  "drop-zone/basic.demo": DropZoneBasic,
  "disclosure/basic.demo": DisclosureBasic,
  "pagination/basic.demo": PaginationBasic,
  "text-field/basic.demo": TextFieldBasic,
  "input/basic.demo": InputBasic,
  "accordion/basic.demo": AccordionBasic,
  "tabs/basic.demo": TabsBasic,
  "link/basic.demo": LinkBasic,
  "loader/basic.demo": LoaderBasic,
  "checkbox/basic.demo": CheckboxBasic,
  "heading/basic.demo": HeadingBasic,
  "avatar/basic.demo": AvatarBasic,
  "avatar/initials.demo": AvatarInitials,
  "slider/basic.demo": SliderBasic,
  "tooltip/basic.demo": TooltipBasic,
} as const;

export type RegistryKey = keyof typeof registry;
