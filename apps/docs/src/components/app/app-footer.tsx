import Link from "next/link";
import {
  Footer,
  FooterContainer,
  FooterBrand,
  FooterLogo,
  FooterDescription,
  FooterNavigation,
  FooterSection,
  FooterSectionTitle,
  FooterLinks,
  FooterLink,
  FooterSocial,
  FooterSocialLink,
  FooterBottom,
  FooterCopyright,
} from "@/components/ui/block/footer";
import { AppLogo } from "@/components/app/logo";
import { app } from "@/config/app";
import { FaGithub } from "react-icons/fa6";

const navigation = {
  resources: [
    { name: "Home", href: "/" },
    { name: "Components", href: "/components" },
    { name: "Docs", href: "/docs" },
  ],

  starterKits: [
    { name: "Next.js", href: "/docs/getting-started/nextjs" },
    { name: "Vite", href: "/docs/getting-started/vite" },
    { name: "Laravel", href: "/docs/getting-started/laravel" },
  ],

  templates: [
    { name: "SaaS Dashboard", href: "/" },
    { name: "Landing Page", href: "/" },
    { name: "Portfolio", href: "/" },
  ],

  labs: [
    {
      name: "GitHub",
      href: app.links.github,
      external: true,
    },
  ],
};

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Footer aria-label="Site footer">
      <FooterContainer>
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <FooterBrand>
            <FooterLogo>
              <Link href="/">
                <AppLogo />
              </Link>
            </FooterLogo>

            <FooterDescription>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
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
              </div>
            </FooterDescription>

            <FooterSocial>
              <FooterSocialLink href={app.links.github} label="GitHub">
                <FaGithub />
              </FooterSocialLink>
            </FooterSocial>
          </FooterBrand>

          <FooterNavigation className="lg:flex-1 lg:max-w-3xl">
            <FooterSection>
              <FooterSectionTitle>Resources</FooterSectionTitle>

              <FooterLinks>
                {navigation.resources.map((item) => (
                  <FooterLink key={item.name} href={item.href}>
                    {item.name}
                  </FooterLink>
                ))}
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <FooterSectionTitle>Starter Kits</FooterSectionTitle>

              <FooterLinks>
                {navigation.starterKits.map((item) => (
                  <FooterLink key={item.name} href={item.href}>
                    {item.name}
                  </FooterLink>
                ))}
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <FooterSectionTitle>Templates</FooterSectionTitle>

              <FooterLinks>
                {/* {navigation.templates.map((item) => (
                  <FooterLink key={item.name} href={item.href}>
                    {item.name}
                  </FooterLink>
                ))} */}
                <FooterLink>Coming Soon</FooterLink>
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <FooterSectionTitle>Labs</FooterSectionTitle>

              <FooterLinks>
                {navigation.labs.map((item) => (
                  <FooterLink key={item.name} href={item.href} external>
                    {item.name}
                  </FooterLink>
                ))}
              </FooterLinks>
            </FooterSection>
          </FooterNavigation>
        </div>

        <FooterBottom>
          <FooterCopyright>
            © 2025 - {currentYear} {app.name}™ by{" "}
            <Link
              href={app.organization.url}
              target="_blank"
              className="text-foreground hover:underline"
            >
              {app.organization.name}
            </Link>
            . All rights reserved.
          </FooterCopyright>

          <FooterLinks className="flex-row gap-6">
            <FooterLink href="/legal/privacy">Privacy</FooterLink>

            <FooterLink href="/legal/terms">Terms</FooterLink>
          </FooterLinks>
        </FooterBottom>
      </FooterContainer>
    </Footer>
  );
}
