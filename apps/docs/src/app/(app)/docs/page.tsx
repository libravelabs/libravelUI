import Link from "next/link";
import { source } from "@/lib/source";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { meta } from "@/lib/metadata/index";
import { Badge } from "@/components/ui/core/badge";
import { AnimatedCircleIndicator } from "@/components/ui/motion/animated-circle-indicator";

export const metadata = meta.page({
  title: "Docs",
  description: "Navigate through the main documentation of libravelUI",
  canonicalUrl: process.env.NEXT_PUBLIC_APP_URL,
});

export default function DocsPage() {
  const sections = source.pageTree.children;

  return (
    <main className="relative flex flex-col py-24 md:py-36 px-4 text-center w-full max-w-4xl mx-auto overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <Badge
          tone="primary"
          className="border-primary text-primary bg-primary/5 mb-4"
        >
          <AnimatedCircleIndicator
            tone="primary"
            size="sm"
            animation="pulseTransparent"
          />
          Reference
        </Badge>
        <h1 className="mb-4 font-semibold text-3xl md:text-5xl">
          Documentation Overview
        </h1>
        <p className="text-muted-foreground text-lg">
          Navigate through the main areas of our documentation from this page.
        </p>
        <div className="mt-8 mb-8 w-24 h-0.5 bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        <div className="mt-8 grid [&>*:nth-last-child(1):nth-child(3n+1)]:lg:col-span-3 [&>*:nth-last-child(2):nth-child(3n+1)]:lg:col-span-1 [&>*:nth-last-child(1):nth-child(3n+2)]:lg:col-span-2 gap-4 text-start">
          {sections.map((item) => (
            <Link key={item.name as React.Key} href={`/docs/${item.$id}`}>
              <Card variant="gradient" className="flex flex-col gap-2 h-full">
                <CardHeader className="flex items-center gap-2 [&>*:first-child]:mb-0">
                  {item.icon && (
                    <span className="bg-foreground/10 p-1.5 rounded [&_svg]:size-4.5">
                      {item.icon}
                    </span>
                  )}
                  <CardTitle className="text-sm">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {item.type === "folder" && "page" && item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
