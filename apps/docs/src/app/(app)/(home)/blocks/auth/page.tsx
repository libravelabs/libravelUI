import { BaseBlocksLayout } from "../base-blocks-layout";
import { Sandbox } from "@/components/app/sandbox/sandbox";
import registry from "@/../public/registry.json";

export default function AuthPage() {
  const auth = registry.blocks.blocks.find((block) => block.slug === "auth")!;

  return (
    <BaseBlocksLayout
      header={{
        title: auth.title,
        description: auth.description,
      }}
    >
      <div className="grid gap-12">
        {auth.variants.map((variant, i) => (
          <Sandbox key={variant.title} comp={variant} number={i + 1} />
        ))}
      </div>
    </BaseBlocksLayout>
  );
}
