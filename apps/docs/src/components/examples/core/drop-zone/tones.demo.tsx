import { useState } from "react";
import { type DropZoneProps } from "@/components/ui/core/drop-zone";
import { RadioGroup, Radio } from "@/components/ui/core/radio-group";
import { Heading } from "@/components/ui/core/heading";
import DropZoneTones from "./tones";
import { useDynamicCode } from "@/components/playground-context";

export default function DropZoneTonesDemo() {
  const [tone, setTone] = useState<DropZoneProps["tone"]>("dashed");
  const [size, setSize] = useState<DropZoneProps["size"]>("md");

  useDynamicCode({ tone, size });

  const tones: NonNullable<DropZoneProps["tone"]>[] = [
    "default",
    "dashed",
    "ghost",
  ];
  const sizes: NonNullable<DropZoneProps["size"]>[] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "full",
  ];

  return (
    <section className="flex flex-col gap-4 w-full min-h-48">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Heading size={3}>Tone</Heading>
          <RadioGroup
            value={tone}
            onChange={(v) => setTone(v as DropZoneProps["tone"])}
            className="flex flex-wrap gap-2"
          >
            {tones.map((t) => (
              <Radio key={t} value={t}>
                {t}
              </Radio>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Heading size={3}>Size</Heading>
          <RadioGroup
            value={size}
            onChange={(v) => setSize(v as DropZoneProps["size"])}
            className="flex flex-wrap gap-2"
          >
            {sizes.map((s) => (
              <Radio key={s} value={s}>
                {s}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>

      <DropZoneTones tone={tone} size={size} />
    </section>
  );
}
