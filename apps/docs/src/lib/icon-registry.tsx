import { icons } from "lucide-react";
import {
  createElement,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from "react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export class IconRegistry {
  private registry = new Map<string, IconComponent>();

  constructor(iconList: IconComponent[]) {
    iconList.forEach((icon) => {
      if (icon.name) {
        this.registry.set(icon.name, icon);
      }
    });
  }

  resolve = (name: string): ReactNode | null => {
    if (!name) return null;

    if (this.registry.has(name)) {
      const Component = this.registry.get(name)!;
      return createElement(Component);
    }

    if (name in icons) {
      const LucideIcon = icons[
        name as keyof typeof icons
      ] as unknown as IconComponent;
      return createElement(LucideIcon);
    }

    return null;
  };
}
