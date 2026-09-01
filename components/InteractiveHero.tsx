"use client";

import Image from "next/image";
import Link from "next/link";
import { PointerEvent, useRef } from "react";

const heroImage =
  "https://framerusercontent.com/images/0Ue86UX5iZmFiPAyhnml9yaJ0B0.jpg?scale-down-to=4096";

export default function InteractiveHero() {
  const scene = useRef<HTMLDivElement>(null);

  function move(e: PointerEvent<HTMLDivElement>) {
    if (!scene.current || e.pointerType === "touch") return;
    const r = scene.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    scene.current.style.setProperty("--mx", `${x * 18}deg`);
    scene.current.style.setProperty("--my", `${y * -14}deg`);
    scene.current.style.setProperty("--px", `${x * 28}px`);
    scene.current.style.setProperty("--py", `${y * 22}px`);
  }

  function leave() {
    scene.current?.style.setProperty("--mx", "0deg");
    scene.current?.style.setProperty("--my", "0deg");
    scene.current?.style.setProperty("--px", "0px");
    scene.current?.style.setProperty("--py", "0px");
  }

  return (
    <section className="hero premium-hero" onPointerMove={move} onPointerLeave={leave}>
      <Image className="hero-media" src={heroImage} alt="ANEX Advisory real estate project" fill priority sizes="100vw" />
      <div className="hero-overlay" />
      <div className="hero-grain" />

      <div className="container hero-content">
        <div className="hero-copy-wrap">
          <div className="eyebrow gold">ANEX ADVISORY · REAL ESTATE INTELLIGENCE</div>
          <h1>Advisory for decisions that <em>shape what comes next.</em></h1>
          <p className="hero-copy">
            Strategic advisory and project intelligence for developers, investors and societies — bringing clarity to complex opportunities, investments and growth.
          </p>
          <div className="actions">
            <Link className="btn primary gold-btn" href="/contact">Start a conversation <span>↗</span></Link>
            <Link className="btn ghost-btn" href="/projects">Explore our work <span>↗</span></Link>
          </div>
        </div>

        <div className="hero-scene" ref={scene} aria-hidden="true">
          <div className="hero-glass-plane"><span>ANEX</span></div>
          <div className="hero-orbit orbit-a" />
          <div className="hero-orbit orbit-b" />
          <div className="hero-orbit orbit-c" />
          <div className="hero-light" />
        </div>
      </div>

      <div className="container hero-stats" aria-label="ANEX Advisory highlights">
        <div><strong>8+</strong><span>Years of<br />experience</span></div>
        <div><strong>150+</strong><span>Projects<br />advised</span></div>
        <div><strong>₹5,000Cr+</strong><span>Transaction<br />value</span></div>
        <div><strong>100%</strong><span>Commitment to<br />success</span></div>
      </div>
    </section>
  );
}
