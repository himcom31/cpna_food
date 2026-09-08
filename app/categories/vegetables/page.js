// ============================================================
// FILE: src/app/categories/vegetables/page.jsx
// ============================================================
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { vegetables } from "@/lib/data";

const VEG_TAGS = [
  "Seasonal pick","Premium","Export grade","Farm fresh",
  "Hand-picked","Garden grown","Sun-grown","Organic",
  "Limited season","Imported","Fibre rich","Local favourite",
];

const VEG_ICONS = ["🥦","🥕","🌶️","🧅","🍆","🥬","🫑","🥔","🌽","🧄","🍅","🥒"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  .vp-root{
    background:#fbfdf8;
    min-height:100vh;
    padding:44px 20px 72px;
    font-family:'Plus Jakarta Sans',sans-serif;
    overflow:hidden;
    position:relative;
  }

  /* ── Background orbs ── */
  .vp-bg{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
  .vp-orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:.28}
  .vp-orb1{width:500px;height:500px;background:#bbf7d0;top:-120px;left:-130px;animation:orb1 12s ease-in-out infinite}
  .vp-orb2{width:420px;height:420px;background:#d9f99d;bottom:-100px;right:-100px;animation:orb2 10s ease-in-out infinite}
  .vp-orb3{width:320px;height:320px;background:#a7f3d0;top:40%;left:50%;animation:orb3 15s ease-in-out infinite}
  @keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,40px) scale(1.1)}}
  @keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,-50px) scale(1.15)}}
  @keyframes orb3{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-45%,-55%) scale(.9)}}

  /* ── Floating particles ── */
  .vp-particles{position:absolute;inset:0;pointer-events:none}
  .vp-particle{position:absolute;border-radius:50%;animation:float-up linear infinite;opacity:0}
  @keyframes float-up{
    0%{transform:translateY(100vh) scale(0);opacity:0}
    10%{opacity:.7}
    80%{opacity:.35}
    100%{transform:translateY(-10vh) scale(1.5);opacity:0}
  }

  .vp-inner{position:relative;z-index:1;max-width:960px;margin:0 auto}

  /* ── Breadcrumb ── */
  .vp-breadcrumb{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:rgba(20,40,15,.4);margin-bottom:28px;letter-spacing:.04em}
  .vp-breadcrumb a{color:rgba(20,40,15,.4);text-decoration:none;transition:color .2s}
  .vp-breadcrumb a:hover{color:#15803d}
  .vp-bc-sep{color:#22c55e;font-weight:800}

  /* ── Hero Banner ── */
  .vp-banner{
    position:relative;overflow:hidden;
    background:linear-gradient(135deg,#166534 0%,#15803d 50%,#16a34a 100%);
    border-radius:28px;padding:44px 48px;
    display:flex;align-items:center;justify-content:space-between;gap:24px;
    border:1px solid rgba(34,197,94,.25);margin-bottom:36px;
    box-shadow:0 20px 50px rgba(21,128,61,.18);
  }
  .vp-banner::before{
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse at 30% 50%,rgba(255,255,255,.1) 0%,transparent 60%);
    pointer-events:none;
  }
  .vp-banner::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.08) 50%,transparent 70%);
    background-size:200% 100%;animation:shimmer 4s linear infinite;
  }
  .vp-banner-glow{
    position:absolute;width:300px;height:300px;
    background:radial-gradient(circle,rgba(255,255,255,.16) 0%,transparent 70%);
    top:-50px;right:100px;
    animation:pulse-glow 4s ease-in-out infinite;pointer-events:none;
  }
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes pulse-glow{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}

  .vp-banner-text{position:relative;z-index:2}
  .vp-banner-eyebrow{
    font-family:'Caveat',cursive;font-size:17px;font-weight:700;color:#bbf7d0;
    display:block;margin-bottom:8px;animation:fadeup .6s .1s both;
  }
  .vp-banner h1{
    font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;color:#fff;
    line-height:1.1;letter-spacing:-.5px;margin-bottom:12px;animation:fadeup .6s .2s both;
  }
  .vp-banner h1 em{font-family:'Caveat',cursive;font-style:normal;color:#fde68a;font-size:clamp(2.2rem,5vw,3.4rem)}
  .vp-banner p{color:#dcfce7;font-size:13.5px;font-weight:500;line-height:1.65;max-width:300px;margin-bottom:20px;animation:fadeup .6s .3s both;opacity:.9}
  .vp-badges{display:flex;gap:8px;flex-wrap:wrap;animation:fadeup .6s .4s both}
  .vp-badge{
    background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28);
    color:#f0fdf4;font-size:11px;font-weight:700;padding:5px 12px;border-radius:100px;
    backdrop-filter:blur(8px);transition:all .25s;cursor:default;
  }
  .vp-badge:hover{background:rgba(255,255,255,.22);border-color:rgba(255,255,255,.5);transform:translateY(-2px)}

  /* floating emojis */
  .vp-banner-emojis{position:relative;z-index:2;width:160px;height:140px;flex-shrink:0;display:none}
  @media(min-width:560px){.vp-banner-emojis{display:block}}
  .vp-em1{position:absolute;font-size:58px;top:0;left:8px;filter:drop-shadow(0 8px 20px rgba(0,0,0,.3));animation:float1 3.2s ease-in-out infinite}
  .vp-em2{position:absolute;font-size:46px;bottom:0;right:0;filter:drop-shadow(0 8px 20px rgba(0,0,0,.3));animation:float2 2.6s ease-in-out infinite}
  .vp-em3{position:absolute;font-size:30px;top:52%;left:0;transform:translateY(-50%);filter:drop-shadow(0 6px 12px rgba(0,0,0,.25));animation:float1 4.2s ease-in-out .5s infinite}
  @keyframes float1{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-14px) rotate(5deg)}}
  @keyframes float2{0%,100%{transform:translateY(0) rotate(6deg)}50%{transform:translateY(-16px) rotate(-6deg)}}
  @keyframes fadeup{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

  /* ── Stats strip ── */
  .vp-stats{display:flex;gap:12px;margin-bottom:36px}
  .vp-stat{
    flex:1;background:#fff;
    border:1px solid rgba(21,128,61,.12);border-radius:16px;
    padding:16px 20px;text-align:center;
    box-shadow:0 4px 16px rgba(21,128,61,.06);
    transition:all .3s;animation:fadeup .6s both;
  }
  .vp-stat:hover{background:#f0fdf4;border-color:rgba(34,197,94,.35);transform:translateY(-3px);box-shadow:0 10px 24px rgba(21,128,61,.12)}
  .vp-stat-num{font-size:22px;font-weight:800;color:#16a34a;display:block;font-family:'Caveat',cursive}
  .vp-stat-lbl{font-size:11px;font-weight:600;color:rgba(20,40,15,.45);letter-spacing:.08em;text-transform:uppercase;margin-top:2px}

  /* ── Section head ── */
  .vp-section-head{display:flex;align-items:center;gap:16px;margin-bottom:20px}
  .vp-section-label{font-size:20px;font-weight:800;color:#14290f;letter-spacing:-.02em;flex:none}
  .vp-section-rule{flex:1;height:1px;background:linear-gradient(90deg,rgba(34,197,94,.4) 0%,transparent 100%)}
  .vp-section-count{font-size:11px;font-weight:700;color:rgba(20,40,15,.35);letter-spacing:.1em;text-transform:uppercase}

  /* ── Grid ── */
  .vp-grid{
    max-width:960px;margin:0 auto;
    display:grid;grid-template-columns:1.5fr 1fr 1fr;
    grid-auto-rows:200px;gap:14px;
  }
  .vp-grid .vp-tile:first-child{grid-row:span 2}

  /* ── Tile ── */
  .vp-tile{
    position:relative;border-radius:22px;overflow:hidden;cursor:pointer;
    background:#eefbe9;animation:fadeup .6s cubic-bezier(.22,1,.36,1) both;
    border:1px solid rgba(21,128,61,.1);
    box-shadow:0 6px 20px rgba(21,128,61,.07);
    transform-style:preserve-3d;
    transition:transform .5s cubic-bezier(.22,1,.36,1),box-shadow .5s,border-color .4s;
  }
  .vp-tile:hover{
    border-color:rgba(34,197,94,.4);
    box-shadow:0 20px 50px rgba(21,128,61,.18),0 0 0 1px rgba(34,197,94,.08);
  }
  .vp-tile:nth-child(1){animation-delay:.06s}.vp-tile:nth-child(2){animation-delay:.12s}
  .vp-tile:nth-child(3){animation-delay:.18s}.vp-tile:nth-child(4){animation-delay:.24s}
  .vp-tile:nth-child(5){animation-delay:.30s}.vp-tile:nth-child(6){animation-delay:.36s}
  .vp-tile:nth-child(7){animation-delay:.42s}.vp-tile:nth-child(8){animation-delay:.48s}
  .vp-tile:nth-child(n+9){animation-delay:.54s}

  /* image */
  .vp-img-wrap{position:absolute;inset:0;transition:transform .6s cubic-bezier(.22,1,.36,1)}
  .vp-tile:hover .vp-img-wrap{transform:scale(1.1)}

  /* overlay */
  .vp-overlay{
    position:absolute;inset:0;
    background:linear-gradient(to top,rgba(10,30,8,.85) 0%,rgba(10,30,8,.18) 45%,transparent 100%);
    opacity:.72;transition:opacity .4s;z-index:1;
  }
  .vp-tile:hover .vp-overlay{opacity:.92}

  /* glass shine */
  .vp-shine{
    position:absolute;inset:0;
    background:linear-gradient(135deg,rgba(255,255,255,.18) 0%,transparent 50%,rgba(255,255,255,.04) 100%);
    z-index:2;opacity:0;transition:opacity .4s;pointer-events:none;
  }
  .vp-tile:hover .vp-shine{opacity:1}

  /* corner icon */
  .vp-corner{
    position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:50%;
    background:rgba(255,255,255,.85);border:1px solid rgba(34,197,94,.35);
    display:flex;align-items:center;justify-content:center;font-size:14px;
    z-index:3;opacity:0;transform:scale(.7) rotate(-10deg);
    transition:all .35s cubic-bezier(.22,1,.36,1);backdrop-filter:blur(8px);
  }
  .vp-tile:hover .vp-corner{opacity:1;transform:scale(1) rotate(0deg)}

  /* text info */
  .vp-tile-info{position:absolute;bottom:0;left:0;right:0;padding:18px 18px 20px;z-index:3}
  .vp-tile-tag{
    display:inline-flex;align-items:center;gap:5px;
    font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
    color:rgba(255,255,255,.7);margin-bottom:6px;
    background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);
    padding:3px 8px;border-radius:100px;backdrop-filter:blur(6px);
  }
  .vp-tile-tag-dot{width:5px;height:5px;border-radius:50%;background:#4ade80;flex-shrink:0}
  .vp-tile-name{font-weight:800;color:#fff;font-size:16px;line-height:1.2;letter-spacing:-.01em;text-shadow:0 2px 8px rgba(0,0,0,.4)}
  .vp-tile:first-child .vp-tile-name{font-size:24px}
  .vp-tile-sub{
    font-size:11px;font-weight:600;color:#86efac;margin-top:4px;
    opacity:0;transform:translateY(6px);transition:all .3s;
  }
  .vp-tile:hover .vp-tile-sub{opacity:1;transform:translateY(0)}

  /* footer */
  .vp-footer{margin-top:48px;text-align:center;font-size:12px;font-weight:600;color:rgba(20,40,15,.35);letter-spacing:.3px}
  .vp-footer span{margin:0 10px;transition:color .2s;cursor:default}
  .vp-footer span:hover{color:#16a34a}

  /* responsive */
  @media(max-width:640px){
    .vp-root{padding:44px 14px 60px}
    .vp-grid{grid-template-columns:1fr 1fr;grid-auto-rows:155px}
    .vp-grid .vp-tile:first-child{grid-column:1/-1;grid-row:span 1}
    .vp-stats{flex-wrap:wrap}
    .vp-stat{min-width:calc(50% - 6px)}
    .vp-banner{padding:32px 28px}
  }
  @media(max-width:400px){
    .vp-grid{grid-template-columns:1fr}
    .vp-grid .vp-tile:first-child{grid-column:auto}
  }
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;

const STATS = [
  { num: "25+", label: "Varieties" },
  { num: "100%", label: "Natural" },
  { num: "48h", label: "Farm to Port" },
  { num: "12+", label: "Countries" },
];

export default function VegetablesPage() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);

  // Generate floating particles
  useEffect(() => {
    const container = rootRef.current?.querySelector(".vp-particles");
    if (!container) return;
    const colors = ["#22c55e","#4ade80","#84cc16","#16a34a","#a3e635"];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement("div");
      p.className = "vp-particle";
      p.style.cssText = `
        left:${Math.random()*100}%;
        background:${colors[i % colors.length]};
        width:${2 + Math.random()*4}px;
        height:${2 + Math.random()*4}px;
        animation-duration:${6 + Math.random()*10}s;
        animation-delay:${Math.random()*8}s;
      `;
      container.appendChild(p);
    }
  }, []);

  // Intersection observer for tiles
  useEffect(() => {
    const tiles = gridRef.current?.querySelectorAll(".vp-tile");
    if (!tiles) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.style.opacity = "1"; obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    tiles.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="vp-root" ref={rootRef}>
      <style>{styles}</style>

      {/* ── BG ── */}
      <div className="vp-bg">
        <div className="vp-orb vp-orb1" />
        <div className="vp-orb vp-orb2" />
        <div className="vp-orb vp-orb3" />
        <div className="vp-particles" />
      </div>

      <div className="vp-inner">
        {/* ── BREADCRUMB ── */}
        <nav className="vp-breadcrumb">
          <Link href="/">Home</Link>
          <span className="vp-bc-sep">›</span>
          <span style={{ color: "rgba(20,40,15,.75)" }}>Fresh Vegetables</span>
        </nav>

        {/* ── HERO BANNER ── */}
        <div className="vp-banner">
          <div className="vp-banner-glow" />
          <div className="vp-banner-text">
            <span className="vp-banner-eyebrow">✦ Straight from the farm</span>
            <h1>Farm-Fresh<br /><em>Vegetables</em></h1>
            <p>Export quality vegetables from India to Dubai &amp; worldwide — handpicked at peak freshness.</p>
            <div className="vp-badges">
              <span className="vp-badge">🌿 100% Natural</span>
              <span className="vp-badge">✈️ Export Quality</span>
              <span className="vp-badge">🧺 Farm to Door</span>
            </div>
          </div>
          <div className="vp-banner-emojis">
            <span className="vp-em1">🥦</span>
            <span className="vp-em2">🥕</span>
            <span className="vp-em3">🌶️</span>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="vp-stats">
          {STATS.map((s, i) => (
            <div key={s.label} className="vp-stat" style={{ animationDelay: `${.1 + i*.06}s` }}>
              <span className="vp-stat-num">{s.num}</span>
              <div className="vp-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── SECTION HEAD ── */}
        <div className="vp-section-head">
          <span className="vp-section-label">Vegetables</span>
          <span className="vp-section-rule" />
          <span className="vp-section-count">{vegetables.length}+ varieties</span>
        </div>

        {/* ── GRID ── */}
        <div className="vp-grid" ref={gridRef}>
          {vegetables.map((item, i) => (
            <VegTile
              key={item.name}
              name={item.name}
              img={item.img}
              tag={VEG_TAGS[i % VEG_TAGS.length]}
              icon={VEG_ICONS[i % VEG_ICONS.length]}
            />
          ))}
        </div>

        {/* ── FOOTER ── */}
        <p className="vp-footer">
          <span>🌐 www.cpnafoods.com</span>|<span>📞 +971 52 796 6720</span>
        </p>
      </div>
    </main>
  );
}

function VegTile({ name, img, tag, icon }) {
  const tileRef = useRef(null);

  const handleMouseMove = (e) => {
    const r = tileRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) / (r.width/2);
    const y = (e.clientY - r.top - r.height/2) / (r.height/2);
    tileRef.current.style.transform =
      `perspective(800px) rotateY(${x*5}deg) rotateX(${-y*4}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    tileRef.current.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      className="vp-tile"
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="vp-img-wrap">
        {img && (
          <Image
            src={img} alt={name} fill
            sizes="(max-width:640px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className="vp-overlay" />
      <div className="vp-shine" />
      <div className="vp-corner">{icon}</div>
      <div className="vp-tile-info">
        <div className="vp-tile-tag">
          <span className="vp-tile-tag-dot" />
          {tag}
        </div>
        <p className="vp-tile-name">{name}</p>
        <div className="vp-tile-sub">View details ↗</div>
      </div>
    </div>
  );
}