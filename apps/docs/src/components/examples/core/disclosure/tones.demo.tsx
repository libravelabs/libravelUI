import { useState } from "react";
import { type DisclosureProps } from "@/components/ui/core/disclosure";
import { RadioGroup, Radio } from "@/components/ui/core/radio-group";
import { Heading } from "@/components/ui/core/heading";
import DisclosureTones from "./tones";
import { useDynamicCode } from "@/components/playground-context";

export default function DisclosureTonesDemo() {
  const [tone, setTone] = useState<DisclosureProps["tone"]>("default");
  const [size, setSize] = useState<DisclosureProps["size"]>("sm");

  useDynamicCode({ tone, size });

  const tones: NonNullable<DisclosureProps["tone"]>[] = [
    "default",
    "ghost",
    "outline",
    "solid",
    "muted",
    "separated",
  ];
  const sizes: NonNullable<DisclosureProps["size"]>[] = [
    "sm",
    "md",
    "lg",
    "full",
  ];

  return (
    <section className="flex flex-col gap-4 w-full min-h-48 px-2">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Heading size={3}>Tone</Heading>
          <RadioGroup
            value={tone}
            onChange={(v) => setTone(v as DisclosureProps["tone"])}
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
            onChange={(v) => setSize(v as DisclosureProps["size"])}
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

      <DisclosureTones tone={tone} size={size} />
    </section>
  );
}
