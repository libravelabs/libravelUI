"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import { PreviewContainer } from "@/components/docs/preview-container";
import { Button } from "@/components/ui/core/button";
import { Skeleton, SkeletonText } from "@/components/ui/core/skeleton";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useIsMobile } from "@/hooks/use-mobile";

import { StoryBookControlField } from "./controls";
import { formatCode } from "./format-code";
import { stringifyStoryBookCode } from "./serialize";
import type { StoryBookConfig, StoryBookField } from "./types";

type StoryBookProps<TArgs extends object> = {
  story: StoryBookConfig<TArgs>;
};

function getDefaultArgs<TArgs extends object>(
  fields: StoryBookConfig<TArgs>["args"],
) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, field.defaultValue]),
  ) as TArgs;
}

function CodePanel({ code }: { code: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/50 px-4 py-3">
        <span className="font-mono text-xs text-muted-foreground">Usage</span>

        <Button
          tone="outline"
          size="sm"
          className="gap-1.5 text-[10px] font-medium uppercase tracking-wide text-primary"
          onClick={() => copyToClipboard(code)}
        >
          {isCopied ? (
            <Check className="size-3" />
          ) : (
            <Copy className="size-3" />
          )}
          {isCopied ? "Copied" : "Copy"}
        </Button>
      </div>

      <div className="w-full overflow-hidden bg-card/80 p-1">
        <CodeBlock
          lang="tsx"
          code={code}
          className="rounded-none border-none bg-transparent shadow-none"
          codeblock={{ allowCopy: false }}
        />
      </div>
    </>
  );
}

function StoryBookSkeleton({
  hasControls,
  isMobile,
}: {
  hasControls: boolean;
  isMobile: boolean;
}) {
  const codeSection = (
    <div className="border-t border-border">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/50 px-4 py-3">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-6 w-16" />
      </div>

      <div className="bg-card/80 p-4">
        <SkeletonText lines={4} />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex h-87.5 items-center justify-center border-b border-border p-8">
          <Skeleton className="h-8 w-32" />
        </div>

        {hasControls && (
          <div className="border-b border-border bg-card/50 p-4">
            <Skeleton className="mb-4 h-4 w-32" />
            <SkeletonText lines={3} />
          </div>
        )}

        {codeSection}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
      <div
        className={
          hasControls
            ? "grid min-h-120 grid-cols-12"
            : "grid min-h-120 grid-cols-1"
        }
      >
        {hasControls && (
          <div className="col-span-3 border-r border-border bg-card p-6">
            <Skeleton className="mb-4 h-4 w-32" />
            <SkeletonText lines={5} />
          </div>
        )}

        <div
          className={
            hasControls
              ? "col-span-9 flex items-center justify-center p-8"
              : "col-span-1 flex items-center justify-center p-8"
          }
        >
          <Skeleton className="h-8 w-32" />
        </div>
      </div>

      {codeSection}
    </div>
  );
}

export function StoryBook<TArgs extends object>({
  story,
}: StoryBookProps<TArgs>) {
  const initialArgs = useMemo(
    () => getDefaultArgs<TArgs>(story.args),
    [story.args],
  );
  const [args, setArgs] = useState<TArgs>(initialArgs);
  const [code, setCode] = useState<string | null>(null);
  const [formatting, setFormatting] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    setArgs(initialArgs);
  }, [initialArgs]);

  const updateArg = <K extends keyof TArgs>(key: K, value: TArgs[K]) => {
    setArgs((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const preview = story.render ? (
    story.render(args)
  ) : (
    <story.component {...args} />
  );

  const rawCode = useMemo(() => {
    if (!story.code) {
      return null;
    }

    return stringifyStoryBookCode({
      title: story.title,
      ...story.code(args),
    });
  }, [args, story.code, story.title]);

  const hasControls = Object.values(story.args).some((field) =>
    Boolean((field as StoryBookField<TArgs[keyof TArgs]>).control),
  );

  useEffect(() => {
    if (!rawCode) {
      setCode(null);
      setFormatting(false);
      return;
    }

    let cancelled = false;

    setFormatting(true);

    formatCode(rawCode)
      .then((formatted) => {
        if (!cancelled) {
          setCode(formatted.trim());
          setFormatting(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCode(rawCode.trim());
          setFormatting(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [rawCode]);

  if (formatting && code === null) {
    return <StoryBookSkeleton hasControls={hasControls} isMobile={isMobile} />;
  }

  const previewArea = (
    <div className="relative h-full overflow-visible">
      <div className="pointer-events-none absolute inset-0 bg-dots" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-card/80 via-card/40 to-transparent" />
      <PreviewContainer className="relative flex h-full items-center justify-center">
        {preview}
      </PreviewContainer>
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative h-87.5 overflow-visible border-b border-border">
          {previewArea}
        </div>

        {hasControls && (
          <div className="border-b border-border bg-card/50 p-4">
            <div className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Component Configuration
            </div>

            <div className="grid gap-4">
              {Object.entries(story.args).map(([name, field]) => {
                if (!field.control) {
                  return null;
                }

                const key = name as keyof TArgs;

                return (
                  <StoryBookControlField
                    key={name}
                    name={name}
                    control={field.control}
                    value={args[key]}
                    onChange={(value) =>
                      updateArg(key, value as TArgs[typeof key])
                    }
                  />
                );
              })}
            </div>
          </div>
        )}

        {code && (
          <div className="border-t border-border">
            <CodePanel code={code} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
      <div
        className={
          hasControls
            ? "grid min-h-120 grid-cols-12"
            : "grid min-h-120 grid-cols-1"
        }
      >
        {hasControls && (
          <div className="col-span-3 overflow-y-auto border-r border-border bg-card p-6">
            <div className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Component Configuration
            </div>

            <div className="grid gap-4">
              {Object.entries(story.args).map(([name, field]) => {
                if (!field.control) {
                  return null;
                }

                const key = name as keyof TArgs;

                return (
                  <StoryBookControlField
                    key={name}
                    name={name}
                    control={field.control}
                    value={args[key]}
                    onChange={(value) =>
                      updateArg(key, value as TArgs[typeof key])
                    }
                  />
                );
              })}
            </div>
          </div>
        )}

        <div
          className={
            hasControls ? "relative col-span-9" : "relative col-span-1"
          }
        >
          {previewArea}
        </div>
      </div>

      {code && (
        <div className="border-t border-border">
          <CodePanel code={code} />
        </div>
      )}
    </div>
  );
}
