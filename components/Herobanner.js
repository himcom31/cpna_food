"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { companyInfo } from "@/lib/data";

const BANNERS = [
    {
        src: "/banner/banner1.png",
        headline: "Premium Export",
        highlight: "Fruits & Vegetables",
        sub: "Farm-fresh produce from India, delivered to Dubai and the world.",
    },
    {
        src: "/banner/banner2.png",
        headline: "Nature's Best",
        highlight: "Pulses & Grains",
        sub: "Sourced with care, packed with quality for global markets.",
    },
    {
        src: "/banner/banner3.png",
        headline: "World-Class",
        highlight: "Export Quality",
        sub: "Trusted by importers across UAE, Europe, and Southeast Asia.",
    },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

     .hb-root {
    position: relative;
    width: 100%;
    height: 100svh;
    min-height: 480px;
    max-height: 900px;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    background: #0d2b1a;
    touch-action: pan-y;
  }

  .hb-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.9s ease;
  }
  .hb-slide.active { opacity: 1; }

  .hb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    scale: 1.06;
    transition: scale 7s ease;
    filter: brightness(0.9) saturate(1.6);
  }
  .hb-slide.active .hb-img { scale: 1; }

  .hb-overlay-bottom {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(8, 28, 15, 0.96) 0%,
      rgba(8, 28, 15, 0.5) 45%,
      transparent 100%
    );
  }
  .hb-overlay-left {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(5, 46, 22, 0.65) 0%,
      transparent 65%
    );
  }

  .hb-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 5vw 10vh;
    max-width: 780px;
    pointer-events: none;
    box-sizing: border-box;
  }

  .hb-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(249, 115, 22, 0.15);
    border: 1px solid rgba(249, 115, 22, 0.5);
    color: #fdba74;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 999px;
    width: fit-content;
    margin-bottom: 14px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s 0.1s ease, transform 0.5s 0.1s ease;
  }
  .hb-slide.active .hb-badge { opacity: 1; transform: translateY(0); }

  .hb-headline {
    font-size: clamp(1.75rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    color: #ffffff;
    margin: 0 0 6px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s 0.22s ease, transform 0.6s 0.22s ease;
  }
  .hb-slide.active .hb-headline { opacity: 1; transform: translateY(0); }

  .hb-highlight {
    display: block;
    color: #86efac;
    font-size: clamp(1.25rem, 3.8vw, 2.8rem);
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 12px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s 0.35s ease, transform 0.6s 0.35s ease;
  }
  .hb-slide.active .hb-highlight { opacity: 1; transform: translateY(0); }

  .hb-sub {
    color: #d1fae5;
    font-size: clamp(12px, 1.8vw, 15px);
    line-height: 1.6;
    max-width: 420px;
    margin-bottom: 24px;
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.6s 0.47s ease, transform 0.6s 0.47s ease;
  }
  .hb-slide.active .hb-sub { opacity: 1; transform: translateY(0); }

  .hb-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    pointer-events: all;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s 0.58s ease, transform 0.6s 0.58s ease;
  }
  .hb-slide.active .hb-actions { opacity: 1; transform: translateY(0); }

  .hb-btn-primary {
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: #fff;
    padding: 11px 24px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 4px 16px rgba(249,115,22,0.35);
    transition: transform 0.18s, box-shadow 0.18s;
    display: inline-block;
    white-space: nowrap;
  }
  .hb-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(249,115,22,0.45);
  }
  .hb-btn-primary:active { transform: translateY(0); }

  .hb-btn-outline {
    border: 2px solid rgba(255,255,255,0.55);
    color: #fff;
    padding: 11px 24px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    backdrop-filter: blur(4px);
    transition: background-color 0.2s, border-color 0.2s, transform 0.18s;
    display: inline-block;
    white-space: nowrap;
  }
  .hb-btn-outline:hover {
    background-color: rgba(255,255,255,0.12);
    border-color: #fff;
    transform: translateY(-2px);
  }
  .hb-btn-outline:active { transform: translateY(0); }

  .hb-site-tag {
    position: absolute;
    top: 16px;
    right: 16px;
    color: rgba(255,255,255,0.6);
    font-size: 11px;
    font-weight: 500;
    background: rgba(0,0,0,0.3);
    padding: 4px 12px;
    border-radius: 999px;
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.1);
    z-index: 20;
    max-width: calc(100% - 32px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hb-counter {
    position: absolute;
    top: 16px;
    left: 16px;
    color: rgba(255,255,255,0.55);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    background: rgba(0,0,0,0.28);
    padding: 4px 10px;
    border-radius: 999px;
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.1);
    z-index: 20;
  }

  .hb-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 7px;
    align-items: center;
    z-index: 20;
  }
  .hb-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: rgba(255,255,255,0.3);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: width 0.35s ease, background-color 0.35s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .hb-dot.active { width: 24px; background: #f97316; }
  .hb-dot:hover:not(.active) { background: rgba(255,255,255,0.6); }

  .hb-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.18);
    color: #fff;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    backdrop-filter: blur(6px);
    transition: background-color 0.2s, transform 0.2s;
    z-index: 20;
    line-height: 1;
    -webkit-tap-highlight-color: transparent;
  }
  .hb-arrow:hover { background: rgba(255,255,255,0.22); }
  .hb-arrow:active { transform: translateY(-50%) scale(0.92); }
  .hb-arrow-left  { left: 12px; }
  .hb-arrow-right { right: 12px; }

  .hb-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #f97316, #86efac);
    border-radius: 0 999px 999px 0;
    transition: width 0.1s linear;
    z-index: 20;
  }

  .hb-swipe-hint {
    position: absolute;
    bottom: 44px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255,255,255,0.35);
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
    z-index: 20;
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .hb-slide, .hb-img, .hb-badge, .hb-headline, .hb-highlight,
    .hb-sub, .hb-actions, .hb-dot {
      transition: none !important;
      animation: none !important;
    }
    .hb-img { scale: 1 !important; }
  }

  /* ════════════════════════════════
     MOBILE ≤ 480px
     — Same overlay design, but
       aspect-ratio based height
       instead of 100svh
  ════════════════════════════════ */
  @media (max-width: 480px) {

   .hb-root {
      height: 400px;
      min-height: unset;
      max-height: unset;
      aspect-ratio: unset;
    }
    .hb-img {
      object-fit: cover;

        object-position: center 30%;

      filter: brightness(0.72) saturate(1.2);
      scale: 1 !important;
      height: 220px;
    }

    .hb-overlay-bottom {
      background: linear-gradient(
        to top,
        rgba(8, 28, 15, 0.97) 0%,
        rgba(8, 28, 15, 0.65) 38%,
        rgba(8, 28, 15, 0.2) 65%,
        transparent 100%
      );
    }

    .hb-content {
      padding: 0 20px 16px;
      max-width: 100%;
      justify-content: flex-end;
    }

    .hb-badge {
      font-size: 9px;
      padding: 4px 10px;
      margin-bottom: 10px;
    }

    .hb-headline {
      font-size: clamp(1.6rem, 8vw, 2.2rem);
      margin-bottom: 4px;
    }

    .hb-highlight {
      font-size: clamp(1.1rem, 6vw, 1.6rem);
      margin-bottom: 10px;
    }

    .hb-sub {
      font-size: 12px;
      max-width: 100%;
      margin-bottom: 18px;
      line-height: 1.55;
    }

    .hb-actions { gap: 8px; }

    .hb-btn-primary,
    .hb-btn-outline {
      padding: 10px 20px;
      font-size: 12px;
    }

    .hb-arrow { display: none; }

    .hb-swipe-hint { display: block; }

    .hb-site-tag {
      font-size: 10px;
      top: 12px;
      right: 12px;
      max-width: 55%;
    }

    .hb-counter {
      top: 12px;
      left: 12px;
      font-size: 10px;
    }

    .hb-dots { bottom: 14px; }
  }

  /* ════════════════════════════════
     SMALL TABLET 481px – 768px
  ════════════════════════════════ */
  @media (min-width: 481px) and (max-width: 768px) {
    .hb-content {
      padding: 0 32px 80px;
      max-width: 100%;
    }

    .hb-headline { font-size: clamp(1.9rem, 5.5vw, 2.8rem); }
    .hb-highlight { font-size: clamp(1.3rem, 4vw, 2rem); }
    .hb-sub { font-size: 13px; max-width: 380px; }

    .hb-arrow-left  { left: 10px; }
    .hb-arrow-right { right: 10px; }
  }
