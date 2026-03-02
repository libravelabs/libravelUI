"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/core/tooltip";
import type {
  TooltipContentProps,
  TooltipProps,
} from "@/components/ui/core/tooltip";

export default function BasicTooltip({
  placement = "top",
  delay = 0,
  tone = "default",
}: {
  placement?: TooltipContentProps["placement"];
  delay?: TooltipProps["delay"];
  tone?: TooltipContentProps["tone"];
}) {
  return (
    <div className="flex items-center justify-center p-12">
      <Tooltip delay={delay}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent placement={placement} tone={tone}>
          This is a tooltip
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export const controls = {
  tone: {
    type: "select",
    options: [
      { value: "default", label: "Default" },
      { value: "inverse", label: "Inverse" },
      { value: "info", label: "Info" },
      { value: "success", label: "Success" },
      { value: "warning", label: "Warning" },
      { value: "destructive", label: "Destructive" },
    ],
    defaultValue: "default",
    label: "Tone",
  },
  placement: {
    type: "select",
    options: [
      { value: "top", label: "Top" },
      { value: "bottom", label: "Bottom" },
      { value: "left", label: "Left" },
      { value: "right", label: "Right" },
    ],
    defaultValue: "top",
    label: "Placement",
  },
  delay: {
    type: "select",
    options: [
      { value: 0, label: "0ms" },
      { value: 100, label: "100ms" },
      { value: 300, label: "300ms" },
      { value: 500, label: "500ms" },
    ],
    defaultValue: 0,
    label: "Delay",
  },
};

export function template(
  _props: string,
  _children: string | null,
  values: Record<string, string | number | boolean>,
) {
  const delay = values.delay ?? 0;
  const placement = values.placement ?? "top";
  const tone = values.tone ?? "default";

  const delayProp = delay !== 0 ? ` delay={${delay}}` : "";
  const contentProps = [
    placement !== "top" ? `placement="${placement}"` : "",
    tone !== "default" ? `tone="${tone}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const contentPropsStr = contentProps ? ` ${contentProps}` : "";

  return `<Tooltip${delayProp}>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent${contentPropsStr}>
        This is a tooltip
      </TooltipContent>
    </Tooltip>`;
}
