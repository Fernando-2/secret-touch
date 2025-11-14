"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Secret Touch
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/#services" className="hover:text-blue-600 transition">
            Services
          </Link>
          <Link href="/booking" className="hover:text-blue-600 transition">
            Booking
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition">
            Our Story
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t flex flex-col text-center pb-4">
          <Link
            href="/"
            className="py-2 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/#services"
            className="py-2 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/booking"
            className="py-2 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Booking
          </Link>
          <Link
            href="/about"
            className="py-2 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Our Story
          </Link>
        </div>
      )}
    </nav>
  );
}
