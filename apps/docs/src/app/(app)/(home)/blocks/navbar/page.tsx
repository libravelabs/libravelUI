import { BaseBlocksLayout } from "../base-blocks-layout";
import { Sandbox } from "@/components/app/sandbox/sandbox";
import registry from "@/../public/registry.json";

export default function NavbarPage() {
  const navbar = registry.blocks.navbar;

  return (
    <BaseBlocksLayout
      header={{
        title: navbar.title,
        description: navbar.description,
      }}
    >
      <div className="grid gap-12">
        {navbar.variants.map((variant, i) => (
          <Sandbox key={variant.name} comp={variant} number={i + 1} />
        ))}
      </div>
    </BaseBlocksLayout>
  );
}
