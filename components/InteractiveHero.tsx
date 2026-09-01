"use client";

import Link from "next/link";
import { PointerEvent, useRef } from "react";

export default function InteractiveHero() {
  const visual = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent<HTMLElement>) => {
    if (!visual.current || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    visual.current.style.setProperty("--rx", `${y * -4}deg`);
    visual.current.style.setProperty("--ry", `${x * 5}deg`);
    visual.current.style.setProperty("--tx", `${x * 10}px`);
    visual.current.style.setProperty("--ty", `${y * 7}px`);
  };

  const leave = () => {
    if (!visual.current) return;
    ["--rx", "--ry", "--tx", "--ty"].forEach((v) => visual.current?.style.setProperty(v, "0"));
  };

  return (
    <section className="reference-hero" onPointerMove={move} onPointerLeave={leave} aria-labelledby="hero-title">
      <div className="reference-hero__media" aria-hidden="true" />
      <div className="reference-hero__shade" aria-hidden="true" />
      <div className="reference-hero__warm" aria-hidden="true" />
      <div className="reference-hero__vignette" aria-hidden="true" />
      <div className="reference-hero__grain" aria-hidden="true" />

      <div className="reference-hero__rail" aria-hidden="true"><span>01</span><i /><b /></div>

      <div className="reference-hero__inner">
        <div className="reference-hero__copy">
          <div className="reference-hero__eyebrow">ANEX ADVISORY <span /> REAL ESTATE INTELLIGENCE</div>
          <h1 id="hero-title">Advisory for<br />decisions that<br /><em>shape what</em><br /><em>comes next.</em></h1>
          <p>Strategic advisory and project intelligence for organizations navigating complex opportunities, investments and growth.</p>
          <div className="reference-hero__actions">
            <Link className="reference-hero__primary" href="/contact">Start a conversation <span>→</span></Link>
            <Link className="reference-hero__secondary" href="/projects">Explore our work <span>↗</span></Link>
          </div>
        </div>

        <div className="reference-hero__visual" ref={visual} aria-hidden="true">
          <div className="reference-hero__halo" />
          <div className="reference-hero__orb reference-hero__orb--large" />
          <div className="reference-hero__orb reference-hero__orb--small" />
          <div className="reference-hero__glass"><span>ANEX</span></div>
        </div>
      </div>

      <div className="reference-hero__stats" aria-label="ANEX Advisory highlights">
        <div><strong>8+</strong><span>Years of<br />Experience</span></div>
        <div><strong>150+</strong><span>Projects<br />Advised</span></div>
        <div><strong>₹5,000Cr+</strong><span>Transaction<br />Value</span></div>
        <div><strong>100%</strong><span>Commitment to<br />Success</span></div>
      </div>

      <div className="reference-hero__location" aria-hidden="true"><span>MUMBAI</span><i /><span>INDIA</span></div>
    </section>
  );
}
