export type RadiusKey = "sm" | "md" | "xl" | "3xl";
export type NavPosition = "left" | "center" | "right";

export interface UiPreferencesState {
  isTextured: boolean;
  radius: RadiusKey;
  navPosition: NavPosition;

  setIsTextured: (next: boolean) => void;
  toggleTextured: () => void;

  setRadius: (value: RadiusKey) => void;
  setNavPosition: (value: NavPosition) => void;
}
