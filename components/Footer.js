"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

  /* ── Root ── */
  .ft-root {
    background: #060d07;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* ── Background decorative arcs ── */
  .ft-arcs {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .ft-arc {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(126,203,69,0.05);
  }
  .ft-arc-1 { width: 700px; height: 700px; top: -420px; right: -200px; }
  .ft-arc-2 { width: 400px; height: 400px; top: -200px; right: 100px; }
  .ft-arc-3 { width: 300px; height: 300px; bottom: -180px; left: -80px; }

  /* ── Top divider glow ── */
  .ft-top-glow {
    height: 1px;
    background: linear-gradient(
      90deg, transparent 0%, rgba(126,203,69,0.35) 40%,
             rgba(126,203,69,0.35) 60%, transparent 100%
    );
  }

  /* ── Main grid ── */
  .ft-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 72px 40px 56px;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1.4fr;
    gap: 56px;
    align-items: start;
  }

  /* ════════════════
     BRAND column
  ════════════════ */
  .ft-brand {}

  /* logo row — matches CPNA leaf icon + wordmark */
  .ft-logo-row {
    display: flex;
    align-items: center;
    gap: 13px;
    margin-bottom: 16px;
  }

  
  
  .ft-logo-icon {
  width: 46px;
  height: 46px;
  flex: none;
  border-radius: 13px;
  background: #ffffff;
  border: 1px solid rgba(126,203,69,0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.20);
  overflow: hidden;
  padding: 5px;
}

  .ft-brand-name {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 21px;
    font-weight: 800;
    line-height: 1.05;
    margin: 0 0 3px;
    letter-spacing: -0.01em;
  }
  .ft-brand-cpna { color: #ffffff; }
  .ft-brand-food { color: #f5821f; margin-left: 6px; }

  .ft-brand-tagline {
    font-family: 'Caveat', cursive;
    font-size: 16px;
    font-weight: 700;
    color: #7ecb45;
    line-height: 1.15;
    display: block;
  }

  .ft-brand-sub {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    display: block;
    margin-bottom: 20px;
  }

  .ft-brand-desc {
    font-size: 13.5px;
    color: rgba(255,255,255,0.42);
    line-height: 1.8;
    margin: 0 0 28px;
    max-width: 280px;
  }

  /* badge row */
  .ft-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .ft-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(126,203,69,0.08);
    border: 1px solid rgba(126,203,69,0.15);
    border-radius: 999px;
    padding: 5px 12px;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.04em;
    transition: background 0.25s, color 0.25s, border-color 0.25s;
  }
  .ft-badge:hover {
    background: rgba(126,203,69,0.16);
    color: #b0e880;
    border-color: rgba(126,203,69,0.35);
  }
  .ft-badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #7ecb45;
    opacity: 0.7;
  }

  /* ════════════════
     LINKS column
  ════════════════ */
  .ft-links {}

  .ft-col-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin: 0 0 24px;
    display: block;
  }

  .ft-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .ft-nav li {}
  .ft-nav a {
    display: inline-flex;
    align-items: center;
    gap: 0;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    padding: 7px 0;
    position: relative;
    transition: color 0.25s;
  }
  .ft-nav a::after {
    content: '';
    position: absolute;
    bottom: 5px; left: 0;
    width: 0; height: 1px;
    background: #f5821f;
    transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .ft-nav a:hover { color: #ffffff; }
  .ft-nav a:hover::after { width: 100%; }

  .ft-nav-arrow {
    margin-left: 6px;
    font-size: 12px;
    color: #f5821f;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.2s, transform 0.2s;
    display: inline-block;
  }
  .ft-nav a:hover .ft-nav-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* ════════════════
     CONTACT column
  ════════════════ */
  .ft-contact {}

  .ft-contact-rows {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .ft-contact-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 13px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: border-color 0.25s;
  }
  .ft-contact-row:first-child { border-top: 1px solid rgba(255,255,255,0.05); }
  .ft-contact-row:hover { border-bottom-color: rgba(245,130,31,0.25); }

  .ft-contact-icon {
    width: 34px; height: 34px;
    border-radius: 10px;
    background: rgba(126,203,69,0.08);
    border: 1px solid rgba(126,203,69,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    flex: none;
    transition: background 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ft-contact-row:hover .ft-contact-icon {
    background: rgba(245,130,31,0.14);
    transform: rotate(-6deg) scale(1.08);
  }

  .ft-contact-text {}
  .ft-contact-label {
    display: block;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.22);
    margin-bottom: 2px;
  }
  .ft-contact-value {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.55);
    line-height: 1.5;
    transition: color 0.25s;
  }
  .ft-contact-row:hover .ft-contact-value { color: rgba(255,255,255,0.85); }

  /* ════════════════
     BOTTOM BAR
  ════════════════ */
  .ft-bottom-glow {
    position: relative;
    z-index: 1;
    height: 1px;
    max-width: 1100px;
    margin: 0 auto;
    background: linear-gradient(
      90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%
    );
  }
  .ft-bottom {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .ft-copy {
    font-size: 12px;
    color: rgba(255,255,255,0.2);
    font-weight: 500;
  }
  .ft-copy strong { color: rgba(255,255,255,0.4); font-weight: 600; }
  .ft-made {
    font-size: 12px;
    color: rgba(255,255,255,0.18);
    font-weight: 500;
  }
  .ft-made span { color: #7ecb45; }

  /* ── Reveal animations ── */
  .ft-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .ft-reveal.visible { opacity: 1; transform: translateY(0); }
  .ft-d1 { transition-delay: 0.04s; }
  .ft-d2 { transition-delay: 0.12s; }
  .ft-d3 { transition-delay: 0.20s; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .ft-inner {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 28px 44px;
    }
    .ft-brand { grid-column: 1 / 3; }
  }
  @media (max-width: 540px) {
    .ft-inner {
      grid-template-columns: 1fr;
      gap: 36px;
      padding: 48px 20px 36px;
    }
    .ft-brand { grid-column: auto; }
    .ft-bottom { padding: 16px 20px; flex-direction: column; align-items: flex-start; gap: 6px; }
  }
`;

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Vision", href: "/vision" },
  { label: "Mission", href: "/mission" },
  { label: "Contact Us", href: "/contact" },
];

const CONTACT_ROWS = [
  { icon: "📞", label: "Phone", value: "+971 52 796 6720" },
  { icon: "✉️", label: "Email", value: "cpnafoodstuff@gmail.com" },
  { icon: "🌐", label: "Website", value: "www.cpnafoods.com" },
  { icon: "📍", label: "Address", value: "Aweer Fruits & Vegetable Market, Ras Al Khor, Dubai, UAE — 49751" },
];

const BADGES = ["FSSAI Certified", "APEDA Registered", "Export Quality"];

export default function Footer() {
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
      { threshold: 0.08 }
    );
    refs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const r = (el) => { if (el && !refs.current.includes(el)) refs.current.push(el); };

  return (
    <footer className="ft-root">
      <style>{css}</style>

      {/* decorative arcs */}
      <div className="ft-arcs">
        <div className="ft-arc ft-arc-1" />
        <div className="ft-arc ft-arc-2" />
        <div className="ft-arc ft-arc-3" />
      </div>

      {/* top glow line */}
      <div className="ft-top-glow" />

      {/* main grid */}
      <div className="ft-inner">

        {/* ── Brand ── */}
        <div className="ft-brand ft-reveal ft-d1" ref={r}>

          {/* logo + wordmark, matching the CPNA leaf logo */}
          <div className="ft-logo-row">
            <div className="ft-logo-icon">
              <div className="ft-logo-icon">
                <Image
                  src="/logo.png"
                  alt="CPNA Food Stuff Logo"
                  width={36}
                  height={36}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <div>
              <h3 className="ft-brand-name">
                <span className="ft-brand-cpna">CPNA</span>
                <span className="ft-brand-food">FOOD STUFF</span>
              </h3>
              <span className="ft-brand-tagline">Good Food, Brighter Tomorrow</span>
            </div>
          </div>

          <span className="ft-brand-sub">Est. 2012 · Dubai, UAE</span>
          <p className="ft-brand-desc">
            Exporting the finest fruits, vegetables, pulses &amp; grains from Indian farms to the world — freshness guaranteed, quality certified.
          </p>
          <div className="ft-badges">
            {BADGES.map((b) => (
              <span key={b} className="ft-badge">
                <span className="ft-badge-dot" />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="ft-links ft-reveal ft-d2" ref={r}>
          <span className="ft-col-title">Quick Links</span>
          <ul className="ft-nav">
            {QUICK_LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>
                  {item.label}
                  <span className="ft-nav-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div className="ft-contact ft-reveal ft-d3" ref={r}>
          <span className="ft-col-title">Get in Touch</span>
          <div className="ft-contact-rows">
            {CONTACT_ROWS.map((row) => (
              <div key={row.label} className="ft-contact-row">
                <div className="ft-contact-icon">{row.icon}</div>
                <div className="ft-contact-text">
                  <span className="ft-contact-label">{row.label}</span>
                  <span className="ft-contact-value">{row.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* bottom bar */}
      <div className="ft-bottom-glow" />
      <div className="ft-bottom">
        <p className="ft-copy">
          © {new Date().getFullYear()} <strong>CPNA Food Stuff</strong>. All rights reserved.
        </p>
        <p className="ft-made">
          Grown in India · Delivered to the <span>World 🌱</span>
        </p>
      </div>
    </footer>
  );
}