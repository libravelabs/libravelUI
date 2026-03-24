"use client";

import Link from "next/link";
import { AppLogo } from "./logo";
import { app } from "@/config/app";

const navigation = {
  resources: [
    { name: "Home", href: "/" },
    { name: "Components", href: "/components" },
    { name: "Docs", href: "/docs" },
  ],
  templates: [
    { name: "SaaS Dashboard", href: "/" },
    { name: "Landing Page", href: "/" },
    { name: "Portfolio", href: "/" },
  ],
  labs: [{ name: "GitHub", href: app.links.github }],
  starterKits: [
    { name: "Next.js", href: "/docs/starter-kits/nextjs" },
    { name: "Vite", href: "/docs/starter-kits/vite" },
    { name: "Laravel", href: "/docs/starter-kits/laravel" },
  ],
};

const currentYear = new Date().getFullYear();

export function AppFooter() {
  return (
    <footer className="border-t border-border/40 bg-background pb-16 text-foreground sm:pb-0 z-20 relative">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[20rem_auto] lg:grid-cols-[18rem_auto] xl:grid-cols-[20rem_auto] lg:gap-10 xl:gap-24">
          <div>
            <Link href="/" className="flex items-center w-fit">
              <AppLogo />
            </Link>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>{app.description}</p>
              <p>
                Crafted by{" "}
                <Link
                  href={app.author.url}
                  className="text-foreground hover:underline"
                >
                  {app.author.name}
                </Link>
                . Peep the Source Code on{" "}
                <Link
                  href={app.repo.url}
                  className="text-foreground hover:underline"
                >
                  GitHub
                </Link>
                .
              </p>
              <p>
                Hosted on Vercel. The source {"code's"} got the MIT license.
              </p>
              <p className="text-foreground/80 font-medium">
                2025 - {currentYear} &middot; {app.name} &trade;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-10 xl:gap-6 xl:gap-y-6">
            <div>
              <h3 className="font-medium text-base text-foreground mb-4">
                Resources
              </h3>
              <ul className="space-y-3 text-sm">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-base text-foreground mb-4">
                Starter Kits
              </h3>
              <ul className="space-y-3 text-sm">
                {navigation.starterKits.map((kit) => (
                  <li key={kit.name}>
                    <Link
                      href={kit.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {kit.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-base text-foreground mb-4">
                Templates
              </h3>
              <ul className="space-y-3 text-sm">
                {/* {navigation.templates.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))} */}
                Coming Soon
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-base text-foreground mb-4">
                Labs
              </h3>
              <ul className="space-y-3 text-sm">
                {navigation.labs.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
