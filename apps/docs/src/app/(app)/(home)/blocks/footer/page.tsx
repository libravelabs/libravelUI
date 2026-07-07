import { BaseBlocksLayout } from "../base-blocks-layout";
import { Sandbox } from "@/components/app/sandbox/sandbox";
import registry from "@/../public/registry.json";

export default function FooterPage() {
  const footer = registry.blocks.blocks.find(
    (block) => block.slug === "footer",
  )!;

  return (
    <BaseBlocksLayout
      header={{
        title: footer.title,
        description: footer.description,
      }}
    >
      <div className="grid gap-12">
        {footer.variants.map((variant, i) => (
          <Sandbox key={variant.title} comp={variant} number={i + 1} />
        ))}
      </div>
    </BaseBlocksLayout>
  );
}
