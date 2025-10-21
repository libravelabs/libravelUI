import { NextResponse } from "next/server";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
import { extname } from "node:path";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string[] }> }
) {
  const params = await context.params;
  const slug = params.slug.join("/");
  const basePath = path.join(process.cwd(), "src");

  let filePath = path.join(basePath, slug);

  if (!extname(filePath)) {
    const tsxPath = `${filePath}.tsx`;
    const tsPath = `${filePath}.ts`;

    try {
      await stat(tsxPath);
      filePath = tsxPath;
    } catch {
      try {
        await stat(tsPath);
        filePath = tsPath;
      } catch {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }
    }
  }

  if (!filePath.startsWith(basePath)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const content = await readFile(filePath, "utf8");
    return NextResponse.json({
      files: [{ name: path.basename(filePath), content }],
    });
  } catch (err) {
    console.error("Error reading file:", err);
    return NextResponse.json({ error: "File read error" }, { status: 500 });
  }
}
