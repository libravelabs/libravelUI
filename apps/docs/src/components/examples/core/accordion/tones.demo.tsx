import { useState } from "react";
import { type AccordionProps } from "@/components/ui/core/accordion";
import { RadioGroup, Radio } from "@/components/ui/core/radio-group";
import { Heading } from "@/components/ui/core/heading";
import AccordionTones from "./tones";
import { useDynamicCode } from "@/components/playground-context";

export default function AccordionTonesDemo() {
  const [tone, setTone] = useState<AccordionProps["tone"]>("default");
  const [size, setSize] = useState<AccordionProps["size"]>("sm");

  useDynamicCode({ tone, size });

  const tones: NonNullable<AccordionProps["tone"]>[] = [
    "default",
    "ghost",
    "outline",
    "solid",
    "muted",
    "separated",
  ];
  const sizes: NonNullable<AccordionProps["size"]>[] = [
    "sm",
    "md",
    "lg",
    "full",
  ];

  return (
    <div className="space-y-4 w-full min-h-72">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Heading size={3}>Tone</Heading>
          <RadioGroup
            value={tone}
            onChange={(v) => setTone(v as AccordionProps["tone"])}
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
            onChange={(v) => setSize(v as AccordionProps["size"])}
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

      <AccordionTones tone={tone} size={size} />
    </div>
  );
}
