import { BaseBlocksLayout } from "../base-blocks-layout";
import { Sandbox } from "@/components/app/sandbox/sandbox";
import registry from "@/../public/registry.json";

export default function DashboardPage() {
  const dashboard = registry.blocks.blocks.find(
    (block) => block.slug === "dashboard",
  )!;

  return (
    <BaseBlocksLayout
      header={{
        title: dashboard.title,
        description: dashboard.description,
      }}
    >
      <div className="grid gap-12">
        {dashboard.variants.map((variant, i) => (
          <Sandbox key={variant.title} comp={variant} number={i + 1} />
        ))}
      </div>
    </BaseBlocksLayout>
  );
}
