import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function maintenanceMiddleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === "true") {
    return new NextResponse("Service Unavailable", {
      status: 503,
      headers: {
        "Retry-After": "3600",
      },
    });
  }

  return null;
}
