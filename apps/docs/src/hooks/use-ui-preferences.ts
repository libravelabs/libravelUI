"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UiPreferencesState } from "@/types/ui-preferences";
import { RADIUS_MAP } from "@/constants/radius";

export const useUiPreferences = create<UiPreferencesState>()(
  persist(
    (set, get) => ({
      isTextured: true,
      radius: "xl",
      theme: "default",
      navPosition: "center",
      setIsTextured: (next) => set({ isTextured: next }),
      toggleTextured: () => set({ isTextured: !get().isTextured }),
      setRadius: (value) => {
        set({ radius: value });
        if (typeof document !== "undefined") {
          document.documentElement.style.setProperty(
            "--radius",
            RADIUS_MAP[value],
          );
        }
      },
      setTheme: (value) => set({ theme: value }),
      setNavPosition: (value) => set({ navPosition: value }),
    }),
    {
      name: "ui-preferences",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const mapped = RADIUS_MAP[state.radius];
          if (typeof document !== "undefined") {
            document.documentElement.style.setProperty("--radius", mapped);
          }
        }
      },
    },
  ),
);
