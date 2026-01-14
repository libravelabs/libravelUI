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
}

export interface PlaygroundProps {
  comp: string;
  section?: string;
  Component: React.ComponentType;
}
