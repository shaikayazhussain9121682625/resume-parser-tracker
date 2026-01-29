
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex gap-6">
        <Link href="/dashboard" className="font-semibold">
          Dashboard
        </Link>

        <Link href="/upload" className="text-gray-600 hover:text-black">
          Upload Resume
        </Link>

        <Link href="/resumes" className="text-gray-600 hover:text-black">
          Resumes
        </Link>

        <Link href="/jobs" className="text-gray-600 hover:text-black">
          Job Applications
        </Link>
      </div>
    </nav>
  );
}
