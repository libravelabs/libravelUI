"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { NAV_POSITIONS } from "@/constants/nav-positions";
import { useUiPreferences } from "@/hooks/use-ui-preferences";

export type NavPosition = "left" | "center" | "right";

interface UseFloatingNavOptions {
  scrollThreshold?: number;
}

interface UseFloatingNavResult {
  navRef: RefObject<HTMLDivElement | null>;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  showNav: () => void;
  hideNav: () => void;
  toggleNav: () => void;
  navPosition: NavPosition;
  positionClass: string;
  setNavPosition: (position: NavPosition) => void;
}

export function useFloatingNav({
  scrollThreshold = 5,
}: UseFloatingNavOptions = {}): UseFloatingNavResult {
  const navPosition = useUiPreferences((s) => s.navPosition as NavPosition);
  const setNavPosition = useUiPreferences(
    (s) => s.setNavPosition as (position: NavPosition) => void,
  );

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);
  const navRef = useRef<HTMLDivElement | null>(null);

  const positionClass = NAV_POSITIONS[navPosition] ?? NAV_POSITIONS.center;

  const showNav = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideNav = useCallback(() => {
    setIsVisible(false);
  }, []);

  const toggleNav = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const setVisible = useCallback((value: boolean) => {
    setIsVisible(value);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const customContainer = document.querySelector("[data-scrollable]");
      lastScrollY.current = customContainer
        ? (customContainer as HTMLElement).scrollTop
        : window.scrollY;
    }

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement | Document | Window;
      let current = 0;
      let isTrackedScroll = false;

      if (target === document || target === window) {
        current = window.scrollY;
        isTrackedScroll = true;
      } else if (
        target instanceof HTMLElement &&
        target.hasAttribute("data-scrollable")
      ) {
        current = target.scrollTop;
        isTrackedScroll = true;
      }

      if (!isTrackedScroll) return;

      const diff = current - lastScrollY.current;

      if (diff > scrollThreshold) {
        hideNav();
      } else if (diff < -scrollThreshold) {
        showNav();
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    return () =>
      window.removeEventListener("scroll", handleScroll, { capture: true });
  }, [scrollThreshold, hideNav, showNav]);

  return {
    navRef,
    isVisible,
    setVisible,
    showNav,
    hideNav,
    toggleNav,
    navPosition,
    positionClass,
    setNavPosition,
  };
}
