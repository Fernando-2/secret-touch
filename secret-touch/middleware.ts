// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Any path starting with /television
  const isTelevisionRoute = pathname.startsWith("/television");
  const isLoginRoute = pathname === "/television/login";

  // If it's not under /television, do nothing
  if (!isTelevisionRoute) {
    return NextResponse.next();
  }

  // Always allow the login page to load, even without cookie
  if (isLoginRoute) {
    return NextResponse.next();
  }

  // For all other /television routes, require the cookie
  const adminSession = req.cookies.get("admin_session")?.value;

  if (adminSession !== "true") {
    const loginUrl = new URL("/television/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Cookie is valid → allow access
  return NextResponse.next();
}

// Only run the middleware on /television routes
export const config = {
  matcher: ["/television", "/television/:path*"],
};
