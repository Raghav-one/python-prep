import Link from "next/link";

const navLinks = [
  { href: "/concepts", label: "Python Concepts" },
  { href: "/interview-questions", label: "Interview Questions" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-950 text-sm font-bold text-accent-500 transition-colors group-hover:bg-navy-900">
            Py
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-navy-950">
            Python Interview Prep
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-surface hover:text-navy-950 sm:px-4"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/concepts"
            className="ml-1 hidden rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-900 sm:inline-flex sm:items-center"
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent-500" />
            Start learning
          </Link>
        </nav>
      </div>
    </header>
  );
}
