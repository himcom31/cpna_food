"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { companyInfo } from "@/lib/data";

/* ─────────────────────────────────────────────────────────────
   CSS
───────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

  /* ── Reveal animation base ── */
  .reveal {
    opacity: 0;
    transform: translateY(44px);
    transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1),
                transform 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left {
    opacity: 0;
    transform: translateX(-48px);
    transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                transform 0.85s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right {
    opacity: 0;
    transform: translateX(48px);
    transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                transform 0.85s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }

  /* delay helpers */
  .d1 { transition-delay: 0.05s; }
  .d2 { transition-delay: 0.15s; }
  .d3 { transition-delay: 0.25s; }
  .d4 { transition-delay: 0.35s; }

  /* ══════════════════════════════════════════════
     ABOUT — split layout (image left, text right)
  ══════════════════════════════════════════════ */
  .about-split {
    background: #f5f2ec;
    overflow: hidden;
  }
  .about-split-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 560px;
  }

  /* image side */
  .about-img-side {
    position: relative;
    overflow: hidden;
  }
  .about-img-side img {
    object-fit: cover;
    transition: transform 8s ease;
  }
  .about-img-side:hover img { transform: scale(1.04); }
  .about-img-badge {
    position: absolute;
    bottom: 28px;
    left: 28px;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(8px);
    border-radius: 14px;
    padding: 14px 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 2;
  }
  .about-img-badge-icon {
    font-size: 28px;
  }
  .about-img-badge-text strong {
    display: block;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: #162b0d;
    line-height: 1;
  }
  .about-img-badge-text span {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    color: #6a7860;
    font-weight: 500;
  }

  /* text side */
  .about-text-side {
    padding: 72px 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #5a9030;
    margin-bottom: 16px;
  }
  .section-eyebrow::before {
    content: '';
    display: block;
    width: 24px;
    height: 2px;
    background: #5a9030;
    border-radius: 2px;
  }
  .section-big-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(32px, 3.5vw, 46px);
    font-weight: 800;
    color: #162b0d;
    letter-spacing: -0.025em;
    line-height: 1.08;
    margin: 0 0 8px;
  }
  .caveat-accent {
    font-family: 'Caveat', cursive;
    font-weight: 700;
    color: #4a8a28;
    font-size: 1.25em;
  }
  .section-body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: #52503c;
    line-height: 1.85;
    margin: 20px 0 32px;
  }
  .about-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding-top: 28px;
    border-top: 1px solid #ddd8ce;
  }
  .stat-item {}
  .stat-num {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #162b0d;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .stat-num span {
    color: #4a8a28;
  }
  .stat-label {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: #8a8070;
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* ══════════════════════════════════════════════
     VISION — cinematic full-width banner
  ══════════════════════════════════════════════ */
  .vision-banner {
    position: relative;
    min-height: 520px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .vision-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .vision-bg img { object-fit: cover; }
  .vision-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      rgba(10,26,5,0.88) 0%,
      rgba(10,26,5,0.60) 55%,
      rgba(10,26,5,0.25) 100%
    );
    z-index: 1;
  }
  .vision-content {
    position: relative;
    z-index: 2;
    max-width: 1100px;
    margin: 0 auto;
    padding: 80px 56px;
    width: 100%;
  }
  .vision-content .section-eyebrow { color: #8fcc5a; }
  .vision-content .section-eyebrow::before { background: #8fcc5a; }
  .vision-content .section-big-title { color: #ffffff; }
  .vision-content .caveat-accent { color: #a0e060; }
  .vision-body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 16px;
    color: rgba(255,255,255,0.8);
    line-height: 1.85;
    max-width: 560px;
    margin: 20px 0 40px;
  }
  .vision-pillars {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  .vision-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    backdrop-filter: blur(6px);
    border-radius: 999px;
    padding: 10px 18px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 0.02em;
    transition: background 0.25s;
  }
  .vision-pill:hover { background: rgba(255,255,255,0.2); }
  .vision-pill-icon { font-size: 16px; }

  /* ══════════════════════════════════════════════
     MISSION — icon grid on warm cream
  ══════════════════════════════════════════════ */
  .mission-section {
    background: #ffffff;
    padding: 96px 24px;
  }
  .mission-inner {
    max-width: 1100px;
    margin: 0 auto;
  }
  .mission-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
    margin-bottom: 72px;
  }
  .mission-top-text {}
  .mission-top-img {
    position: relative;
    height: 380px;
    border-radius: 24px;
    overflow: hidden;
  }
  .mission-top-img img { object-fit: cover; }
  .mission-top-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,26,5,0.4) 0%, transparent 60%);
  }

  /* mission cards grid */
  .mission-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .mission-card {
    background: #f5f2ec;
    border-radius: 20px;
    padding: 28px 24px 24px;
    border: 1.5px solid #e2ddd4;
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                box-shadow 0.35s ease,
                border-color 0.25s ease;
  }
  .mission-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(50,80,20,0.12);
    border-color: #9acc70;
  }
  .mission-card-icon {
    font-size: 32px;
    margin-bottom: 14px;
    display: block;
  }
  .mission-card-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 16px;
    font-weight: 800;
    color: #162b0d;
    margin: 0 0 8px;
    letter-spacing: -0.01em;
  }
  .mission-card-body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    color: #6a6456;
    line-height: 1.7;
    margin: 0;
  }

  /* ── Section divider ── */
  .about-root-divider {
    height: 1px;
    background: linear-gradient(
      90deg, transparent 0%, #b5c89a 30%, #b5c89a 70%, transparent 100%
    );
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .about-split-inner { grid-template-columns: 1fr; min-height: auto; }
    .about-img-side { height: 300px; }
    .about-text-side { padding: 48px 24px; }
    .about-stats { grid-template-columns: repeat(3, 1fr); }
    .vision-content { padding: 64px 24px; }
    .mission-top { grid-template-columns: 1fr; gap: 32px; }
    .mission-top-img { height: 260px; }
    .mission-cards { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 480px) {
    .mission-cards { grid-template-columns: 1fr; }
    .about-stats { grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .stat-num { font-size: 22px; }
  }
`;

/* ─────────────────────────────────────────────────────────────
   Mission card data
───────────────────────────────────────────────────────────── */
const MISSION_CARDS = [
  {
    icon:  "🌱",
    title: "Sustainable Farming",
    body:  "Partnering with farmers who follow eco-conscious practices to protect soil health and biodiversity for future generations.",
  },
  {
    icon:  "📦",
    title: "Export Excellence",
    body:  "Stringent quality checks at every stage — from harvest to packaging — ensuring world-class produce reaches global markets.",
  },
  {
    icon:  "🤝",
    title: "Farmer Empowerment",
    body:  "Fair pricing, timely payments, and training programs that put income and dignity back in the hands of Indian farmers.",
  },
  {
    icon:  "🌍",
    title: "Global Reach",
    body:  "Active export relationships across Asia, Europe, and the Middle East, built on trust, consistency, and volume reliability.",
  },
  {
    icon:  "🔬",
    title: "Quality Assurance",
    body:  "FSSAI, APEDA, and internationally compliant certifications backed by lab testing on every major product batch.",
  },
  {
    icon:  "🚚",
    title: "Cold Chain Logistics",
    body:  "End-to-end temperature-controlled supply chains that preserve freshness from farm gate to your destination port.",
  },
];

/* Vision pillars */
const VISION_PILLARS = [
  { icon: "🌾", label: "Farm-to-Port Traceability" },
  { icon: "♻️", label: "Zero Waste Packaging" },
  { icon: "📈", label: "Growing 40% YoY" },
  { icon: "🏆", label: "Top 1% Export Quality" },
];

/* ─────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────── */
export default function AboutSection() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    refs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };

  return (
    <div>
      <style>{css}</style>

      {/* ════════════════════════════════
          ABOUT — split layout
      ════════════════════════════════ */}
      <section id="about" className="about-split">
        <div className="about-split-inner">

          {/* Image side */}
          <div className="about-img-side reveal-left" ref={addRef}>
            <Image
              src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&q=80"
              alt="Indian farm fields at sunrise"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
            />
            {/* floating badge */}
            <div className="about-img-badge reveal d2" ref={addRef}>
              <span className="about-img-badge-icon">🌿</span>
              <div className="about-img-badge-text">
                <strong>Est. 2012</strong>
                <span>Trusted Agro Exporters</span>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="about-text-side">
            <span className="section-eyebrow reveal d1" ref={addRef}>
              Who We Are
            </span>
            <h2 className="section-big-title reveal d1" ref={addRef}>
              Rooted in India,<br />
              <span className="caveat-accent">Grown for the World</span>
            </h2>
            <p className="section-body reveal d2" ref={addRef}>
              {companyInfo.about}
            </p>
            <div className="about-stats reveal d3" ref={addRef}>
              <div className="stat-item">
                <div className="stat-num">50<span>+</span></div>
                <div className="stat-label">Countries Served</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">12<span>k</span></div>
                <div className="stat-label">Tonnes / Year</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">98<span>%</span></div>
                <div className="stat-label">Client Retention</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="about-root-divider" />

      {/* ════════════════════════════════
          VISION — cinematic banner
      ════════════════════════════════ */}
      <section id="vision" className="vision-banner">
        {/* Background image */}
        <div className="vision-bg">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80"
            alt="Golden farmland at dusk"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="vision-overlay" />

        <div className="vision-content">
          <span className="section-eyebrow reveal d1" ref={addRef}>
            Where We Are Headed
          </span>
          <h2 className="section-big-title reveal d1" ref={addRef}>
            A Vision as Vast<br />
            <span className="caveat-accent">as India's Fields</span>
          </h2>
          <p className="vision-body reveal d2" ref={addRef}>
            {companyInfo.vision}
          </p>
          <div className="vision-pillars reveal d3" ref={addRef}>
            {VISION_PILLARS.map((p) => (
              <div key={p.label} className="vision-pill">
                <span className="vision-pill-icon">{p.icon}</span>
                {p.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="about-root-divider" />

      {/* ════════════════════════════════
          MISSION — icon cards
      ════════════════════════════════ */}
      <section id="mission" className="mission-section">
        <div className="mission-inner">

          {/* Top: heading + image */}
          <div className="mission-top">
            <div className="mission-top-text">
              <span className="section-eyebrow reveal d1" ref={addRef}>
                What Drives Us
              </span>
              <h2 className="section-big-title reveal d1" ref={addRef}>
                Our Mission,<br />
                <span className="caveat-accent">Our Promise</span>
              </h2>
              <p className="section-body reveal d2" ref={addRef}>
                {companyInfo.mission}
              </p>
            </div>
            <div className="mission-top-img reveal-right" ref={addRef}>
              <Image
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80"
                alt="Fresh vegetables being packed for export"
                fill
                sizes="(max-width:768px) 100vw, 45vw"
              />
              <div className="mission-top-img-overlay" />
            </div>
          </div>

          {/* Cards grid */}
          <div className="mission-cards">
            {MISSION_CARDS.map((card, i) => (
              <div
                key={card.title}
                className={`mission-card reveal d${Math.min(i + 1, 4)}`}
                ref={addRef}
              >
                <span className="mission-card-icon">{card.icon}</span>
                <h3 className="mission-card-title">{card.title}</h3>
                <p className="mission-card-body">{card.body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}