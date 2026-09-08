"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --forest:  #1a3c2b;
  --leaf:    #2d6a4f;
  --fresh:   #4ade80;
  --sun:     #f4a261;
  --cream:   #fdfaf4;
  --chalk:   #f0ebe1;
  --char:    #1c1c1e;
  --muted:   #5c6b63;
  --border:  rgba(82,183,136,.18);
}

body { background: var(--cream); font-family: 'DM Sans', sans-serif; color: var(--char); overflow-x: hidden; }

/* ── HERO ─────────────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--forest);
}

.hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 70% 40%, rgba(74,222,128,.12) 0%, transparent 70%),
    radial-gradient(ellipse 50% 80% at 10% 80%, rgba(244,162,97,.10) 0%, transparent 60%),
    var(--forest);
}

.leaf-burst {
  position: absolute;
  top: -60px; right: -60px;
  width: 520px; height: 520px;
  opacity: .07;
  animation: rotateSlow 28s linear infinite;
}
@keyframes rotateSlow { to { transform: rotate(360deg); } }

.floaters { position: absolute; inset: 0; pointer-events: none; }
.floater {
  position: absolute; border-radius: 50%;
  background: var(--fresh); opacity: 0;
  animation: floatUp 8s ease-in-out infinite;
}
.floater:nth-child(1){ width:6px; height:6px; left:12%; animation-delay:0s; }
.floater:nth-child(2){ width:4px; height:4px; left:28%; animation-delay:1.4s; }
.floater:nth-child(3){ width:8px; height:8px; left:55%; animation-delay:2.8s; background:var(--sun); }
.floater:nth-child(4){ width:5px; height:5px; left:72%; animation-delay:0.7s; }
.floater:nth-child(5){ width:3px; height:3px; left:88%; animation-delay:3.5s; }
.floater:nth-child(6){ width:6px; height:6px; left:40%; animation-delay:1.9s; background:var(--sun); }

@keyframes floatUp {
  0%   { transform: translateY(100vh) scale(.5); opacity: 0; }
  20%  { opacity: .5; }
  80%  { opacity: .3; }
  100% { transform: translateY(-10vh) scale(1); opacity: 0; }
}

.hero-inner {
  position: relative; z-index: 2;
  max-width: 1160px; margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.hero-copy { color: #fff; }

.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 11px; font-weight: 600; letter-spacing: .1em;
  text-transform: uppercase; color: var(--fresh);
  background: rgba(74,222,128,.1);
  border: 1px solid rgba(74,222,128,.28);
  padding: 6px 14px; border-radius: 99px;
  margin-bottom: 24px;
}
.hero-eyebrow span { font-size: 14px; }

/* ── DISPLAY HEADLINE — matches screenshot: heavy Inter, two-tone ── */
.hero-h1 {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.8rem, 5.5vw, 4.4rem);
  font-weight: 900;
  line-height: 1.0;
  color: #fff;
  margin-bottom: 24px;
  letter-spacing: -.02em;
}
.hero-h1 .accent {
  display: block;
  color: var(--fresh);
  font-weight: 800;
}

.hero-lead {
  font-size: 1rem; line-height: 1.78;
  color: rgba(255,255,255,.68);
  max-width: 480px;
  margin-bottom: 40px;
  font-weight: 400;
}

.hero-cta {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--sun);
  color: var(--forest);
  font-family: 'Inter', sans-serif;
  font-weight: 700; font-size: 15px;
  padding: 14px 28px; border-radius: 8px;
  text-decoration: none;
  transition: transform .2s, box-shadow .2s;
}
.hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(244,162,97,.4); }

/* image mosaic */
.hero-mosaic {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 200px 160px;
  gap: 12px;
  border-radius: 20px;
  overflow: hidden;
}
.mosaic-img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform .6s ease;
}
.mosaic-img:hover { transform: scale(1.05); }
.mosaic-tall { grid-row: 1 / 3; }

/* ── STATS STRIP ──────────────────────────────────────────────── */
.stats-strip { background: var(--sun); padding: 28px 32px; }
.stats-inner {
  max-width: 1160px; margin: 0 auto;
  display: flex; justify-content: space-around; flex-wrap: wrap; gap: 24px;
}
.stat-item { text-align: center; }
.stat-num {
  font-family: 'Inter', sans-serif;
  font-size: 2.4rem; font-weight: 900;
  color: var(--forest); line-height: 1;
  letter-spacing: -.03em;
}
.stat-label { font-size: 12px; font-weight: 500; color: rgba(26,60,43,.7); margin-top: 4px; }

