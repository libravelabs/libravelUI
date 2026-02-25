import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { z as zod } from "zod";
import { type LucideIcon } from "lucide-react";
import { remarkDocCode } from "./src/lib/remark-doc-code";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      new: zod.boolean().default(false),
      pro: zod.boolean().default(false),
      soon: zod.boolean().default(false),
      gridLayout: zod.boolean().default(true),
      enableToc: zod.boolean().optional(),
      doc: zod
        .union([
          zod.string(),
          zod.object({
            title: zod.string(),
            url: zod.string(),
            icon: zod.custom<React.ReactNode>().optional(),
          }),
          zod.array(
            zod.union([
              zod.string(),
              zod.object({
                title: zod.string(),
                url: zod.string(),
                icon: zod.custom<React.ReactNode>().optional(),
              }),
            ]),
          ),
        ])
        .optional(),
      features: zod
        .array(
          zod.object({
            title: zod.string(),
            icon: zod.custom<LucideIcon>().optional(),
          }),
        )
        .optional(),
    }),
  },
  meta: {
    schema: metaSchema.extend({
      headerTitle: zod.string().optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      /* remarkDocCode */
    ],
  },
});
