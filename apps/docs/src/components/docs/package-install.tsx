"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AnimatedToggleGroup,
  AnimatedToggleItem,
} from "@/components/ui/motion/animated-toggle-group";
import { Check, Clipboard } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
const PACKAGE_MANAGER_LABELS: Record<PackageManager, string> = {
  npm: "npm",
  pnpm: "pnpm",
  yarn: "yarn",
  bun: "bun",
};

type PackageInstallProps = {
  packageName?: string;
  command?: "install" | "add";
  title?: string;
  className?: string;
};

export function PackageInstall({
  packageName,
  command = "install",
  title,
  className,
}: PackageInstallProps) {
  const [manager, setManager] = useState<PackageManager>("npm");
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const cliCommands: Record<PackageManager, string> =
    command === "add"
      ? {
          npm: `npx libravelui@latest add ${packageName}`,
          pnpm: `pnpm dlx libravelui@latest add ${packageName}`,
          yarn: `yarn dlx libravelui@latest add ${packageName}`,
          bun: `bunx libravelui@latest add ${packageName}`,
        }
      : {
          npm: `npm install ${packageName}`,
          pnpm: `pnpm add ${packageName}`,
          yarn: `yarn add ${packageName}`,
          bun: `bun add ${packageName}`,
        };

  const handleCopy = () => {
    copyToClipboard(cliCommands[manager]);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:gap-3 w-full">
        {title && <span className="text-sm font-medium">{title}</span>}
        <div className="overflow-x-auto [scrollbar-width:none]">
          <AnimatedToggleGroup
            value={manager}
            onValueChange={(val) => setManager(val as PackageManager)}
          >
            {(Object.keys(PACKAGE_MANAGER_LABELS) as PackageManager[]).map(
              (key) => (
                <AnimatedToggleItem
                  key={key}
                  value={key}
                  className="text-xs sm:text-sm size-fit py-0.5 px-1.5 sm:px-2"
                >
                  {PACKAGE_MANAGER_LABELS[key]}
                </AnimatedToggleItem>
              ),
            )}
          </AnimatedToggleGroup>
        </div>
      </div>

      <div className="relative w-full overflow-hidden rounded-lg border border-border/80 bg-[radial-gradient(circle_at_0_0,--theme(--color-primary/8%),transparent_55%),radial-gradient(circle_at_100%_100%,--theme(--color-accent/10%),transparent_55%)]">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-sm bg-primary/5 p-0.5 text-xs border border-border/60 text-foreground/70 hover:text-foreground transition [&>svg]:size-4"
        >
          {isCopied ? <Check /> : <Clipboard />}
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.pre
            key={manager}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2 bg-linear-to-tr from-background/95 via-background/80 to-background/60 px-3 pr-10 py-2.5 text-xs font-mono text-foreground/90 [scrollbar-width:none]"
          >
            <span className="select-none text-muted-foreground/80 shrink-0">
              $
            </span>
            <code className="min-w-0 overflow-x-auto scrollbar-hidden whitespace-nowrap">
              {cliCommands[manager]}
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
}
