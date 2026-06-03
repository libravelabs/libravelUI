import { BaseBlocksLayout } from "../base-blocks-layout";
import { Sandbox } from "@/components/app/sandbox/sandbox";
import registry from "@/../public/registry.json";

export default function AuthPage() {
  const auth = registry.blocks.auth;

  return (
    <BaseBlocksLayout
      header={{
        title: auth.title,
        description: auth.description,
      }}
    >
      <div className="grid gap-12">
        {auth.variants.map((variant, i) => (
          <Sandbox key={variant.name} comp={variant} number={i + 1} />
        ))}
      </div>
    </BaseBlocksLayout>
  );
}
