"use client";

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
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";

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
              Copy-paste React components you own and adapt — accessible,
              unstyled by default, production ready.
            </FooterDescription>
            <FooterSocial>
              <FooterSocialLink href="https://github.com" label="GitHub">
                <FaGithub />
              </FooterSocialLink>
              <FooterSocialLink href="https://x.com" label="X">
                <FaXTwitter />
              </FooterSocialLink>
              <FooterSocialLink href="https://linkedin.com" label="LinkedIn">
                <FaLinkedin />
              </FooterSocialLink>
            </FooterSocial>
          </FooterBrand>

          <FooterNavigation className="lg:flex-1 lg:max-w-2xl">
            <FooterSection>
              <FooterSectionTitle>Product</FooterSectionTitle>
              <FooterLinks>
                <FooterLink href="/components">Components</FooterLink>
                <FooterLink href="/blocks">Blocks</FooterLink>
                <FooterLink href="/templates">Templates</FooterLink>
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <FooterSectionTitle>Resources</FooterSectionTitle>
              <FooterLinks>
                <FooterLink href="/docs">Documentation</FooterLink>
                <FooterLink href="/docs/starter-kits/nextjs">
                  Starter Kits
                </FooterLink>
                <FooterLink href="https://github.com" external>
                  GitHub
                </FooterLink>
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <FooterSectionTitle>Company</FooterSectionTitle>
              <FooterLinks>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </FooterLinks>
            </FooterSection>
          </FooterNavigation>
        </div>

        <FooterBottom>
          <FooterCopyright>
            &copy; {new Date().getFullYear()} LibravelUI. All rights reserved.
          </FooterCopyright>
          <FooterLinks className="flex-row gap-6">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </FooterLinks>
        </FooterBottom>
      </FooterContainer>
    </Footer>
  );
}
