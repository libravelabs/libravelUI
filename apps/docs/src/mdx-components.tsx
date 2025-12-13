import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "@/components/type-table";
import { AutoTypeTable } from "@/components/auto-type-table";
import { RequiredBlock } from "@/components/required-block";
import { Playground } from "@/components/playground";
import { DocTabs } from "@/components/doc-tabs";
import { ComponentSource } from "@/components/component-source";
import { TStoJSCodeBlock } from "@/components/ts2js-code-block";
import { CodeBlock } from "@/components/code-block";
import { Info } from "@/components/info";
import { Callout } from "fumadocs-ui/components/callout";
import { RelatedComponents } from "@/components/related-components";
import { PreviewBlock } from "@/components/preview-block";
import { DocCard } from "@/components/examples/layout/doc-card";
import * as icons from "lucide-react";
import * as primitives from "@/components/examples/layout/primitives";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...(icons as unknown as MDXComponents),
    ...primitives,
    Tab,
    Tabs,
    AutoTypeTable: AutoTypeTable,
    TypeTable,
    RequiredBlock,
    TStoJSCodeBlock,
    ComponentSource,
    Playground,
    DocTabs,
    CodeBlock,
    Info,
    RelatedComponents,
    Callout,
    PreviewBlock,
    DocCard,
    ...components,
  };
}
