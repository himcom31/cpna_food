"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Leaf,
  Heart,
  Home,
  Users,
  Target,
  Flag,
  LayoutGrid,
  Search,
  Send,
} from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

  /* ── RESET & BASE ── */
  .cpna-nav * { box-sizing: border-box; }

  /* SINGLE merged .cpna-nav block — no more conflict */
    .cpna-nav {
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 100vw;
    z-index: 1000;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    animation: navDropIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  @keyframes navDropIn {
    from { transform: translateY(-16px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .cpna-nav, .cpna-nav * { animation: none !important; transition: none !important; }
  }

  /* ── DECORATIVE SPARKLES ── */
  .cpna-sparkles {
    position: absolute;
    top: 4px;
    right: 14px;
    width: 46px;
    height: 46px;
    pointer-events: none;
    z-index: 5;
    opacity: 0.9;
  }
  .cpna-sparkle {
    position: absolute;
    color: #4ade80;
    animation: sparkleTwinkle 2.4s ease-in-out infinite;
  }
  .cpna-sparkle.s1 { top: 0; right: 6px; animation-delay: 0s; }
  .cpna-sparkle.s2 { top: 20px; right: 26px; animation-delay: 0.6s; }
  .cpna-sparkle.s3 { top: 30px; right: 2px; animation-delay: 1.2s; }
  @keyframes sparkleTwinkle {
    0%, 100% { opacity: 0.15; transform: scale(0.7) rotate(0deg); }
    50%      { opacity: 1;    transform: scale(1.15) rotate(15deg); }
  }
  .cpna-nav.scrolled .cpna-sparkles { opacity: 0; transition: opacity 0.3s ease; }
  @media (max-width: 640px) { .cpna-sparkles { display: none; } }

  /* ── TOP TICKER STRIP ── */
  .cpna-ticker {
    position: relative;
    background: linear-gradient(90deg, #14532d 0%, #15803d 50%, #14532d 100%);
    background-size: 200% 100%;
    animation: tickerGlow 8s ease-in-out infinite;
    overflow: hidden;
    height: 58px;
    display: flex;
    align-items: center;
    transition: height 0.35s ease, opacity 0.35s ease;
  }
  @keyframes tickerGlow {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }
  .cpna-nav.scrolled .cpna-ticker {
    height: 0;
    opacity: 0;
    pointer-events: none;
  }
  .cpna-ticker::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 8% 30%, rgba(74,222,128,0.10) 0%, transparent 40%),
      radial-gradient(circle at 92% 70%, rgba(74,222,128,0.10) 0%, transparent 40%);
    pointer-events: none;
  }
  .cpna-ticker-track {
    display: flex;
    align-items: center;
    gap: 40px;
    white-space: nowrap;
    animation: ticker 30s linear infinite;
    padding-left: 8px;
  }
  .cpna-ticker-leaves {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .cpna-ticker-leaf {
    position: absolute;
    opacity: 0.22;
    animation: leafDrift 4.5s ease-in-out infinite;
    filter: brightness(1.4) saturate(0.7);
  }
  @keyframes leafDrift {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.16; }
    50%      { transform: translateY(-6px) rotate(12deg); opacity: 0.32; }
  }
  .cpna-ticker-item {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cpna-ticker-icon {
    width: 32px; height: 32px;
    border-radius: 9px;
    background: rgba(255,255,255,0.92);
    box-shadow: 0 2px 6px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.5);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
    line-height: 1;
    animation: iconBob 3.2s ease-in-out infinite;
  }
  .cpna-ticker-item:nth-child(odd) .cpna-ticker-icon { animation-delay: -1.6s; }
  @keyframes iconBob {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-3px); }
  }
  .cpna-ticker-text { display: flex; flex-direction: column; line-height: 1.2; }
  .cpna-ticker-title {
    color: #ffffff;
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 0.01em;
  }
  .cpna-ticker-sub {
    color: #bbf7d0;
    font-size: 10.5px;
    font-weight: 500;
  }
  .cpna-ticker-sep {
    width: 1px; height: 26px;
    background: rgba(255,255,255,0.16);
    flex-shrink: 0;
  }
  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* ── LIVE BADGE ── */
  .cpna-live-badge {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    padding: 6px 12px;
    margin: 0 4px 0 12px;
    border-radius: 999px;
    background: rgba(255,255,255,0.14);
    border: 1px solid rgba(255,255,255,0.22);
    color: #ffffff;
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }
  .cpna-live-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 0 0 rgba(74,222,128,0.7);
    animation: liveDotPulse 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes liveDotPulse {
    0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.65); transform: scale(1); }
    70%  { box-shadow: 0 0 0 7px rgba(74,222,128,0); transform: scale(1.15); }
    100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); transform: scale(1); }
  }
  @media (max-width: 480px) {
    .cpna-live-badge { display: none; }
  }

  .cpna-ticker-cta {
    flex-shrink: 0;
    display: flex; align-items: center; gap: 6px;
    padding: 7px 14px 7px 12px;
    margin: 0 12px 0 20px;
    border-radius: 999px;
    background: rgba(255,255,255,0.16);
    border: 1px solid rgba(255,255,255,0.22);
    color: #ffffff;
    font-size: 12.5px;
    font-weight: 700;
    white-space: nowrap;
    text-decoration: none;
    position: relative;
    z-index: 1;
    animation: ctaBreathe 2.6s ease-in-out infinite;
    transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  }
  .cpna-ticker-cta:hover {
    background: rgba(255,255,255,0.26);
    transform: translateY(-1px) scale(1.03);
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
  }
  @keyframes ctaBreathe {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.18); }
    50%      { box-shadow: 0 0 0 6px rgba(255,255,255,0); }
  }
  .cpna-ticker-cta svg:first-child {
    color: #f87171;
    animation: heartBeat 1.1s ease-in-out infinite;
  }
  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    25%      { transform: scale(1.25); }
    40%      { transform: scale(1); }
    60%      { transform: scale(1.15); }
  }
  .cpna-ticker-cta:hover svg:last-child { animation: chevronNudge 0.6s ease-in-out infinite; }
  @keyframes chevronNudge {
    0%, 100% { transform: translateX(0); }
    50%      { transform: translateX(3px); }
  }
  @media (max-width: 480px) {
    .cpna-ticker-cta { display: none; }
  }

  /* ── MAIN BAR ── */
    .cpna-bar {
    position: relative;
    background: rgba(255,255,255,0.94);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1.5px solid rgba(21,128,61,0.12);
    transition: box-shadow 0.35s ease, padding 0.35s ease;
    width: 100%;
    overflow: visible;
  }
  .cpna-nav.scrolled .cpna-bar {
    box-shadow: 0 4px 32px rgba(21,128,61,0.10), 0 1px 0 rgba(0,0,0,0.04);
    background: rgba(255,255,255,0.98);
  }

  /* ── FLOATING BACKGROUND PARTICLES ── */
  .cpna-bar-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  }
  .cpna-bar-particle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(34,197,94,0.30) 0%, rgba(34,197,94,0) 70%);
    animation: barParticleFloat 6s ease-in-out infinite;
  }
  @keyframes barParticleFloat {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.45; }
    50%      { transform: translate(6px, -12px) scale(1.25); opacity: 0.9; }
  }
  @media (max-width: 640px) { .cpna-bar-particles { display: none; } }

    .cpna-bar-inner {
    position: relative;
    z-index: 1001;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 24px;
    height: 84px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    transition: height 0.35s ease, padding 0.35s ease;
  }
  .cpna-nav.scrolled .cpna-bar-inner { height: 68px; }

  /* ── LOGO ── */
  .cpna-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    flex-shrink: 1;
    min-width: 0;
    opacity: 0;
    animation: logoIn 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s forwards;
  }
  @keyframes logoIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .cpna-logo-badge {
    position: relative;
    width: 52px; height: 52px;
    flex-shrink: 0;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
    animation: logoFloat 3.4s ease-in-out infinite;
  }
  @keyframes logoFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50%      { transform: translateY(-3px) rotate(-2deg); }
  }
  .cpna-logo:hover .cpna-logo-badge { transform: rotate(-6deg) scale(1.08); animation-play-state: paused; }
  .cpna-logo-badge-bg {
  position: relative;
  width: 100%; height: 100%;
  border-radius: 15px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(21,128,61,0.12);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 14px rgba(0,0,0,0.10);
  padding: 6px;
}
  .cpna-logo-badge-bg::after {
    content: '';
    position: absolute;
    top: 0; left: -60%;
    width: 40%; height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
    transform: skewX(-20deg);
    animation: logoShine 3.6s ease-in-out infinite;
  }
  @keyframes logoShine {
    0%   { left: -60%; }
    35%  { left: 130%; }
    100% { left: 130%; }
  }
  .cpna-logo-leaf { color: white; position: relative; z-index: 1; }
  .cpna-logo-texts { display: flex; flex-direction: column; line-height: 1; gap: 1px; min-width: 0; }
  .cpna-logo-name-row { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
  .cpna-logo-name {
    font-size: 21px;
    font-weight: 800;
    color: #14532d;
    letter-spacing: -0.01em;
  }
  .cpna-logo-sub {
    font-size: 21px;
    font-weight: 800;
    color: #ea580c;
    letter-spacing: -0.01em;
  }
  .cpna-logo-tag {
    position: relative;
    font-family: 'Caveat', cursive;
    font-size: 17px;
    font-weight: 700;
    color: #16a34a;
    line-height: 1.05;
    margin-top: 2px;
    white-space: nowrap;
  }
  .cpna-logo-tag-underline {
    position: absolute;
    left: 2px; bottom: -3px;
    width: 78%;
    height: 5px;
  }
  .cpna-logo-tag-underline path {
    stroke-dasharray: 140;
    stroke-dashoffset: 140;
    animation: underlineDraw 4.5s ease-in-out infinite;
  }
  @keyframes underlineDraw {
    0%   { stroke-dashoffset: 140; opacity: 1; }
    35%  { stroke-dashoffset: 0;   opacity: 1; }
    75%  { stroke-dashoffset: 0;   opacity: 1; }
    100% { stroke-dashoffset: -140; opacity: 1; }
  }

  /* ── DESKTOP NAV ── */
  .cpna-desktop-nav {
    display: none;
    align-items: center;
    gap: 2px;
    list-style: none;
    margin: 0; padding: 6px;
    background: #f6f8f6;
    border-radius: 999px;
    border: 1px solid rgba(21,128,61,0.08);
  }
  @media (min-width: 768px) {
    .cpna-desktop-nav { display: flex; }
    .cpna-mobile-btn  { display: none !important; }
  }
  .cpna-desktop-nav > li {
    opacity: 0;
    animation: navItemIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .cpna-desktop-nav > li:nth-child(1) { animation-delay: 0.08s; }
  .cpna-desktop-nav > li:nth-child(2) { animation-delay: 0.16s; }
  .cpna-desktop-nav > li:nth-child(3) { animation-delay: 0.24s; }
  .cpna-desktop-nav > li:nth-child(4) { animation-delay: 0.32s; }
  .cpna-desktop-nav > li:nth-child(5) { animation-delay: 0.40s; }
  @keyframes navItemIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cpna-desktop-nav > li > a,
  .cpna-desktop-nav > li > button {
    position: relative;
    display: flex; align-items: center; gap: 7px;
    padding: 9px 15px;
    border-radius: 999px;
    font-size: 14.5px;
    font-weight: 700;
    color: #374151;
    text-decoration: none;
    background: none; border: none; cursor: pointer;
    transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
    white-space: nowrap;
  }
  .cpna-nav-link.active,
  .cpna-desktop-nav > li > a:hover,
  .cpna-desktop-nav > li > button:hover {
    color: #15803d;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(21,128,61,0.10);
    transform: translateY(-1px);
  }
  .cpna-nav-link.active .cpna-nav-icon,
  .cpna-desktop-nav > li > a:hover .cpna-nav-icon {
    transform: scale(1.12) rotate(-4deg);
  }
  .cpna-nav-icon { flex-shrink: 0; transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
  .cpna-nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 0 rgba(34,197,94,0.6);
    animation: activeDotPulse 1.8s ease-in-out infinite;
  }
  @keyframes activeDotPulse {
    0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.55); }
    70%  { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
    100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
  }

  /* ── ICON BUTTONS ── */
  .cpna-icon-btn {
    position: relative;
    width: 42px; height: 42px;
    border-radius: 999px;
    background: #ecfdf3;
    border: none;
    display: flex; align-items: center; justify-content: center;
    color: #15803d;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .cpna-icon-btn::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 999px;
    border: 1.5px solid rgba(21,128,61,0.35);
    animation: iconRingPulse 2.6s ease-out infinite;
  }
  @keyframes iconRingPulse {
    0%   { transform: scale(0.85); opacity: 0.9; }
    70%  { transform: scale(1.3);  opacity: 0; }
    100% { transform: scale(1.3);  opacity: 0; }
  }
  .cpna-icon-btn:hover {
    background: #dcfce7;
    transform: scale(1.08) rotate(-8deg);
    box-shadow: 0 4px 12px rgba(21,128,61,0.18);
  }
  .cpna-icon-btn:active { transform: scale(0.94); }

  /* ── CONTACT BUTTON ── */
  .cpna-contact-btn {
    position: relative;
    overflow: hidden;
    display: flex; align-items: center; gap: 8px;
    padding: 12px 22px !important;
    background: linear-gradient(135deg, #16a34a, #22c55e) !important;
    background-size: 160% 160% !important;
    color: white !important;
    border-radius: 999px !important;
    box-shadow: 0 4px 16px rgba(21,128,61,0.32);
    transition: transform 0.2s, box-shadow 0.2s, filter 0.2s, background-position 0.4s !important;
    font-size: 14.5px !important;
    white-space: nowrap;
    flex-shrink: 0;
    animation: contactBreathe 2.8s ease-in-out infinite;
  }
  .cpna-contact-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -75%;
    width: 45%; height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
    transform: skewX(-20deg);
    animation: contactShine 3.4s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes contactShine {
    0%   { left: -75%; }
    35%  { left: 130%; }
    100% { left: 130%; }
  }
  @keyframes contactBreathe {
    0%, 100% { box-shadow: 0 4px 16px rgba(21,128,61,0.32); }
    50%      { box-shadow: 0 4px 24px rgba(21,128,61,0.48), 0 0 0 4px rgba(34,197,94,0.12); }
  }
  .cpna-contact-btn:hover {
    background-position: 100% 100% !important;
    color: white !important;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 22px rgba(21,128,61,0.42) !important;
    filter: brightness(1.04);
  }
  .cpna-contact-btn:hover svg { animation: sendFly 0.7s ease-in-out; }
  @keyframes sendFly {
    0%   { transform: translate(0, 0) rotate(0deg); }
    40%  { transform: translate(4px, -3px) rotate(8deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }
  .cpna-contact-btn:active { transform: translateY(0) scale(0.98); }
  .cpna-contact-btn > svg,
  .cpna-contact-btn > span:not(.cpna-shine) {
    position: relative;
    z-index: 1;
  }

  .cpna-right-group {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    opacity: 0;
    animation: logoIn 0.55s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
  }

  /* ── DROPDOWN ── */
  .cpna-drop-wrapper { position: relative; }
  .cpna-chevron {
    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
    flex-shrink: 0;
  }
  .cpna-chevron:not(.open) {
    animation: chevronIdleBounce 2.6s ease-in-out infinite;
  }
  @keyframes chevronIdleBounce {
    0%, 75%, 100% { transform: translateY(0); }
    38%           { transform: translateY(2px); }
  }
  .cpna-chevron.open { transform: rotate(180deg); animation: none; }
    .cpna-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%) translateY(-6px);
    width: 220px;
    background: white;
    border-radius: 14px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06);
    border: 1px solid rgba(21,128,61,0.10);
    overflow: hidden;
    list-style: none; margin: 0; padding: 6px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.4,0,0.2,1);
    z-index: 9999;
  }
  .cpna-dropdown.open {
    opacity: 1; pointer-events: all;
    transform: translateX(-50%) translateY(0);
  }
  .cpna-dropdown.open li {
    opacity: 0;
    animation: dropItemIn 0.3s ease forwards;
  }
  .cpna-dropdown.open li:nth-child(1) { animation-delay: 0.03s; }
  .cpna-dropdown.open li:nth-child(2) { animation-delay: 0.08s; }
  .cpna-dropdown.open li:nth-child(3) { animation-delay: 0.13s; }
  @keyframes dropItemIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cpna-drop-icon { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.18s; }
  .cpna-dropdown li a:hover .cpna-drop-icon { transform: scale(1.15) rotate(-6deg); }
  .cpna-dropdown::before {
    content: '';
    position: absolute;
    top: -6px; left: 50%;
    transform: translateX(-50%);
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid white;
    filter: drop-shadow(0 -2px 2px rgba(0,0,0,0.06));
  }
  .cpna-dropdown li a {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 13.5px; font-weight: 500;
    color: #374151; text-decoration: none;
    transition: background 0.18s, color 0.18s, padding-left 0.18s;
  }
  .cpna-dropdown li a:hover {
    background: #f0fdf4;
    color: #15803d;
    padding-left: 16px;
  }
  .cpna-drop-icon {
    width: 28px; height: 28px;
    border-radius: 7px;
    background: #f0fdf4;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; flex-shrink: 0;
    transition: background 0.18s;
  }
  .cpna-dropdown li a:hover .cpna-drop-icon { background: #dcfce7; }
  .cpna-drop-sep {
    height: 1px; background: #f3f4f6;
    margin: 4px 6px;
  }

  /* ── MOBILE BUTTON ── */
  .cpna-mobile-btn {
    width: 42px; height: 42px;
    border-radius: 12px;
    background: #ecfdf3;
    border: 1.5px solid rgba(21,128,61,0.15);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #15803d;
    transition: background 0.2s, transform 0.2s;
    flex-shrink: 0;
  }
  .cpna-mobile-btn:hover { background: #dcfce7; transform: scale(1.06); }
  .cpna-mobile-btn .icon-wrap {
    position: relative; width: 22px; height: 22px;
  }
  .cpna-mobile-btn .icon-wrap svg {
    position: absolute; top: 0; left: 0;
    transition: opacity 0.2s, transform 0.2s;
  }
  .cpna-mobile-btn .icon-close { opacity: 0; transform: rotate(-45deg) scale(0.6); }
  .cpna-mobile-btn .icon-menu  { opacity: 1; transform: rotate(0deg) scale(1); }
  .cpna-mobile-btn.open .icon-close { opacity: 1; transform: rotate(0deg) scale(1); }
  .cpna-mobile-btn.open .icon-menu  { opacity: 0; transform: rotate(45deg) scale(0.6); }

  /* ── MOBILE DRAWER ── */
  .cpna-drawer {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
    background: white;
    border-top: 1px solid rgba(21,128,61,0.10);
    width: 100%;
  }
  .cpna-drawer.open {
    max-height: 560px;
    opacity: 1;
  }
  @media (min-width: 768px) { .cpna-drawer { display: none; } }

  .cpna-drawer-inner {
    padding: 12px 16px 20px;
    display: flex; flex-direction: column; gap: 2px;
  }
  .cpna-drawer-link {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 12px;
    border-radius: 10px;
    font-size: 14px; font-weight: 600;
    color: #1f2937; text-decoration: none;
    transition: background 0.18s, color 0.18s, transform 0.18s;
  }
  .cpna-drawer-link:hover { background: #f0fdf4; color: #15803d; transform: translateX(4px); }
  .cpna-drawer-sep { height: 1px; background: #f3f4f6; margin: 6px 0; }
  .cpna-drawer-cat-label {
    font-size: 10px; font-weight: 700;
    color: #9ca3af; letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 8px 12px 4px;
    margin: 0;
  }
  .cpna-drawer-cat-link {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 13.5px; font-weight: 500;
    color: #374151; text-decoration: none;
    transition: background 0.18s, color 0.18s, transform 0.18s;
  }
  .cpna-drawer-cat-link:hover { background: #f0fdf4; color: #15803d; transform: translateX(4px); }
  .cpna-drawer-cat-icon { font-size: 16px; width: 26px; text-align: center; }
  .cpna-drawer-contact {
    margin-top: 8px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px; font-weight: 700;
    color: white; text-decoration: none;
    background: linear-gradient(135deg, #15803d, #22c55e);
    box-shadow: 0 3px 14px rgba(21,128,61,0.30);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .cpna-drawer-contact:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(21,128,61,0.38);
  }

  /* ══════════════ MOBILE RESPONSIVE OVERRIDES ══════════════ */
@media (max-width: 767px) {
  .cpna-bar-inner {
    padding: 0 12px;
    gap: 8px;
    height: auto;        /* ✅ fixed height hatao */
    min-height: 58px;    /* ✅ min-height rakho */
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .cpna-nav.scrolled .cpna-bar-inner { 
    min-height: 52px; 
    height: auto;
  }

  .cpna-logo-badge { width: 36px; height: 36px; }
  .cpna-logo-badge-bg { border-radius: 10px; }
  .cpna-logo-name, .cpna-logo-sub { font-size: 14px; }
  .cpna-logo-tag { 
    font-size: 11px;
    display: block !important;  /* ✅ force show */
    white-space: nowrap;
  }

  .cpna-contact-btn { display: none !important; }
  .cpna-right-group { gap: 6px; }

  .cpna-icon-btn { width: 34px; height: 34px; }
  .cpna-icon-btn::before { display: none; }

  .cpna-mobile-btn {
    width: 34px; height: 34px;
    border-radius: 10px;
  }

  .cpna-ticker { height: 40px; }
  .cpna-ticker-track { gap: 18px; }
  .cpna-ticker-icon { width: 24px; height: 24px; font-size: 12px; border-radius: 6px; }
  .cpna-ticker-title { font-size: 10.5px; }
  .cpna-ticker-sub { font-size: 9px; }
  .cpna-ticker-sep { height: 18px; }
}

@media (max-width: 340px) {
  .cpna-bar-inner {
    height: auto;
    min-height: 50px;
    padding: 6px 10px;
    gap: 6px;
  }
  .cpna-logo-badge { width: 30px; height: 30px; }
  .cpna-logo-name, .cpna-logo-sub { font-size: 12px; }
  .cpna-logo-tag { display: none !important; }

  .cpna-icon-btn { width: 30px; height: 30px; }
  .cpna-mobile-btn { width: 30px; height: 30px; }

  .cpna-ticker-sub { display: none; }
  .cpna-ticker { height: 36px; }
  .cpna-ticker-icon { width: 20px; height: 20px; font-size: 10px; }
  .cpna-ticker-title { font-size: 10px; }
  .cpna-ticker-track { gap: 12px; }
}
`;

const categories = [
  { name: "Vegetables", href: "/categories/vegetables", emoji: "🥦" },
  { name: "Fruits", href: "/categories/fruits", emoji: "🍎" },
  { name: "Pulses & Grains", href: "/categories/pulses-grains", emoji: "🌾" },
];

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About Us", href: "/about", icon: Users },
  { label: "Vision", href: "/vision", icon: Target },
  { label: "Mission", href: "/mission", icon: Flag },
];

const tickerItems = [
  { emoji: "🚚", title: "Farm-to-Door Delivery", sub: "Freshness at your doorstep" },
  { emoji: "🌱", title: "Sustainably Sourced", sub: "Good for you, Greener for Earth" },
  { emoji: "🛡️", title: "Quality Certified", sub: "Safe. Pure. Trusted." },
  { emoji: "🌍", title: "Trusted Across India", sub: "Serving Healthy India" },
  { emoji: "🌿", title: "100% Natural & Organic Produce", sub: "Straight from Farmers" },
];

const barParticles = [
  { left: "6%",  top: "22%", size: 5, delay: "0s" },
  { left: "14%", top: "68%", size: 3, delay: "0.8s" },
  { left: "34%", top: "18%", size: 4, delay: "1.6s" },
  { left: "52%", top: "72%", size: 3, delay: "2.4s" },
  { left: "68%", top: "26%", size: 5, delay: "0.4s" },
  { left: "84%", top: "62%", size: 4, delay: "1.2s" },
  { left: "94%", top: "20%", size: 3, delay: "2s" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const doubled = [...tickerItems, ...tickerItems];

  return (
    <nav className={`cpna-nav${scrolled ? " scrolled" : ""}`} aria-label="Main navigation">
      <style>{styles}</style>

      <div className="cpna-sparkles" aria-hidden="true">
        <svg className="cpna-sparkle s1" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
        </svg>
        <svg className="cpna-sparkle s2" width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
        </svg>
        <svg className="cpna-sparkle s3" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
        </svg>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CPNA Food Stuff",
            url: "https://cpnafoodstuff.com",
            logo: "https://cpnafoodstuff.com/logo.png",
            sameAs: [],
          }),
        }}
      />

      <div className="cpna-ticker" aria-hidden="true">
        <div className="cpna-ticker-leaves">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              className="cpna-ticker-leaf"
              key={i}
              style={{
                left: `${i * 10 + 3}%`,
                top: i % 2 === 0 ? "12%" : "62%",
                animationDelay: `${i * 0.35}s`,
                fontSize: i % 3 === 0 ? "13px" : "10px",
              }}
            >
              🍃
            </span>
          ))}
        </div>
        <div className="cpna-live-badge">
          <span className="cpna-live-dot" />
          LIVE
        </div>
        <div className="cpna-ticker-track">
          {doubled.map((item, i) => (
            <div className="cpna-ticker-item" key={i}>
              {i !== 0 && <span className="cpna-ticker-sep" />}
              <span className="cpna-ticker-icon">{item.emoji}</span>
              <span className="cpna-ticker-text">
                <span className="cpna-ticker-title">{item.title}</span>
                <span className="cpna-ticker-sub">{item.sub}</span>
              </span>
            </div>
          ))}
        </div>
        <a href="/support-farmers" className="cpna-ticker-cta">
          <Heart size={13} fill="currentColor" strokeWidth={0} />
          Support Farmers
          <ChevronRight size={14} strokeWidth={2.5} />
        </a>
      </div>

      <div className="cpna-bar">
        <div className="cpna-bar-particles" aria-hidden="true">
          {barParticles.map((p, i) => (
            <span
              key={i}
              className="cpna-bar-particle"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay }}
            />
          ))}
        </div>

        <div className="cpna-bar-inner">
          <Link href="/" className="cpna-logo" aria-label="CPNA Food Stuff – Home">
            <div className="cpna-logo-badge">
  <div className="cpna-logo-badge-bg">
    <Image
      src="/logo.png"
      alt="CPNA Food Stuff Logo"
      width={40}
      height={40}
      style={{ objectFit: "contain", position: "relative", zIndex: 1 }}
      priority
    />
  </div>
</div>
            <div className="cpna-logo-texts">
              <div className="cpna-logo-name-row">
                <span className="cpna-logo-name">CPNA</span>
                <span className="cpna-logo-sub">FOOD STUFF</span>
              </div>
              <span className="cpna-logo-tag">
                Good Food
                <br />
                Brighter Tomorrow
                <svg className="cpna-logo-tag-underline" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 6 C 25 2, 75 2, 98 6" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </Link>

          <ul className="cpna-desktop-nav" role="menubar">
            {navLinks.map((item) => (
              <li key={item.label} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  className={`cpna-nav-link${pathname === item.href ? " active" : ""}`}
                >
                  <item.icon size={16} strokeWidth={2.3} className="cpna-nav-icon" />
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="cpna-drop-wrapper" ref={dropRef} role="none">
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "9px 15px", borderRadius: 999,
                  fontSize: "14.5px", fontWeight: 700,
                  color: dropOpen ? "#15803d" : "#374151",
                  background: dropOpen ? "#ecfdf3" : "none",
                  border: "none", cursor: "pointer",
                  transition: "color 0.2s, background 0.2s",
                  whiteSpace: "nowrap",
                }}
                onClick={() => setDropOpen(!dropOpen)}
                aria-haspopup="true"
                aria-expanded={dropOpen}
                aria-label="Our Categories menu"
                role="menuitem"
              >
                <LayoutGrid size={16} strokeWidth={2.3} />
                Our Categories
                <ChevronDown size={14} strokeWidth={2.5} className={`cpna-chevron${dropOpen ? " open" : ""}`} />
              </button>
              <ul className={`cpna-dropdown${dropOpen ? " open" : ""}`} role="menu" aria-label="Product categories">
                {categories.map((cat, i) => (
                  <li key={cat.name} role="none">
                    {i > 0 && <div className="cpna-drop-sep" aria-hidden="true" />}
                    <Link href={cat.href} role="menuitem" onClick={() => setDropOpen(false)}>
                      <span className="cpna-drop-icon" aria-hidden="true">{cat.emoji}</span>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <div className="cpna-right-group">
            <button className="cpna-icon-btn" aria-label="Search">
              <Search size={18} strokeWidth={2.3} />
            </button>
            <Link href="/contact" className="cpna-contact-btn">
              <Send size={16} strokeWidth={2.3} />
              <span>Contact Us</span>
            </Link>
            <button
              className={`cpna-mobile-btn${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="cpna-mobile-drawer"
            >
              <span className="icon-wrap" aria-hidden="true">
                <Menu size={20} className="icon-menu" strokeWidth={2.5} />
                <X size={20} className="icon-close" strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="cpna-mobile-drawer"
        className={`cpna-drawer${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="cpna-drawer-inner">
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className="cpna-drawer-link" onClick={() => setMenuOpen(false)}>
              <item.icon size={17} strokeWidth={2.3} />
              {item.label}
            </Link>
          ))}
          <div className="cpna-drawer-sep" aria-hidden="true" />
          <p className="cpna-drawer-cat-label">Our Categories</p>
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href} className="cpna-drawer-cat-link" onClick={() => setMenuOpen(false)}>
              <span className="cpna-drawer-cat-icon" aria-hidden="true">{cat.emoji}</span>
              {cat.name}
            </Link>
          ))}
          <Link href="/contact" className="cpna-drawer-contact" onClick={() => setMenuOpen(false)}>
            <Send size={16} strokeWidth={2.3} />
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}