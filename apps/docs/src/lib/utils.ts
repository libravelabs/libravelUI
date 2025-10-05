import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getLowerRadiusClass(current: string): string {
  const radiusScale = ["none", "sm", "md", "lg", "xl", "2xl", "3xl"];

  const index = radiusScale.indexOf(current);
  const lowerIndex = Math.max(0, index - 1);
  const lowerKey = radiusScale[lowerIndex];
  return `rounded-${lowerKey}`;
}

export { cn, getLowerRadiusClass };
