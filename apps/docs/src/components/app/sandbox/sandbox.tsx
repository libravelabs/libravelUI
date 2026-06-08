"use client";

import { useState } from "react";
import { Heading } from "@/components/ui/core/heading";
import { Separator } from "@/components/ui/core/separator";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from "@/components/ui/core/tabs";
import SandboxToolbar from "./toolbar";
import { PackageInstall } from "@/components/docs/package-install";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "motion/react";
import type { Key } from "react-aria-components";
import { CodeBlock } from "@/components/docs/code-block";
import { BlockVariant } from "@/scripts/build-registry/types";

export type ToolbarDevice = "desktop" | "tablet" | "mobile";

const deviceWidth = {
  desktop: "100%",
  tablet: 768,
  mobile: 390,
} satisfies Record<ToolbarDevice, string | number>;

export function Sandbox({
  comp,
  number,
  title,
  ...iframe
}: {
  comp: BlockVariant;
  number?: number;
  title?: string;
  iframe?: HTMLMotionProps<"iframe">;
}) {
  const [key, setKey] = useState<number>(0);
  const [tab, setTab] = useState<Key>("preview");
  const [device, setDevice] = useState<ToolbarDevice>("desktop");

  function handleRefresh() {
    return setKey(key + 1);
  }

  return (
    <Tabs width="full" selectedKey={tab} onSelectionChange={setTab}>
      <div className="flex w-full justify-between">
        <div className="flex items-center justify-between lg:justify-start w-full gap-4">
          <Heading level={1} className="capitalize">
            {number ? `#${number} ` : ""}
            {title ? title : comp?.name}
          </Heading>

          <Separator orientation="vertical" className="h-6 hidden lg:block" />

          <TabList className="h-9 p-1 *:h-6">
            <TabTrigger id="preview">Preview</TabTrigger>
            <TabTrigger id="code">Code</TabTrigger>
            <TabTrigger href="" target="_blank" className="lg:hidden">
              Fullscreen
            </TabTrigger>
          </TabList>
        </div>

        <div className="hidden lg:flex gap-4 items-center">
          <SandboxToolbar
            href={comp.preview as string}
            device={device}
            setDevice={setDevice}
            isDisabled={tab === "code"}
            onRefresh={handleRefresh}
          />

          <Separator orientation="vertical" />

          <PackageInstall
            command="add"
            packageName={comp.preview.replace("/", "")}
            showHeader={false}
          />
        </div>
      </div>

      <TabContent id="preview" className="p-0 border-0">
        <div className="bg-dots">
          <motion.iframe
            key={key}
            animate={{
              width: deviceWidth[device],
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 24,
            }}
            className="aspect-video rounded-lg border h-96 md:h-auto md:min-h-160"
            src={comp.preview}
            {...iframe}
          />
        </div>
      </TabContent>
      <TabContent id="code" className="p-0">
        <Tabs
          orientation="vertical"
          width="full"
          radius="lg"
          tone="underline"
          className="gap-0"
        >
          <TabList className="w-72 shrink-0">
            <TabTrigger
              isDisabled
              className="h-9.5 opacity-100! border-b rounded-none"
            >
              Files
            </TabTrigger>
            {comp?.files.map((file) => (
              <TabTrigger
                key={file.path}
                id={file.path}
                className="outline-none!"
              >
                {file.path.split("/").pop()}
              </TabTrigger>
            ))}
          </TabList>

          {comp?.files.map((file) => (
            <TabContent
              key={file.path}
              id={file.path}
              className="overflow-auto p-0 shadow-none border-s rounded-none"
            >
              <div className="h-9.5 opacity-100! border-b rounded-none p-2 text-sm text-muted-foreground">
                {file.path.split("/").pop()}
              </div>
              <CodeBlock
                code={file.code}
                lang="ts"
                className="rounded-none border-none h-96 md:h-auto md:min-h-160"
              />
            </TabContent>
          ))}
        </Tabs>
      </TabContent>
    </Tabs>
  );
}
