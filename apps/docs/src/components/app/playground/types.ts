export type ControlType =
  | "select"
  | "toggle-group"
  | "boolean"
  | "text"
  | "textarea"
  | "number";

export type PlaygroundValue = string | number | boolean;

export interface ControlOption {
  value: string | number;
  label: string;
}

export interface CodeGenOutput {
  imports?: string[];
  children?: string;
}

export interface ControlSchema {
  type: ControlType;
  defaultValue: PlaygroundValue;
  label?: string;
  options?: ControlOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  showDefault?: boolean;
  mapping?: Record<string, CodeGenOutput>;
}

export type ControlsMap = Record<string, ControlSchema>;

export interface DemoComponent<T> extends React.FC<T> {
  controls?: ControlsMap;
  template?: (props: string, children: string | null) => string;
}

export interface PlaygroundProps {
  path?: string | string[];
  Component?: React.ComponentType<any>;
  orientation?: "horizontal" | "vertical";
  controls?: ControlsMap;
  template?: (props: string, children: string | null) => string;
}
