"use client";

import React from "react";
import { Button } from "@/components/ui/core/button";
import { CodeXml } from "lucide-react";
import { useUiPreferences } from "@/hooks/use-ui-preferences";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { generateThemeCss } from "@/lib/generate-theme-css";
import { getTheme } from "@/app/themes";
import { toast } from "sonner";
import { AnimatedTooltip } from "@/components/ui/motion/animated-tooltip";

export function CopyThemeButton() {
  const themeName = useUiPreferences((s) => s.theme);
  const radius = useUiPreferences((s) => s.radius);
  const { copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    const theme = getTheme(themeName);
    if (!theme) {
      toast.error("Theme not found");
      return;
    }

    const css = generateThemeCss(theme, radius);
    copyToClipboard(css);
    toast.success("Theme CSS copied to clipboard!");
  };

  return (
    <AnimatedTooltip
      trigger={
        <Button
          tone="outline"
          iconOnly
          onClick={handleCopy}
          aria-label="Copy Theme CSS"
          className="border-foreground/10"
        >
          <CodeXml className="size-5" />
        </Button>
      }
      animationStyle="wobble"
    >
      Copy Theme CSS
    </AnimatedTooltip>
  );
}
