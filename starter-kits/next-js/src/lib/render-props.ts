import { composeRenderProps } from "react-aria-components";
import { type ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tailwind: ClassNameValue
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => cn(tailwind, className));
}