import type { ComponentType, ReactNode } from "react";

type StoryBookBaseControl = {
  label?: string;
};

type StoryBookTextControl = StoryBookBaseControl & {
  type: "text";
  placeholder?: string;
};

type StoryBookTextareaControl = StoryBookBaseControl & {
  type: "textarea";
  placeholder?: string;
};

type StoryBookBooleanControl = StoryBookBaseControl & {
  type: "boolean";
};

type StoryBookNumberControl = StoryBookBaseControl & {
  type: "number";
  placeholder?: string;
  min?: number;
  max?: number;
};

type StoryBookSelectOption = {
  value: string | number;
  label: string;
};

type StoryBookSelectControl = StoryBookBaseControl & {
  type: "select";
  options: readonly StoryBookSelectOption[];
};

type StoryBookToggleGroupControl = StoryBookBaseControl & {
  type: "toggle-group";
  options: readonly StoryBookSelectOption[];
};

export type StoryBookControl =
  | StoryBookTextControl
  | StoryBookTextareaControl
  | StoryBookBooleanControl
  | StoryBookNumberControl
  | StoryBookSelectControl
  | StoryBookToggleGroupControl;

export type StoryBookField<T> = {
  defaultValue: T;
  control?: StoryBookControl;
};

export type StoryBookArgs<TArgs extends object> = {
  [K in keyof TArgs]: StoryBookField<TArgs[K]>;
};

export type StoryBookCode = {
  imports?: string[];
  code: string;
};

export type StoryBookConfig<TArgs extends object> = {
  title: string;
  component: ComponentType<TArgs>;
  args: StoryBookArgs<TArgs>;
  render?: (args: TArgs) => ReactNode;
  code?: (args: TArgs) => StoryBookCode;
};
