import { docs } from "@/.source";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: { slug: string[] };
}

export default function Page({ params }: PageProps) {
  const originalUrl = docs
    .map((i) => i.slug)
    .find((i) => i === params.slug.join("/"));
  if (!originalUrl) {
    notFound();
  }

  return redirect(`/${originalUrl.toLowerCase()}`);
}
