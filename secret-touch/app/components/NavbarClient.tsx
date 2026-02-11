// app/components/NavbarClient.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLink =
  "text-sm font-medium transition text-white/80 hover:text-[#BFFB00] data-[active=true]:text-[#BFFB00]";

export function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/10 bg-black/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          <span className="text-[#BFFB00]">Secret</span> Finish
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className={navLink} data-active={pathname === "/"}>
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
            href="/terms"
            className={navLink}
            data-active={pathname.startsWith("/terms")}
          >
            Terms
          </Link>

          <Link
            href="/gallery"
            className={navLink}
            data-active={pathname.startsWith("/gallery")}
          >
            Before & Afters
          </Link>

          <Link
            href="/contact"
            className={navLink}
            data-active={pathname.startsWith("/contact")}
          >
            Contact Us
          </Link>

          <Link
            href="/products"
            className={navLink}
            data-active={pathname.startsWith("/products")}
          >
            Products
          </Link>

          <Link
            href="/FAQs"
            className={navLink}
            data-active={pathname.startsWith("/FAQs")}
          >
            FAQs
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

          {/* ✅ Auth area */}
          {isLoggedIn ? (
            <Link
              href="/account"
              className={navLink}
              data-active={pathname.startsWith("/account")}
            >
              Account
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={navLink}
                data-active={pathname.startsWith("/auth/login")}
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className="rounded-full bg-[#BFFB00] px-3 py-1 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
