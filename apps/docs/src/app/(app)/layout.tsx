import type { ReactNode } from "react";
import { FloatingNav } from "@/components/app/floating-nav";
import { AppFooter } from "@/components/app/app-footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex flex-col min-h-screen scroll-smooth">
        {children}
      </main>
      <FloatingNav />
      <AppFooter />
    </>
  );
}
