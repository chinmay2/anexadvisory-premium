"use client";

import Link from "next/link";
import { PointerEvent, useRef } from "react";

const heroImage =
  "https://images.pexels.com/photos/13385854/pexels-photo-13385854.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function InteractiveHero() {
  const scene = useRef<HTMLDivElement>(null);

  function move(e: PointerEvent<HTMLDivElement>) {
    if (!scene.current || e.pointerType === "touch") return;
    const r = scene.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    scene.current.style.setProperty("--rx", `${y * -6}deg`);
    scene.current.style.setProperty("--ry", `${x * 7}deg`);
    scene.current.style.setProperty("--tx", `${x * 16}px`);
    scene.current.style.setProperty("--ty", `${y * 10}px`);
  }

  function leave() {
    if (!scene.current) return;
    scene.current.style.setProperty("--rx", "0deg");
    scene.current.style.setProperty("--ry", "0deg");
    scene.current.style.setProperty("--tx", "0px");
    scene.current.style.setProperty("--ty", "0px");
  }

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
          <div className="reference-hero__halo" />
          <div className="reference-hero__orb reference-hero__orb--large" />
          <div className="reference-hero__orb reference-hero__orb--small" />
          <div className="reference-hero__glass"><span>ANEX</span></div>
        </div>
      </div>

      <div className="container reference-hero__stats" aria-label="ANEX Advisory highlights">
        <div><strong>8+</strong><span>Years of<br />Experience</span></div>
        <div><strong>150+</strong><span>Projects<br />Advised</span></div>
        <div><strong>₹5,000Cr+</strong><span>Transaction<br />Value</span></div>
        <div><strong>100%</strong><span>Commitment to<br />Success</span></div>
      </div>
      <div className="reference-hero__location" aria-hidden="true"><span>MUMBAI</span><i /><span>INDIA</span></div>

      <style jsx>{`
        .reference-hero{position:relative;min-height:780px;height:min(900px,100vh);overflow:hidden;isolation:isolate;background:#030a0f;color:#f8f5ef}
        .reference-hero__image,.reference-hero__shade,.reference-hero__blueGlow,.reference-hero__grain{position:absolute;inset:0;pointer-events:none}

        /* Keep the complete architectural frame visible. The previous cover rule
           enlarged the source until its top/bottom edges were cropped. The reference
           composition uses the building as a contained cinematic panel on the right. */
        .reference-hero__image{
          z-index:-5;
          left:auto;
          right:0;
          top:0;
          bottom:0;
          width:100%;
          height:100%;
          background-repeat:no-repeat;
          background-size:auto 100%;
          background-position:right center;
          background-color:#030a0f;
          filter:saturate(.62) contrast(1.08) brightness(.62);
          transform:scale(1);
          transform-origin:center right;
          transition:transform 1.2s cubic-bezier(.2,.7,.2,1);
        }
        .reference-hero:hover .reference-hero__image{transform:scale(1.012)}

        .reference-hero__shade{z-index:-4;background:linear-gradient(90deg,rgba(3,10,15,1) 0%,rgba(3,10,15,.985) 15%,rgba(3,10,15,.88) 30%,rgba(3,10,15,.55) 47%,rgba(3,10,15,.18) 67%,rgba(3,10,15,.28) 100%),linear-gradient(0deg,rgba(3,10,15,.9) 0%,rgba(3,10,15,.08) 44%,rgba(3,10,15,.28) 100%)}
        .reference-hero__blueGlow{z-index:-3;background:radial-gradient(circle at 89% 36%,rgba(42,78,255,.38),transparent 27%),radial-gradient(circle at 72% 70%,rgba(214,161,78,.11),transparent 25%);mix-blend-mode:screen}
        .reference-hero__grain{z-index:-2;opacity:.045;background-image:radial-gradient(rgba(255,255,255,.8) .5px,transparent .7px);background-size:5px 5px;mix-blend-mode:soft-light}
        .reference-hero__inner{position:relative;z-index:2;min-height:calc(100% - 150px);display:flex;align-items:center}
        .reference-hero__copy{width:min(650px,58vw);padding-top:45px}
        .reference-hero__eyebrow{display:flex;align-items:center;gap:10px;margin-bottom:24px;color:#d9a65f;font-size:10px;font-weight:600;letter-spacing:.27em;text-transform:uppercase}.reference-hero__eyebrow span{width:38px;height:1px;background:rgba(217,166,95,.75)}
        .reference-hero h1{margin:0;max-width:680px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(58px,6.1vw,90px);font-weight:400;line-height:.91;letter-spacing:-.065em;text-shadow:0 5px 32px rgba(0,0,0,.32)}.reference-hero h1 em{color:#e6b467;font-style:normal}
        .reference-hero__copy>p{max-width:535px;margin:28px 0 0;color:#d4d2cd;font-size:15px;line-height:1.65}
        .reference-hero__actions{display:flex;align-items:center;gap:12px;margin-top:30px;flex-wrap:wrap}.reference-hero__actions a{display:inline-flex;align-items:center;gap:13px;min-height:48px;padding:0 20px;border-radius:999px;font-size:12px;font-weight:700;transition:transform .25s ease,box-shadow .25s ease}.reference-hero__actions a:hover{transform:translateY(-2px)}
        .reference-hero__primary{background:linear-gradient(135deg,#f1c477,#ce9548);color:#111;box-shadow:0 16px 40px rgba(204,148,70,.2)}.reference-hero__secondary{color:#f3eee5;border:1px solid rgba(255,255,255,.28);background:rgba(4,11,16,.24);backdrop-filter:blur(8px)}.reference-hero__actions span{font-size:16px;line-height:1}
        .reference-hero__visual{position:absolute;right:0;top:19%;width:48%;height:56%;perspective:1000px;transform-style:preserve-3d;transform:translate3d(var(--tx,0),var(--ty,0),0) rotateX(var(--rx,0)) rotateY(var(--ry,0));transition:transform .75s cubic-bezier(.2,.75,.2,1);pointer-events:none}
        .reference-hero__halo{position:absolute;width:360px;height:360px;right:20%;top:0;border-radius:50%;background:radial-gradient(circle,rgba(236,190,108,.17),transparent 68%);filter:blur(22px)}
        .reference-hero__orb{position:absolute;border:1px solid rgba(230,180,103,.28);border-radius:50%;background:radial-gradient(circle at 32% 25%,rgba(255,255,255,.72),rgba(255,255,255,.06) 25%,rgba(206,153,73,.12) 58%,rgba(0,0,0,.1) 78%);box-shadow:inset -18px -22px 42px rgba(0,0,0,.24),0 20px 70px rgba(0,0,0,.25);backdrop-filter:blur(2px)}.reference-hero__orb--large{width:150px;height:150px;right:27%;top:6%}.reference-hero__orb--small{width:74px;height:74px;right:3%;top:54%}
        .reference-hero__glass{position:absolute;width:50%;aspect-ratio:1.55;right:13%;top:30%;border:1px solid rgba(230,180,103,.55);border-radius:32px;background:linear-gradient(145deg,rgba(206,153,74,.48),rgba(7,19,27,.34) 42%,rgba(0,0,0,.05));transform:rotateX(58deg) rotateZ(-23deg);box-shadow:0 35px 100px rgba(0,0,0,.4),inset 0 1px 1px rgba(255,255,255,.25);backdrop-filter:blur(5px)}.reference-hero__glass span{position:absolute;right:13%;bottom:14%;color:rgba(255,245,220,.7);font:700 10px Arial,sans-serif;letter-spacing:.25em}
        .reference-hero__rail{position:absolute;left:max(18px,calc((100vw - 1240px)/2 - 28px));top:32%;z-index:4;display:flex;flex-direction:column;align-items:center;gap:10px;color:#dedbd4;font-size:10px;letter-spacing:.12em}.reference-hero__rail i{width:1px;height:52px;background:rgba(255,255,255,.22)}.reference-hero__rail b{width:3px;height:24px;border-radius:3px;background:#d9a65f}
        .reference-hero__stats{position:absolute;z-index:5;left:50%;bottom:34px;transform:translateX(-50%);display:grid;grid-template-columns:repeat(4,1fr);width:min(920px,calc(100% - 48px));padding:18px;border:1px solid rgba(255,255,255,.15);border-radius:20px;background:rgba(3,12,17,.72);backdrop-filter:blur(18px);box-shadow:0 24px 70px rgba(0,0,0,.35)}.reference-hero__stats>div{display:flex;align-items:center;gap:14px;padding:4px 20px;border-right:1px solid rgba(255,255,255,.12)}.reference-hero__stats>div:last-child{border-right:0}.reference-hero__stats strong{color:#f4ede2;font-family:Georgia,"Times New Roman",serif;font-size:25px;font-weight:400;white-space:nowrap}.reference-hero__stats span{color:#b7b5ae;font-size:9px;line-height:1.45;letter-spacing:.07em;text-transform:uppercase}
        .reference-hero__location{position:absolute;right:34px;bottom:22px;z-index:5;display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.5);font-size:8px;letter-spacing:.2em}.reference-hero__location i{width:22px;height:1px;background:rgba(217,166,95,.6)}

        @media(max-width:1200px){
          .reference-hero__image{background-size:auto 100%;background-position:right center}
          .reference-hero__copy{width:min(610px,58vw)}
        }
        @media(max-width:900px){
          .reference-hero{min-height:820px;height:auto;padding:125px 0 190px}
          .reference-hero__image{background-size:auto 100%;background-position:78% center}
          .reference-hero__inner{min-height:610px;align-items:flex-start}
          .reference-hero__copy{width:100%;padding-top:20px}
          .reference-hero__visual{width:62%;height:42%;top:39%;right:-8%;opacity:.82}
          .reference-hero__stats{grid-template-columns:repeat(2,1fr);bottom:24px;width:calc(100% - 32px)}
          .reference-hero__stats>div{padding:10px 12px}.reference-hero__stats>div:nth-child(2){border-right:0}.reference-hero__location{display:none}
        }
        @media(max-width:600px){
          .reference-hero{min-height:900px}
          .reference-hero__image{background-size:auto 100%;background-position:72% center;filter:saturate(.58) contrast(1.05) brightness(.52)}
          .reference-hero h1{font-size:clamp(50px,14vw,68px);line-height:.94}
          .reference-hero__copy>p{font-size:14px;max-width:92%}
          .reference-hero__visual{width:78%;height:38%;top:44%;right:-16%;opacity:.72}
          .reference-hero__stats{grid-template-columns:1fr 1fr;padding:10px;border-radius:16px}
          .reference-hero__stats>div{gap:8px;padding:9px 7px}.reference-hero__stats strong{font-size:20px}.reference-hero__stats span{font-size:7px}.reference-hero__rail{display:none}
        }
        @media(prefers-reduced-motion:reduce){.reference-hero__image,.reference-hero__visual{transition:none}}
      `}</style>
    </section>
  );
}
