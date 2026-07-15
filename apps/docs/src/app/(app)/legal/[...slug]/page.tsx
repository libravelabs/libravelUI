import { legalSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { meta } from "@/lib/metadata/index";
import { LegalCardHeader } from "../card-header";
import { CardAction } from "@/components/ui/core/card";
import { Badge } from "@/components/ui/core/badge";
import { AppToc } from "@/components/app/app-toc";
import { AppName } from "@/components/app/logo";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  const page = legalSource.getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <main className="flex justify-between w-full h-full px-6 py-16">
      <div className="max-w-4xl w-full">
        <LegalCardHeader
          circleGradient={false}
          header={
            <div className="w-full border-b pb-8 mb-8">
              <div className="flex justify-between items-center mb-4">
                <AppName variant="text" className="text-sm my-0" />
                <span className="text-[10px] font-mono uppercase tracking-wider opacity-50">
                  Legal Dept.
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mt-0 mb-3">
                {page.data.title}
              </h1>

              {page.data.lastModified ? (
                <div className="text-xs font-mono uppercase tracking-wider opacity-70">
                  Effective Date:{" "}
                  {new Date(page.data.lastModified).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </div>
              ) : null}
            </div>
          }
        >
          <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-p:text-justify prose-p:leading-relaxed">
            <MDX components={getMDXComponents()} />
          </article>
        </LegalCardHeader>
      </div>

      <div dir="rtl">
        <AppToc toc={page.data.toc} />
      </div>
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
