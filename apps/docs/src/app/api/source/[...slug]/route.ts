import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { fetchComponentSource, SourceResponse } from "@/lib/source-fetcher";
import { cleanCode } from "@/lib/code-utils";

const REGISTRY_PATH = path.join(process.cwd(), "public/registry.json");

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string[] }> },
) {
  const params = await context.params;
  const slug = params.slug;
  const rawSlug = slug.join("/");
  const normalizedSlug = rawSlug.replace(/\.(tsx|ts|jsx|js)$/, "");
  const componentName = slug[slug.length - 1].replace(/\.(tsx|ts|jsx|js)$/, "");

  if (process.env.NODE_ENV === "development") {
    try {
      const source = await fetchComponentSource(slug, componentName);
      if (source.files.length > 0) {
        source.files = source.files.map((file) => ({
          ...file,
          code: cleanCode(file.content),
        }));
        return NextResponse.json(source);
      }
    } catch (e) {
      console.warn(
        "Dev mode source fetch failed, falling back to registry:",
        e,
      );
    }
  }

  try {
    if (!fs.existsSync(REGISTRY_PATH)) {
      return NextResponse.json(
        { error: "Registry not found. Run 'npm run build:registry'" },
        { status: 404 },
      );
    }

    const registry = JSON.parse(
      fs.readFileSync(REGISTRY_PATH, "utf8"),
    ) as Record<string, SourceResponse>;

    let component = registry[componentName];

    if (!component) {
      component = registry[normalizedSlug];
    }

    if (!component) {
      return NextResponse.json(
        { error: "Component not found in registry" },
        { status: 404 },
      );
    }

    return NextResponse.json(component);
  } catch (err) {
    console.error("Error fetching source:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
