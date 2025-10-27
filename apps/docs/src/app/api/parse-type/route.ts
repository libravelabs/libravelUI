import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { source } = await req.json();

  try {
    const clean = source.replace(/^@\//, "").replace(/\.tsx$/, "");
    console.log(clean);
    const jsonPath = path.resolve(`src/.generated/types/${clean}.json`);

    if (!fs.existsSync(jsonPath)) {
      return NextResponse.json(
        { error: `No generated type file found for ${clean}` },
        { status: 404 }
      );
    }

    const content = fs.readFileSync(jsonPath, "utf8");
    return NextResponse.json(JSON.parse(content));
  } catch (err) {
    console.error("parse-type error:", err);
    return NextResponse.json(
      { error: "Failed to load generated types" },
      { status: 500 }
    );
  }
}