/* ── SECTION SHARED ───────────────────────────────────────────── */
.section { padding: 96px 32px; }
.section-inner { max-width: 1160px; margin: 0 auto; }

.section-tag {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 11px; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: var(--leaf);
  border-left: 3px solid var(--sun);
  padding-left: 10px;
  margin-bottom: 16px;
}

/* ── SECTION TITLES — Inter 800, tight tracking ── */
.section-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.9rem, 3.5vw, 2.8rem);
  font-weight: 800;
  color: var(--forest);
  line-height: 1.1;
  letter-spacing: -.025em;
  margin-bottom: 20px;
}
.section-body {
  font-size: 15px; line-height: 1.82; color: var(--muted);
  max-width: 640px; font-weight: 400;
}

/* ── WHO WE ARE ───────────────────────────────────────────────── */
.who-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: center;
}
.who-img-wrap { position: relative; }
.who-img-main {
  width: 100%; border-radius: 16px;
  object-fit: cover; height: 420px; display: block;
}
.who-badge {
  position: absolute; bottom: -20px; right: -20px;
  background: var(--sun); border-radius: 12px;
  padding: 18px 22px; text-align: center;
  box-shadow: 0 8px 28px rgba(244,162,97,.35);
}
.who-badge-num {
  font-family: 'Inter', sans-serif;
  font-size: 2rem; font-weight: 900; color: var(--forest); line-height: 1;
  letter-spacing: -.03em;
}
.who-badge-label { font-size: 11px; color: rgba(26,60,43,.7); font-weight: 500; }

.who-points { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; }
.who-point { display: flex; align-items: flex-start; gap: 14px; }
.point-icon {
  width: 38px; height: 38px; flex-shrink: 0;
  background: rgba(74,222,128,.12); border-radius: 10px;
  display: flex; align-items: center; justify-content: center; font-size: 18px;
}
.point-text strong { display: block; font-family: 'Inter', sans-serif; font-weight: 700; color: var(--forest); font-size: 14px; }
.point-text span { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* ── WHY US ───────────────────────────────────────────────────── */
.why-bg { background: var(--chalk); }
.why-cards {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 24px; margin-top: 48px;
}
.why-card {
  background: #fff; border-radius: 16px; padding: 32px 28px;
  border: 1px solid var(--border);
  transition: transform .25s, box-shadow .25s;
  position: relative; overflow: hidden;
}
.why-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--fresh), var(--sun));
  transform: scaleX(0); transform-origin: left;
  transition: transform .35s ease;
}
.why-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(45,106,79,.1); }
.why-card:hover::before { transform: scaleX(1); }
.card-emoji { font-size: 2.2rem; margin-bottom: 18px; display: block; }
.card-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem; font-weight: 700;
  color: var(--forest); margin-bottom: 10px;
  letter-spacing: -.01em;
}
.card-desc { font-size: 13.5px; color: var(--muted); line-height: 1.75; }

/* ── LOGISTICS ────────────────────────────────────────────────── */
.logistics-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: center;
}
.logistics-img { width: 100%; height: 400px; object-fit: cover; border-radius: 16px; }
.logistics-steps { display: flex; flex-direction: column; gap: 28px; margin-top: 32px; }
.log-step { display: flex; align-items: flex-start; gap: 18px; }
.step-num {
  width: 40px; height: 40px; flex-shrink: 0;
  background: var(--forest); color: #fff; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Inter', sans-serif; font-weight: 800; font-size: .95rem;
}
.step-body strong { display: block; font-family: 'Inter', sans-serif; font-weight: 700; color: var(--forest); font-size: 14px; margin-bottom: 4px; }
.step-body span { font-size: 13px; color: var(--muted); line-height: 1.65; }

/* ── PRODUCTS ─────────────────────────────────────────────────── */
.products-bg { background: var(--forest); color: #fff; }
.products-bg .section-tag { color: var(--fresh); }
.products-bg .section-title { color: #fff; }
.products-bg .section-body { color: rgba(255,255,255,.65); }

.products-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 20px; margin-top: 48px;
}
.product-card {
  border-radius: 14px; overflow: hidden;
  position: relative; cursor: default; transition: transform .3s;
}
.product-card:hover { transform: scale(1.03); }
.product-card img { width: 100%; height: 200px; object-fit: cover; display: block; }
.product-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(26,60,43,.9) 0%, transparent 55%);
  display: flex; align-items: flex-end; padding: 16px;
}
.product-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700; font-size: 13px; color: #fff;
  letter-spacing: -.01em;
}

