"use client";

import { Button } from "@/components/ui/core/button";
import {
  Monitor,
  Smartphone,
  TabletSmartphone,
  Scan,
  RotateCw,
} from "lucide-react";
import {
  AnimatedToggleGroup,
  AnimatedToggleItem,
} from "@/components/ui/motion/animated-toggle-group";
import { Separator } from "@/components/ui/core/separator";
import { ToolbarDevice } from "./sandbox";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SandboxToolbar({
  device,
  setDevice,
  isDisabled,
  href,
  onRefresh,
}: {
  device: ToolbarDevice;
  setDevice: React.Dispatch<React.SetStateAction<ToolbarDevice>>;
  isDisabled: boolean;
  href: string;
  onRefresh: (key: number) => void;
}) {
  return (
    <AnimatedToggleGroup
      value={isDisabled ? undefined : device}
      onValueChange={(value) => {
        setDevice(value as ToolbarDevice);
      }}
      className="h-8"
    >
      <div
        className={cn(
          "flex items-center gap-1",
          isDisabled && "pointer-events-none opacity-50",
        )}
      >
        <AnimatedToggleItem className="size-6" value="desktop">
          <Monitor className="size-4" />
        </AnimatedToggleItem>

        <AnimatedToggleItem className="size-6" value="tablet">
          <TabletSmartphone className="size-4" />
        </AnimatedToggleItem>

        <AnimatedToggleItem className="size-6" value="mobile">
          <Smartphone className="size-4" />
        </AnimatedToggleItem>
      </div>

      <Separator orientation="vertical" className="h-5" />

      <Button onClick={onRefresh} iconOnly tone="ghost" className="size-6">
        <RotateCw className="size-4" />
      </Button>

      <Link href={href} target="_blank">
        <Button iconOnly tone="ghost" className="size-6">
          <Scan className="size-4" />
        </Button>
      </Link>
    </AnimatedToggleGroup>
  );
}
