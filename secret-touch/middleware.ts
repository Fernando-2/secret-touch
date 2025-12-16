// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only care about /api/bookings...
  if (!pathname.startsWith("/api/bookings")) {
    return NextResponse.next();
  }

  // 1) Always allow the public availability endpoint
  if (pathname.startsWith("/api/bookings/public")) {
    return NextResponse.next();
  }

  // 2) Always allow POST /api/bookings so customers can create bookings
  if (req.method === "POST") {
    return NextResponse.next();
  }

  // 3) Everything else under /api/bookings requires admin_session
  const adminSession = req.cookies.get("admin_session")?.value;

  if (adminSession === "true") {
    return NextResponse.next();
  }

  // Not admin: block (used by admin dashboard only)
  return NextResponse.json(
    { error: "Unauthorized" },
    {
      status: 401,
    }
  );
}

export const config = {
  matcher: ["/api/bookings/:path*"],
};
