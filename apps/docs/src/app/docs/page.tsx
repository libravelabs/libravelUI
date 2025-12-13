import Link from "next/link";
import { source } from "@/lib/source";
import React from "react";
import { Card } from "fumadocs-ui/components/card";
import { meta } from "@/lib/metadata/index";

export const metadata = meta.page({
  title: "Docs",
  description: "Navigate through the main documentation of libravelUI",
  canonicalUrl: process.env.NEXT_PUBLIC_APP_URL,
});

export default function DocsPage() {
  const sections = source.pageTree.children;

  return (
    <main className="flex flex-col py-24 md:py-36 text-center w-full max-w-4xl mx-auto">
      <h1 className="mb-4 font-semibold text-3xl md:text-4xl">
        Documentation Overview
      </h1>
      <p className="text-muted-foreground text-md">
        Navigate through the main areas of our documentation from this page.
      </p>
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 text-start">
        {sections.map((item) => (
          <Link key={item.name as React.Key} href={`/docs/${item.$id}`}>
            <Card
              icon={item.icon}
              title={item.name}
              description={item.description}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
