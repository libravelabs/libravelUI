import { cn } from "@/lib/utils";
import { type LucideIcon, SunMoon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { type HTMLAttributes } from "react";

export function AppearanceTab({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { theme, setTheme } = useTheme();

  const tabs: {
    value: "light" | "dark" | "system";
    icon: LucideIcon;
    label: string;
  }[] = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: SunMoon, label: "System" },
  ];

  return (
    <div
      className={cn(
        "inline-flex gap-1 rounded-xl bg-muted p-1 w-fit",
        className
      )}
      {...props}
    >
      {tabs.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "flex items-center rounded-lg px-3.5 py-1.5 transition-colors cursor-pointer",
            theme === value
              ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/80"
              : "hover:bg-primary/20"
          )}
        >
          <Icon className="-ml-1 h-4 w-4" />
          <span className="ml-1.5 text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
}
