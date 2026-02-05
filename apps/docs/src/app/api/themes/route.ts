import { NextResponse } from "next/server";
import { themes } from "@/registry/themes";

export async function GET() {
  return NextResponse.json(themes);
}
