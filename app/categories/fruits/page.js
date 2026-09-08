// ============================================================
// FILE: src/app/categories/fruits/page.jsx
// ============================================================
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { fruits } from "@/lib/data";

const FRUIT_TAGS = [
  "Seasonal pick","Premium","Export grade","Farm fresh",
  "Hand-picked","Tropical","Sun-ripened","Organic",
  "Limited season","Imported","Antioxidant rich","Local favourite",
];

const FRUIT_ICONS = ["🥭","🍇","🍋","🍎","🍌","🧡","🍈","🍊","🫐","🍓","🍑","🍐"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  .fp-root{
    background:#0e1a0a;
    min-height:100vh;
    padding:44px 20px 72px;
    font-family:'Plus Jakarta Sans',sans-serif;
    overflow:hidden;
    position:relative;
  }

  /* ── Background orbs ── */
  .fp-bg{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
  .fp-orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:.18}
  .fp-orb1{width:500px;height:500px;background:#22c55e;top:-120px;left:-130px;animation:orb1 12s ease-in-out infinite}
  .fp-orb2{width:420px;height:420px;background:#84cc16;bottom:-100px;right:-100px;animation:orb2 10s ease-in-out infinite}
  .fp-orb3{width:320px;height:320px;background:#15803d;top:40%;left:50%;animation:orb3 15s ease-in-out infinite}
  @keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,40px) scale(1.1)}}
  @keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,-50px) scale(1.15)}}
  @keyframes orb3{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-45%,-55%) scale(.9)}}

  /* ── Floating particles ── */
  .fp-particles{position:absolute;inset:0;pointer-events:none}
  .fp-particle{position:absolute;border-radius:50%;animation:float-up linear infinite;opacity:0}
  @keyframes float-up{
    0%{transform:translateY(100vh) scale(0);opacity:0}
    10%{opacity:.6}
    80%{opacity:.3}
    100%{transform:translateY(-10vh) scale(1.5);opacity:0}
  }

  .fp-inner{position:relative;z-index:1;max-width:960px;margin:0 auto}

  /* ── Breadcrumb ── */
  .fp-breadcrumb{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:rgba(255,255,255,.35);margin-bottom:28px;letter-spacing:.04em}
  .fp-breadcrumb a{color:rgba(255,255,255,.35);text-decoration:none;transition:color .2s}
  .fp-breadcrumb a:hover{color:#86efac}
  .fp-bc-sep{color:#4ade80;font-weight:800}

  /* ── Hero Banner ── */
  .fp-banner{
    position:relative;overflow:hidden;
    background:linear-gradient(135deg,#052e16 0%,#14532d 50%,#166534 100%);
    border-radius:28px;padding:44px 48px;
    display:flex;align-items:center;justify-content:space-between;gap:24px;
    border:1px solid rgba(74,222,128,.2);margin-bottom:36px;
  }
  .fp-banner::before{
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse at 30% 50%,rgba(34,197,94,.15) 0%,transparent 60%);
    pointer-events:none;
  }
  .fp-banner::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.04) 50%,transparent 70%);
    background-size:200% 100%;animation:shimmer 4s linear infinite;
  }
  .fp-banner-glow{
    position:absolute;width:300px;height:300px;
    background:radial-gradient(circle,rgba(74,222,128,.18) 0%,transparent 70%);
    top:-50px;right:100px;
    animation:pulse-glow 4s ease-in-out infinite;pointer-events:none;
  }
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes pulse-glow{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}

  .fp-banner-text{position:relative;z-index:2}
  .fp-banner-eyebrow{
    font-family:'Caveat',cursive;font-size:17px;font-weight:700;color:#4ade80;
    display:block;margin-bottom:8px;animation:fadeup .6s .1s both;
  }
  .fp-banner h1{
    font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;color:#fff;
    line-height:1.1;letter-spacing:-.5px;margin-bottom:12px;animation:fadeup .6s .2s both;
  }
  .fp-banner h1 em{font-family:'Caveat',cursive;font-style:normal;color:#fde68a;font-size:clamp(2.2rem,5vw,3.4rem)}
  .fp-banner p{color:#bbf7d0;font-size:13.5px;font-weight:500;line-height:1.65;max-width:300px;margin-bottom:20px;animation:fadeup .6s .3s both;opacity:.85}
  .fp-badges{display:flex;gap:8px;flex-wrap:wrap;animation:fadeup .6s .4s both}
  .fp-badge{
    background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);
    color:#bbf7d0;font-size:11px;font-weight:700;padding:5px 12px;border-radius:100px;
    backdrop-filter:blur(8px);transition:all .25s;cursor:default;
  }
  .fp-badge:hover{background:rgba(74,222,128,.25);border-color:rgba(74,222,128,.6);transform:translateY(-2px)}

  /* floating emojis */
  .fp-banner-emojis{position:relative;z-index:2;width:160px;height:140px;flex-shrink:0;display:none}
  @media(min-width:560px){.fp-banner-emojis{display:block}}
  .fp-em1{position:absolute;font-size:58px;top:0;left:8px;filter:drop-shadow(0 8px 20px rgba(0,0,0,.5));animation:float1 3.2s ease-in-out infinite}
  .fp-em2{position:absolute;font-size:46px;bottom:0;right:0;filter:drop-shadow(0 8px 20px rgba(0,0,0,.5));animation:float2 2.6s ease-in-out infinite}
  .fp-em3{position:absolute;font-size:30px;top:52%;left:0;transform:translateY(-50%);filter:drop-shadow(0 6px 12px rgba(0,0,0,.4));animation:float1 4.2s ease-in-out .5s infinite}
  @keyframes float1{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-14px) rotate(5deg)}}
  @keyframes float2{0%,100%{transform:translateY(0) rotate(6deg)}50%{transform:translateY(-16px) rotate(-6deg)}}
  @keyframes fadeup{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

  /* ── Stats strip ── */
  .fp-stats{display:flex;gap:12px;margin-bottom:36px}
  .fp-stat{
    flex:1;background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);border-radius:16px;
    padding:16px 20px;text-align:center;backdrop-filter:blur(12px);
    transition:all .3s;animation:fadeup .6s both;
  }
  .fp-stat:hover{background:rgba(74,222,128,.08);border-color:rgba(74,222,128,.25);transform:translateY(-3px)}
  .fp-stat-num{font-size:22px;font-weight:800;color:#4ade80;display:block;font-family:'Caveat',cursive}
  .fp-stat-lbl{font-size:11px;font-weight:600;color:rgba(255,255,255,.4);letter-spacing:.08em;text-transform:uppercase;margin-top:2px}

  /* ── Section head ── */
  .fp-section-head{display:flex;align-items:center;gap:16px;margin-bottom:20px}
  .fp-section-label{font-size:20px;font-weight:800;color:#f0fdf4;letter-spacing:-.02em;flex:none}
  .fp-section-rule{flex:1;height:1px;background:linear-gradient(90deg,rgba(74,222,128,.4) 0%,transparent 100%)}
  .fp-section-count{font-size:11px;font-weight:700;color:rgba(255,255,255,.3);letter-spacing:.1em;text-transform:uppercase}

  /* ── Grid ── */
  .fp-grid{
    max-width:960px;margin:0 auto;
    display:grid;grid-template-columns:1.5fr 1fr 1fr;
    grid-auto-rows:200px;gap:14px;
  }
  .fp-grid .fp-tile:first-child{grid-row:span 2}

  /* ── Tile ── */
  .fp-tile{
    position:relative;border-radius:22px;overflow:hidden;cursor:pointer;
    background:#1a2e0d;animation:fadeup .6s cubic-bezier(.22,1,.36,1) both;
    border:1px solid rgba(255,255,255,.06);
    transform-style:preserve-3d;
    transition:transform .5s cubic-bezier(.22,1,.36,1),box-shadow .5s,border-color .4s;
  }
  .fp-tile:hover{
    border-color:rgba(74,222,128,.35);
    box-shadow:0 20px 60px rgba(0,0,0,.5),0 0 30px rgba(74,222,128,.12),inset 0 1px 0 rgba(255,255,255,.1);
  }
  .fp-tile:nth-child(1){animation-delay:.06s}.fp-tile:nth-child(2){animation-delay:.12s}
  .fp-tile:nth-child(3){animation-delay:.18s}.fp-tile:nth-child(4){animation-delay:.24s}
  .fp-tile:nth-child(5){animation-delay:.30s}.fp-tile:nth-child(6){animation-delay:.36s}
  .fp-tile:nth-child(7){animation-delay:.42s}.fp-tile:nth-child(8){animation-delay:.48s}
  .fp-tile:nth-child(n+9){animation-delay:.54s}

  /* image */
  .fp-img-wrap{position:absolute;inset:0;transition:transform .6s cubic-bezier(.22,1,.36,1)}
  .fp-tile:hover .fp-img-wrap{transform:scale(1.1)}

  /* overlay */
  .fp-overlay{
    position:absolute;inset:0;
    background:linear-gradient(to top,rgba(5,20,2,.92) 0%,rgba(5,20,2,.25) 45%,transparent 100%);
    opacity:.75;transition:opacity .4s;z-index:1;
  }
  .fp-tile:hover .fp-overlay{opacity:.95}

  /* glass shine */
  .fp-shine{
    position:absolute;inset:0;
    background:linear-gradient(135deg,rgba(255,255,255,.06) 0%,transparent 50%,rgba(255,255,255,.02) 100%);
    z-index:2;opacity:0;transition:opacity .4s;pointer-events:none;
  }
  .fp-tile:hover .fp-shine{opacity:1}

  /* corner icon */
  .fp-corner{
    position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:50%;
    background:rgba(74,222,128,.15);border:1px solid rgba(74,222,128,.3);
    display:flex;align-items:center;justify-content:center;font-size:14px;
    z-index:3;opacity:0;transform:scale(.7) rotate(-10deg);
    transition:all .35s cubic-bezier(.22,1,.36,1);backdrop-filter:blur(8px);
  }
  .fp-tile:hover .fp-corner{opacity:1;transform:scale(1) rotate(0deg)}

  /* text info */
  .fp-tile-info{position:absolute;bottom:0;left:0;right:0;padding:18px 18px 20px;z-index:3}
  .fp-tile-tag{
    display:inline-flex;align-items:center;gap:5px;
    font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
    color:rgba(255,255,255,.55);margin-bottom:6px;
    background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
    padding:3px 8px;border-radius:100px;backdrop-filter:blur(6px);
  }
  .fp-tile-tag-dot{width:5px;height:5px;border-radius:50%;background:#4ade80;flex-shrink:0}
  .fp-tile-name{font-weight:800;color:#fff;font-size:16px;line-height:1.2;letter-spacing:-.01em;text-shadow:0 2px 8px rgba(0,0,0,.5)}
  .fp-tile:first-child .fp-tile-name{font-size:24px}
  .fp-tile-sub{
    font-size:11px;font-weight:600;color:#4ade80;margin-top:4px;
    opacity:0;transform:translateY(6px);transition:all .3s;
  }
  .fp-tile:hover .fp-tile-sub{opacity:1;transform:translateY(0)}

  /* footer */
  .fp-footer{margin-top:48px;text-align:center;font-size:12px;font-weight:600;color:rgba(255,255,255,.2);letter-spacing:.3px}
  .fp-footer span{margin:0 10px;transition:color .2s;cursor:default}
  .fp-footer span:hover{color:#4ade80}

  /* responsive */
  @media(max-width:640px){
    .fp-root{padding:44px 14px 60px}
    .fp-grid{grid-template-columns:1fr 1fr;grid-auto-rows:155px}
    .fp-grid .fp-tile:first-child{grid-column:1/-1;grid-row:span 1}
    .fp-stats{flex-wrap:wrap}
    .fp-stat{min-width:calc(50% - 6px)}
    .fp-banner{padding:32px 28px}
  }
  @media(max-width:400px){
    .fp-grid{grid-template-columns:1fr}
    .fp-grid .fp-tile:first-child{grid-column:auto}
  }
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;

const STATS = [
  { num: "30+", label: "Varieties" },
  { num: "100%", label: "Natural" },
  { num: "48h", label: "Farm to Port" },
  { num: "12+", label: "Countries" },
];

export default function FruitsPage() {
  const rootRef = useRef(null);
  const gridRef = useRef(null);

  // Generate floating particles
  useEffect(() => {
    const container = rootRef.current?.querySelector(".fp-particles");
    if (!container) return;
    const colors = ["#4ade80","#86efac","#fde68a","#6ee7b7","#a3e635"];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement("div");
      p.className = "fp-particle";
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
    const tiles = gridRef.current?.querySelectorAll(".fp-tile");
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
    <main className="fp-root" ref={rootRef}>
      <style>{styles}</style>

      {/* ── BG ── */}
      <div className="fp-bg">
        <div className="fp-orb fp-orb1" />
        <div className="fp-orb fp-orb2" />
        <div className="fp-orb fp-orb3" />
        <div className="fp-particles" />
      </div>

      <div className="fp-inner">
        {/* ── BREADCRUMB ── */}
        <nav className="fp-breadcrumb">
          <Link href="/">Home</Link>
          <span className="fp-bc-sep">›</span>
          <span style={{ color: "rgba(255,255,255,.65)" }}>Fresh Fruits</span>
        </nav>

        {/* ── HERO BANNER ── */}
        <div className="fp-banner">
          <div className="fp-banner-glow" />
          <div className="fp-banner-text">
            <span className="fp-banner-eyebrow">✦ Straight from the farm</span>
            <h1>Farm-Fresh<br /><em>Fruits</em></h1>
            <p>Tropical &amp; seasonal fruits exported fresh from India — handpicked at peak ripeness.</p>
            <div className="fp-badges">
              <span className="fp-badge">🌿 100% Natural</span>
              <span className="fp-badge">✈️ Export Quality</span>
              <span className="fp-badge">🧺 Farm to Door</span>
            </div>
          </div>
          <div className="fp-banner-emojis">
            <span className="fp-em1">🥭</span>
            <span className="fp-em2">🍇</span>
            <span className="fp-em3">🍋</span>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="fp-stats">
          {STATS.map((s, i) => (
            <div key={s.label} className="fp-stat" style={{ animationDelay: `${.1 + i*.06}s` }}>
              <span className="fp-stat-num">{s.num}</span>
              <div className="fp-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── SECTION HEAD ── */}
        <div className="fp-section-head">
          <span className="fp-section-label">Fruits</span>
          <span className="fp-section-rule" />
          <span className="fp-section-count">{fruits.length}+ varieties</span>
        </div>

        {/* ── GRID ── */}
        <div className="fp-grid" ref={gridRef}>
          {fruits.map((item, i) => (
            <FruitTile
              key={item.name}
              name={item.name}
              img={item.img}
              tag={FRUIT_TAGS[i % FRUIT_TAGS.length]}
              icon={FRUIT_ICONS[i % FRUIT_ICONS.length]}
            />
          ))}
        </div>

        {/* ── FOOTER ── */}
        <p className="fp-footer">
          <span>🌐 www.cpnafoods.com</span>|<span>📞 +971 52 796 6720</span>
        </p>
      </div>
    </main>
  );
}

function FruitTile({ name, img, tag, icon }) {
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
      className="fp-tile"
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="fp-img-wrap">
        {img && (
          <Image
            src={img} alt={name} fill
            sizes="(max-width:640px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className="fp-overlay" />
      <div className="fp-shine" />
      <div className="fp-corner">{icon}</div>
      <div className="fp-tile-info">
        <div className="fp-tile-tag">
          <span className="fp-tile-tag-dot" />
          {tag}
        </div>
        <p className="fp-tile-name">{name}</p>
        <div className="fp-tile-sub">View details ↗</div>
      </div>
    </div>
  );
}