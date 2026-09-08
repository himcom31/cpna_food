"use client";

import { companyInfo } from "@/lib/data";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

  .cp-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f5f2ec;
    overflow-x: hidden;
  }

  /* ══════════════════════════════════════
     HERO
  ══════════════════════════════════════ */
  .cp-hero {
    position: relative;
    background: linear-gradient(155deg, #0b2412 0%, #114a20 55%, #1c7a35 100%);
    padding: 110px 40px 90px;
    overflow: hidden;
  }
  .cp-hero-grain {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 12% 25%, rgba(134,239,172,0.14) 0%, transparent 42%),
      radial-gradient(circle at 88% 78%, rgba(134,239,172,0.1) 0%, transparent 46%);
    pointer-events: none;
  }
  .cp-hero-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
  }
  .cp-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.4);
    margin-bottom: 32px;
  }
  .cp-breadcrumb a { color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
  .cp-breadcrumb a:hover { color: #fff; }
  .cp-breadcrumb-active { color: #86efac; }

  .cp-hero-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 56px;
    align-items: end;
  }
  .cp-hero-title {
    font-size: clamp(46px, 6.5vw, 80px);
    font-weight: 800;
    color: #fff;
    line-height: 1.02;
    letter-spacing: -0.03em;
    margin: 0;
  }
  .cp-hero-title .caveat {
    font-family: 'Caveat', cursive;
    color: #86efac;
    font-size: 1.15em;
    font-weight: 700;
  }
  .cp-hero-sub {
    font-size: 15px;
    color: rgba(220,252,231,0.72);
    line-height: 1.75;
    margin: 22px 0 0;
    max-width: 460px;
  }
  .cp-hero-badge {
    justify-self: end;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1.5px dashed rgba(134,239,172,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: none;
  }
  .cp-hero-badge::before {
    content: '';
    position: absolute;
    inset: 16px;
    border-radius: 50%;
    border: 1px solid rgba(134,239,172,0.2);
  }
  .cp-hero-badge span {
    font-size: 50px;
    animation: cp-pulse 2.6s ease-in-out infinite;
    display: inline-block;
  }
  @keyframes cp-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.12); }
  }

  /* ══════════════════════════════════════
     QUICK CONTACT STRIP
  ══════════════════════════════════════ */
  .cp-quick {
    background: #08170c;
    padding: 0 40px;
  }
  .cp-quick-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    transform: translateY(-36px);
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 24px 60px rgba(6,20,10,0.25);
    overflow: hidden;
  }
  .cp-quick-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 26px 24px;
    border-right: 1px solid #eee2d4;
    text-decoration: none;
    transition: background 0.25s;
  }
  .cp-quick-item:hover { background: #f6fbf4; }
  .cp-quick-item:last-child { border-right: none; }
  .cp-quick-icon {
    width: 42px; height: 42px;
    border-radius: 12px;
    background: #eefaf0;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex: none;
  }
  .cp-quick-label {
    font-size: 11px;
    color: #8a8172;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 2px;
  }
  .cp-quick-value {
    font-size: 13.5px;
    font-weight: 700;
    color: #14532d;
    margin: 0;
    word-break: break-word;
  }

  /* ══════════════════════════════════════
     MAIN — form + info split
  ══════════════════════════════════════ */
  .cp-main {
    padding: 70px 40px 110px;
  }
  .cp-main-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 40px;
    align-items: start;
  }

  /* FORM CARD */
  .cp-form-card {
    background: #fff;
    border: 1px solid #ece3d5;
    border-radius: 22px;
    padding: 40px;
  }
  .cp-eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #15803d;
    margin: 0 0 10px;
  }
  .cp-form-title {
    font-size: 26px;
    font-weight: 800;
    color: #14210f;
    letter-spacing: -0.02em;
    margin: 0 0 8px;
  }
  .cp-form-desc {
    font-size: 13.5px;
    color: #7a7060;
    line-height: 1.6;
    margin: 0 0 30px;
  }

  .cp-field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  .cp-field { margin-bottom: 20px; }
  .cp-field label {
    display: block;
    font-size: 12.5px;
    font-weight: 700;
    color: #33291c;
    margin-bottom: 8px;
  }
  .cp-field input,
  .cp-field select,
  .cp-field textarea {
    width: 100%;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: #241a10;
    background: #faf8f4;
    border: 1.5px solid #e7e0d2;
    border-radius: 12px;
    padding: 12px 14px;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .cp-field textarea { resize: vertical; min-height: 110px; font-family: inherit; }
  .cp-field input:focus,
  .cp-field select:focus,
  .cp-field textarea:focus {
    outline: none;
    border-color: #22a34a;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(34,163,74,0.12);
  }
  .cp-field-error {
    font-size: 11.5px;
    color: #c2410c;
    margin: 6px 0 0;
    font-weight: 600;
  }
  .cp-field input.err,
  .cp-field select.err,
  .cp-field textarea.err { border-color: #dc7a3f; }

  .cp-submit {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #15803d;
    color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 800;
    padding: 15px 24px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.25s, transform 0.15s;
  }
  .cp-submit:hover:not(:disabled) { background: #166534; }
  .cp-submit:active:not(:disabled) { transform: scale(0.98); }
  .cp-submit:disabled { opacity: 0.65; cursor: not-allowed; }

  .cp-spinner {
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: cp-spin 0.7s linear infinite;
  }
  @keyframes cp-spin { to { transform: rotate(360deg); } }

  .cp-success {
    text-align: center;
    padding: 40px 10px;
  }
  .cp-success-icon {
    width: 64px; height: 64px;
    border-radius: 50%;
    background: #dcfce7;
    color: #15803d;
    font-size: 28px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    animation: cp-pop 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes cp-pop {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }
  .cp-success h3 {
    font-size: 19px;
    font-weight: 800;
    color: #14210f;
    margin: 0 0 8px;
  }
  .cp-success p {
    font-size: 13.5px;
    color: #7a7060;
    line-height: 1.7;
    margin: 0 0 24px;
    max-width: 340px;
    margin-left: auto;
    margin-right: auto;
  }
  .cp-success button {
    background: transparent;
    border: 1.5px solid #d8d0c0;
    color: #33291c;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    padding: 11px 22px;
    border-radius: 999px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }
  .cp-success button:hover { border-color: #15803d; background: #f6fbf4; }

  /* SIDE INFO */
  .cp-side { display: flex; flex-direction: column; gap: 18px; }
  .cp-side-card {
    background: #fff;
    border: 1px solid #ece3d5;
    border-radius: 20px;
    padding: 26px;
  }
  .cp-side-card-dark {
    background: #0b2412;
    border-color: #0b2412;
  }
  .cp-address-row { display: flex; gap: 14px; align-items: flex-start; }
  .cp-address-icon { font-size: 22px; flex: none; }
  .cp-address-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #8a8172;
    margin: 0 0 6px;
  }
  .cp-address-value {
    font-size: 13.5px;
    font-weight: 600;
    color: #14532d;
    line-height: 1.65;
    margin: 0;
  }

  .cp-hours-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #86efac;
    margin: 0 0 16px;
  }
  .cp-hours-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 9px 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.85);
  }
  .cp-hours-row:last-child { border-bottom: none; }
  .cp-hours-row span:last-child { color: rgba(255,255,255,0.5); font-weight: 500; }

  .cp-response-badge {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cp-response-badge span.icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: #fff7ed;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    flex: none;
  }
  .cp-response-badge p {
    margin: 0;
    font-size: 12.5px;
    color: #7a7060;
    line-height: 1.5;
  }
  .cp-response-badge strong { display: block; color: #14210f; font-size: 14px; }

  /* ── Reveal ── */
  .cp-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1);
  }
  .cp-reveal.visible { opacity: 1; transform: translate(0); }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .cp-hero-grid { grid-template-columns: 1fr; }
    .cp-hero-badge { justify-self: start; width: 110px; height: 110px; }
    .cp-hero-badge span { font-size: 36px; }
    .cp-quick-inner { grid-template-columns: 1fr; }
    .cp-quick-item { border-right: none; border-bottom: 1px solid #eee2d4; }
    .cp-quick-item:last-child { border-bottom: none; }
    .cp-main-inner { grid-template-columns: 1fr; }
    .cp-field-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 560px) {
    .cp-hero { padding: 84px 20px 72px; }
    .cp-quick, .cp-main { padding-left: 20px; padding-right: 20px; }
    .cp-form-card { padding: 26px 20px; }
  }
