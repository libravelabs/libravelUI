import { BaseBlocksLayout } from "../base-blocks-layout";
import { Sandbox } from "@/components/app/sandbox/sandbox";
import registry from "@/../public/registry.json";

export default function NavbarPage() {
  const navbar = registry.blocks.blocks.find(
    (block) => block.slug === "navbar",
  )!;

  return (
    <BaseBlocksLayout
      header={{
        title: navbar.title,
        description: navbar.description,
      }}
    >
      <div className="grid gap-12">
        {navbar.variants.map((variant, i) => (
          <Sandbox key={variant.title} comp={variant} number={i + 1} />
        ))}
      </div>
    </BaseBlocksLayout>
  );
}
