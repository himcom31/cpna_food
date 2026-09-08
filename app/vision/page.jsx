"use client";

import { companyInfo } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

  /* ── Reset & base ── */
  .vp-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f5f2ec;
    overflow-x: hidden;
  }

  /* ══════════════════════════════════════
     HERO — full-width cinematic banner
  ══════════════════════════════════════ */
  .vp-hero {
    position: relative;
    height: 88vh;
    min-height: 560px;
    max-height: 780px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }
  .vp-hero-img {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .vp-hero-img img { object-fit: cover; }
  .vp-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      170deg,
      rgba(6,14,4,0.25) 0%,
      rgba(6,14,4,0.55) 50%,
      rgba(6,14,4,0.92) 100%
    );
    z-index: 1;
  }
  .vp-hero-content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 40px 72px;
  }

  /* breadcrumb */
  .vp-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.45);
    margin-bottom: 28px;
    letter-spacing: 0.04em;
  }
  .vp-breadcrumb a {
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    transition: color 0.2s;
  }
  .vp-breadcrumb a:hover { color: #fff; }
  .vp-breadcrumb-active { color: #7ecb45; }
  .vp-breadcrumb-sep { opacity: 0.3; }

  .vp-hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #7ecb45;
    margin-bottom: 16px;
  }
  .vp-hero-tag-line {
    width: 28px; height: 1.5px;
    background: #7ecb45;
    border-radius: 2px;
  }

  .vp-hero-title {
    font-size: clamp(44px, 7vw, 88px);
    font-weight: 800;
    color: #fff;
    line-height: 1.0;
    letter-spacing: -0.03em;
    margin: 0 0 6px;
  }
  .vp-hero-title-caveat {
    font-family: 'Caveat', cursive;
    font-size: clamp(50px, 8vw, 96px);
    font-weight: 700;
    color: #7ecb45;
    line-height: 0.95;
    display: block;
  }
  .vp-hero-sub {
    font-size: 15px;
    color: rgba(255,255,255,0.55);
    margin: 20px 0 0;
    max-width: 480px;
    line-height: 1.75;
    font-weight: 400;
  }

  /* scroll cue */
  .vp-scroll-cue {
    position: absolute;
    bottom: 32px;
    right: 40px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }
  .vp-scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
    animation: vp-scrollline 1.8s ease infinite;
  }
  @keyframes vp-scrollline {
    0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
    50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
    100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
  }

  /* ══════════════════════════════════════
     INTRO — big quote strip
  ══════════════════════════════════════ */
  .vp-quote-strip {
    background: #0b1f10;
    padding: 64px 40px;
  }
  .vp-quote-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 32px;
    align-items: start;
  }
  .vp-quote-mark {
    font-family: 'Caveat', cursive;
    font-size: 120px;
    line-height: 0.7;
    color: #7ecb45;
    opacity: 0.3;
    font-weight: 700;
    user-select: none;
  }
  .vp-quote-text {
    font-size: clamp(18px, 2.5vw, 26px);
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    line-height: 1.55;
    letter-spacing: -0.01em;
    font-style: italic;
  }
  .vp-quote-text em {
    font-style: normal;
    color: #7ecb45;
  }
  .vp-quote-author {
    margin-top: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
    font-style: normal;
  }

  /* ══════════════════════════════════════
     VISION BODY — split text + image
  ══════════════════════════════════════ */
  .vp-body-section {
    padding: 96px 40px;
    background: #f5f2ec;
  }
  .vp-body-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: center;
  }
  .vp-body-text {}
  .vp-section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #5a9030;
    margin-bottom: 16px;
  }
  .vp-section-eyebrow::before {
    content: '';
    display: block;
    width: 22px; height: 2px;
    background: #5a9030;
    border-radius: 2px;
  }
  .vp-section-title {
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 800;
    color: #162b0d;
    letter-spacing: -0.025em;
    line-height: 1.1;
    margin: 0 0 20px;
  }
  .vp-section-title .caveat {
    font-family: 'Caveat', cursive;
    color: #4a8a28;
    font-size: 1.2em;
    font-weight: 700;
  }
  .vp-body-para {
    font-size: 15px;
    color: #52503c;
    line-height: 1.85;
    margin: 0 0 16px;
  }

  .vp-body-img {
    position: relative;
    height: 480px;
    border-radius: 24px;
    overflow: hidden;
  }
  .vp-body-img img { object-fit: cover; }
  .vp-body-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,26,5,0.35) 0%, transparent 55%);
  }
  .vp-body-img-badge {
    position: absolute;
    top: 24px; right: 24px;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(8px);
    border-radius: 14px;
    padding: 12px 16px;
    font-size: 12px;
    font-weight: 700;
    color: #162b0d;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
  .vp-body-img-badge span {
    display: block;
    font-size: 10px;
    font-weight: 500;
    color: #6a7860;
    margin-top: 2px;
  }

  /* ══════════════════════════════════════
     PILLARS — 3-col icon cards on dark
  ══════════════════════════════════════ */
  .vp-pillars-section {
    background: #0b1f10;
    padding: 96px 40px;
  }
  .vp-pillars-inner {
    max-width: 1100px;
    margin: 0 auto;
  }
  .vp-pillars-header {
    text-align: center;
    margin-bottom: 56px;
  }
  .vp-pillars-header .vp-section-eyebrow {
    color: #7ecb45;
    justify-content: center;
  }
  .vp-pillars-header .vp-section-eyebrow::before { background: #7ecb45; }
  .vp-pillars-header .vp-section-title { color: #fff; }
  .vp-pillars-header .caveat { color: #a0e060; }

  .vp-pillars-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .vp-pillar {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(126,203,69,0.1);
    border-radius: 22px;
    padding: 32px 24px;
    transition: background 0.35s, border-color 0.35s,
                transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                box-shadow 0.35s;
  }
  .vp-pillar:hover {
    background: rgba(126,203,69,0.07);
    border-color: rgba(126,203,69,0.28);
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.3);
  }
  .vp-pillar-icon {
    font-size: 36px;
    margin-bottom: 18px;
    display: block;
  }
  .vp-pillar-title {
    font-size: 16px;
    font-weight: 800;
    color: #fff;
    margin: 0 0 10px;
    letter-spacing: -0.01em;
  }
  .vp-pillar-body {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    line-height: 1.75;
    margin: 0;
  }

  /* ══════════════════════════════════════
     TIMELINE — horizontal milestones
  ══════════════════════════════════════ */
  .vp-timeline-section {
    background: #f5f2ec;
    padding: 96px 40px;
  }
  .vp-timeline-inner {
    max-width: 1100px;
    margin: 0 auto;
  }
  .vp-timeline-header {
    margin-bottom: 56px;
  }
  .vp-timeline-track {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }
  /* connecting line */
  .vp-timeline-track::before {
    content: '';
    position: absolute;
    top: 22px;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #7ecb45 0%, #c8e8a0 100%);
    z-index: 0;
  }
  .vp-tl-item {
    position: relative;
    z-index: 1;
    padding: 0 16px 0 0;
  }
  .vp-tl-dot-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .vp-tl-dot {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid #7ecb45;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 16px rgba(126,203,69,0.25);
    flex: none;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                box-shadow 0.3s;
  }
  .vp-tl-item:hover .vp-tl-dot {
    transform: scale(1.15);
    box-shadow: 0 8px 24px rgba(126,203,69,0.4);
  }
  .vp-tl-year {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #162b0d;
    letter-spacing: -0.02em;
    margin: 0 0 4px;
  }
  .vp-tl-title {
    font-size: 13px;
    font-weight: 700;
    color: #3a6020;
    margin: 0 0 6px;
  }
  .vp-tl-desc {
    font-size: 12px;
    color: #7a7060;
    line-height: 1.65;
    margin: 0;
  }

  /* ══════════════════════════════════════
     CTA BANNER
  ══════════════════════════════════════ */
  .vp-cta-section {
    position: relative;
    overflow: hidden;
    background: #0b1f10;
    padding: 96px 40px;
    text-align: center;
  }
  .vp-cta-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .vp-cta-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(126,203,69,0.07);
  }
  .vp-cta-ring-1 { width: 600px; height: 600px; top: 50%; left: 50%; transform: translate(-50%,-50%); }
  .vp-cta-ring-2 { width: 900px; height: 900px; top: 50%; left: 50%; transform: translate(-50%,-50%); }
  .vp-cta-inner {
    position: relative;
    z-index: 1;
    max-width: 600px;
    margin: 0 auto;
  }
  .vp-cta-title {
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.025em;
    line-height: 1.1;
    margin: 0 0 16px;
  }
  .vp-cta-title .caveat {
    font-family: 'Caveat', cursive;
    color: #7ecb45;
    font-size: 1.2em;
  }
  .vp-cta-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.45);
    line-height: 1.75;
    margin: 0 0 36px;
  }
  .vp-cta-btns {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .vp-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #7ecb45;
    color: #0b1f10;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 800;
    padding: 14px 26px;
    border-radius: 999px;
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: background 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                box-shadow 0.25s;
  }
  .vp-btn-primary:hover {
    background: #93d962;
    transform: scale(1.04);
    box-shadow: 0 8px 28px rgba(126,203,69,0.4);
  }
  .vp-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: rgba(255,255,255,0.65);
    border: 1px solid rgba(255,255,255,0.18);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 14px 26px;
    border-radius: 999px;
    text-decoration: none;
    transition: border-color 0.25s, color 0.25s, background 0.25s;
  }
  .vp-btn-secondary:hover {
    border-color: rgba(255,255,255,0.4);
    color: #fff;
    background: rgba(255,255,255,0.06);
  }

  /* ── Reveal animations ── */
  .vp-reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1),
                transform 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .vp-reveal-left {
    opacity: 0;
    transform: translateX(-44px);
    transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                transform 0.85s cubic-bezier(0.22,1,0.36,1);
  }
  .vp-reveal-right {
    opacity: 0;
    transform: translateX(44px);
    transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                transform 0.85s cubic-bezier(0.22,1,0.36,1);
  }
  .vp-reveal.visible,
  .vp-reveal-left.visible,
  .vp-reveal-right.visible { opacity: 1; transform: translate(0); }

  .vp-d1 { transition-delay: 0.04s; }
  .vp-d2 { transition-delay: 0.13s; }
  .vp-d3 { transition-delay: 0.22s; }
  .vp-d4 { transition-delay: 0.31s; }
  .vp-d5 { transition-delay: 0.40s; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .vp-body-inner { grid-template-columns: 1fr; gap: 40px; }
    .vp-body-img { height: 320px; }
    .vp-pillars-grid { grid-template-columns: 1fr 1fr; }
    .vp-timeline-track {
      grid-template-columns: 1fr 1fr;
      gap: 36px;
    }
    .vp-timeline-track::before { display: none; }
  }
  @media (max-width: 560px) {
    .vp-hero-content { padding: 0 20px 56px; }
    .vp-quote-inner { grid-template-columns: 1fr; gap: 8px; }
    .vp-quote-mark { font-size: 72px; }
    .vp-body-section,
    .vp-pillars-section,
    .vp-timeline-section,
    .vp-cta-section { padding: 64px 20px; }
    .vp-pillars-grid { grid-template-columns: 1fr; }
    .vp-timeline-track { grid-template-columns: 1fr; gap: 28px; }
    .vp-scroll-cue { display: none; }
  }
