"use client";

import { useEffect, useRef } from "react";
import { companyInfo } from "@/lib/data";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

  /* ── Root ── */
  .ct-root {
    background: #0b1f10;
    font-family: 'Plus Jakarta Sans', sans-serif;
    overflow: hidden;
    position: relative;
  }

  /* ── Background texture rings ── */
  .ct-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  }
  .ct-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(100,180,60,0.07);
  }
  .ct-ring-1 { width: 600px; height: 600px; top: -200px; left: -200px; }
  .ct-ring-2 { width: 900px; height: 900px; top: -350px; left: -350px; }
  .ct-ring-3 { width: 500px; height: 500px; bottom: -200px; right: -150px; }
  .ct-ring-4 { width: 300px; height: 300px; bottom: -80px;  right: 50px;  }

  /* ── Inner layout ── */
  .ct-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 560px;
  }

  /* ══════════════════════
     LEFT POSTER SIDE
  ══════════════════════ */
  .ct-left {
    padding: 80px 56px 80px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid rgba(100,180,60,0.12);
  }
  .ct-left-top {}

  .ct-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #7ecb45;
    margin-bottom: 20px;
  }
  .ct-tag-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #7ecb45;
    animation: ct-pulse 2s ease infinite;
  }
  @keyframes ct-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.7); }
  }

  .ct-headline {
    font-size: clamp(38px, 4.5vw, 58px);
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin: 0 0 6px;
  }
  .ct-headline-sub {
    font-family: 'Caveat', cursive;
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 700;
    color: #7ecb45;
    line-height: 1;
    display: block;
    margin-bottom: 24px;
  }
  .ct-desc {
    font-size: 14px;
    color: rgba(255,255,255,0.45);
    line-height: 1.75;
    max-width: 320px;
  }

  /* big decorative address */
  .ct-left-bottom {}
  .ct-address-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin-bottom: 10px;
    display: block;
  }
  .ct-address-big {
    font-family: 'Caveat', cursive;
    font-size: clamp(18px, 2.2vw, 26px);
    font-weight: 600;
    color: rgba(255,255,255,0.55);
    line-height: 1.45;
  }

  /* ══════════════════════
     RIGHT CONTACT ROWS
  ══════════════════════ */
  .ct-right {
    padding: 80px 40px 80px 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }

  .ct-row {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 26px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: relative;
    cursor: default;
    text-decoration: none;
  }
  .ct-row:first-child { border-top: 1px solid rgba(255,255,255,0.06); }

  /* animated sweep line */
  .ct-row::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0;
    width: 0; height: 1px;
    background: #7ecb45;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .ct-row:hover::after { width: 100%; }

  .ct-row-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    background: rgba(126,203,69,0.1);
    border: 1px solid rgba(126,203,69,0.18);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    flex: none;
    transition: background 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ct-row:hover .ct-row-icon {
    background: rgba(126,203,69,0.2);
    transform: scale(1.1) rotate(-4deg);
  }

  .ct-row-text {}
  .ct-row-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    display: block;
    margin-bottom: 3px;
  }
  .ct-row-value {
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.01em;
  }

  /* ── Map / CTA strip at bottom ── */
  .ct-bottom {
    position: relative;
    z-index: 1;
    border-top: 1px solid rgba(100,180,60,0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    gap: 20px;
    flex-wrap: wrap;
  }
  .ct-bottom-left {
    font-size: 12px;
    color: rgba(255,255,255,0.3);
    font-weight: 500;
  }
  .ct-bottom-left strong {
    color: rgba(255,255,255,0.6);
    font-weight: 600;
  }
  .ct-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #7ecb45;
    color: #0b1f10;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 800;
    padding: 12px 22px;
    border-radius: 999px;
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: background 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                box-shadow 0.25s;
  }
  .ct-cta:hover {
    background: #93d962;
    transform: scale(1.04);
    box-shadow: 0 8px 28px rgba(126,203,69,0.35);
  }
  .ct-cta-arrow {
    font-size: 16px;
    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ct-cta:hover .ct-cta-arrow { transform: translateX(4px); }

  /* ── Scroll reveal ── */
  .ct-reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .ct-reveal-left {
    opacity: 0;
    transform: translateX(-36px);
    transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                transform 0.75s cubic-bezier(0.22,1,0.36,1);
  }
  .ct-reveal-right {
    opacity: 0;
    transform: translateX(36px);
    transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
                transform 0.75s cubic-bezier(0.22,1,0.36,1);
  }
  .ct-reveal.visible,
  .ct-reveal-left.visible,
  .ct-reveal-right.visible { opacity: 1; transform: translate(0); }

  .ct-d1 { transition-delay: 0.05s; }
  .ct-d2 { transition-delay: 0.13s; }
  .ct-d3 { transition-delay: 0.21s; }
  .ct-d4 { transition-delay: 0.29s; }
  .ct-d5 { transition-delay: 0.37s; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .ct-inner {
      grid-template-columns: 1fr;
      min-height: auto;
    }
    .ct-left {
      padding: 56px 24px 40px;
      border-right: none;
      border-bottom: 1px solid rgba(100,180,60,0.12);
      gap: 32px;
    }
    .ct-right { padding: 40px 24px 56px; }
    .ct-bottom { padding: 18px 24px; }
  }
`;

const CONTACT_ROWS = [
  { icon: "📞", label: "Phone",   key: "phone"   },
  { icon: "✉️", label: "Email",   key: "email"   },
  { icon: "🌐", label: "Website", key: "website" },
];

export default function ContactSection() {
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

  const r = (el) => { if (el && !refs.current.includes(el)) refs.current.push(el); };

  return (
    <section id="contact" className="ct-root">
      <style>{css}</style>

      {/* decorative rings */}
      <div className="ct-rings">
        <div className="ct-ring ct-ring-1" />
        <div className="ct-ring ct-ring-2" />
        <div className="ct-ring ct-ring-3" />
        <div className="ct-ring ct-ring-4" />
      </div>

      <div className="ct-inner">

        {/* ── LEFT ── */}
        <div className="ct-left">
          <div className="ct-left-top">
            <div className="ct-tag ct-reveal ct-d1" ref={r}>
              <span className="ct-tag-dot" />
              Export Inquiries Welcome
            </div>
            <h2 className="ct-headline ct-reveal ct-d1" ref={r}>
              Let's Grow
              <span className="ct-headline-sub">Together.</span>
            </h2>
            <p className="ct-desc ct-reveal ct-d2" ref={r}>
              Whether you're sourcing bulk produce or exploring a new supplier relationship — we're ready to talk, quote, and deliver.
            </p>
          </div>

          <div className="ct-left-bottom ct-reveal ct-d3" ref={r}>
            <span className="ct-address-label">Our Location</span>
            <p className="ct-address-big">{companyInfo.address}</p>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="ct-right">
          {CONTACT_ROWS.map((item, i) => (
            <div
              key={item.label}
              className={`ct-row ct-reveal-right ct-d${i + 2}`}
              ref={r}
            >
              <div className="ct-row-icon">{item.icon}</div>
              <div className="ct-row-text">
                <span className="ct-row-label">{item.label}</span>
                <span className="ct-row-value">{companyInfo[item.key]}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Bottom strip ── */}
      <div className="ct-bottom ct-reveal ct-d4" ref={r}>
        <p className="ct-bottom-left">
          <strong>{companyInfo.name ?? "Agro Exports India"}</strong> &nbsp;·&nbsp;
          Export-quality produce since 2012
        </p>
        <a
          href={`mailto:${companyInfo.email}`}
          className="ct-cta"
        >
          Send an Enquiry
          <span className="ct-cta-arrow">→</span>
        </a>
      </div>
    </section>
  );
}