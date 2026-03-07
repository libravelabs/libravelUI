import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";

import { CopyButton, LLMOptions } from "@/components/ai/page-actions";
import { baseUrl } from "@/lib/github";
import { DocLinks } from "@/components/docs/doc-links";
import { meta } from "@/lib/metadata/index";
import { StyledHeader } from "@/components/app/docs/styled-header";
import { DocGrid } from "@/components/examples/layout/doc-grid";
import { AppToc } from "@/components/app/app-toc";

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
      full
      breadcrumb={{
        enabled: !page.data.gridLayout,
      }}
      tableOfContent={{
        enabled: page.data.enableToc ?? !page.data.gridLayout,
        component: <AppToc toc={page.data.toc} />,
      }}
      footer={{
        enabled: true,
      }}
      editOnGithub={{
        owner: "libravelabs",
        repo: "libravelUi",
        sha: "main",
        path: `content/docs/${page.file.path}`,
      }}
      lastUpdate={
        page.data.lastModified ? new Date(page.data.lastModified) : undefined
      }
      container={{
        className: "max-w-none! w-full! px-0!",
      }}
      article={{
        className: "pb-20",
      }}
    >
      {page.data.gridLayout ? (
        <StyledHeader
          title={page.data.title}
          description={page.data.description}
          features={page.data.features && page.data.features}
        />
      ) : (
        <>
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
        </>
      )}

      <DocsBody className="max-w-none w-full!">
        {page.data.gridLayout ? (
          <DocGrid>
            <MDX components={getMDXComponents()} />
          </DocGrid>
        ) : (
          <MDX components={getMDXComponents()} />
        )}
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

  return meta.docs({
    title: page.data.title,
    description: page.data.description,
    canonicalUrl: `${process.env.NEXT_PUBLIC_APP_URL}${page.slugs.join("/")}`,
  });
}
