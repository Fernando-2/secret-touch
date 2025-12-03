// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/booking", label: "Booking" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          Secret <span className="text-sky-400">Touch</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-sky-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="px-3 py-1 rounded-md border border-sky-500 text-sm hover:bg-sky-500 hover:text-slate-950 transition-colors"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden border border-slate-700 rounded-md px-2 py-1 text-sm"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-1 hover:text-sky-400"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="mt-2 px-3 py-2 rounded-md border border-sky-500 text-center hover:bg-sky-500 hover:text-slate-950 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
