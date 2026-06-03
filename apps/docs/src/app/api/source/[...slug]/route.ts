import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const REGISTRY_PATH = path.join(process.cwd(), "public", "registry.json");

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      slug: string[];
    }>;
  },
) {
  try {
    const { slug } = await context.params;

    const key = slug.join("/");

    if (!fs.existsSync(REGISTRY_PATH)) {
      return NextResponse.json(
        {
          error: "Registry not found",
        },
        {
          status: 404,
        },
      );
    }

    const registry = JSON.parse(
      fs.readFileSync(REGISTRY_PATH, "utf8"),
    ) as Record<string, unknown>;

    const entry = registry[key];

    if (!entry) {
      return NextResponse.json(
        {
          error: "Registry entry not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(entry);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
