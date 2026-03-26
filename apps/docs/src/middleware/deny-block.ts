import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function denyBlockMiddleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/blocks")) {
    return new NextResponse("Service Unavailable", {
      status: 503,
      headers: {
        "Retry-After": "3600",
      },
    });
  }

  return null;
}
