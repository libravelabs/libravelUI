import { BlockPlayground } from "@/components/docs/block-playground";

export default function Page() {
  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-2">
        <span>sidebar Default</span>
        <BlockPlayground src="/preview/sidebar/sidebar-01" />
      </div>
    </div>
  );
}
