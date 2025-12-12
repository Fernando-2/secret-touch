import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (!process.env.ADMIN_PASSWORD) {
      console.error("ADMIN_PASSWORD is not set.");
      return NextResponse.json(
        { error: "Admin login is not configured" },
        { status: 500 }
      );
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true }, { status: 200 });

   // app/api/television/route.ts
res.cookies.set("admin_session", "true", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 8,
  sameSite: "lax",
});


    return res;
  } catch (err) {
    console.error("POST /api/television error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
