import { AppLogo } from "@/components/app/logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Blocks, Book, Component } from "lucide-react";
import { SidebarTrigger } from "@/components/app/sidebar";
import { SearchToggle } from "@/components/app/search/search-toggle";

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
        icon: <Blocks />,
        url: "/docs/blocks",
        text: "Blocks",
      },
    ],
  };
}
