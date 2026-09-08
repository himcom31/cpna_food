// ============================================================
// FILE: src/app/categories/pulses-grains/page.jsx
// ============================================================
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { pulsesGrains } from "@/lib/data";

const PG_TAGS = [
  "Premium grade","Bulk export","Sun-dried","Farm sorted",
  "Stone-cleaned","Hand-sorted","Protein rich","Traditional",
  "Limited stock","Imported","High yield","Local favourite",
];

const PG_ICONS = ["🌾","🫘","🌰","🍚","🫛","🌽","🧆","🥣","🌻","🍯","🪴","🧺"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  .pg-root{
    background:#fdfaf2;
    background-image:
      radial-gradient(circle at 1px 1px, rgba(180,131,45,.08) 1px, transparent 0);
    background-size:22px 22px;
    min-height:100vh;
    padding:44px 20px 72px;
    font-family:'Plus Jakarta Sans',sans-serif;
    overflow:hidden;
    position:relative;
  }

  /* ── Background orbs ── */
  .pg-bg{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
  .pg-orb{position:absolute;border-radius:50%;filter:blur(100px);opacity:.30}
  .pg-orb1{width:480px;height:480px;background:#fde68a;top:-140px;left:-120px;animation:orb1 13s ease-in-out infinite}
  .pg-orb2{width:400px;height:400px;background:#fed7aa;bottom:-110px;right:-90px;animation:orb2 11s ease-in-out infinite}
  .pg-orb3{width:300px;height:300px;background:#fef08a;top:38%;left:52%;animation:orb3 16s ease-in-out infinite}
  @keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(50px,35px) scale(1.1)}}
  @keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-35px,-45px) scale(1.12)}}
  @keyframes orb3{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-45%,-55%) scale(.9)}}

  /* ── Floating grain particles ── */
  .pg-particles{position:absolute;inset:0;pointer-events:none}
  .pg-grain{position:absolute;font-size:12px;animation:drift linear infinite;opacity:0}
  @keyframes drift{
    0%{transform:translateY(-8vh) translateX(0) rotate(0deg) scale(.7);opacity:0}
    10%{opacity:.55}
    85%{opacity:.35}
    100%{transform:translateY(108vh) translateX(30px) rotate(220deg) scale(1);opacity:0}
  }

  .pg-inner{position:relative;z-index:1;max-width:1000px;margin:0 auto}

  /* ── Breadcrumb ── */
  .pg-breadcrumb{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:rgba(87,55,15,.5);margin-bottom:28px;letter-spacing:.04em}
  .pg-breadcrumb a{color:rgba(87,55,15,.5);text-decoration:none;transition:color .2s}
  .pg-breadcrumb a:hover{color:#b45309}
  .pg-bc-sep{color:#d97706;font-weight:800}

  /* ── Hero Banner ── */
  .pg-banner{
    position:relative;overflow:hidden;
    background:linear-gradient(135deg,#78350f 0%,#a16207 55%,#b45309 100%);
    border-radius:26px;padding:44px 48px;
    display:flex;align-items:center;justify-content:space-between;gap:24px;
    border:1px solid rgba(253,224,71,.25);margin-bottom:36px;
    box-shadow:0 22px 55px rgba(120,53,15,.22);
  }
  .pg-banner::before{
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse at 25% 40%,rgba(253,224,71,.16) 0%,transparent 60%);
    pointer-events:none;
  }
  .pg-banner::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.07) 50%,transparent 70%);
    background-size:200% 100%;animation:shimmer 4.5s linear infinite;
  }
  .pg-banner-glow{
    position:absolute;width:280px;height:280px;
    background:radial-gradient(circle,rgba(253,224,71,.22) 0%,transparent 70%);
    top:-40px;right:110px;
    animation:pulse-glow 4s ease-in-out infinite;pointer-events:none;
  }
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes pulse-glow{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}

  .pg-banner-text{position:relative;z-index:2}
  .pg-banner-eyebrow{
    font-family:'Caveat',cursive;font-size:17px;font-weight:700;color:#fde68a;
    display:block;margin-bottom:8px;animation:fadeup .6s .1s both;
  }
  .pg-banner h1{
    font-family:'Fraunces',serif;font-size:clamp(1.8rem,4vw,2.7rem);font-weight:700;color:#fff;
    line-height:1.1;letter-spacing:-.3px;margin-bottom:12px;animation:fadeup .6s .2s both;
  }
  .pg-banner h1 span{color:#fde68a}
  .pg-banner p{color:#fef3c7;font-size:13.5px;font-weight:500;line-height:1.65;max-width:320px;margin-bottom:20px;animation:fadeup .6s .3s both;opacity:.9}
  .pg-badges{display:flex;gap:8px;flex-wrap:wrap;animation:fadeup .6s .4s both}
  .pg-badge{
    background:rgba(255,255,255,.12);border:1px solid rgba(253,224,71,.35);
    color:#fef3c7;font-size:11px;font-weight:700;padding:5px 12px;border-radius:100px;
    backdrop-filter:blur(8px);transition:all .25s;cursor:default;
  }
  .pg-badge:hover{background:rgba(253,224,71,.2);border-color:rgba(253,224,71,.6);transform:translateY(-2px)}

  /* floating emojis */
  .pg-banner-emojis{position:relative;z-index:2;width:160px;height:140px;flex-shrink:0;display:none}
  @media(min-width:560px){.pg-banner-emojis{display:block}}
  .pg-em1{position:absolute;font-size:56px;top:0;left:10px;filter:drop-shadow(0 8px 20px rgba(0,0,0,.3));animation:float1 3.4s ease-in-out infinite}
  .pg-em2{position:absolute;font-size:44px;bottom:0;right:2px;filter:drop-shadow(0 8px 20px rgba(0,0,0,.3));animation:float2 2.8s ease-in-out infinite}
  .pg-em3{position:absolute;font-size:28px;top:50%;left:2px;transform:translateY(-50%);filter:drop-shadow(0 6px 12px rgba(0,0,0,.25));animation:float1 4.4s ease-in-out .5s infinite}
  @keyframes float1{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-14px) rotate(5deg)}}
  @keyframes float2{0%,100%{transform:translateY(0) rotate(6deg)}50%{transform:translateY(-16px) rotate(-6deg)}}
  @keyframes fadeup{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

  /* ── Stats strip ── */
  .pg-stats{display:flex;gap:12px;margin-bottom:36px}
  .pg-stat{
    flex:1;background:#fff;
    border:1px solid rgba(180,83,9,.12);border-radius:16px;
    padding:16px 20px;text-align:center;
    box-shadow:0 4px 16px rgba(120,53,15,.06);
    transition:all .3s;animation:fadeup .6s both;
  }
  .pg-stat:hover{background:#fffbeb;border-color:rgba(217,119,6,.3);transform:translateY(-3px);box-shadow:0 10px 24px rgba(120,53,15,.12)}
  .pg-stat-num{font-family:'Fraunces',serif;font-size:22px;font-weight:700;color:#b45309;display:block}
  .pg-stat-lbl{font-size:11px;font-weight:600;color:rgba(87,55,15,.5);letter-spacing:.08em;text-transform:uppercase;margin-top:2px}

  /* ── Section head ── */
  .pg-section-head{display:flex;align-items:center;gap:16px;margin-bottom:22px}
  .pg-section-label{font-family:'Fraunces',serif;font-size:21px;font-weight:600;color:#57350f;letter-spacing:-.01em;flex:none}
  .pg-section-rule{flex:1;height:1px;background:linear-gradient(90deg,rgba(180,83,9,.35) 0%,transparent 100%)}
  .pg-section-count{font-size:11px;font-weight:700;color:rgba(87,55,15,.4);letter-spacing:.1em;text-transform:uppercase}

  /* ── Grid: unique "sample bowl" card treatment ── */
  .pg-grid{
    max-width:1000px;margin:0 auto;
    display:grid;grid-template-columns:repeat(2,1fr);gap:16px;
  }
  @media(min-width:560px){.pg-grid{grid-template-columns:repeat(3,1fr)}}
  @media(min-width:820px){.pg-grid{grid-template-columns:repeat(4,1fr)}}

  /* ── Card ── */
  .pg-card{
    position:relative;background:#fff;border-radius:20px;
    border:1px solid rgba(180,83,9,.10);
    padding:22px 16px 18px;text-align:center;cursor:pointer;
    box-shadow:0 4px 14px rgba(120,53,15,.06);
    animation:fadeup .55s cubic-bezier(.22,1,.36,1) both;
    transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s,border-color .3s;
  }
  .pg-card:hover{
    transform:translateY(-6px);
    border-color:rgba(217,119,6,.35);
    box-shadow:0 18px 40px rgba(120,53,15,.16);
  }
  .pg-card:nth-child(1){animation-delay:.05s}.pg-card:nth-child(2){animation-delay:.10s}
  .pg-card:nth-child(3){animation-delay:.15s}.pg-card:nth-child(4){animation-delay:.20s}
  .pg-card:nth-child(5){animation-delay:.25s}.pg-card:nth-child(6){animation-delay:.30s}
  .pg-card:nth-child(7){animation-delay:.35s}.pg-card:nth-child(8){animation-delay:.40s}
  .pg-card:nth-child(n+9){animation-delay:.45s}

  /* circular "bowl" image frame — distinct from the fruit/veg full-bleed tiles */
  .pg-bowl{
    position:relative;width:104px;height:104px;margin:0 auto 14px;
    border-radius:50%;overflow:hidden;
    background:conic-gradient(from 180deg,#fde68a,#fbbf24,#f59e0b,#fde68a);
    padding:5px;
    transition:transform .45s cubic-bezier(.22,1,.36,1),box-shadow .4s;
    box-shadow:0 6px 16px rgba(180,83,9,.18);
  }
  .pg-card:hover .pg-bowl{transform:scale(1.08) rotate(4deg);box-shadow:0 12px 28px rgba(180,83,9,.28)}
  .pg-bowl-inner{
    position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;
    background:#fef3c7;border:3px solid #fff;
  }
  .pg-bowl-inner img{transition:transform .5s cubic-bezier(.22,1,.36,1)}
  .pg-card:hover .pg-bowl-inner img{transform:scale(1.15)}

  .pg-corner{
    position:absolute;top:-2px;right:-2px;width:28px;height:28px;border-radius:50%;
    background:#fff;border:1px solid rgba(217,119,6,.3);
    display:flex;align-items:center;justify-content:center;font-size:13px;
    z-index:3;opacity:0;transform:scale(.6) rotate(-10deg);
    transition:all .35s cubic-bezier(.22,1,.36,1);box-shadow:0 4px 10px rgba(120,53,15,.15);
  }
  .pg-card:hover .pg-corner{opacity:1;transform:scale(1) rotate(0deg)}

  .pg-card-tag{
    display:inline-flex;align-items:center;gap:5px;
    font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
    color:#b45309;margin-bottom:6px;
    background:#fef3c7;border:1px solid rgba(217,119,6,.18);
    padding:2.5px 9px;border-radius:100px;
  }
  .pg-card-tag-dot{width:4px;height:4px;border-radius:50%;background:#d97706;flex-shrink:0}
  .pg-card-name{font-weight:700;color:#3f2a0d;font-size:14.5px;line-height:1.25;letter-spacing:-.01em}
  .pg-card-sub{
    font-size:10.5px;font-weight:600;color:#b45309;margin-top:5px;
    opacity:0;transform:translateY(4px);transition:all .3s;
  }
  .pg-card:hover .pg-card-sub{opacity:1;transform:translateY(0)}

  /* footer */
  .pg-footer{margin-top:48px;text-align:center;font-size:12px;font-weight:600;color:rgba(87,55,15,.4);letter-spacing:.3px}
  .pg-footer span{margin:0 10px;transition:color .2s;cursor:default}
  .pg-footer span:hover{color:#b45309}

  /* responsive */
  @media(max-width:640px){
    .pg-root{padding:44px 14px 60px}
    .pg-stats{flex-wrap:wrap}
    .pg-stat{min-width:calc(50% - 6px)}
    .pg-banner{padding:32px 28px}
    .pg-bowl{width:88px;height:88px}
  }
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;

const STATS = [
  { num: "20+", label: "Varieties" },
  { num: "100%", label: "Natural" },
  { num: "Bulk", label: "Export Ready" },
  { num: "12+", label: "Countries" },
];

export default function PulsesGrainsPage() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);

  // Generate falling grain particles
  useEffect(() => {
    const container = rootRef.current?.querySelector(".pg-particles");
    if (!container) return;
    const grains = ["🌾","•","·","🌰"];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      p.className = "pg-grain";
      p.textContent = grains[i % grains.length];
      p.style.cssText = `
        left:${Math.random()*100}%;
        color:${["#d97706","#b45309","#f59e0b"][i % 3]};
        animation-duration:${9 + Math.random()*10}s;
        animation-delay:${Math.random()*10}s;
      `;
      container.appendChild(p);
    }
  }, []);

  // Intersection observer for cards
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".pg-card");
    if (!cards) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.style.opacity = "1"; obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="pg-root" ref={rootRef}>
      <style>{styles}</style>

      {/* ── BG ── */}
      <div className="pg-bg">
        <div className="pg-orb pg-orb1" />
        <div className="pg-orb pg-orb2" />
        <div className="pg-orb pg-orb3" />
        <div className="pg-particles" />
      </div>

      <div className="pg-inner">
        {/* ── BREADCRUMB ── */}
        <nav className="pg-breadcrumb">
          <Link href="/">Home</Link>
          <span className="pg-bc-sep">›</span>
          <span style={{ color: "rgba(87,55,15,.8)" }}>Pulses &amp; Grains</span>
        </nav>

        {/* ── HERO BANNER ── */}
        <div className="pg-banner">
          <div className="pg-banner-glow" />
          <div className="pg-banner-text">
            <span className="pg-banner-eyebrow">✦ Harvested &amp; stone-cleaned</span>
            <h1>Pulses <span>&amp; Grains</span></h1>
            <p>Premium quality pulses and grains, sorted and packed for bulk export worldwide.</p>
            <div className="pg-badges">
              <span className="pg-badge">🌾 100% Natural</span>
              <span className="pg-badge">✈️ Export Quality</span>
              <span className="pg-badge">📦 Bulk Packaging</span>
            </div>
          </div>
          <div className="pg-banner-emojis">
            <span className="pg-em1">🌾</span>
            <span className="pg-em2">🫘</span>
            <span className="pg-em3">🌰</span>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="pg-stats">
          {STATS.map((s, i) => (
            <div key={s.label} className="pg-stat" style={{ animationDelay: `${.1 + i*.06}s` }}>
              <span className="pg-stat-num">{s.num}</span>
              <div className="pg-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── SECTION HEAD ── */}
        <div className="pg-section-head">
          <span className="pg-section-label">Our Range</span>
          <span className="pg-section-rule" />
          <span className="pg-section-count">{pulsesGrains.length}+ varieties</span>
        </div>

        {/* ── GRID ── */}
        <div className="pg-grid" ref={gridRef}>
          {pulsesGrains.map((item, i) => (
            <PulseCard
              key={item.name}
              name={item.name}
              img={item.img}
              tag={PG_TAGS[i % PG_TAGS.length]}
              icon={PG_ICONS[i % PG_ICONS.length]}
            />
          ))}
        </div>

        {/* ── FOOTER ── */}
        <p className="pg-footer">
          <span>🌐 www.cpnafoods.com</span>|<span>📞 +971 52 796 6720</span>
        </p>
      </div>
    </main>
  );
}

function PulseCard({ name, img, tag, icon }) {
  return (
    <div className="pg-card">
      <div className="pg-bowl">
        <div className="pg-bowl-inner">
          {img && (
            <Image
              src={img} alt={name} fill
              sizes="120px"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </div>
      <div className="pg-corner">{icon}</div>
      <div className="pg-card-tag">
        <span className="pg-card-tag-dot" />
        {tag}
      </div>
      <p className="pg-card-name">{name}</p>
      <div className="pg-card-sub">View details ↗</div>
    </div>
  );
}