"use client";

import { Toaster as ToasterPrimitive, type ToasterProps } from "sonner";
import { useTheme } from "next-themes";

function Toast({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <ToasterPrimitive
      theme={theme as ToasterProps["theme"]}
      closeButton
      className="toaster group"
      richColors
      toastOptions={{
        className:
          "*:data-icon:self-start font-sans has-data-description:*:data-icon:mt-1 *:data-icon:mt-0.5 backdrop-blur-2xl",
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export type { ToasterProps };
export { Toast };