/* ── TRUST STRIP ──────────────────────────────────────────────── */
.trust-strip {
  padding: 48px 32px;
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
}
.trust-inner {
  max-width: 1160px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 24px;
}
.trust-item { display: flex; align-items: center; gap: 12px; }
.trust-icon { font-size: 1.6rem; }
.trust-text strong { display: block; font-family: 'Inter', sans-serif; font-weight: 700; color: var(--forest); font-size: 14px; }
.trust-text span { font-size: 12px; color: var(--muted); }

/* ── CTA SECTION ──────────────────────────────────────────────── */
.cta-section {
  padding: 80px 32px; text-align: center;
  background: linear-gradient(135deg, var(--leaf), var(--forest));
  color: #fff;
}
.cta-section .section-title { color: #fff; margin-left: auto; margin-right: auto; }
.cta-desc { font-size: 15px; color: rgba(255,255,255,.7); margin: 16px auto 36px; max-width: 520px; line-height: 1.75; }
.cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.btn-primary {
  background: var(--sun); color: var(--forest);
  font-family: 'Inter', sans-serif; font-weight: 700; font-size: 15px;
  padding: 14px 32px; border-radius: 8px; text-decoration: none;
  transition: transform .2s, box-shadow .2s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(244,162,97,.5); }
.btn-outline {
  background: transparent; color: #fff;
  border: 1.5px solid rgba(255,255,255,.4);
  font-family: 'Inter', sans-serif; font-weight: 600; font-size: 15px;
  padding: 14px 32px; border-radius: 8px; text-decoration: none;
  transition: background .2s, border-color .2s;
}
.btn-outline:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.7); }

/* ── BREADCRUMB ───────────────────────────────────────────────── */
.breadcrumb-bar {
  padding: 14px 32px; max-width: 1160px; margin: 0 auto;
  display: flex; align-items: center; gap: 8px;
  font-family: 'Inter', sans-serif; font-size: 13px; color: var(--muted);
}
.breadcrumb-bar a { color: var(--muted); text-decoration: none; }
.breadcrumb-bar a:hover { color: var(--leaf); }
.breadcrumb-active-link { color: var(--sun); font-weight: 600; }

/* ── REVEAL ───────────────────────────────────────────────────── */
.reveal { opacity: 0; transform: translateY(32px); transition: opacity .7s ease, transform .7s ease; }
.reveal.visible { opacity: 1; transform: none; }

