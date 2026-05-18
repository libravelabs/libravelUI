import { AppLogo } from "@/components/app/logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Book, Component } from "lucide-react";
import { SidebarTrigger } from "@/components/app/sidebar";
import { SearchToggle } from "@/components/app/search/search-toggle";
import { AnimatedTooltip } from "@/components/ui/motion/animated-tooltip";

export function baseOptions(): BaseLayoutProps {
  return {
    themeSwitch: {
      enabled: false,
    },
    githubUrl: "https://github.com/libravelabs/libravelUI",
    nav: {
      title: <AppLogo />,
    },
    searchToggle: {
      components: {
        sm: (
          <div className="flex items-center gap-0.5">
            <SearchToggle />
            <SidebarTrigger />
          </div>
        ),
      },
    },
    links: [
      {
        icon: <Book />,
        url: "/docs",
        text: "Docs",
      },
      {
        icon: <Component />,
        url: "/docs/components",
        text: "Components",
      },
      {
        type: "custom",
        children: (
          <AnimatedTooltip
            position="bottom"
            trigger={<span className="text-sm opacity-40">Blocks</span>}
          >
            Coming Soon
          </AnimatedTooltip>
        ),
      },
    ],
  };
}
