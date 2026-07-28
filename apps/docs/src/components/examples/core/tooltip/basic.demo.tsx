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
  showArrow = true,
}: {
  placement?: TooltipContentProps["placement"];
  delay?: TooltipProps["delay"];
  tone?: TooltipContentProps["tone"];
  showArrow?: TooltipContentProps["showArrow"];
}) {
  return (
    <div className="flex items-center justify-center p-12">
      <Tooltip delay={delay}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent placement={placement} tone={tone} showArrow={showArrow}>
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
      { value: "bottom", label: "Bottom" },
      { value: "bottom left", label: "Bottom Left" },
      { value: "bottom right", label: "Bottom Right" },
      { value: "bottom start", label: "Bottom Start" },
      { value: "bottom end", label: "Bottom End" },

      { value: "top", label: "Top" },
      { value: "top left", label: "Top Left" },
      { value: "top right", label: "Top Right" },
      { value: "top start", label: "Top Start" },
      { value: "top end", label: "Top End" },

      { value: "left", label: "Left" },
      { value: "left top", label: "Left Top" },
      { value: "left bottom", label: "Left Bottom" },

      { value: "start", label: "Start" },
      { value: "start top", label: "Start Top" },
      { value: "start bottom", label: "Start Bottom" },

      { value: "right", label: "Right" },
      { value: "right top", label: "Right Top" },
      { value: "right bottom", label: "Right Bottom" },

      { value: "end", label: "End" },
      { value: "end top", label: "End Top" },
      { value: "end bottom", label: "End Bottom" },
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

  showArrow: {
    type: "boolean",
    defaultValue: true,
    label: "Show Arrow",
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
  const showArrow = values.showArrow ?? false;

  const delayProp = delay !== 0 ? ` delay={${delay}}` : "";

  const contentProps = [
    placement !== "top" ? `placement="${placement}"` : "",
    tone !== "default" ? `tone="${tone}"` : "",
    showArrow ? "" : "showArrow={false}",
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
