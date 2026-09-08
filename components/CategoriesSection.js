"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { vegetables, fruits, pulsesGrains } from "@/lib/data";

/* ─────────────────────────────────────────────────────────────
   Tag labels per category (index 0,1,2 = first 3 items)
───────────────────────────────────────────────────────────── */
const VEG_TAGS  = ["Featured",     "Popular",      "Export grade"];
const FR_TAGS   = ["Seasonal pick", "Premium",      "Export grade"];
const PU_TAGS   = ["Staple",       "Protein rich",  "Organic"];

const VEG_BG    = ["bg-veg-1", "bg-veg-2", "bg-veg-3"];
const FR_BG     = ["bg-fr-1",  "bg-fr-2",  "bg-fr-3"];
const PU_BG     = ["bg-pu-1",  "bg-pu-2",  "bg-pu-3"];

/* ─────────────────────────────────────────────────────────────
   CSS
───────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

  /* ── Root ── */
  .cat-root {
    background: #f5f2ec;
    padding: 80px 24px;
    overflow: hidden;
  }

  /* ── Header ── */
  .cat-header {
    text-align: center;
    margin-bottom: 72px;
  }
  .cat-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6a9e3f;
    margin-bottom: 16px;
  }
  .cat-eyebrow::before,
  .cat-eyebrow::after {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: #6a9e3f;
    opacity: 0.5;
  }
  .cat-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(36px, 5vw, 54px);
    font-weight: 800;
    color: #162b0d;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }
  .cat-title-accent {
    font-family: 'Caveat', cursive;
    font-weight: 700;
    color: #4a8a28;
    font-size: clamp(42px, 6vw, 62px);
    line-height: 1;
    display: block;
  }
  .cat-sub {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: #7a7060;
    font-weight: 500;
  }

  /* ── Section wrapper ── */
  .cat-section {
    max-width: 960px;
    margin: 0 auto 80px;
    opacity: 0;
    transform: translateY(48px);
    transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                transform 0.75s cubic-bezier(0.22,1,0.36,1);
  }
  .cat-section.visible { opacity: 1; transform: translateY(0); }

  /* ── Section header ── */
  .cat-section-head {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 28px;
  }
  .cat-section-label {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #162b0d;
    letter-spacing: -0.02em;
    flex: none;
  }
  .cat-section-rule {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, #b5c89a 0%, transparent 100%);
  }
  .cat-section-count {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #9a9080;
    letter-spacing: 0.08em;
  }

  /* ── Grid ── */
  .cat-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    grid-template-rows: 200px 200px;
    gap: 14px;
  }

  /* ── Tile ── */
  .cat-item {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background: #d8d5cc;
  }
  .cat-item.featured {
    grid-row: 1 / 3;
  }
  .cat-item:hover .item-img-wrap {
    transform: scale(1.08);
  }
  .cat-item:hover .item-overlay {
    opacity: 0.88;
  }

  /* ── Image wrapper (fill parent, scales on hover) ── */
  .item-img-wrap {
    position: absolute;
    inset: 0;
    transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
    will-change: transform;
  }

  /* ── Gradient overlay ── */
  .item-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(10, 22, 5, 0.85) 0%,
      rgba(10, 22, 5, 0.18) 45%,
      transparent 100%
    );
    transition: opacity 0.4s ease;
    opacity: 0.72;
    z-index: 1;
  }

  /* ── Text ── */
  .item-info {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 20px 18px 18px;
    z-index: 2;
  }
  .item-tag {
    display: inline-block;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    margin-bottom: 5px;
  }
  .item-name {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800;
    color: #fff;
    font-size: 17px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .cat-item.featured .item-name { font-size: 24px; }

  /* ── Fallback bg colours (shown when no img) ── */
  .bg-veg-1 { background: #b8dba8; }
  .bg-veg-2 { background: #d0ecbf; }
  .bg-veg-3 { background: #a4cd98; }
  .bg-fr-1  { background: #f9c89e; }
  .bg-fr-2  { background: #fddec0; }
  .bg-fr-3  { background: #f5b07a; }
  .bg-pu-1  { background: #f5dfa0; }
  .bg-pu-2  { background: #faefc4; }
  .bg-pu-3  { background: #edcf7a; }

  /* ── CTA ── */
  .cat-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 22px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #3a7020;
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: gap 0.25s ease;
  }
  .cat-cta:hover { gap: 18px; }
  .cat-cta-arrow {
    width: 30px; height: 30px;
    border-radius: 50%;
    background: #3a7020;
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  .cat-cta:hover .cat-cta-arrow { transform: translateX(4px); }

  /* ── Divider ── */
  .cat-divider {
    max-width: 960px;
    margin: 0 auto 80px;
    height: 1px;
    background: linear-gradient(
      90deg, transparent 0%, #b5c89a 25%, #b5c89a 75%, transparent 100%
    );
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .cat-root { padding: 60px 16px; }
    .cat-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 160px 160px;
    }
    .cat-item.featured {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }
  }
`;

/* ─────────────────────────────────────────────────────────────
   Build CATEGORIES from imported data
───────────────────────────────────────────────────────────── */
function buildItems(arr, tags, bgs) {
  return arr.slice(0, 3).map((item, i) => ({
    name:  item.name,
    img:   item.img,
    color: item.color ?? null,
    tag:   tags[i],
    bgCls: bgs[i],
  }));
}

/* Evaluated at module level — safe because data is static */
const CATEGORIES = [
  {
    id:    "vegetables",
    label: "Vegetables",
    count: "24+",
    href:  "/categories/vegetables",
    items: buildItems(vegetables,   VEG_TAGS, VEG_BG),
  },
  {
    id:    "fruits",
    label: "Fruits",
    count: "18+",
    href:  "/categories/fruits",
    items: buildItems(fruits,       FR_TAGS,  FR_BG),
  },
  {
    id:    "pulses",
    label: "Pulses & Grains",
    count: "30+",
    href:  "/categories/pulses-grains",
    items: buildItems(pulsesGrains, PU_TAGS,  PU_BG),
  },
];

/* ─────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────── */
export default function CategoriesSection() {
  const sectionRefs = useRef([]);

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
      { threshold: 0.12 }
    );
    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="categories" className="cat-root">
      <style>{css}</style>

      {/* Header */}
      <div className="cat-header">
        <p className="cat-eyebrow">Farm to World</p>
        <h2 className="cat-title">
          Our <span className="cat-title-accent">Categories</span>
        </h2>
        <p className="cat-sub">Fresh, export-quality produce shipped worldwide</p>
      </div>

      {/* Category sections */}
      {CATEGORIES.map((cat, catIdx) => (
        <div key={cat.id}>
          <div
            className="cat-section"
            ref={(el) => (sectionRefs.current[catIdx] = el)}
          >
            {/* Heading row */}
            <div className="cat-section-head">
              <span className="cat-section-label">{cat.label}</span>
              <span className="cat-section-rule" />
              <span className="cat-section-count">{cat.count} varieties</span>
            </div>

            {/* Product tiles */}
            <div className="cat-grid">
              {cat.items.map((item, idx) => (
                <ProductTile key={item.name} {...item} featured={idx === 0} />
              ))}
            </div>

            {/* View all CTA */}
            <Link href={cat.href} className="cat-cta">
              View all {cat.label.toLowerCase()}
              <span className="cat-cta-arrow">→</span>
            </Link>
          </div>

          {catIdx < CATEGORIES.length - 1 && <div className="cat-divider" />}
        </div>
      ))}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ProductTile
   — img: path string  → renders Next.js <Image fill>
   — img: falsy        → shows bgCls colour fallback
───────────────────────────────────────────────────────────── */
function ProductTile({ name, img, color, bgCls, tag, featured }) {
  return (
    <div className={`cat-item ${featured ? "featured" : "small"}`}>
      {/* Image layer */}
      <div className={`item-img-wrap ${img ? "" : bgCls}`}>
        {img ? (
          <Image
            src={img}
            alt={name}
            fill
            sizes={featured ? "(max-width:640px) 100vw, 40vw" : "25vw"}
            style={{
              objectFit: "cover",
              /* if your images have a white bg, swap cover → contain and add padding */
            }}
          />
        ) : (
          /* colour swatch already applied via bgCls — nothing else needed */
          null
        )}
      </div>

      {/* Gradient */}
      <div className="item-overlay" />

      {/* Text */}
      <div className="item-info">
        <span className="item-tag">{tag}</span>
        <p className="item-name">{name}</p>
      </div>
    </div>
  );
}