`;

const QUICK_ITEMS = [
  { icon: "📞", label: "Call Us", value: companyInfo.phone, href: `tel:${String(companyInfo.phone || "").replace(/\s+/g, "")}` },
  { icon: "✉️", label: "Email Us", value: companyInfo.email, href: `mailto:${companyInfo.email}` },
  { icon: "🌐", label: "Visit Site", value: companyInfo.website, href: companyInfo.website?.startsWith("http") ? companyInfo.website : `https://${companyInfo.website}` },
];

const HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 6:30 PM" },
  { day: "Saturday", time: "9:00 AM – 2:00 PM" },
  { day: "Sunday", time: "Closed" },
];

const SUBJECTS = [
  "Export Inquiry",
  "Become a Buyer",
  "Farmer / Supplier Partnership",
  "Logistics & Shipping",
  "General Question",
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
  return (el) => { if (el && !refs.current.includes(el)) refs.current.push(el); };
}

const EMPTY_FORM = { name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" };

export default function ContactPage() {
  const r = useReveal();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) next.message = "Tell us a little about your inquiry.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      // Wire this up to a real endpoint, e.g.:
      // await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      await new Promise((res) => setTimeout(res, 900));
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors({ form: "Something went wrong. Please try again." });
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setStatus("idle");
  };

  return (
    <main className="cp-root">
      <style>{css}</style>

      {/* ══ HERO ══ */}
      <section className="cp-hero">
        <div className="cp-hero-grain" />
        <div className="cp-hero-inner">
          <nav className="cp-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="cp-breadcrumb-active">Contact Us</span>
          </nav>
          <div className="cp-hero-grid">
            <div>
              <h1 className="cp-hero-title">
                Contact <span className="caveat">Us</span>
              </h1>
              <p className="cp-hero-sub">
                Have an export inquiry, a supply question, or want to partner with us? We usually reply within one business day.
              </p>
            </div>
            <div className="cp-hero-badge" aria-hidden="true">
              <span>📮</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ QUICK CONTACT ══ */}
      <section className="cp-quick">
        <div className="cp-quick-inner">
          {QUICK_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="cp-quick-item">
              <span className="cp-quick-icon">{item.icon}</span>
              <div>
                <p className="cp-quick-label">{item.label}</p>
                <p className="cp-quick-value">{item.value}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ MAIN: FORM + INFO ══ */}
      <section className="cp-main">
        <div className="cp-main-inner">
          {/* FORM */}
          <div className="cp-form-card cp-reveal" ref={r}>
            {status === "success" ? (
              <div className="cp-success">
                <div className="cp-success-icon">✓</div>
                <h3>Inquiry sent</h3>
                <p>
                  Thanks, {form.name.split(" ")[0] || "there"} — our export team has received your message and will get back to you shortly.
                </p>
                <button onClick={resetForm}>Send another inquiry</button>
              </div>
            ) : (
              <>
                <p className="cp-eyebrow">Send an Inquiry</p>
                <h2 className="cp-form-title">Let's start a conversation</h2>
                <p className="cp-form-desc">
                  Fill in the details below and our team will reach out with next steps for your inquiry.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="cp-field-row">
                    <div className="cp-field">
                      <label htmlFor="name">Full name</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={update("name")}
                        className={errors.name ? "err" : ""}
                      />
                      {errors.name && <p className="cp-field-error">{errors.name}</p>}
                    </div>
                    <div className="cp-field">
                      <label htmlFor="phone">Phone (optional)</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 00000 00000"
                        value={form.phone}
                        onChange={update("phone")}
                      />
                    </div>
                  </div>

                  <div className="cp-field">
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={update("email")}
                      className={errors.email ? "err" : ""}
                    />
                    {errors.email && <p className="cp-field-error">{errors.email}</p>}
                  </div>

                  <div className="cp-field">
                    <label htmlFor="subject">What's this about?</label>
                    <select id="subject" value={form.subject} onChange={update("subject")}>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="cp-field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      placeholder="Tell us about the produce, volumes, or destination you have in mind..."
                      value={form.message}
                      onChange={update("message")}
                      className={errors.message ? "err" : ""}
                    />
                    {errors.message && <p className="cp-field-error">{errors.message}</p>}
                  </div>

                  {errors.form && <p className="cp-field-error" style={{ marginBottom: 16 }}>{errors.form}</p>}

                  <button type="submit" className="cp-submit" disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <>
                        <span className="cp-spinner" /> Sending...
                      </>
                    ) : (
                      <>Send Inquiry →</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* SIDE INFO */}
          <div className="cp-side">
            <div className="cp-side-card cp-reveal" ref={r}>
              <div className="cp-address-row">
                <span className="cp-address-icon">📍</span>
                <div>
                  <p className="cp-address-label">Our Address</p>
                  <p className="cp-address-value">{companyInfo.address}</p>
                </div>
              </div>
            </div>

            <div className="cp-side-card cp-side-card-dark cp-reveal" ref={r}>
              <p className="cp-hours-title">Business Hours</p>
              {HOURS.map((h) => (
                <div className="cp-hours-row" key={h.day}>
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>

            <div className="cp-side-card cp-reveal" ref={r}>
              <div className="cp-response-badge">
                <span className="icon">⚡</span>
                <p>
                  <strong>Fast response</strong>
                  Most inquiries get a reply from our export desk within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}