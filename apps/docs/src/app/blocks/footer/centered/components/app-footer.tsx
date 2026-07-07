import { Footer } from "@/components/ui/block/footer";
import { AppLogo } from "@/components/app/logo";
import { FaGithub, FaXTwitter, FaYoutube } from "react-icons/fa6";

export function AppFooter() {
  return (
    <Footer
      variant="centered"
      aria-label="Site footer"
      logo={<AppLogo />}
      description="Modern, accessible React components for building interfaces without limits."
      sections={[
        {
          title: "Product",
          links: [
            { label: "Components", href: "/components" },
            { label: "Blocks", href: "/blocks" },
            { label: "Pricing", href: "/pricing" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Documentation", href: "/docs" },
            { label: "Changelog", href: "/changelog" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ]}
      social={[
        { label: "GitHub", href: "https://github.com", icon: <FaGithub /> },
        { label: "Twitter", href: "https://twitter.com", icon: <FaXTwitter /> },
        { label: "YouTube", href: "https://youtube.com", icon: <FaYoutube /> },
      ]}
      copyright="© 2025-2026 LibravelUI. All rights reserved."
    />
  );
}
