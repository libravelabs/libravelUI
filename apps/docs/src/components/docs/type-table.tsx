"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/core/popover";
import { ChevronDown, Info, Minus } from "lucide-react";
import Markdown from "react-markdown";

export interface TypeDefinition {
  description: string;
  type: string | Record<string, TypeDefinition | string>;
  required?: boolean;
  defaultValue?: string | undefined | null;
}

interface TypeTableProps {
  type: Record<string, TypeDefinition>;
  className?: string;
  title?: string;
}

function formatType(str: string) {
  try {
    return str
      .replace(/;\s*/g, ";\n")
      .replace(/{\s*/g, "{\n  ")
      .replace(/\s*}/g, "\n}")
      .replace(/:\s*/g, ": ");
  } catch {
    return str;
  }
}

function TypeRow({
  name,
  def,
  depth = 0,
}: {
  name: string;
  def: TypeDefinition;
  depth?: number;
}) {
  const displayName = def.required ? name : `${name}?`;
  const typeString = String(def.type).trim();
  const isObjectType =
    (typeof def.type === "object" &&
      def.type !== null &&
      !Array.isArray(def.type)) ||
    (typeString.startsWith("{") && typeString.endsWith("}"));

  const hasMultipleTypes =
    !isObjectType && typeof def.type === "string" && def.type.includes("|");

  return (
    <>
      <div
        className={cn(
          "group relative grid grid-cols-[1fr_1.2fr_0.6fr] gap-4 px-4 py-3 transition-all duration-200",
          "border-b border-border/40",
          "hover:bg-accent/5 hover:border-accent/40 hover:shadow-[0_0_12px_rgba(var(--accent-rgb,120,120,255),0.08)]",
          depth > 0 && "bg-muted/20",
        )}
        style={{ paddingLeft: `${depth * 24 + 16}px` }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <code className="text-sm font-medium px-2 py-0.5 rounded-md bg-accent/10 text-accent-foreground border border-accent/20 truncate">
            {displayName}
          </code>
          {def.description && (
            <Popover>
              <PopoverTrigger
                tone="ghost"
                size="sm"
                iconOnly
                className="shrink-0 opacity-60 hover:opacity-100"
              >
                <Info className="size-3.5" />
              </PopoverTrigger>
              <PopoverContent withArrow className="p-4 max-w-xs">
                <Markdown>{def.description}</Markdown>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="flex items-center min-w-0">
          {isObjectType ? (
            <Popover>
              <PopoverTrigger
                tone="outline"
                size="xs"
                className="bg-muted/40 font-mono"
              >
                {"{...}"}
                <ChevronDown />
              </PopoverTrigger>
              <PopoverContent className="w-auto max-w-sm p-3">
                <pre className="text-xs whitespace-pre-wrap font-mono text-muted-foreground">
                  {formatType(typeString)}
                </pre>
              </PopoverContent>
            </Popover>
          ) : hasMultipleTypes ? (
            <div className="flex flex-wrap gap-1.5">
              {String(def.type)
                .split("|")
                .map((t) => t.trim())
                .filter((t) => t && t !== "null")
                .map((t, i) => (
                  <code
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/20"
                  >
                    {t}
                  </code>
                ))}
            </div>
          ) : (
            <code className="text-xs px-2 py-1 rounded-md bg-muted/40 text-foreground/80 border truncate">
              {String(def.type).trim()}
            </code>
          )}
        </div>

        <div className="flex items-center justify-end text-muted-foreground">
          {def.defaultValue !== undefined && def.defaultValue !== null ? (
            <code className="text-xs px-2 py-1 rounded-md bg-muted/30 border border-border/30 truncate max-w-full">
              {typeof def.defaultValue === "string"
                ? `"${def.defaultValue}"`
                : String(def.defaultValue)}
            </code>
          ) : (
            <Minus className="size-3.5 opacity-40" />
          )}
        </div>
      </div>
    </>
  );
}

export function TypeTable({ type, className, title }: TypeTableProps) {
  if (!type || Object.keys(type).length === 0) return null;

  const entries = Object.entries(type);

  return (
    <div
      className={cn(
        "not-prose overflow-hidden rounded-lg border border-border/60 bg-background shadow-sm",
        className,
      )}
    >
      {title && (
        <div className="px-4 py-3 bg-muted/50 border-b border-border/40">
          <h3 className="text-sm font-semibold text-foreground tracking-tight">
            {title}
          </h3>
        </div>
      )}

      <div className="grid grid-cols-[1fr_1.2fr_0.6fr] gap-4 px-4 py-2.5 bg-muted/30 border-b border-border/60">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Prop
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Type
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
          Default
        </div>
      </div>

      <div>
        {entries.map(([name, def]) => (
          <TypeRow key={name} name={name} def={def} />
        ))}
      </div>
    </div>
  );
}
