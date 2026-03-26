import "@/styles/global.css";
import type { ReactNode } from "react";
import { ThemeInitializer } from "@/components/app/theme/theme-intializer";
import { RootProvider } from "fumadocs-ui/provider";
import SearchDialog from "@/components/app/search/search";
import { TexturedBackground } from "@/components/app/textured-background";
import { Toast } from "@/components/ui/core/toast";
import { generateThemeScript } from "@/scripts/generate-theme";
import {
  geist,
  geist_mono,
  bricolage_grotesque,
  jetbrains_mono,
  domine,
  afacad_flux,
} from "@/lib/fonts";
import { meta } from "@/lib/metadata/index";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";

export const metadata = meta.page({
  description:
    "LibravelUI is a React component library for building beautiful and accessible user interfaces.",
  canonicalUrl: process.env.NEXT_PUBLIC_APP_URL,
});

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
            enabled: false,
          }}
        >
          <TexturedBackground>
            <ThemeInitializer />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toast richColors />
              {children}
              <Analytics />
            </ThemeProvider>
          </TexturedBackground>
        </RootProvider>
      </body>
    </html>
  );
}
