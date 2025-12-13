import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { Toast } from "@/components/ui/core/toast";
import SearchDialog from "@/components/search";
import { FloatingNav } from "@/components/app/floating-nav";
import { ThemeInitializer } from "@/components/theme/theme-intializer";
import { generateThemeScript } from "@/scripts/generate-theme";
import { TexturedBackground } from "@/components/app/textured-background";
import {
  geist,
  geist_mono,
  bricolage_grotesque,
  jetbrains_mono,
  domine,
  afacad_flux,
} from "@/lib/fonts";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geist_mono.variable} ${bricolage_grotesque.variable} ${jetbrains_mono.variable} ${domine.variable} ${afacad_flux.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: generateThemeScript(),
          }}
          suppressHydrationWarning
        />
      </head>
      <body>
        <RootProvider
          search={{
            SearchDialog,
          }}
          theme={{
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
          }}
        >
          <TexturedBackground>
            <ThemeInitializer />
            <main
              data-dock
              className="flex flex-col min-h-screen scroll-smooth"
            >
              {children}
            </main>
            <FloatingNav />
            <Toast richColors />
          </TexturedBackground>
        </RootProvider>
      </body>
    </html>
  );
}
