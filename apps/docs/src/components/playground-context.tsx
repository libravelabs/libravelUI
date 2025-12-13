"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type PlaygroundControls = Record<string, unknown>;

interface PlaygroundContextType {
  controls: PlaygroundControls;
  setControls: (controls: PlaygroundControls) => void;
}

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(
  undefined
);

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [controls, setControls] = useState<PlaygroundControls>({});

  return (
    <PlaygroundContext.Provider value={{ controls, setControls }}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground(): PlaygroundContextType | undefined {
  return useContext(PlaygroundContext);
}

export function useDynamicCode(controls: PlaygroundControls): void {
  const playground = usePlayground();
  const setControls = playground?.setControls;

  useEffect(() => {
    if (!setControls) return;

    const timeoutId = setTimeout(() => {
      setControls(controls);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [controls, setControls]);
}
