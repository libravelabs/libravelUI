import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { Toast } from "@/components/ui/toast";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body>
        <RootProvider
          search={{
            links: [
              ["Home", "/"],
              ["Docs", "/docs"],
            ],
          }}
        >
          <main data-dock className="flex flex-col min-h-screen scroll-smooth">
            {children}
          </main>
        </RootProvider>
        <Toast richColors />
      </body>
    </html>
  );
}
