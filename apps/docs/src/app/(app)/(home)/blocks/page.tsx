import { ExternalLink } from "lucide-react";
import { BaseBlocksLayout } from "./base-blocks-layout";
import { Sandbox } from "@/components/app/sandbox/sandbox";
import registry from "@/../public/registry.json";

export default function BlockPage() {
  const blocks = registry.blocks;

  console.log(blocks);

  return (
    <BaseBlocksLayout
      header={{
        title: "Blocks",
        description:
          "Ready-to-use modern React blocks with a clean design, easy integration, open-source licensing, and zero cost forever.",
        cta: {
          label: (
            <>
              Explore more <ExternalLink />
            </>
          ),
          href: "/blocks",
          button: {
            tone: "outline",
            className: "border-2 bg-secondary/30",
          },
        },
      }}
    >
      {Object.entries(blocks).map(([key, block], i) => {
        const variant = block.variants[0];

        if (!variant) return null;

        return (
          <Sandbox
            key={variant.name}
            title={`${block.title} ${variant.name}`}
            comp={variant}
            number={i + 1}
          />
        );
      })}
    </BaseBlocksLayout>
  );
}
