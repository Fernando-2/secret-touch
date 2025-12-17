// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLink =
  "text-sm font-medium transition hover:text-emerald-500 data-[active=true]:text-emerald-500";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-slate-900/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Secret Touch
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={navLink}
            data-active={pathname === "/"}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={navLink}
            data-active={pathname.startsWith("/about")}
          >
            About
          </Link>

           <Link
            href="/links"
            className={navLink}
            data-active={pathname.startsWith("/links")}
          >
            Links
          </Link>

          <Link
            href="/booking"
            className={navLink}
            data-active={pathname.startsWith("/booking")}
          >
            Book
          </Link>

          <Link
            href="/auth/login"
            className={navLink}
            data-active={pathname.startsWith("/auth/login")}
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-emerald-400"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