`;

const INTERVAL_MS = 5500;

export default function HeroBanner() {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const [touchStart, setTouchStart] = useState(null);

    const goTo = useCallback((idx) => {
        setCurrent((idx + BANNERS.length) % BANNERS.length);
        setProgress(0);
    }, []);

    useEffect(() => {
        const step = 80;
        let elapsed = 0;
        const tick = setInterval(() => {
            elapsed += step;
            setProgress((elapsed / INTERVAL_MS) * 100);
            if (elapsed >= INTERVAL_MS) {
                elapsed = 0;
                setCurrent((c) => (c + 1) % BANNERS.length);
            }
        }, step);
        return () => clearInterval(tick);
    }, [current]);

    const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
    const onTouchEnd = (e) => {
        if (touchStart === null) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 45) goTo(current + (diff > 0 ? 1 : -1));
        setTouchStart(null);
    };

    return (
        <section
            className="hb-root"
            aria-label="Hero banner"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <style>{css}</style>

            {BANNERS.map((b, i) => (
                <div key={b.src} className={`hb-slide${i === current ? " active" : ""}`}>
                    <Image
                        src={b.src}
                        alt={b.highlight}
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="hb-img"
                    />
                    <div className="hb-overlay-bottom" />
                    <div className="hb-overlay-left" />

                    <div className="hb-content">
                        <span className="hb-badge">🌿 Export Quality</span>
                        <h1 className="hb-headline">{b.headline}</h1>
                        <span className="hb-highlight">{b.highlight}</span>
                        <p className="hb-sub">{b.sub}</p>
                        <div className="hb-actions">
                            <Link href="#categories" className="hb-btn-primary">Explore Products</Link>
                            <Link href="#contact" className="hb-btn-outline">Contact Us</Link>
                        </div>
                    </div>
                </div>
            ))}

            <span className="hb-counter">{current + 1} / {BANNERS.length}</span>
            <span className="hb-site-tag">🌐 {companyInfo.website}</span>

            <button className="hb-arrow hb-arrow-left" onClick={() => goTo(current - 1)} aria-label="Previous slide">‹</button>
            <button className="hb-arrow hb-arrow-right" onClick={() => goTo(current + 1)} aria-label="Next slide">›</button>

            <div className="hb-dots">
                {BANNERS.map((_, i) => (
                    <button
                        key={i}
                        className={`hb-dot${i === current ? " active" : ""}`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            <div className="hb-swipe-hint" aria-hidden="true">swipe to browse</div>
            <div className="hb-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
        </section>
    );
}