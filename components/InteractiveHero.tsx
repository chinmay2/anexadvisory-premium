"use client";

import Link from "next/link";
import { PointerEvent, useRef } from "react";

// Cool editorial architectural treatment to match the supplied ANEX reference.
const heroImage = "https://images.pexels.com/photos/28589265/pexels-photo-28589265.jpeg?auto=compress&cs=tinysrgb&w=2400";

export default function InteractiveHero() {
  const scene = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!scene.current || e.pointerType === "touch") return;
    const r = scene.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    scene.current.style.setProperty("--rx", `${y * -5}deg`);
    scene.current.style.setProperty("--ry", `${x * 6}deg`);
    scene.current.style.setProperty("--tx", `${x * 12}px`);
    scene.current.style.setProperty("--ty", `${y * 8}px`);
  };

  const leave = () => {
    if (!scene.current) return;
    scene.current.style.setProperty("--rx", "0deg");
    scene.current.style.setProperty("--ry", "0deg");
    scene.current.style.setProperty("--tx", "0px");
    scene.current.style.setProperty("--ty", "0px");
  };

  return (
    <section className="reference-hero" onPointerMove={move} onPointerLeave={leave} aria-labelledby="hero-title">
      <div className="reference-hero__image" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
      <div className="reference-hero__shade" aria-hidden="true" />
      <div className="reference-hero__warmGlow" aria-hidden="true" />
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
        .reference-hero{
          position:relative;
          min-height:780px;
          height:min(900px,100vh);
          overflow:hidden;
          isolation:isolate;
          background:#020609;
          color:#f8f5ef;
        }
        .reference-hero__image,.reference-hero__shade,.reference-hero__warmGlow,.reference-hero__grain{
          position:absolute;inset:0;pointer-events:none;
        }

        /* Reference grade: cool midnight/steel architecture, not the previous brown/sepia cast. */
        .reference-hero__image{
          z-index:-5;
          background-repeat:no-repeat;
          background-size:cover;
          background-position:center center;
          background-color:#020609;
          filter:saturate(.82) contrast(1.06) brightness(.60);
          transform:scale(1.015);
          transform-origin:center center;
          transition:transform 1.2s cubic-bezier(.2,.7,.2,1),filter 1s ease;
        }
        .reference-hero:hover .reference-hero__image{
          transform:scale(1.025);
          filter:saturate(.86) contrast(1.07) brightness(.63);
        }

        /* Preserve the very dark left editorial field while keeping the building readable. */
        .reference-hero__shade{
          z-index:-4;
          background:
            linear-gradient(90deg,
              rgba(1,6,9,.99) 0%,
              rgba(1,6,9,.95) 18%,
              rgba(1,6,9,.82) 34%,
              rgba(1,6,9,.55) 50%,
              rgba(2,7,12,.30) 66%,
              rgba(4,10,20,.20) 82%,
              rgba(2,6,14,.28) 100%),
            linear-gradient(180deg,
              rgba(1,5,8,.62) 0%,
              rgba(1,6,10,.10) 34%,
              rgba(1,5,9,.16) 66%,
              rgba(1,5,8,.76) 100%);
        }

        /* Reference has a restrained cobalt-blue wash on the right with small warm architectural highlights. */
        .reference-hero__warmGlow{
          z-index:-3;
          background:
            radial-gradient(circle at 91% 39%,rgba(31,62,170,.30),transparent 30%),
            radial-gradient(circle at 84% 55%,rgba(22,46,112,.16),transparent 34%),
            radial-gradient(circle at 69% 54%,rgba(220,163,76,.075),transparent 23%),
            linear-gradient(90deg,rgba(0,8,18,0) 48%,rgba(7,20,52,.10) 72%,rgba(15,34,92,.16) 100%);
          mix-blend-mode:screen;
          opacity:.92;
        }

        .reference-hero__grain{
          z-index:-2;
          opacity:.022;
          background-image:radial-gradient(rgba(255,255,255,.8) .5px,transparent .7px);
          background-size:5px 5px;
          mix-blend-mode:soft-light;
        }

        .reference-hero__inner{
          position:relative;
          z-index:2;
          min-height:calc(100% - 150px);
          display:flex;
          align-items:center;
        }
        .reference-hero__copy{
          width:min(650px,58vw);
          padding-top:45px;
        }
        .reference-hero__eyebrow{
          display:flex;
          align-items:center;
          gap:10px;
          margin-bottom:24px;
          color:#d9a65f;
          font-size:10px;
          font-weight:600;
          letter-spacing:.27em;
          text-transform:uppercase;
        }
        .reference-hero__eyebrow span{width:38px;height:1px;background:rgba(217,166,95,.75)}
        .reference-hero h1{
          margin:0;
          max-width:680px;
          font-family:Georgia,"Times New Roman",serif;
          font-size:clamp(58px,6.1vw,90px);
          font-weight:400;
          line-height:.91;
          letter-spacing:-.065em;
          text-shadow:0 5px 32px rgba(0,0,0,.48);
        }
        .reference-hero h1 em{color:#e6b467;font-style:normal}
        .reference-hero__copy>p{
          max-width:535px;
          margin:28px 0 0;
          color:#c9c7c1;
          font-size:15px;
          line-height:1.65;
        }
        .reference-hero__actions{
          display:flex;
          align-items:center;
          gap:12px;
          margin-top:30px;
          flex-wrap:wrap;
        }
        .reference-hero__actions a{
          display:inline-flex;
          align-items:center;
          gap:13px;
          min-height:48px;
          padding:0 20px;
          border-radius:999px;
          font-size:12px;
          font-weight:700;
          transition:transform .25s ease;
        }
        .reference-hero__actions a:hover{transform:translateY(-2px)}
        .reference-hero__primary{
          background:linear-gradient(135deg,#efc173,#c88e43);
          color:#111;
          box-shadow:0 16px 40px rgba(160,110,43,.16);
        }
        .reference-hero__secondary{
          color:#eee9df;
          border:1px solid rgba(255,255,255,.23);
          background:rgba(2,8,12,.25);
          backdrop-filter:blur(8px);
        }

        .reference-hero__visual{
          position:absolute;
          right:1%;
          top:18%;
          width:49%;
          height:58%;
          perspective:1000px;
          transform-style:preserve-3d;
          transform:translate3d(var(--tx,0),var(--ty,0),0) rotateX(var(--rx,0)) rotateY(var(--ry,0));
          transition:transform .75s cubic-bezier(.2,.75,.2,1);
          pointer-events:none;
        }
        .reference-hero__halo{
          position:absolute;
          width:360px;height:360px;
          right:19%;top:0;
          border-radius:50%;
          background:radial-gradient(circle,rgba(45,70,150,.10),transparent 68%);
          filter:blur(22px);
        }
        .reference-hero__orb{
          position:absolute;
          border:1px solid rgba(230,180,103,.30);
          border-radius:50%;
          background:radial-gradient(circle at 32% 25%,rgba(255,255,255,.72),rgba(255,255,255,.035) 25%,rgba(206,153,73,.12) 58%,rgba(0,0,0,.18) 78%);
          box-shadow:inset -18px -22px 42px rgba(0,0,0,.34),0 20px 70px rgba(0,0,0,.32);
          backdrop-filter:blur(2px);
        }
        .reference-hero__orb--large{width:150px;height:150px;right:27%;top:6%}
        .reference-hero__orb--small{width:74px;height:74px;right:3%;top:54%}
        .reference-hero__glass{
          position:absolute;
          width:50%;
          aspect-ratio:1.55;
          right:13%;top:30%;
          border:1px solid rgba(230,180,103,.52);
          border-radius:32px;
          background:linear-gradient(145deg,rgba(183,132,56,.38),rgba(5,15,22,.46) 42%,rgba(0,0,0,.10));
          transform:rotateX(58deg) rotateZ(-23deg);
          box-shadow:0 35px 100px rgba(0,0,0,.5),inset 0 1px 1px rgba(255,255,255,.18);
          backdrop-filter:blur(5px);
        }
        .reference-hero__glass span{
          position:absolute;right:13%;bottom:14%;
          color:rgba(255,245,220,.68);
          font:700 10px Arial,sans-serif;
          letter-spacing:.25em;
        }

        .reference-hero__rail{
          position:absolute;
          left:max(18px,calc((100vw - 1240px)/2 - 28px));
          top:32%;
          z-index:4;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:10px;
          color:#dedbd4;
          font-size:10px;
          letter-spacing:.12em;
        }
        .reference-hero__rail i{width:1px;height:52px;background:rgba(255,255,255,.18)}
        .reference-hero__rail b{width:3px;height:24px;border-radius:3px;background:#d9a65f}

        .reference-hero__stats{
          position:absolute;
          z-index:5;
          left:50%;bottom:34px;
          transform:translateX(-50%);
          display:grid;
          grid-template-columns:repeat(4,1fr);
          width:min(920px,calc(100% - 48px));
          padding:18px;
          border:1px solid rgba(255,255,255,.13);
          border-radius:20px;
          background:rgba(2,9,13,.80);
          backdrop-filter:blur(18px);
          box-shadow:0 24px 70px rgba(0,0,0,.42);
        }
        .reference-hero__stats>div{
          display:flex;
          align-items:center;
          gap:14px;
          padding:4px 20px;
          border-right:1px solid rgba(255,255,255,.10);
        }
        .reference-hero__stats>div:last-child{border-right:0}
        .reference-hero__stats strong{
          color:#eee8dc;
          font-family:Georgia,"Times New Roman",serif;
          font-size:25px;
          font-weight:400;
          white-space:nowrap;
        }
        .reference-hero__stats span{
          color:#aaa9a4;
          font-size:9px;
          line-height:1.45;
          letter-spacing:.07em;
          text-transform:uppercase;
        }
        .reference-hero__location{
          position:absolute;
          right:34px;bottom:22px;
          z-index:5;
          display:flex;
          align-items:center;
          gap:8px;
          color:rgba(255,255,255,.44);
          font-size:8px;
          letter-spacing:.2em;
        }
        .reference-hero__location i{width:22px;height:1px;background:rgba(217,166,95,.52)}

        :global(.premium-nav){
          top:0!important;
          left:0!important;
          right:0!important;
          width:100%!important;
          max-width:none!important;
          min-height:78px;
          padding:16px 62px!important;
          border:0!important;
          border-radius:0!important;
          background:linear-gradient(180deg,rgba(1,6,9,.72),rgba(1,6,9,.08))!important;
          box-shadow:none!important;
          z-index:20;
        }
        :global(.premium-nav .brand-symbol){width:38px;height:44px;font-size:31px}
        :global(.premium-nav .brand-copy strong){font-size:19px;letter-spacing:.19em}
        :global(.premium-nav .brand-copy small){font-size:7px;letter-spacing:.35em;margin-top:4px}
        :global(.premium-nav .navlinks){gap:31px;font-size:10px}
        :global(.premium-nav .navlinks a){padding:14px 0;color:#f0ece4}
        :global(.premium-nav .navlinks a:after){bottom:5px}
        :global(.premium-nav .navcta){padding:10px 16px;border-radius:999px;font-size:10px}

        @media(max-width:1200px){
          .reference-hero__image{background-position:center center}
          .reference-hero__copy{width:min(610px,58vw)}
          :global(.premium-nav){padding-left:38px!important;padding-right:38px!important}
        }
        @media(max-width:900px){
          .reference-hero{min-height:820px;height:auto;padding:110px 0 190px}
          .reference-hero__image{background-size:cover;background-position:62% center}
          .reference-hero__inner{min-height:610px;align-items:flex-start}
          .reference-hero__copy{width:100%;padding-top:45px}
          .reference-hero__visual{width:62%;height:42%;top:39%;right:-8%;opacity:.82}
          .reference-hero__stats{grid-template-columns:repeat(2,1fr);bottom:24px;width:calc(100% - 32px)}
          .reference-hero__stats>div{padding:10px 12px}
          .reference-hero__stats>div:nth-child(2){border-right:0}
          .reference-hero__stats>div:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.12)}
          .reference-hero__location,.reference-hero__rail{display:none}
          :global(.premium-nav){min-height:70px;padding:12px 20px!important}
          :global(.premium-nav .navlinks){display:none}
          :global(.premium-nav .mobile-menu){display:grid}
          :global(.premium-nav .navcta){display:none}
        }
        @media(max-width:620px){
          .reference-hero h1{font-size:clamp(48px,13vw,68px)}
          .reference-hero__copy>p{font-size:13px;max-width:430px}
          .reference-hero__image{background-position:62% center}
          .reference-hero__visual{width:76%;right:-18%;top:43%}
          .reference-hero__stats strong{font-size:20px}
          .reference-hero__stats span{font-size:8px}
        }
        @media(prefers-reduced-motion:reduce){.reference-hero__image,.reference-hero__visual{transition:none}}
      `}</style>
    </section>
  );
}
