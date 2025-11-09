"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/core/table";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/core/popover";
import { InfoIcon, Minus, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";

export interface TypeDefinition {
  description: string;
  type: string | Record<string, TypeDefinition | string>;
  required?: boolean;
  defaultValue?: string | undefined | null;
}

interface TypeTableProps {
  type: Record<string, TypeDefinition>;
  className?: string;
}

function TypeRows({ type }: { type: Record<string, TypeDefinition> }) {
  const rows = Object.entries(type);

  return (
    <>
      {rows.map(([name, def]) => {
        const displayName = def.required ? name : `${name}?`;
        const isObjectType =
          typeof def.type === "object" &&
          def.type !== null &&
          !Array.isArray(def.type);
        const hasMultipleTypes =
          typeof def.type === "string" && def.type.includes("|");

        return (
          <TableRow key={name}>
            <TableCell className="flex items-center gap-2">
              <code className="rounded bg-accent px-1 py-0.5 text-primary">
                {displayName}
              </code>
              {def.description && (
                <Popover>
                  <PopoverTrigger variant="ghost" size="icon-sm">
                    <InfoIcon />
                  </PopoverTrigger>
                  <PopoverContent withArrow className="p-4 max-w-xs">
                    <ReactMarkdown>{def.description}</ReactMarkdown>
                  </PopoverContent>
                </Popover>
              )}
            </TableCell>

            <TableCell>
              {isObjectType ? (
                <Popover>
                  <PopoverTrigger
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <code className="rounded bg-muted-foreground/10 px-1 py-0.5">
                      {"{...}"}
                    </code>
                    <ChevronDown className="size-3" />
                  </PopoverTrigger>
                  <PopoverContent className="p-2 max-w-md">
                    <Table
                      aria-label={`Nested table for ${name}`}
                      className="px-2"
                    >
                      <TableHeader>
                        <TableColumn isRowHeader className="w-[30%]">
                          Prop
                        </TableColumn>
                        <TableColumn>Type</TableColumn>
                        <TableColumn className="w-[20%]">Default</TableColumn>
                      </TableHeader>
                      <TableBody>
                        <TypeRows
                          type={
                            Object.fromEntries(
                              Object.entries(def.type).map(([k, v]) => [
                                k,
                                typeof v === "string"
                                  ? { description: "", type: v }
                                  : v,
                              ])
                            ) as Record<string, TypeDefinition>
                          }
                        />
                      </TableBody>
                    </Table>
                  </PopoverContent>
                </Popover>
              ) : hasMultipleTypes ? (
                <div className="flex flex-wrap gap-1">
                  {String(def.type)
                    .split("|")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t, i) => (
                      <code
                        key={i}
                        className="rounded bg-muted-foreground/10 px-1 py-0.5"
                      >
                        {t}
                      </code>
                    ))}
                </div>
              ) : (
                <code className="rounded bg-muted-foreground/10 px-1 py-0.5">
                  {String(def.type).trim()}
                </code>
              )}
            </TableCell>

            <TableCell className="text-muted-foreground">
              {def.defaultValue !== undefined && def.defaultValue !== null ? (
                <code className="rounded bg-muted-foreground/10 px-1 py-0.5">
                  {typeof def.defaultValue === "string"
                    ? `"${def.defaultValue}"`
                    : String(def.defaultValue)}
                </code>
              ) : (
                <Minus className="size-4" />
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export function TypeTable({ type, className }: TypeTableProps) {
  return (
    <div
      className={cn("not-prose overflow-hidden rounded-md border", className)}
    >
      <Table aria-label="Type Definition Table" className="px-2">
        <TableHeader>
          <TableColumn isRowHeader className="w-[25%]">
            Prop
          </TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn className="w-[20%]">Default</TableColumn>
        </TableHeader>
        <TableBody>
          <TypeRows type={type} />
        </TableBody>
      </Table>
    </div>
  );
}
