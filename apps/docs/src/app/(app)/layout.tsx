import type { ReactNode } from "react";
import { FloatingNav } from "@/components/app/floating-nav";
import { AppFooter } from "@/components/app/app-footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <FloatingNav />
      <AppFooter />
    </>
  );
}
