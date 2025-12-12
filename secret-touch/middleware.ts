// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Allow the public bookings API through
  if (pathname.startsWith("/api/bookings/public")) {
    return NextResponse.next();
  }

  // 2) Only protect the private bookings API (admin-facing)
  if (pathname.startsWith("/api/bookings")) {
    const adminSession = req.cookies.get("admin_session")?.value;

    if (adminSession === "true") {
      // Admin is logged in; allow full bookings API
      return NextResponse.next();
    }

    // Not admin: block with 401 JSON (better for API than redirect)
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  // 3) Everything else: do nothing
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/bookings/:path*", // we are only running on /api/bookings...
  ],
};
