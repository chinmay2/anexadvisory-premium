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

      <style>{`
        .mobile-navigation{display:none}
        @media(max-width:900px){
          .premium-nav{top:12px;left:12px;right:12px;transform:none;width:auto;min-height:62px;padding:10px 12px 10px 16px;border-radius:22px;z-index:100}
          .premium-nav .brand-symbol{width:30px;height:36px;font-size:26px}
          .premium-nav .brand-copy strong{font-size:17px}
          .premium-nav .brand-copy small{font-size:7px;margin-top:4px}
          .premium-nav .navcta{display:none}
          .premium-nav .mobile-menu{display:grid;flex:0 0 42px;width:42px;height:42px;border-radius:50%;padding:0;background:rgba(5,10,14,.5);cursor:pointer;appearance:none;font:inherit;place-items:center}
          .premium-nav .mobile-menu-icon{font-size:23px;line-height:1;font-weight:300}
          .premium-nav.mobile-open{border-color:rgba(212,161,90,.55);border-radius:22px 22px 0 0}
          .mobile-navigation{position:absolute;display:block;left:-1px;right:-1px;top:61px;padding:8px 16px 18px;background:rgba(5,10,14,.97);border:1px solid rgba(212,161,90,.28);border-top:0;border-radius:0 0 22px 22px;box-shadow:0 28px 60px rgba(0,0,0,.38);backdrop-filter:blur(20px)}
          .mobile-navigation-links{display:grid}
          .mobile-navigation-links a{display:flex;align-items:center;justify-content:space-between;padding:15px 4px;border-bottom:1px solid rgba(255,255,255,.09);color:#eee7db;font-size:13px;text-transform:uppercase;letter-spacing:.08em}
          .mobile-navigation-links a span:last-child{color:var(--anex-gold);font-size:16px}
          .mobile-navigation-links a.active{color:var(--anex-gold-soft)}
          .mobile-navigation-cta{display:flex;align-items:center;justify-content:space-between;margin-top:16px;padding:14px 16px;background:linear-gradient(135deg,#f0c47e,#c99447);color:#101010;border-radius:12px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em}
        }
      `}</style>
    </header>
  );
}
