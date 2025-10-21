import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import { RequiredBlock } from "@/components/required-block";
import { Playground } from "@/components/playground";
import { DocTabs } from "@/components/doc-tabs";
import { ComponentSource } from "@/components/component-source";
import { TStoJSCodeBlock } from "@/components/ts2js-code-block";
import { CodeBlock } from "@/components/code-block";

const generator = createGenerator();

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    TypeTable,
    RequiredBlock,
    TStoJSCodeBlock,
    ComponentSource,
    Playground,
    DocTabs,
    CodeBlock,
    ...components,
  };
}
