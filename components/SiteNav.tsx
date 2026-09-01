"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Locations", "/locations"],
  ["About us", "/about"],
  ["Insights", "/insights"],
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="nav premium-nav">
      <Link className="brand brand-mark" href="/" aria-label="ANEX Advisory home">
        <span className="brand-symbol" aria-hidden="true">A</span>
        <span className="brand-copy">
          <strong>ANEX</strong>
          <small>ADVISORY</small>
        </span>
      </Link>

      <nav className="navlinks" aria-label="Primary navigation">
        <Link className={pathname === "/" ? "active" : ""} href="/">Home</Link>
        {items.map(([label, href]) => (
          <Link
            key={href}
            className={pathname.startsWith(href) ? "active" : ""}
            href={href}
          >
            {label}
          </Link>
        ))}
      </nav>

      <Link className="navcta premium-outline" href="/contact">
        Let&apos;s connect <span>→</span>
      </Link>

      <Link className="mobile-menu" href="/contact" aria-label="Contact ANEX">↗</Link>
    </header>
  );
}
