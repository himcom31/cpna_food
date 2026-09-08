"use client";

import { companyInfo } from "@/lib/data";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

  .mp-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f5f2ec;
    overflow-x: hidden;
  }

  /* ══════════════════════════════════════
     HERO — icon-driven banner, no photography
  ══════════════════════════════════════ */
  .mp-hero {
    position: relative;
    background: linear-gradient(155deg, #2a1608 0%, #46220c 55%, #7a3611 100%);
    padding: 120px 40px 100px;
    overflow: hidden;
  }
  .mp-hero-grain {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 15% 20%, rgba(249,115,22,0.16) 0%, transparent 40%),
      radial-gradient(circle at 85% 75%, rgba(249,115,22,0.12) 0%, transparent 45%);
    pointer-events: none;
  }
  .mp-hero-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
  }
  .mp-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.4);
    margin-bottom: 32px;
  }
  .mp-breadcrumb a {
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    transition: color 0.2s;
  }
  .mp-breadcrumb a:hover { color: #fff; }
  .mp-breadcrumb-active { color: #f97316; }

  .mp-hero-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 56px;
    align-items: end;
  }
  .mp-hero-title {
    font-size: clamp(46px, 6.5vw, 80px);
    font-weight: 800;
    color: #fff;
    line-height: 1.02;
    letter-spacing: -0.03em;
    margin: 0;
  }
  .mp-hero-title .caveat {
    font-family: 'Caveat', cursive;
    color: #fb923c;
    font-size: 1.15em;
    font-weight: 700;
  }
  .mp-hero-sub {
    font-size: 15px;
    color: rgba(255,237,213,0.7);
    line-height: 1.75;
    margin: 22px 0 0;
    max-width: 460px;
  }
  .mp-hero-compass {
    justify-self: end;
    width: 168px;
    height: 168px;
    border-radius: 50%;
    border: 1.5px dashed rgba(251,146,60,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: none;
  }
  .mp-hero-compass::before {
    content: '';
    position: absolute;
    inset: 18px;
    border-radius: 50%;
    border: 1px solid rgba(251,146,60,0.2);
  }
  .mp-hero-compass span {
    font-size: 56px;
    animation: mp-spin 22s linear infinite;
    display: inline-block;
  }
  @keyframes mp-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* ══════════════════════════════════════
     STAT STRIP
  ══════════════════════════════════════ */
  .mp-stats {
    background: #1c0f06;
    padding: 0 40px;
  }
  .mp-stats-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    transform: translateY(-38px);
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 24px 60px rgba(30,10,0,0.25);
    overflow: hidden;
  }
  .mp-stat {
    padding: 30px 20px;
    text-align: center;
    border-right: 1px solid #eee2d4;
  }
  .mp-stat:last-child { border-right: none; }
  .mp-stat-num {
    font-size: clamp(26px, 3vw, 34px);
    font-weight: 800;
    color: #c2410c;
    letter-spacing: -0.02em;
    line-height: 1;
    margin: 0 0 8px;
    font-variant-numeric: tabular-nums;
  }
  .mp-stat-label {
    font-size: 12px;
    color: #6b6154;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
  }

  /* ══════════════════════════════════════
     MISSION STATEMENT
  ══════════════════════════════════════ */
  .mp-statement {
    padding: 0px 40px 100px;
  }
  .mp-statement-inner {
    max-width: 820px;
    margin: 0 auto;
    text-align: center;
  }
  .mp-eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: #c2410c;
    margin: 0 0 18px;
  }
  .mp-statement-text {
    font-size: clamp(20px, 2.6vw, 28px);
    font-weight: 600;
    color: #241a10;
    line-height: 1.55;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .mp-statement-rule {
    width: 56px;
    height: 3px;
    background: #f97316;
    border-radius: 3px;
    margin: 28px auto 0;
  }

  /* ══════════════════════════════════════
     PROCESS — numbered sequence (genuinely sequential)
  ══════════════════════════════════════ */
  .mp-process {
    background: #fff;
    padding: 100px 40px;
    border-top: 1px solid #ece3d5;
    border-bottom: 1px solid #ece3d5;
  }
  .mp-process-inner {
    max-width: 1100px;
    margin: 0 auto;
  }
  .mp-section-head {
    max-width: 560px;
    margin: 0 0 60px;
  }
  .mp-section-title {
    font-size: clamp(28px, 3.2vw, 38px);
    font-weight: 800;
    color: #241a10;
    letter-spacing: -0.025em;
    line-height: 1.15;
    margin: 10px 0 14px;
  }
  .mp-section-title .caveat {
    font-family: 'Caveat', cursive;
    color: #c2410c;
    font-size: 1.2em;
    font-weight: 700;
  }
  .mp-section-desc {
    font-size: 14.5px;
    color: #6b6154;
    line-height: 1.75;
    margin: 0;
  }

  .mp-process-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    position: relative;
  }
  .mp-process-row::before {
    content: '';
    position: absolute;
    top: 27px;
    left: 5%;
    right: 5%;
    height: 1px;
    background: repeating-linear-gradient(to right, #e7b78c 0 8px, transparent 8px 16px);
    z-index: 0;
  }
  .mp-step {
    position: relative;
    z-index: 1;
    padding-right: 20px;
  }
  .mp-step-num {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: #fff7ed;
    border: 2px solid #f97316;
    color: #c2410c;
    font-weight: 800;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s;
  }
  .mp-step:hover .mp-step-num {
    transform: scale(1.1);
    background: #f97316;
    color: #fff;
  }
  .mp-step-icon { font-size: 15px; margin-right: 2px; }
  .mp-step-title {
    font-size: 15px;
    font-weight: 800;
    color: #241a10;
    margin: 0 0 8px;
  }
  .mp-step-body {
    font-size: 13px;
    color: #7a7060;
    line-height: 1.7;
    margin: 0;
  }

  /* ══════════════════════════════════════
     COMMITMENTS — value pillars
  ══════════════════════════════════════ */
  .mp-values {
    padding: 100px 40px;
  }
  .mp-values-inner {
    max-width: 1100px;
    margin: 0 auto;
  }
  .mp-values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .mp-value {
    background: #fff;
    border: 1px solid #ece3d5;
    border-radius: 18px;
    padding: 30px 26px;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .mp-value:hover {
    border-color: #fbd0a8;
    box-shadow: 0 18px 40px rgba(194,65,12,0.1);
    transform: translateY(-5px);
  }
  .mp-value-icon {
    font-size: 30px;
    display: block;
    margin-bottom: 16px;
  }
  .mp-value-title {
    font-size: 15px;
    font-weight: 800;
    color: #241a10;
    margin: 0 0 9px;
  }
  .mp-value-body {
    font-size: 13px;
    color: #7a7060;
    line-height: 1.7;
    margin: 0;
  }

  /* ══════════════════════════════════════
     COMMITMENT BANNER (single accent quote)
  ══════════════════════════════════════ */
  .mp-band {
    background: #1c0f06;
    padding: 84px 40px;
    text-align: center;
  }
  .mp-band-inner {
    max-width: 700px;
    margin: 0 auto;
  }
  .mp-band-icon { font-size: 34px; margin-bottom: 20px; display: block; }
  .mp-band-text {
    font-size: clamp(19px, 2.4vw, 25px);
    font-weight: 700;
    color: #fff;
    line-height: 1.6;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .mp-band-text .caveat {
    font-family: 'Caveat', cursive;
    color: #fb923c;
    font-size: 1.2em;
  }

  /* ══════════════════════════════════════
     CTA
  ══════════════════════════════════════ */
  .mp-cta {
    padding: 100px 40px;
    text-align: center;
  }
  .mp-cta-inner { max-width: 560px; margin: 0 auto; }
  .mp-cta-title {
    font-size: clamp(28px, 3.4vw, 40px);
    font-weight: 800;
    color: #241a10;
    letter-spacing: -0.02em;
    margin: 0 0 14px;
  }
  .mp-cta-title .caveat {
    font-family: 'Caveat', cursive;
    color: #c2410c;
    font-size: 1.2em;
  }
  .mp-cta-sub {
    font-size: 14px;
    color: #7a7060;
    line-height: 1.75;
    margin: 0 0 32px;
  }
  .mp-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f97316;
    color: #fff;
    font-size: 13px;
    font-weight: 800;
    padding: 14px 28px;
    border-radius: 999px;
    text-decoration: none;
    transition: background 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
  }
  .mp-btn-primary:hover {
    background: #ea580c;
    transform: scale(1.04);
    box-shadow: 0 10px 28px rgba(249,115,22,0.35);
  }

  /* ── Reveal ── */
  .mp-reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .mp-reveal.visible { opacity: 1; transform: translate(0); }
  .mp-d1 { transition-delay: 0.03s; }
  .mp-d2 { transition-delay: 0.11s; }
  .mp-d3 { transition-delay: 0.19s; }
  .mp-d4 { transition-delay: 0.27s; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .mp-hero-grid { grid-template-columns: 1fr; }
    .mp-hero-compass { justify-self: start; width: 120px; height: 120px; }
    .mp-hero-compass span { font-size: 40px; }
    .mp-stats-inner { grid-template-columns: 1fr 1fr; }
    .mp-stat:nth-child(2) { border-right: none; }
    .mp-process-row { grid-template-columns: 1fr 1fr; gap: 34px; }
    .mp-process-row::before { display: none; }
    .mp-values-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 560px) {
    .mp-hero { padding: 90px 20px 76px; }
    .mp-stats, .mp-statement, .mp-process, .mp-values, .mp-band, .mp-cta { padding-left: 20px; padding-right: 20px; }
    .mp-stats-inner { grid-template-columns: 1fr; transform: translateY(-24px); }
    .mp-stat { border-right: none; border-bottom: 1px solid #eee2d4; }
    .mp-stat:last-child { border-bottom: none; }
    .mp-process-row { grid-template-columns: 1fr; }
    .mp-values-grid { grid-template-columns: 1fr; }
  }
`;

/* ── Data ── */
const STATS = [
  { num: "12+", label: "Years exporting Indian produce" },
  { num: "15+", label: "Countries served worldwide" },
  { num: "1,000+", label: "Metric tonnes shipped yearly" },
  { num: "70%", label: "Value returned to farmers" },
];

const PROCESS = [
  {
    icon: "🌱",
    title: "Source Responsibly",
    body: "We partner directly with growers across India's richest agricultural belts, cutting out layers of middlemen.",
  },
  {
    icon: "🔍",
    title: "Grade & Inspect",
    body: "Every lot passes multi-point quality checks against APEDA and destination-market standards before it moves.",
  },
  {
    icon: "❄️",
    title: "Cold Chain & Pack",
    body: "Temperature-controlled handling and export-grade packaging keep produce fresh from farm gate to port.",
  },
  {
    icon: "🚢",
    title: "Deliver On Time",
    body: "Coordinated logistics and documentation mean shipments clear customs and reach buyers exactly when promised.",
  },
];

const VALUES = [
  {
    icon: "🎯",
    title: "Customer-First Improvement",
    body: "We continuously refine our services and operations around what buyers actually need — not what's easiest for us.",
  },
  {
    icon: "👂",
    title: "Listening to the Market",
    body: "Understanding customers' latest needs shapes every sourcing and packaging decision we make, season after season.",
  },
  {
    icon: "🌏",
    title: "International Expansion",
    body: "We're building a deliberate presence in new international markets rather than chasing every opportunity at once.",
  },
  {
    icon: "🏷️",
    title: "Brand Equity",
    body: "Every shipment is a chance to strengthen the CPNA name as a mark of consistency and trust, not just a transaction.",
  },
  {
    icon: "🔗",
    title: "Full Traceability",
    body: "From the exact farm to the destination port, our documentation leaves no gaps for buyers to question.",
  },
  {
    icon: "🤝",
    title: "Fair Partnerships",
    body: "Long-term relationships with farmers and buyers alike, built on consistent quality and honest terms.",
  },
];

function useReveal() {
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
      { threshold: 0.12 }
    );
    refs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  const r = (el) => { if (el && !refs.current.includes(el)) refs.current.push(el); };
  return r;
}

function useCountUp(target, active, duration = 1400) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!active) return;
    const match = String(target).match(/^([\d,]+)(.*)$/);
    if (!match) { setDisplay(target); return; }
    const end = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2];
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(end * eased);
      setDisplay(val.toLocaleString() + suffix);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return display;
}

function StatItem({ num, label, delay }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
        });
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const display = useCountUp(num, visible);
  return (
    <div className="mp-stat" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <p className="mp-stat-num">{display}</p>
      <p className="mp-stat-label">{label}</p>
    </div>
  );
}

export default function MissionPage() {
  const r = useReveal();

  return (
    <main className="mp-root">
      <style>{css}</style>

      {/* ══ HERO ══ */}
      <section className="mp-hero">
        <div className="mp-hero-grain" />
        <div className="mp-hero-inner">
          <nav className="mp-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="mp-breadcrumb-active">Mission</span>
          </nav>
          <div className="mp-hero-grid">
            <div>
              <h1 className="mp-hero-title">
                Our <span className="caveat">Mission</span>
              </h1>
              <p className="mp-hero-sub">
                What drives us every day at CPNA Food Stuff — from the first farm visit to the last mile of delivery.
              </p>
            </div>
            <div className="mp-hero-compass" aria-hidden="true">
              <span>🧭</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="mp-stats">
        <div className="mp-stats-inner">
          {STATS.map((s, i) => (
            <StatItem key={s.label} num={s.num} label={s.label} delay={i * 90} />
          ))}
        </div>
      </section>

      {/* ══ MISSION STATEMENT ══ */}
      <section className="mp-statement">
        <div className="mp-statement-inner mp-reveal" ref={r}>
          <p className="mp-eyebrow">Our Mission Statement</p>
          <p className="mp-statement-text">{companyInfo.mission}</p>
          <div className="mp-statement-rule" />
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="mp-process">
        <div className="mp-process-inner">
          <div className="mp-section-head mp-reveal" ref={r}>
            <p className="mp-eyebrow">How We Deliver On It</p>
            <h2 className="mp-section-title">
              From Farm To Port, <span className="caveat">Step By Step</span>
            </h2>
            <p className="mp-section-desc">
              Our mission isn't a slogan — it's a repeatable process we run on every single shipment.
            </p>
          </div>
          <div className="mp-process-row">
            {PROCESS.map((step, i) => (
              <div className={`mp-step mp-reveal mp-d${i + 1}`} key={step.title} ref={r}>
                <div className="mp-step-num">{i + 1}</div>
                <h3 className="mp-step-title"><span className="mp-step-icon">{step.icon}</span>{step.title}</h3>
                <p className="mp-step-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="mp-values">
        <div className="mp-values-inner">
          <div className="mp-section-head mp-reveal" ref={r}>
            <p className="mp-eyebrow">What Guides Every Decision</p>
            <h2 className="mp-section-title">
              The Commitments Behind <span className="caveat">Our Mission</span>
            </h2>
            <p className="mp-section-desc">
              Six practical commitments we hold ourselves to, drawn straight from how we actually operate.
            </p>
          </div>
          <div className="mp-values-grid">
            {VALUES.map((v, i) => (
              <div className={`mp-value mp-reveal mp-d${Math.min(i + 1, 4)}`} key={v.title} ref={r}>
                <span className="mp-value-icon">{v.icon}</span>
                <h3 className="mp-value-title">{v.title}</h3>
                <p className="mp-value-body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BAND ══ */}
      <section className="mp-band">
        <div className="mp-band-inner mp-reveal" ref={r}>
          <span className="mp-band-icon">🌾</span>
          <p className="mp-band-text">
            Every crate we ship carries a promise: <span className="caveat">consistent quality</span>, on time, every time.
          </p>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="mp-cta">
        <div className="mp-cta-inner mp-reveal" ref={r}>
          <h2 className="mp-cta-title">
            Want To Work With <span className="caveat">Us?</span>
          </h2>
          <p className="mp-cta-sub">
            Whether you're sourcing produce or growing it, our mission has room for your partnership too.
          </p>
          <Link href="/#contact" className="mp-btn-primary">
            Get in Touch →
          </Link>
        </div>
      </section>
    </main>
  );
}