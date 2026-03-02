"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ControlsMap } from "./types";

interface PlaygroundContextType {
  values: Record<string, unknown>;
  setValue: (key: string, value: unknown) => void;
  controls: ControlsMap;
  refresh: { key: number; rotation: number };
  handleRefresh: () => void;
  direction: "ltr" | "rtl";
  setDirection: (direction: "ltr" | "rtl") => void;
  handleDirection: () => void;
}

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(
  undefined,
);

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (!context) {
    throw new Error("usePlayground must be used within a PlaygroundProvider");
  }
  return context;
}

interface PlaygroundProviderProps {
  children: React.ReactNode;
  controls?: ControlsMap;
}

export function PlaygroundProvider({
  children,
  controls = {},
}: PlaygroundProviderProps) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const [refresh, setRefresh] = useState<{ key: number; rotation: number }>({
    key: 0,
    rotation: 0,
  });

  useEffect(() => {
    const defaults: Record<string, unknown> = {};
    Object.entries(controls).forEach(([key, schema]) => {
      defaults[key] = schema.defaultValue;
    });
    setValues(defaults);
  }, [controls]);

  const setValue = (key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleRefresh = () => {
    setRefresh((prev) => ({
      key: prev.key + 1,
      rotation: prev.rotation + 360,
    }));

    const defaults: Record<string, unknown> = {};
    Object.entries(controls).forEach(([key, schema]) => {
      defaults[key] = schema.defaultValue;
    });
    setValues(defaults);
  };

  const handleDirection = () =>
    setDirection((prev) => (prev === "ltr" ? "rtl" : "ltr"));

  return (
    <PlaygroundContext.Provider
      value={{
        values,
        setValue,
        controls,
        refresh,
        handleRefresh,
        direction,
        setDirection,
        handleDirection,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}
