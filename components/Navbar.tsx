"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkStyle =
    "font-semibold tracking-wide text-gray-700 hover:text-indigo-700 transition cursor-pointer";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            href="/"
            className="font-extrabold text-xl text-indigo-700"
          >
            ResumeParser
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 items-center">

            <Link href="/dashboard" className={linkStyle}>
              Overview
            </Link>

            <Link href="/upload" className={linkStyle}>
              Upload Resume
            </Link>

            <Link href="/resumes" className={linkStyle}>
              Resumes
            </Link>

            <Link href="/jobs" className={linkStyle}>
              Job Applications
            </Link>

          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">

          <Link href="/dashboard" className="block px-6 py-3 hover:bg-gray-100">
            Overview
          </Link>

          <Link href="/upload" className="block px-6 py-3 hover:bg-gray-100">
            Upload Resume
          </Link>

          <Link href="/resumes" className="block px-6 py-3 hover:bg-gray-100">
            Resumes
          </Link>

          <Link href="/jobs" className="block px-6 py-3 hover:bg-gray-100">
            Job Applications
          </Link>

        </div>
      )}
    </nav>
  );
}
