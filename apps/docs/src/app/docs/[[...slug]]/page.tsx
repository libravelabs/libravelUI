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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LLMCopyButton, ViewOptions } from "@/components/ai/page-actions";
import { baseUrl, owner, repo } from "@/lib/github";

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
          <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
          <ViewOptions markdownUrl={`${page.url}.mdx`} githubUrl={baseUrl} />
        </div>
      </DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      {page.data.doc && (
        <Link
          href={
            typeof page.data.doc === "string"
              ? page.data.doc
              : page.data.doc.url
          }
          target="_blank"
          rel="noreferrer"
          className="w-fit"
        >
          <Button variant="outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 21"
              data-slot="icon"
              className="size-5"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M14.667 1.733H22v17.333zm-5.267 0H2v17.334zm2.6 6.4 4.733 10.933h-3.066l-1.4-3.467H8.8z"
              ></path>
            </svg>{" "}
            {typeof page.data.doc === "string"
              ? page.data.title
              : page.data.doc.title ?? page.data.title}
            <ArrowUpRight size={12} />
          </Button>
        </Link>
      )}

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
