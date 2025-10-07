import { docs } from "@/.source";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const joined = slug.join("/");
  const originalUrl = docs.docs.map((i) => i.slug).find((i) => i === joined);

  if (!originalUrl) {
    notFound();
  }

  return redirect(`/${originalUrl.toLowerCase()}`);
}