`;

/* ── Data ── */
const PILLARS = [
  {
    icon: "🌾",
    title: "Farm-to-Port Transparency",
    body: "Every shipment is traceable from the exact farm in India to the destination port — full documentation, zero ambiguity.",
  },
  {
    icon: "🌍",
    title: "Borderless Fresh Produce",
    body: "Building a world where a farmer in Maharashtra can reliably supply a supermarket chain in Europe within 72 hours.",
  },
  {
    icon: "♻️",
    title: "Sustainable by Design",
    body: "Zero-waste packaging targets, water-efficient partner farms, and carbon-offset logistics for every container shipped.",
  },
  {
    icon: "🤝",
    title: "Farmer-First Economics",
    body: "We envision a supply chain where at least 70% of the final price flows back to the Indian farmer — not intermediaries.",
  },
  {
    icon: "📊",
    title: "Data-Driven Quality",
    body: "Real-time sensor data, AI-powered grading, and blockchain-backed certificates to guarantee consistent quality at scale.",
  },
  {
    icon: "🏆",
    title: "Global Standard Bearer",
    body: "To be recognised by 2030 as India's most trusted fresh-produce export brand across Asia, the Middle East, and Europe.",
  },
];

const TIMELINE = [
  {
    icon: "🌱",
    year: "2012",
    title: "Founded in Dubai",
    desc: "Started with a single container of Alphonso mangoes to the UAE market.",
  },
  {
    icon: "📦",
    year: "2016",
    title: "First 1,000 Tonnes",
    desc: "Expanded to vegetables & pulses, crossing 1,000 metric tonnes annually.",
  },
  {
    icon: "🌐",
    year: "2020",
    title: "15 Countries",
    desc: "Entered European & Southeast Asian markets with APEDA certification.",
  },
  {
    icon: "🚀",
    year: "2030",
    title: "Vision Target",
    desc: "50+ countries, 50,000 MT/year, and carbon-neutral cold chain operations.",
  },
];

export default function VisionPage() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    refs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const r = (el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };

  return (
    <main className="vp-root">
      <style>{css}</style>

      {/* ══ HERO ══ */}
      <section className="vp-hero">
        <div className="vp-hero-img">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=85"
            alt="Vast golden farmland — vision of CPNA Food Stuff"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="vp-hero-overlay" />

        <div className="vp-hero-content">
          <nav className="vp-breadcrumb">
            <Link href="/">Home</Link>
            <span className="vp-breadcrumb-sep">/</span>
            <span className="vp-breadcrumb-active">Vision</span>
          </nav>
          <div className="vp-hero-tag">
            <span className="vp-hero-tag-line" />
            CPNA Food Stuff
          </div>
          <h1 className="vp-hero-title">
            Our
            <span className="vp-hero-title-caveat">Vision</span>
          </h1>
          <p className="vp-hero-sub">
            A future where India's finest produce reaches every corner of the world — fresh, fast, and fairly traded.
          </p>
        </div>

        <div className="vp-scroll-cue">
          <div className="vp-scroll-line" />
          Scroll
        </div>
      </section>

      {/* ══ QUOTE STRIP ══ */}
      <section className="vp-quote-strip">
        <div className="vp-quote-inner vp-reveal vp-d1" ref={r}>
          <div className="vp-quote-mark">"</div>
          <div>
            <p className="vp-quote-text">
              We don't just export produce — we export <em>trust, freshness,</em> and the hard work of thousands of Indian farmers to tables across the world.
            </p>
            <p className="vp-quote-author">— Founder, CPNA Food Stuff</p>
          </div>
        </div>
      </section>

      {/* ══ VISION BODY ══ */}
      <section className="vp-body-section">
        <div className="vp-body-inner">
          <div className="vp-body-text">
            <span className="vp-section-eyebrow vp-reveal vp-d1" ref={r}>Our Vision Statement</span>
            <h2 className="vp-section-title vp-reveal vp-d1" ref={r}>
              A World That Tastes<br />
              <span className="caveat">India's Best</span>
            </h2>
            <p className="vp-body-para vp-reveal vp-d2" ref={r}>
              {companyInfo.vision}
            </p>
            <p className="vp-body-para vp-reveal vp-d2" ref={r}>
              At CPNA Food Stuff, we believe the gap between an Indian farm and an international dining table should be measured in days — not weeks. Our vision is to build an agro-export ecosystem that is transparent, scalable, and deeply rooted in the welfare of the farmer.
            </p>
            <p className="vp-body-para vp-reveal vp-d3" ref={r}>
              By 2030, we aim to serve 50+ countries, operate fully carbon-neutral logistics, and ensure that Indian agriculture commands the global premium it truly deserves. Every crate we ship is a step toward that future.
            </p>
          </div>

          <div className="vp-body-img vp-reveal-right vp-d2" ref={r}>
            <Image
              src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=900&q=85"
              alt="Indian farmer in lush green field"
              fill
              sizes="(max-width:900px) 100vw, 50vw"
            />
            <div className="vp-body-img-overlay" />
            <div className="vp-body-img-badge">
              🌿 APEDA Certified
              <span>Export-grade produce</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PILLARS ══ */}
      <section className="vp-pillars-section">
        <div className="vp-pillars-inner">
          <div className="vp-pillars-header">
            <span className="vp-section-eyebrow vp-reveal vp-d1" ref={r}>
              What We Stand For
            </span>
            <h2 className="vp-section-title vp-reveal vp-d1" ref={r}>
              Six Pillars of Our <span className="caveat">Vision</span>
            </h2>
          </div>
          <div className="vp-pillars-grid">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className={`vp-pillar vp-reveal vp-d${Math.min(i + 1, 5)}`}
                ref={r}
              >
                <span className="vp-pillar-icon">{p.icon}</span>
                <h3 className="vp-pillar-title">{p.title}</h3>
                <p className="vp-pillar-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="vp-timeline-section">
        <div className="vp-timeline-inner">
          <div className="vp-timeline-header">
            <span className="vp-section-eyebrow vp-reveal vp-d1" ref={r}>
              Our Journey
            </span>
            <h2 className="vp-section-title vp-reveal vp-d1" ref={r}>
              From Seed to <span className="caveat">Global Stage</span>
            </h2>
          </div>
          <div className="vp-timeline-track">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`vp-tl-item vp-reveal vp-d${i + 1}`}
                ref={r}
              >
                <div className="vp-tl-dot-wrap">
                  <div className="vp-tl-dot">{item.icon}</div>
                </div>
                <p className="vp-tl-year">{item.year}</p>
                <p className="vp-tl-title">{item.title}</p>
                <p className="vp-tl-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="vp-cta-section">
        <div className="vp-cta-rings">
          <div className="vp-cta-ring vp-cta-ring-1" />
          <div className="vp-cta-ring vp-cta-ring-2" />
        </div>
        <div className="vp-cta-inner vp-reveal vp-d1" ref={r}>
          <h2 className="vp-cta-title">
            Be Part of the <span className="caveat">Vision</span>
          </h2>
          <p className="vp-cta-sub">
            Whether you're a buyer, distributor, or farmer — there's a place for you in CPNA's growing global network. Let's build something extraordinary together.
          </p>
          <div className="vp-cta-btns">
            <Link href="/#contact" className="vp-btn-primary">
              Get in Touch →
            </Link>
            <Link href="/#about" className="vp-btn-secondary">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}