/* ── RESPONSIVE ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  .hero-inner, .who-grid, .logistics-grid { grid-template-columns: 1fr; gap: 40px; }
  .hero-mosaic { display: none; }
  .why-cards { grid-template-columns: 1fr 1fr; }
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .mosaic-tall { grid-row: auto; }
}
@media (max-width: 560px) {
  .why-cards, .products-grid { grid-template-columns: 1fr; }
  .section { padding: 64px 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .reveal, .floater, .leaf-burst { animation: none; transition: none; opacity: 1; transform: none; }
}
`;

function useCounter(target, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [val, ref];
}

function StatItem({ target, suffix = "", label }) {
  const [val, ref] = useCounter(target);
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-num">{val}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, style }) {
  const ref = useReveal();
  return <div ref={ref} className="reveal" style={style}>{children}</div>;
}

const PRODUCTS = [
  { name: "Fresh Mangoes",     img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80" },
  { name: "Green Bananas",     img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80" },
  { name: "Pomegranates",      img: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&q=80" },
  { name: "Exotic Vegetables", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80" },
  { name: "Grapes",            img: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=80" },
  { name: "Okra & Greens",     img: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=80" },
  { name: "Lychee",            img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80" },
  { name: "Bitter Gourd",      img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80" },
];

export default function AboutPage() {
  return (
    <>
      <style>{CSS}</style>

      {/* breadcrumb */}
      <div style={{ background: "var(--cream)" }}>
        <nav className="breadcrumb-bar">
          <Link href="/">Home</Link>
          <span>/</span>
          <span className="breadcrumb-active-link">About Us</span>
        </nav>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <svg className="leaf-burst" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
            <ellipse key={a} cx="150" cy="80" rx="18" ry="70" fill="white"
              transform={`rotate(${a} 150 150)`} />
          ))}
        </svg>
        <div className="floaters">
          {[1,2,3,4,5,6].map(i => <div key={i} className="floater" />)}
        </div>

        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow"><span>🌿</span> Farm-Fresh · Dubai Certified</div>
            <h1 className="hero-h1">
              Premium Export<br />
              <span className="accent">Fruits &amp; Vegetables</span>
            </h1>
            <p className="hero-lead">
              Farm-fresh produce from India, delivered to Dubai and the Gulf.
              Air-freighted within 24 hours of harvest, with full cold-chain integrity
              and zero compromise on quality.
            </p>
            <Link href="/contact" className="hero-cta">
              Get a Quote →
            </Link>
          </div>

          <div className="hero-mosaic">
            <img className="mosaic-img mosaic-tall"
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80"
              alt="Fresh fruits and vegetables" />
            <img className="mosaic-img"
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80"
              alt="Tropical fruits" />
            <img className="mosaic-img"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80"
              alt="Market produce" />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="stats-strip">
        <div className="stats-inner">
          <StatItem target={10}   suffix="+" label="Years of Export Experience" />
          <StatItem target={50}   suffix="+" label="Product Varieties" />
          <StatItem target={1900} suffix=""  label="Instagram Followers" />
          <StatItem target={24}   suffix="h" label="Farm-to-Flight Turnaround" />
          <StatItem target={100}  suffix="%" label="Quality Assured" />
        </div>
      </div>

      {/* ── WHO WE ARE ── */}
      <section className="section">
        <div className="section-inner">
          <div className="who-grid">
            <Reveal>
              <div className="who-img-wrap">
                <img className="who-img-main"
                  src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=700&q=80"
                  alt="Indian farm" />
                <div className="who-badge">
                  <div className="who-badge-num">2014</div>
                  <div className="who-badge-label">Founded</div>
                </div>
              </div>
            </Reveal>

            <Reveal style={{ transitionDelay: ".15s" }}>
              <div className="section-tag">Who We Are</div>
              <h2 className="section-title">India to the UAE —<br />Every Day, Fresh.</h2>
              <p className="section-body">
                CPNA Food Stuff is a Dubai-based importer specialising in premium
                fruits and vegetables sourced directly from farms across India. We
                handle the entire supply chain — farm liaison, quality sorting,
                cold-chain packaging, air and sea freight, and last-mile delivery
                to Al Aweer Central Fruit &amp; Vegetable Market.
              </p>
              <p className="section-body" style={{ marginTop: 14 }}>
                Our logistics team maintains active partnerships with major carriers,
                ensuring the freshest produce reaches concern points and customer places
                in the most timely manner — consistently, every consignment.
              </p>
              <div className="who-points">
                {[
                  { icon: "🏭", t: "Direct Farm Sourcing",  d: "We skip middlemen and work with certified Indian farms." },
                  { icon: "✈️", t: "Air & Sea Freight",     d: "Flexible shipping modes to match your order volume and urgency." },
                  { icon: "❄️", t: "Cold-Chain Integrity",  d: "Temperature-controlled from harvest to your warehouse door." },
                ].map(p => (
                  <div key={p.t} className="who-point">
                    <div className="point-icon">{p.icon}</div>
                    <div className="point-text">
                      <strong>{p.t}</strong>
                      <span>{p.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section why-bg">
        <div className="section-inner">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div className="section-tag" style={{ borderLeft: "none", borderBottom: "3px solid var(--sun)", paddingLeft: 0, paddingBottom: 6 }}>Why CPNA</div>
              <h2 className="section-title" style={{ margin: "0 auto 12px" }}>Freshness Is Our Only Standard</h2>
              <p className="section-body" style={{ margin: "0 auto" }}>
                We've built our reputation on three non-negotiables: quality you can taste,
                logistics you can rely on, and pricing that makes sense for your business.
              </p>
            </div>
          </Reveal>

          <div className="why-cards">
            {[
              { emoji: "🌾", title: "Farm-to-Flight in 24 h",    desc: "Our farm partners harvest to spec and we load to the aircraft within a single day — so your Dubai shelves receive produce at peak nutritional quality." },
              { emoji: "🚢", title: "Container & Air Options",    desc: "Running a large retail operation? Our sea-container rates beat local wholesale pricing. Need urgency? We have reserved air-cargo capacity on daily Dubai flights." },
              { emoji: "🏅", title: "Phytosanitary Certified",    desc: "Every shipment leaves India with full government phytosanitary certificates and Dubai Municipality approvals — zero customs hassle for your team." },
              { emoji: "📦", title: "Custom Packaging",           desc: "We pack to retail-shelf or bulk-market specs. Branded cartons, mesh bags, or loose — whatever your buyer or market stall requires." },
              { emoji: "🔗", title: "Carrier Partnerships",       desc: "CPNA holds tie-ups with all major Gulf-bound cargo carriers, giving us competitive freight rates and priority booking even in peak season." },
              { emoji: "📞", title: "Dedicated Account Support",  desc: "Every client gets a named logistics contact available 7 days a week. You'll always know exactly where your consignment is." },
            ].map((c, i) => (
              <Reveal key={c.title} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="why-card">
                  <span className="card-emoji">{c.emoji}</span>
                  <div className="card-title">{c.title}</div>
                  <p className="card-desc">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGISTICS FLOW ── */}
      <section className="section">
        <div className="section-inner">
          <div className="logistics-grid">
            <Reveal>
              <div className="section-tag">Our Process</div>
              <h2 className="section-title">From Indian Fields<br />to Dubai Tables</h2>
              <p className="section-body">
                A seamless, transparent supply chain means you can promise your
                customers consistency — and we help you keep that promise.
              </p>
              <div className="logistics-steps">
                {[
                  { n:1, t:"Farm Selection & Harvest",  d:"We audit partner farms for soil quality, pesticide compliance, and harvest timing." },
                  { n:2, t:"Sorting & Cold Packing",    d:"Produce is graded, sorted by size and ripeness, and packed in cold rooms within 2 h of harvest." },
                  { n:3, t:"Customs & Documentation",   d:"Export invoices, packing lists, phytosanitary certificates prepared and filed electronically." },
                  { n:4, t:"Air Freight / Container",   d:"Daily air cargo flights to Dubai; weekly container services for bulk orders." },
                  { n:5, t:"Al Aweer Market Delivery",  d:"Our Dubai ground team handles customs clearance and delivery to your stall or warehouse." },
                ].map(s => (
                  <div key={s.n} className="log-step">
                    <div className="step-num">{s.n}</div>
                    <div className="step-body">
                      <strong>{s.t}</strong>
                      <span>{s.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal style={{ transitionDelay: ".2s" }}>
              <img className="logistics-img"
                src="https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?w=700&q=80"
                alt="Cargo logistics" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="section products-bg">
        <div className="section-inner">
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div className="section-tag">What We Export</div>
              <h2 className="section-title">Seasonal Indian Produce</h2>
              <p className="section-body" style={{ margin: "0 auto" }}>
                From Alphonso mangoes to bitter gourd — we source what's at its peak
                and move it to Dubai before freshness fades.
              </p>
            </div>
          </Reveal>

          <div className="products-grid">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="product-card">
                  <img src={p.img} alt={p.name} />
                  <div className="product-overlay">
                    <span className="product-name">{p.name}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="trust-strip">
        <div className="trust-inner">
          {[
            { icon: "🇮🇳", t: "India Origin",       d: "Certified Indian farms" },
            { icon: "🇦🇪", t: "Dubai Licensed",      d: "UAE trade registered" },
            { icon: "📋", t: "Phytosanitary Cert",  d: "Every consignment" },
            { icon: "❄️", t: "Cold Chain",           d: "End-to-end integrity" },
            { icon: "⚡", t: "24 h Air Freight",     d: "Daily Dubai flights" },
          ].map(t => (
            <div key={t.t} className="trust-item">
              <span className="trust-icon">{t.icon}</span>
              <div className="trust-text">
                <strong>{t.t}</strong>
                <span>{t.d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="section-tag" style={{ color: "var(--fresh)", borderColor: "var(--sun)", display:"inline-block", marginBottom:16 }}>Get In Touch</div>
        <h2 className="section-title" style={{ maxWidth: 520 }}>
          Ready to Stock the Freshest Indian Produce?
        </h2>
        <p className="cta-desc">
          Whether you run a supermarket chain, a restaurant, or a market stall at
          Al Aweer — talk to us about competitive rates, minimum order quantities,
          and availability of your required produce.
        </p>
        <div className="cta-buttons">
          <Link href="/contact" className="btn-primary">Request a Quotation</Link>
          <a href="https://cpnafoods.com" target="_blank" rel="noreferrer" className="btn-outline">Visit Our Website</a>
        </div>
      </section>
    </>
  );
}