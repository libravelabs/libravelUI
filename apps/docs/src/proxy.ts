import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { maintenanceMiddleware } from "./middleware/maintenance";

export function proxy(request: NextRequest) {
  const maintenance = maintenanceMiddleware(request);

  if (maintenance) {
    return maintenance;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
