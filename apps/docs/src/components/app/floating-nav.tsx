"use client";

import { motion, AnimatePresence } from "motion/react";

import { ThemeSelector } from "./theme/theme-selector";
import { AppearanceToggle } from "./partials/appearance-toggle";
import { Separator } from "../ui/core/separator";
import { RadiusSelector } from "./partials/radius-selector";
import { CopyThemeButton } from "./partials/copy-theme-button";
import { TextureToggle } from "./partials/texture-toggle";
import { AnimatedTooltip } from "../ui/motion/animated-tooltip";
import { NavPositionSelector } from "./partials/nav-position-selector";
import { cn } from "@/lib/utils";
import { useFloatingNav } from "@/hooks/use-floating-nav";
import { ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNavDropdown } from "./partials/mobile-nav-dropdown";

export function FloatingNav() {
  const isMobile = useIsMobile();
  const {
    navRef,
    isVisible,
    navPosition,
    positionClass,
    setNavPosition,
    showNav,
  } = useFloatingNav();

  const basePositionClass = cn("fixed bottom-5 z-99999", positionClass);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="floating-nav"
          ref={navRef}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn(
            basePositionClass,
            "flex items-center gap-3 rounded-xl bg-sidebar p-3 border shadow-xl",
          )}
        >
          {isMobile ? (
            <>
              <AppearanceToggle />
              <MobileNavDropdown />
            </>
          ) : (
            <>
              <AppearanceToggle />

              <AnimatedTooltip
                trigger={<ThemeSelector />}
                animationStyle="wobble"
              >
                App Theme
              </AnimatedTooltip>

              <CopyThemeButton />

              <Separator
                orientation="vertical"
                className="h-8 bg-muted-foreground"
              />

              <AnimatedTooltip
                trigger={<TextureToggle />}
                animationStyle="wobble"
              >
                Textured Background
              </AnimatedTooltip>

              <RadiusSelector />

              <Separator
                orientation="vertical"
                className="h-8 bg-muted-foreground"
              />

              <AnimatedTooltip
                trigger={
                  <NavPositionSelector
                    value={navPosition}
                    onChange={(value) => setNavPosition(value)}
                  />
                }
                animationStyle="wobble"
              >
                FloatNav Position
              </AnimatedTooltip>
            </>
          )}
        </motion.div>
      ) : (
        <motion.button
          key="floating-nav-fab"
          type="button"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn(
            basePositionClass,
            "-bottom-1",
            "flex w-14 h-7 items-center justify-center rounded-md bg-sidebar text-sidebar-foreground border shadow-xl",
          )}
          onClick={showNav}
          onMouseEnter={showNav}
          aria-label="Show floating navigation"
        >
          <ChevronUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
