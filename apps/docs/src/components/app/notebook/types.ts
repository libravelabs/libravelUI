import type { ComponentType, ReactElement, ReactNode } from "react";

export type NotebookSelectOption = {
  value: string | number;
  label: string;
};

type NotebookTextControl = {
  type: "text";
  label?: string;
  placeholder?: string;
};

type NotebookTextareaControl = {
  type: "textarea";
  label?: string;
  placeholder?: string;
};

type NotebookBooleanControl = {
  type: "boolean";
  label?: string;
};

type NotebookNumberControl = {
  type: "number";
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
};

type NotebookSelectControl = {
  type: "select";
  label?: string;
  options: readonly NotebookSelectOption[];
};

type NotebookToggleGroupControl = {
  type: "toggle-group";
  label?: string;
  options: readonly NotebookSelectOption[];
};

export type NotebookControl =
  | NotebookTextControl
  | NotebookTextareaControl
  | NotebookBooleanControl
  | NotebookNumberControl
  | NotebookSelectControl
  | NotebookToggleGroupControl;

export type NotebookFieldStyle = {
  colSpan?: number;
  className?: string;
};

export type NotebookField<T, TArgs extends object> = {
  defaultValue: T;
  showDefault?: boolean;
  control?: NotebookControl;
  style?: NotebookFieldStyle;
  visible?: (args: TArgs) => boolean;
};

export type NotebookArgs<TArgs extends object> = {
  [K in keyof TArgs]: NotebookField<TArgs[K], TArgs>;
};

export type NotebookLayout = {
  control?: {
    columns?: number;
    className?: string;
  };
};

export type NotebookCode = {
  imports?: string[];
  element: ReactElement;
};

export type NotebookConfig<TArgs extends object> = {
  title: string;
  component?: ComponentType<TArgs>;
  layout?: NotebookLayout;
  args: NotebookArgs<TArgs>;
  render?: (args: TArgs) => ReactNode;
  code?: (args: TArgs) => NotebookCode;
};
