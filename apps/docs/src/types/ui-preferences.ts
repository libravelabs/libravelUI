export type RadiusKey = "sm" | "md" | "xl" | "3xl";
export type NavPosition = "left" | "center" | "right";

export interface UiPreferencesState {
  isTextured: boolean;
  radius: RadiusKey;
  theme: string;
  navPosition: NavPosition;

  setIsTextured: (next: boolean) => void;
  toggleTextured: () => void;

  setRadius: (value: RadiusKey) => void;
  setTheme: (value: string) => void;
  setNavPosition: (value: NavPosition) => void;
}
