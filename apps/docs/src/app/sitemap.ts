import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (
    process.env.NEXT_PUBLIC_APP_URL || "https://ui.libravelabs.com"
  ).replace(/\/$/, "");

  const pages = source.getPages().map((page) => ({
    url: `${url}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...pages,
  ];
}
