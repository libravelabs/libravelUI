import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url = (
    process.env.NEXT_PUBLIC_APP_URL || "https://ui.libravelabs.com"
  ).replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/api/"],
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
