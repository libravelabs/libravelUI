"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ControlsMap, PlaygroundValue } from "./types";

interface PlaygroundContextType {
  values: Record<string, PlaygroundValue>;
  setValue: (key: string, value: PlaygroundValue) => void;
  controls: ControlsMap;
}

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(
  undefined
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
  const [values, setValues] = useState<Record<string, PlaygroundValue>>({});

  useEffect(() => {
    const defaults: Record<string, PlaygroundValue> = {};
    Object.entries(controls).forEach(([key, schema]) => {
      defaults[key] = schema.defaultValue;
    });
    setValues(defaults);
  }, [controls]);

  const setValue = (key: string, value: PlaygroundValue) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PlaygroundContext.Provider value={{ values, setValue, controls }}>
      {children}
    </PlaygroundContext.Provider>
  );
}
