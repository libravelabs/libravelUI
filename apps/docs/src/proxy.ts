import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { maintenanceMiddleware } from "./middleware/maintenance";
import { denyBlockMiddleware } from "./middleware/deny-block";

export function proxy(request: NextRequest) {
  const maintenance = maintenanceMiddleware(request);
  const denyBlock = denyBlockMiddleware(request);

  if (maintenance) {
    return maintenance;
  }

  if (denyBlock) {
    return denyBlock;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
