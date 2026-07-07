import { ExternalLink } from "lucide-react";
import { BaseBlocksLayout } from "./base-blocks-layout";
import { Sandbox } from "@/components/app/sandbox/sandbox";
import registry from "@/../public/registry.json";

export default function BlockPage() {
  const blocks = registry.blocks;

  return (
    <BaseBlocksLayout
      header={{
        title: blocks.title,
        description: blocks.description,
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
      {blocks.blocks.map((block, i) => {
        const variant = block.variants.find((v) => v.featured);

        if (!variant) return null;

        return (
          <Sandbox
            key={variant.title}
            title={`${block.title} ${variant.title}`}
            comp={variant}
            number={i + 1}
          />
        );
      })}
    </BaseBlocksLayout>
  );
}
