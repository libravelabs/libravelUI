import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { BlocksHeader } from "./header-title";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout {...baseOptions()}>
      <BlocksHeader />
      <div className="p-8">{children}</div>
    </HomeLayout>
  );
}
