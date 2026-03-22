"use client";

import React, { useState, useMemo } from "react";
import { runtimeRegistry } from "@/generated/runtime-registry";
import { Loader } from "@/components/ui/core/loader";
import { Modal, ModalTrigger, ModalContent } from "@/components/ui/core/modal";
import { Code, LayoutPanelLeft, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentSource } from "@/components/docs/component-source";
import { Button } from "@/components/ui/core/button";

type ExampleProps = {
  path: string;
  className?: string | string[];
};

type ExampleState = {
  key: number;
  rotation: number;
  dir: "ltr" | "rtl";
};

export function Example({ path: rawPath, className }: ExampleProps) {
  const [state, setState] = useState<ExampleState>({
    key: 0,
    rotation: 0,
    dir: "ltr",
  });

  const path = useMemo(() => {
    return rawPath.replace(/\.(tsx|ts|jsx|js)$/, "").replace(/^\/+|\/+$/g, "");
  }, [rawPath]);

  const handleRefresh = () => {
    setState((prev) => ({
      ...prev,
      key: prev.key + 1,
      rotation: prev.rotation + 360,
    }));
  };

  const handleDirection = () => {
    setState((prev) => ({
      ...prev,
      dir: prev.dir === "ltr" ? "rtl" : "ltr",
    }));
  };

  const registryEntry = runtimeRegistry[path as keyof typeof runtimeRegistry];
  const Demo = useMemo(() => {
    if (!registryEntry) {
      return () => (
        <div className="text-sm text-destructive">
          Component not found in registry: {path}
        </div>
      );
    }
    return (registryEntry as any).Component || (registryEntry as any);
  }, [registryEntry, path]);

  return (
    <div className="flex flex-col w-full h-full text-sm">
      <div className="flex items-center justify-end gap-1.5 sm:absolute sm:top-5.5 sm:end-5.5 z-10 w-full pb-2 sm:pb-0 sm:w-auto">
        <Button tone="secondary" iconOnly size="xs" onClick={handleDirection}>
          {state.dir === "ltr" ? (
            <LayoutPanelLeft />
          ) : (
            <LayoutPanelLeft className="rotate-180" />
          )}
        </Button>

        <Button onClick={handleRefresh} tone="secondary" iconOnly size="xs">
          <RefreshCw
            className="size-4 transition-transform duration-300"
            style={{ transform: `rotate(${state.rotation}deg)` }}
          />
        </Button>

        <Modal>
          <ModalTrigger tone="secondary" size="xs">
            <Code /> Show Code
          </ModalTrigger>

          <ModalContent blurred size="xl" className="h-full max-w-screen">
            <ComponentSource comp={path} tone="ghost" />
          </ModalContent>
        </Modal>
      </div>

      <div className="relative w-full h-full">
        <div
          key={state.key}
          dir={state.dir}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full relative p-4 not-prose",
            className,
          )}
        >
          <React.Suspense fallback={<Loader />}>
            <Demo />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
