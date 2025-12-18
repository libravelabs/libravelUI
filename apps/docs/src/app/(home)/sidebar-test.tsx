import {
  Sidebar,
  SidebarItem,
  SidebarSection,
  SidebarGroup,
  SidebarSeparator,
  SidebarHeader,
  SidebarBody,
} from "@/components/ui/blocks/sidebar";
import {
  Sparkles,
  Download,
  Palette,
  Terminal,
  Package,
  Zap,
  Figma,
  FileImage,
  Flag,
  User,
  Smile,
} from "lucide-react";
import { Logo } from "@/components/logo";

export function SidebarTest() {
  return (
    <Sidebar className="fixed top-0 left-0 h-screen z-999">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarBody>
        <SidebarSection title="Documentation">
          <SidebarItem icon={<Sparkles />}>Introduction</SidebarItem>

          <SidebarItem icon={<Download />}>Installation</SidebarItem>

          <SidebarGroup icon={<Palette />} label="Theming">
            <SidebarItem>Colors</SidebarItem>
            <SidebarItem>Dark mode</SidebarItem>
            <SidebarItem>Typography</SidebarItem>
          </SidebarGroup>

          <SidebarItem icon={<Terminal />}>CLI</SidebarItem>
          <SidebarItem icon={<Package />}>Icons</SidebarItem>

          <SidebarGroup icon={<Zap />} label="Integrations">
            <SidebarItem>Webhooks</SidebarItem>
            <SidebarItem>API Keys</SidebarItem>
            <SidebarItem>Plugins</SidebarItem>
          </SidebarGroup>
        </SidebarSection>

        <SidebarSeparator />

        <SidebarSection title="Resources">
          <SidebarItem icon={<Figma />}>Figma files</SidebarItem>
          <SidebarItem icon={<Package />}>Icons</SidebarItem>
          <SidebarItem icon={<FileImage />}>File icons</SidebarItem>
          <SidebarItem icon={<Flag />}>Flag icons</SidebarItem>
          <SidebarItem icon={<User />}>Avatars</SidebarItem>
          <SidebarItem icon={<Smile />}>Logos</SidebarItem>
        </SidebarSection>

        <SidebarSeparator />

        <SidebarSection title="Base components">
          <SidebarItem>Featured icons</SidebarItem>
          <SidebarItem>Buttons</SidebarItem>
          <SidebarItem>Social buttons</SidebarItem>
          <SidebarItem>Mobile app store buttons</SidebarItem>
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  );
}
