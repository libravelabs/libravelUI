import { accordion } from "./accordion.note";
import { tooltip } from "./tooltip.note";
import { disclosure } from "./disclosure.note";
import { button } from "./button.note";
import { avatar } from "./avatar.note";
import { checkbox } from "./checkbox.note";

export const noteRegistry = {
  accordion,
  tooltip,
  disclosure,
  button,
  avatar,
  checkbox,
} as const;

export type NoteName = keyof typeof noteRegistry;
