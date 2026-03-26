import { BlockPlayground } from "@/components/docs/block-playground";

export default function Page() {
  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-2">
        <span>Navbar Default</span>
        <BlockPlayground src="/preview/navbar/1" />
      </div>
      <BlockPlayground src="/preview/navbar/2" />
      <BlockPlayground src="/preview/navbar/3" />
    </div>
  );
}
