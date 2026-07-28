import { NextRequest, NextResponse } from "next/server";
import { maintenanceMiddleware } from "./middleware/maintenance";

export function proxy(request: NextRequest) {
  const maintenance = maintenanceMiddleware(request);

  if (maintenance) {
    return maintenance;
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/docs/") && pathname.endsWith(".mdx")) {
    const url = request.nextUrl.clone();

    url.pathname = pathname
      .replace(/^\/docs/, "/llms.mdx")
      .replace(/\.mdx$/, "");

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
