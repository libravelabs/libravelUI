import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Toast } from "@/components/ui/toast";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["500", "900"],
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["500", "700"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${jetbrains_mono.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
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
        <Toast />
      </body>
    </html>
  );
}
