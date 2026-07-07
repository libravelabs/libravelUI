import {
  Footer,
  FooterContainer,
  FooterBrand,
  FooterSocial,
  FooterSocialLink,
  FooterDivider,
  FooterLinks,
  FooterLink,
  FooterBottom,
  FooterCopyright,
} from "@/components/ui/block/footer";
import { FaGithub, FaXTwitter, FaInstagram } from "react-icons/fa6";

export function AppFooter() {
  return (
    <Footer aria-label="Site footer">
      <FooterContainer className="gap-8">
        <FooterBrand className="max-w-2xl gap-6">
          <h2 className="serif text-4xl font-normal leading-tight tracking-tight text-foreground sm:text-5xl">
            Build interfaces{" "}
            <em className="text-muted-foreground">without limits.</em>
          </h2>
          <FooterSocial>
            <FooterSocialLink href="https://github.com" label="GitHub">
              <FaGithub />
            </FooterSocialLink>
            <FooterSocialLink href="https://twitter.com" label="Twitter">
              <FaXTwitter />
            </FooterSocialLink>
            <FooterSocialLink href="https://instagram.com" label="Instagram">
              <FaInstagram />
            </FooterSocialLink>
          </FooterSocial>
        </FooterBrand>

        <FooterDivider />

        <FooterBottom className="border-t-0 pt-0">
          <FooterCopyright>
            &copy; 2025-2026 LibravelUI. All rights reserved.
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
