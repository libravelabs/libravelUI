import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";

import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";
import { CopyButton, LLMOptions } from "@/components/ai/page-actions";
import { baseUrl, owner, repo } from "@/lib/github";
import { DocLinks } from "@/components/doc-links";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
        enabled: page.data.enableToc,
      }}
      footer={{
        enabled: true,
      }}
      editOnGithub={{
        owner: "libravelabs",
        repo: "libravelui",
        sha: "master",
        path: `content/docs/${page.file.path}`,
      }}
      lastUpdate={
        page.data.lastModified ? new Date(page.data.lastModified) : undefined
      }
      article={{
        className: "max-sm:pb-16",
      }}
    >
      <DocsTitle className="flex items-center gap-2 justify-between w-full">
        {page.data.title}
        <div className="flex gap-2">
          <CopyButton markdownUrl={`${page.url}.mdx`} />
          <LLMOptions markdownUrl={`${page.url}.mdx`} githubUrl={baseUrl} />
        </div>
      </DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <DocLinks page={page} />

      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return customMetaDataGenerator({
    title: page.data.title,
    description: page.data.description,
    canonicalUrl: `https://ui.libravelabs.com/docs/${page.slugs.join("/")}`,
  });
}
