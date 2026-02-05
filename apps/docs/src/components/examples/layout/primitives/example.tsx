"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader } from "@/components/ui/core/loader";
import { Modal, ModalTrigger, ModalContent } from "@/components/ui/core/modal";
import { Code, LayoutPanelLeft, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentSource } from "@/components/docs/component-source";
import { Button } from "@/components/ui/core/button";

type ExampleProps = {
  section?: string;
  name: string;
  className?: string | string[];
};

type ExampleState = {
  key: number;
  rotation: number;
  dir: "ltr" | "rtl";
};

export function Example({ section = "motion", name, className }: ExampleProps) {
  const [state, setState] = useState<ExampleState>({
    key: 0,
    rotation: 0,
    dir: "ltr",
  });

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

  const Demo = dynamic(
    () => import(`@/components/examples/${section}/${name}`),
    {
      ssr: false,
      loading: () => <Loader />,
    },
  );

  return (
    <>
      <div className="flex items-center gap-1.5 absolute top-5.5 end-5.5 z-10">
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

          <ModalContent blurred size="xl" className="h-full">
            <ComponentSource
              comp={`components/examples/${section}/${name}`}
              tone="ghost"
            />
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
          <Demo />
        </div>
      </div>
    </>
  );
}
