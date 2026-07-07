import { BaseBlocksLayout } from "../base-blocks-layout";
import { Sandbox } from "@/components/app/sandbox/sandbox";
import registry from "@/../public/registry.json";

export default function SidebarPage() {
  const sidebar = registry.blocks.blocks.find(
    (block) => block.slug === "sidebar",
  )!;

  return (
    <BaseBlocksLayout
      header={{
        title: sidebar.title,
        description: sidebar.description,
      }}
    >
      <div className="grid gap-12">
        {sidebar.variants.map((variant, i) => (
          <Sandbox key={variant.title} comp={variant} number={i + 1} />
        ))}
      </div>
    </BaseBlocksLayout>
  );
}
