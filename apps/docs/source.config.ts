import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { remarkTypeScriptToJavaScript } from "fumadocs-docgen/remark-ts2js";
import { z as zod } from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      new: zod.boolean().default(false),
      pro: zod.boolean().default(false),
      soon: zod.boolean().default(false),
      enableToc: zod.boolean().default(true),
      doc: zod
        .union([
          zod.string().url(),
          zod.object({
            title: zod.string(),
            url: zod.string().url(),
            icon: zod.custom<React.ReactNode>().optional(),
          }),
          zod.array(
            zod.union([
              zod.string().url(),
              zod.object({
                title: zod.string(),
                url: zod.string().url(),
                icon: zod.custom<React.ReactNode>().optional(),
              }),
            ])
          ),
        ])
        .optional(),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkTypeScriptToJavaScript],
  },
});
