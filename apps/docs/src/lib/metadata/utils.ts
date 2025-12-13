import type { Metadata } from "next";
import { defaultMeta } from "./default";

type AddedMetadata = Metadata & {
  useSuffix?: boolean;
};

export function buildMetadata(input: AddedMetadata = {}): Metadata {
  const meta = { ...defaultMeta, ...input };
  const useSuffix = typeof meta.useSuffix === "boolean" ? meta.useSuffix : true;

  const fullTitle = useSuffix ? `${meta.title} – ${meta.siteName}` : meta.title;

  return {
    title: fullTitle,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: meta.canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: meta.description,
      url: meta.canonicalUrl,
      type: meta.ogType,
      images: [{ url: meta.ogImage }],
    },
    twitter: {
      card: meta.twitterCard,
      title: fullTitle,
      description: meta.description,
      images: [meta.ogImage],
    },
  };
}
