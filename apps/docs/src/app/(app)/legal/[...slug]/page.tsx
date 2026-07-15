import { legalSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { meta } from "@/lib/metadata/index";
import { L } from "node_modules/vitest/dist/chunks/reporters.d.CtLUhkkA";
import { LegalCardHeader } from "../card-header";
import { CardAction } from "@/components/ui/core/card";
import { Badge } from "@/components/ui/core/badge";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  const page = legalSource.getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <LegalCardHeader
        header={
          <>
            <h1 className="text-3xl font-semibold">{page.data.title}</h1>
            {page.data.description && (
              <p className="max-w-3xl text-base leading-7">
                {page.data.description}
              </p>
            )}
          </>
        }
      >
        {page.data.lastModified ? (
          <CardAction>
            <Badge>
              Latest updated:{" "}
              {new Date(page.data.lastModified).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Badge>
          </CardAction>
        ) : null}
      </LegalCardHeader>
      <article
        className="
          prose
          prose-neutral
          dark:prose-invert
          max-w-none
        "
      >
        <MDX components={getMDXComponents()} />
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  return legalSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  const page = legalSource.getPage(params.slug);

  if (!page) notFound();

  return meta.docs({
    title: page.data.title,
    description: page.data.description,
    canonicalUrl: page.url,
  });
}
