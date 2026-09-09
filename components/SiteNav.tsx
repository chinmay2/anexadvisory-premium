"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Properties", "/properties"],
  ["Locations", "/locations"],
  ["About us", "/about"],
  ["Insights", "/insights"],
];

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`nav premium-nav${menuOpen ? " mobile-open" : ""}`}>
      <Link className="brand brand-mark" href="/" aria-label="ANEX Advisory home" onClick={closeMenu}>
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

      <button
        className="mobile-menu"
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        <span className="mobile-menu-icon" aria-hidden="true">
          {menuOpen ? "×" : "☰"}
        </span>
      </button>

      {menuOpen ? (
        <div className="mobile-navigation" id="mobile-navigation">
          <div className="mobile-navigation-links">
            <Link className={pathname === "/" ? "active" : ""} href="/" onClick={closeMenu}>Home</Link>
            {items.map(([label, href]) => (
              <Link
                key={href}
                className={pathname.startsWith(href) ? "active" : ""}
                href={href}
                onClick={closeMenu}
              >
                <span>{label}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <Link className="mobile-navigation-cta" href="/contact" onClick={closeMenu}>
            Let&apos;s connect <span>→</span>
          </Link>
        </div>
      ) : null}
    </header>
  );
}
