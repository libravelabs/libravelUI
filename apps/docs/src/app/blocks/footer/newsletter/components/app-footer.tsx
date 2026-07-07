"use client";

import {
  Footer,
  FooterContainer,
  FooterBrand,
  FooterLogo,
  FooterDescription,
  FooterNewsletter,
  FooterNavigation,
  FooterSection,
  FooterSectionTitle,
  FooterLinks,
  FooterLink,
  FooterBottom,
  FooterCopyright,
  type FooterSectionData,
} from "@/components/ui/block/footer";
import { AppLogo } from "@/components/app/logo";

const sections: FooterSectionData[] = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/components" },
      { label: "Blocks", href: "/blocks" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export function AppFooter() {
  return (
    <Footer aria-label="Site footer">
      <FooterContainer>
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <FooterBrand>
            <FooterLogo>
              <AppLogo />
            </FooterLogo>
            <FooterDescription>
              Get notified about new components and releases. No spam.
            </FooterDescription>
          </FooterBrand>

          <FooterNewsletter
            title="Stay in the loop"
            description="One email a month, unsubscribe anytime."
            onSubmit={(email) => console.log("subscribe:", email)}
          />

          <FooterNavigation className="lg:flex-1 lg:max-w-md">
            {sections.map((section, i) => (
              <FooterSection key={i}>
                <FooterSectionTitle>{section.title}</FooterSectionTitle>
                <FooterLinks>
                  {section.links.map((link) => (
                    <FooterLink key={link.href} href={link.href}>
                      {link.label}
                    </FooterLink>
                  ))}
                </FooterLinks>
              </FooterSection>
            ))}
          </FooterNavigation>
        </div>

        <FooterBottom>
          <FooterCopyright>
            &copy; 2025-2026 LibravelUI. All rights reserved.
          </FooterCopyright>
        </FooterBottom>
      </FooterContainer>
    </Footer>
  );
}
