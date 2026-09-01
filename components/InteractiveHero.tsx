"use client";

import Link from "next/link";
import { PointerEvent, useRef } from "react";

const heroImage = "https://images.pexels.com/photos/28589265/pexels-photo-28589265.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function InteractiveHero() {
  const scene = useRef<HTMLDivElement>(null);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!scene.current || e.pointerType === "touch") return;
    const r = scene.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    scene.current.style.setProperty("--rx", `${y * -6}deg`);
    scene.current.style.setProperty("--ry", `${x * 7}deg`);
    scene.current.style.setProperty("--tx", `${x * 16}px`);
    scene.current.style.setProperty("--ty", `${y * 10}px`);
  };
  const leave = () => {
    if (!scene.current) return;
    ["--rx","--ry","--tx","--ty"].forEach(v => scene.current!.style.setProperty(v, v.includes("r") ? "0deg" : "0px"));
  };

  return (
    <section className="reference-hero" onPointerMove={move} onPointerLeave={leave} aria-labelledby="hero-title">
      <div className="reference-hero__image" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
      <div className="reference-hero__shade" aria-hidden="true" />
      <div className="reference-hero__blueGlow" aria-hidden="true" />
      <div className="reference-hero__grain" aria-hidden="true" />
      <div className="reference-hero__rail" aria-hidden="true"><span>01</span><i /><b /></div>

      <div className="container reference-hero__inner">
        <div className="reference-hero__copy">
          <div className="reference-hero__eyebrow">ANEX ADVISORY <span /> REAL ESTATE INTELLIGENCE</div>
          <h1 id="hero-title">Advisory for<br />decisions that<br /><em>shape what</em><br /><em>comes next.</em></h1>
          <p>Strategic advisory and project intelligence for organizations navigating complex opportunities, investments and growth.</p>
          <div className="reference-hero__actions">
            <Link className="reference-hero__primary" href="/contact">Start a conversation <span>↗</span></Link>
            <Link className="reference-hero__secondary" href="/projects">Explore our work <span>↗</span></Link>
          </div>
        </div>
        <div className="reference-hero__visual" ref={scene} aria-hidden="true">
          <div className="reference-hero__halo" /><div className="reference-hero__orb reference-hero__orb--large" /><div className="reference-hero__orb reference-hero__orb--small" /><div className="reference-hero__glass"><span>ANEX</span></div>
        </div>
      </div>

      <div className="container reference-hero__stats" aria-label="ANEX Advisory highlights">
        <div><strong>8+</strong><span>Years of<br />Experience</span></div><div><strong>150+</strong><span>Projects<br />Advised</span></div><div><strong>₹5,000Cr+</strong><span>Transaction<br />Value</span></div><div><strong>100%</strong><span>Commitment to<br />Success</span></div>
      </div>
      <div className="reference-hero__location" aria-hidden="true"><span>MUMBAI</span><i /><span>INDIA</span></div>

      <style jsx>{`
        .reference-hero{position:relative;min-height:780px;height:min(900px,100vh);overflow:hidden;isolation:isolate;background:#02070a;color:#f8f5ef}
        .reference-hero__image,.reference-hero__shade,.reference-hero__blueGlow,.reference-hero__grain{position:absolute;inset:0;pointer-events:none}

        /* Dark editorial architectural treatment — intentionally much darker than the previous version. */
        .reference-hero__image{z-index:-5;background-repeat:no-repeat;background-size:auto 94%;background-position:100% 50%;background-color:#02070a;filter:saturate(.25) contrast(1.04) brightness(.34) sepia(.07);transform:scale(.94);transform-origin:right center;transition:transform 1.2s cubic-bezier(.2,.7,.2,1),filter 1s ease}
        .reference-hero:hover .reference-hero__image{transform:scale(.955);filter:saturate(.29) contrast(1.05) brightness(.37) sepia(.08)}

        /* Heavy black veil on the left, with a deep navy/charcoal finish on the building instead of a bright photographic look. */
        .reference-hero__shade{z-index:-4;background:
          linear-gradient(90deg,
            rgba(1,6,9,1) 0%,
            rgba(1,6,9,.995) 17%,
            rgba(1,6,9,.96) 30%,
            rgba(1,6,9,.82) 43%,
            rgba(1,7,11,.62) 58%,
            rgba(2,8,13,.53) 74%,
            rgba(3,9,16,.58) 100%),
          linear-gradient(180deg,
            rgba(1,5,8,.78) 0%,
            rgba(1,6,9,.28) 35%,
            rgba(1,5,8,.48) 70%,
            rgba(1,5,8,.9) 100%),
          radial-gradient(circle at 84% 48%,rgba(25,43,76,.20),transparent 34%)}

        /* Reference-style restrained cool blue at the far right and a very soft warm architectural glow. */
        .reference-hero__blueGlow{z-index:-3;background:
          radial-gradient(circle at 88% 36%,rgba(48,67,132,.23),transparent 30%),
          radial-gradient(circle at 78% 54%,rgba(41,58,91,.12),transparent 30%),
          radial-gradient(circle at 67% 64%,rgba(190,137,57,.07),transparent 23%);
          mix-blend-mode:screen;opacity:.78}

        .reference-hero__grain{z-index:-2;opacity:.025;background-image:radial-gradient(rgba(255,255,255,.8) .5px,transparent .7px);background-size:5px 5px;mix-blend-mode:soft-light}
        .reference-hero__inner{position:relative;z-index:2;min-height:calc(100% - 150px);display:flex;align-items:center}
        .reference-hero__copy{width:min(650px,58vw);padding-top:45px}
        .reference-hero__eyebrow{display:flex;align-items:center;gap:10px;margin-bottom:24px;color:#d9a65f;font-size:10px;font-weight:600;letter-spacing:.27em;text-transform:uppercase}.reference-hero__eyebrow span{width:38px;height:1px;background:rgba(217,166,95,.75)}
        .reference-hero h1{margin:0;max-width:680px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(58px,6.1vw,90px);font-weight:400;line-height:.91;letter-spacing:-.065em;text-shadow:0 5px 32px rgba(0,0,0,.48)}.reference-hero h1 em{color:#e6b467;font-style:normal}
        .reference-hero__copy>p{max-width:535px;margin:28px 0 0;color:#c9c7c1;font-size:15px;line-height:1.65}
        .reference-hero__actions{display:flex;align-items:center;gap:12px;margin-top:30px;flex-wrap:wrap}.reference-hero__actions a{display:inline-flex;align-items:center;gap:13px;min-height:48px;padding:0 20px;border-radius:999px;font-size:12px;font-weight:700;transition:transform .25s ease}.reference-hero__actions a:hover{transform:translateY(-2px)}.reference-hero__primary{background:linear-gradient(135deg,#eab865,#c88e43);color:#111;box-shadow:0 16px 40px rgba(160,110,43,.16)}.reference-hero__secondary{color:#eee9df;border:1px solid rgba(255,255,255,.23);background:rgba(2,8,12,.32);backdrop-filter:blur(8px)}
        .reference-hero__visual{position:absolute;right:0;top:19%;width:48%;height:56%;perspective:1000px;transform-style:preserve-3d;transform:translate3d(var(--tx,0),var(--ty,0),0) rotateX(var(--rx,0)) rotateY(var(--ry,0));transition:transform .75s cubic-bezier(.2,.75,.2,1);pointer-events:none}
        .reference-hero__halo{position:absolute;width:360px;height:360px;right:20%;top:0;border-radius:50%;background:radial-gradient(circle,rgba(210,165,92,.11),transparent 68%);filter:blur(22px)}.reference-hero__orb{position:absolute;border:1px solid rgba(230,180,103,.26);border-radius:50%;background:radial-gradient(circle at 32% 25%,rgba(255,255,255,.62),rgba(255,255,255,.035) 25%,rgba(206,153,73,.10) 58%,rgba(0,0,0,.18) 78%);box-shadow:inset -18px -22px 42px rgba(0,0,0,.34),0 20px 70px rgba(0,0,0,.32);backdrop-filter:blur(2px)}.reference-hero__orb--large{width:150px;height:150px;right:27%;top:6%}.reference-hero__orb--small{width:74px;height:74px;right:3%;top:54%}
        .reference-hero__glass{position:absolute;width:50%;aspect-ratio:1.55;right:13%;top:30%;border:1px solid rgba(230,180,103,.48);border-radius:32px;background:linear-gradient(145deg,rgba(183,132,56,.34),rgba(5,15,22,.48) 42%,rgba(0,0,0,.12));transform:rotateX(58deg) rotateZ(-23deg);box-shadow:0 35px 100px rgba(0,0,0,.5),inset 0 1px 1px rgba(255,255,255,.18);backdrop-filter:blur(5px)}.reference-hero__glass span{position:absolute;right:13%;bottom:14%;color:rgba(255,245,220,.64);font:700 10px Arial,sans-serif;letter-spacing:.25em}
        .reference-hero__rail{position:absolute;left:max(18px,calc((100vw - 1240px)/2 - 28px));top:32%;z-index:4;display:flex;flex-direction:column;align-items:center;gap:10px;color:#dedbd4;font-size:10px;letter-spacing:.12em}.reference-hero__rail i{width:1px;height:52px;background:rgba(255,255,255,.18)}.reference-hero__rail b{width:3px;height:24px;border-radius:3px;background:#d9a65f}
        .reference-hero__stats{position:absolute;z-index:5;left:50%;bottom:34px;transform:translateX(-50%);display:grid;grid-template-columns:repeat(4,1fr);width:min(920px,calc(100% - 48px));padding:18px;border:1px solid rgba(255,255,255,.13);border-radius:20px;background:rgba(2,9,13,.82);backdrop-filter:blur(18px);box-shadow:0 24px 70px rgba(0,0,0,.42)}.reference-hero__stats>div{display:flex;align-items:center;gap:14px;padding:4px 20px;border-right:1px solid rgba(255,255,255,.10)}.reference-hero__stats>div:last-child{border-right:0}.reference-hero__stats strong{color:#eee8dc;font-family:Georgia,"Times New Roman",serif;font-size:25px;font-weight:400;white-space:nowrap}.reference-hero__stats span{color:#aaa9a4;font-size:9px;line-height:1.45;letter-spacing:.07em;text-transform:uppercase}
        .reference-hero__location{position:absolute;right:34px;bottom:22px;z-index:5;display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.44);font-size:8px;letter-spacing:.2em}.reference-hero__location i{width:22px;height:1px;background:rgba(217,166,95,.52)}
        @media(max-width:1200px){.reference-hero__image{background-size:auto 94%;background-position:100% 50%}.reference-hero__copy{width:min(610px,58vw)}}
        @media(max-width:900px){.reference-hero{min-height:820px;height:auto;padding:125px 0 190px}.reference-hero__image{background-size:auto 82%;background-position:100% 42%;transform:scale(.98)}.reference-hero__inner{min-height:610px;align-items:flex-start}.reference-hero__copy{width:100%;padding-top:20px}.reference-hero__visual{width:62%;height:42%;top:39%;right:-8%;opacity:.82}.reference-hero__stats{grid-template-columns:repeat(2,1fr);bottom:24px;width:calc(100% - 32px)}.reference-hero__stats>div{padding:10px 12px}.reference-hero__stats>div:nth-child(2){border-right:0}.reference-hero__stats>div:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.12)}.reference-hero__location,.reference-hero__rail{display:none}}
        @media(max-width:620px){.reference-hero h1{font-size:clamp(48px,13vw,68px)}.reference-hero__copy>p{font-size:13px;max-width:430px}.reference-hero__image{background-size:auto 72%;background-position:100% 38%;opacity:.72}.reference-hero__visual{width:76%;right:-18%;top:43%}.reference-hero__stats strong{font-size:20px}.reference-hero__stats span{font-size:8px}}
        @media(prefers-reduced-motion:reduce){.reference-hero__image,.reference-hero__visual{transition:none}}
      `}</style>
    </section>
  );
}
