"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: "#f8ffd8",
        fontFamily: "var(--font-gamja), cursive",
      }}
    >
      {/* Nature hill background */}
      <HillsBackground visible={!isLoading} />

      {/* Soft floating background shapes */}
      <FloatingShapes visible={!isLoading} />

      {/* Navigation chevron */}
      {!isLoading && <NavMenu />}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <MainContent key="content" />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────── Nav Menu ──────────────────────────── */

function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="absolute top-5 left-0 right-0 z-50 flex flex-col items-center sm:top-7"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
    >
      {/* Claude icon toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer border-none bg-transparent outline-none"
        style={{
          lineHeight: 1,
          padding: "6px 10px",
        }}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        animate={isOpen ? { rotate: 72 } : {}}
        transition={{ duration: 0.35, ease: "easeOut" }}
        whileHover={{ scale: 1.25, rotate: 45, transition: { duration: 0.3 } }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/anthropic-1.svg"
          alt="Claude"
          style={{
            width: "clamp(16px, 2.2vw, 22px)",
            height: "clamp(16px, 2.2vw, 22px)",
          }}
        />
      </motion.button>

      {/* Nav links — horizontal, centered */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="mt-1 flex items-center justify-center gap-3 sm:gap-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <motion.a
              href="/about"
              className="relative whitespace-nowrap px-3 py-1"
              style={{
                color: "#9e823c",
                fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
                fontFamily: "var(--font-bakso), cursive",
                letterSpacing: "0.06em",
              }}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              whileHover={{ color: "#6b8e3a", transition: { duration: 0.2 } }}
            >
              about
            </motion.a>

            {/* Small separator dot */}
            <motion.span
              style={{ color: "#c4b06d", fontSize: "0.5rem", opacity: 0.6 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              ●
            </motion.span>

            <motion.a
              href="/creator"
              className="relative whitespace-nowrap px-3 py-1"
              style={{
                color: "#9e823c",
                fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
                fontFamily: "var(--font-bakso), cursive",
                letterSpacing: "0.06em",
              }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
              whileHover={{ color: "#6b8e3a", transition: { duration: 0.2 } }}
            >
              sino gumawa nito?
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ──────────────────────────── Loading Screen ──────────────────────────── */

function LoadingScreen() {
  const doves = [
    { size: "52px", startX: -60, startY: 20, delay: 0, dur: 2.8 },
    { size: "40px", startX: 40, startY: -10, delay: 0.5, dur: 3.2 },
    { size: "34px", startX: -20, startY: 40, delay: 1, dur: 3.5 },
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Flying doves */}
      <div className="relative flex h-32 w-48 items-center justify-center sm:h-40 sm:w-56">
        {doves.map((dove, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: dove.startX, y: dove.startY, opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              opacity: { duration: 0.8, delay: dove.delay, ease: "easeOut" },
            }}
          >
            {/* Floating motion — continuous loop, no opacity change */}
            <motion.div
              animate={{
                x: [0, 8, -5, 0],
                y: [0, -18, -6, 0],
              }}
              transition={{
                duration: dove.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dove.delay,
              }}
            >
              {/* Wing flap effect */}
              <motion.div
                animate={{ scaleY: [1, 0.85, 1.05, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: dove.delay,
                }}
              >
                <DoveSVG size={dove.size} direction="right" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Loading text */}
      <motion.p
        style={{
          color: "#9e823c",
          fontSize: "clamp(0.85rem, 2.2vw, 1.05rem)",
          letterSpacing: "0.12em",
          fontFamily: "var(--font-bakso), cursive",
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        loading...
      </motion.p>
    </motion.div>
  );
}

/* ──────────────────────────── Main Content ──────────────────────────── */

function MainContent() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-2 px-5 py-8 text-center sm:gap-3 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* First line */}
      <motion.p
        className="leading-snug sm:leading-tight"
        style={{
          color: "#9e823c",
          fontSize: "clamp(1.25rem, 4.5vw, 2.8rem)",
          fontFamily: "var(--font-bakso), cursive",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      >
        If you feel uncomfortable..
      </motion.p>

      {/* Second line */}
      <motion.a
        href="/proceed"
        className="group relative cursor-pointer leading-snug sm:leading-tight"
        style={{
          color: "#9e823c",
          fontSize: "clamp(1.25rem, 4.5vw, 2.8rem)",
          fontFamily: "var(--font-bakso), cursive",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
      >
        <span className="relative z-10">
          please{" "}
          <span className="relative inline-block">
            {/* Soft glow behind "open" */}
            <motion.span
              className="pointer-events-none absolute -inset-2 -z-10 rounded-xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(200,220,140,0.45) 0%, transparent 70%)",
              }}
              animate={{
                opacity: [0.5, 0.9, 0.5],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* The word itself with gradient */}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #6b8e3a, #a8bf6a, #7aa03e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "italic",
                letterSpacing: "0.04em",
              }}
            >
              open
            </span>
            {/* Animated underline for "open" only */}
            <motion.span
              className="absolute -bottom-0.5 left-0 h-[2.5px] rounded-full"
              style={{
                background: "linear-gradient(90deg, #a8bf6a, #c5d98a, #a8bf6a)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
            />
          </span>{" "}
          this.
        </span>
      </motion.a>

      {/* Subtle hint */}
      <motion.p
        className="mt-1 sm:mt-2"
        style={{
          color: "#9e823c",
          fontSize: "clamp(0.65rem, 1.6vw, 0.8rem)",
          letterSpacing: "0.05em",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
      >
        ~ a gentle space for you ~
      </motion.p>
    </motion.div>
  );
}

/* ──────────────────────────── Hills Background ──────────────────────────── */

function HillsBackground({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
    >
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "50vh", minHeight: "260px" }}
      >
        <defs>
          {/* Sky-to-hill gradient */}
          <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8ffd8" stopOpacity="1" />
            <stop offset="50%" stopColor="#f4f8d0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#eaf0c0" stopOpacity="0" />
          </linearGradient>

          {/* Sun glow */}
          <radialGradient id="sunGlow" cx="82%" cy="8%" r="18%">
            <stop offset="0%" stopColor="#fff8d0" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#fff5c0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#fff5c0" stopOpacity="0" />
          </radialGradient>

          {/* Mist gradient */}
          <linearGradient id="mistFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8ffd8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f8ffd8" stopOpacity="0" />
          </linearGradient>

          {/* Hill gradients for depth */}
          <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8f0cc" />
            <stop offset="100%" stopColor="#dde8bc" />
          </linearGradient>
          <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8e4b0" />
            <stop offset="100%" stopColor="#ccdca0" />
          </linearGradient>
          <linearGradient id="hill3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8d898" />
            <stop offset="100%" stopColor="#b8cc88" />
          </linearGradient>
          <linearGradient id="hill4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b0c47e" />
            <stop offset="100%" stopColor="#a0b870" />
          </linearGradient>
          <linearGradient id="hill5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#98b468" />
            <stop offset="100%" stopColor="#88a858" />
          </linearGradient>
        </defs>

        {/* Sun glow */}
        <circle cx="1180" cy="60" r="200" fill="url(#sunGlow)" />

        {/* Soft clouds */}
        <g opacity="0.3">
          <ellipse cx="300" cy="120" rx="80" ry="22" fill="#ffffff" />
          <ellipse cx="340" cy="115" rx="60" ry="18" fill="#ffffff" />
          <ellipse cx="260" cy="118" rx="50" ry="15" fill="#ffffff" />
        </g>
        <g opacity="0.2">
          <ellipse cx="900" cy="90" rx="70" ry="18" fill="#ffffff" />
          <ellipse cx="940" cy="85" rx="55" ry="15" fill="#ffffff" />
          <ellipse cx="870" cy="88" rx="40" ry="12" fill="#ffffff" />
        </g>
        <g opacity="0.15">
          <ellipse cx="600" cy="150" rx="50" ry="14" fill="#ffffff" />
          <ellipse cx="630" cy="146" rx="40" ry="11" fill="#ffffff" />
        </g>

        {/* Layer 5 — farthest hills (very misty) */}
        <path
          d="M0 420 Q100 340 240 380 Q380 300 520 360 Q660 290 800 350 Q940 280 1080 340 Q1220 290 1360 330 Q1400 325 1440 350 L1440 700 L0 700Z"
          fill="url(#hill1)"
          opacity="0.45"
        />

        {/* Mist between far hills */}
        <rect x="0" y="380" width="1440" height="60" fill="url(#mistFade)" />

        {/* Layer 4 — mid-far hills */}
        <path
          d="M0 450 Q180 370 340 410 Q500 340 680 400 Q820 350 960 390 Q1100 340 1260 380 Q1360 360 1440 400 L1440 700 L0 700Z"
          fill="url(#hill2)"
          opacity="0.55"
        />

        {/* Layer 3 — mid hills */}
        <path
          d="M0 480 Q120 420 280 455 Q440 400 600 445 Q760 390 920 440 Q1060 400 1200 435 Q1340 410 1440 450 L1440 700 L0 700Z"
          fill="url(#hill3)"
          opacity="0.65"
        />

        {/* Mid-distance bushes */}
        <g opacity="0.3">
          <ellipse cx="400" cy="460" rx="20" ry="10" fill="#90aa65" />
          <ellipse cx="420" cy="458" rx="14" ry="8" fill="#85a05c" />
          <ellipse cx="850" cy="448" rx="16" ry="9" fill="#90aa65" />
          <ellipse cx="1300" cy="442" rx="18" ry="10" fill="#88a660" />
        </g>

        {/* Winding path */}
        <path
          d="M680 700 Q690 650 700 620 Q720 580 710 550 Q700 520 720 495 Q740 475 730 455"
          stroke="#d8d0a8"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M680 700 Q690 650 700 620 Q720 580 710 550 Q700 520 720 495 Q740 475 730 455"
          stroke="#e0d8b0"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.25"
        />

        {/* Layer 2 — near hills */}
        <path
          d="M0 520 Q80 475 200 500 Q340 460 480 495 Q620 455 760 490 Q900 458 1040 488 Q1180 460 1320 485 Q1400 478 1440 500 L1440 700 L0 700Z"
          fill="url(#hill4)"
          opacity="0.78"
        />

        {/* Near bushes */}
        <g opacity="0.45">
          <ellipse cx="60" cy="520" rx="25" ry="12" fill="#88a85a" />
          <ellipse cx="85" cy="518" rx="18" ry="10" fill="#7a9a50" />
          <ellipse cx="350" cy="505" rx="20" ry="10" fill="#88a85a" />
          <ellipse cx="650" cy="498" rx="22" ry="11" fill="#82a456" />
          <ellipse cx="670" cy="496" rx="15" ry="8" fill="#7a9c50" />
          <ellipse cx="1100" cy="495" rx="22" ry="11" fill="#86a658" />
          <ellipse cx="1380" cy="500" rx="24" ry="12" fill="#88a85a" />
        </g>

        {/* Layer 1 — foreground hill */}
        <path
          d="M0 555 Q150 530 300 545 Q450 520 600 540 Q750 522 900 538 Q1050 525 1200 540 Q1350 528 1440 548 L1440 700 L0 700Z"
          fill="url(#hill5)"
          opacity="0.82"
        />

        {/* Dense grass on foreground */}
        {[
          40, 90, 140, 200, 260, 320, 380, 440, 510, 580, 640, 700, 770, 840,
          910, 980, 1040, 1110, 1170, 1240, 1310, 1380,
        ].map((x, i) => (
          <g key={`grass-${i}`} opacity={0.35 + (i % 4) * 0.08}>
            <line
              x1={x}
              y1={558}
              x2={x - 4 + (i % 3) * 4}
              y2={538 - (i % 4) * 3}
              stroke="#6a8a42"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1={x + 6}
              y1={560}
              x2={x + 3 + (i % 2) * 5}
              y2={542 - (i % 3) * 3}
              stroke="#7a9a4e"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <line
              x1={x + 12}
              y1={559}
              x2={x + 10 + (i % 2) * 3}
              y2={544 - (i % 2) * 4}
              stroke="#6a8a42"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Wildflowers — more variety */}
        {[
          { x: 100, color: "#f2e0a0", r: 3.5 },
          { x: 250, color: "#f0c8a0", r: 3 },
          { x: 420, color: "#e8d8b0", r: 4 },
          { x: 560, color: "#f5e8b0", r: 3 },
          { x: 750, color: "#f0d0a0", r: 3.5 },
          { x: 890, color: "#ecdca0", r: 3 },
          { x: 1060, color: "#f2e4b0", r: 4 },
          { x: 1200, color: "#e8cca0", r: 3 },
          { x: 1350, color: "#f5e0a8", r: 3.5 },
        ].map((f, i) => {
          const yBase = 543 - (i % 3) * 5;
          return (
            <g key={`flower-${i}`} opacity={0.5 + (i % 3) * 0.1}>
              {/* Stem */}
              <line
                x1={f.x}
                y1={558}
                x2={f.x + (i % 2 === 0 ? -1 : 1)}
                y2={yBase}
                stroke="#6a8a44"
                strokeWidth="1"
                strokeLinecap="round"
              />
              {/* Leaf */}
              <ellipse
                cx={f.x + (i % 2 === 0 ? -5 : 5)}
                cy={yBase + 6}
                rx="4"
                ry="2"
                fill="#7a9a50"
                transform={`rotate(${i % 2 === 0 ? -30 : 30},${f.x + (i % 2 === 0 ? -5 : 5)},${yBase + 6})`}
                opacity="0.6"
              />
              {/* Petals */}
              <circle
                cx={f.x - 2}
                cy={yBase - 1}
                r={f.r * 0.6}
                fill={f.color}
                opacity="0.7"
              />
              <circle
                cx={f.x + 2}
                cy={yBase - 1}
                r={f.r * 0.6}
                fill={f.color}
                opacity="0.7"
              />
              <circle
                cx={f.x}
                cy={yBase - 3}
                r={f.r * 0.6}
                fill={f.color}
                opacity="0.7"
              />
              <circle
                cx={f.x}
                cy={yBase + 1}
                r={f.r * 0.6}
                fill={f.color}
                opacity="0.6"
              />
              {/* Center */}
              <circle cx={f.x} cy={yBase - 1} r={f.r * 0.35} fill="#f8f0d0" />
            </g>
          );
        })}

        {/* Small rocks on foreground */}
        <g opacity="0.2">
          <ellipse cx="330" cy="558" rx="8" ry="4" fill="#b0a880" />
          <ellipse cx="335" cy="557" rx="5" ry="3" fill="#bab290" />
          <ellipse cx="800" cy="555" rx="6" ry="3.5" fill="#b0a880" />
          <ellipse cx="1150" cy="560" rx="7" ry="3" fill="#b5ad88" />
        </g>

        {/* Foreground ground fill */}
        <path
          d="M0 565 Q360 555 720 562 Q1080 555 1440 565 L1440 700 L0 700Z"
          fill="#8aaa58"
          opacity="0.6"
        />
      </svg>
    </motion.div>
  );
}

/* ──────────────────────────── Background Shapes ──────────────────────────── */

function FloatingShapes({ visible }: { visible: boolean }) {
  const shapes = [
    { size: 200, x: "10%", y: "15%", delay: 0 },
    { size: 140, x: "80%", y: "20%", delay: 0.5 },
    { size: 100, x: "20%", y: "75%", delay: 1 },
    { size: 170, x: "75%", y: "70%", delay: 0.3 },
    { size: 90, x: "50%", y: "10%", delay: 0.8 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background:
              i % 2 === 0
                ? "radial-gradient(circle, rgba(200,220,140,0.25) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(220,235,170,0.2) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            visible
              ? {
                  opacity: 1,
                  scale: [1, 1.08, 1],
                  y: [0, -12, 0],
                }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{
            opacity: { duration: 1.2, delay: shape.delay },
            scale: {
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            },
            y: {
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            },
          }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────── Dove SVG ──────────────────────────── */

function DoveSVG({
  size = "24px",
  direction = "right",
}: {
  size?: string;
  direction?: "left" | "right";
}) {
  const flip = direction === "left" ? "scaleX(-1)" : "none";
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: size,
        height: size,
        transform: flip,
        opacity: 1,
        filter: "drop-shadow(0 2px 6px rgba(120,100,50,0.3))",
      }}
    >
      {/* Body */}
      <ellipse
        cx="30"
        cy="34"
        rx="14"
        ry="9"
        fill="#f5f0e0"
        stroke="#d4c49a"
        strokeWidth="0.8"
      />
      {/* Head */}
      <circle
        cx="44"
        cy="27"
        r="7"
        fill="#f5f0e0"
        stroke="#d4c49a"
        strokeWidth="0.8"
      />
      {/* Eye */}
      <circle cx="46" cy="25.5" r="1.3" fill="#6b5520" />
      {/* Beak */}
      <path d="M51 27 L56 26 L51 28.5Z" fill="#b8933a" />
      {/* Wing */}
      <path
        d="M18 30 Q10 20 6 10 Q14 16 22 14 Q16 22 20 30Z"
        fill="#e8dfc8"
        stroke="#d4c49a"
        strokeWidth="0.5"
        opacity="1"
      />
      {/* Tail feathers */}
      <path d="M16 36 Q8 38 4 44 Q10 38 16 40Z" fill="#ddd4b8" opacity="0.9" />
      <path
        d="M17 38 Q10 42 7 50 Q12 42 18 42Z"
        fill="#e8dfc8"
        opacity="0.75"
      />
      {/* Olive branch */}
      <path
        d="M54 28 Q58 32 62 34"
        stroke="#9e823c"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx="60"
        cy="32"
        rx="3"
        ry="1.5"
        fill="#b8993f"
        transform="rotate(-20,60,32)"
      />
      <ellipse
        cx="57"
        cy="30.5"
        rx="2.5"
        ry="1.2"
        fill="#c9a84c"
        transform="rotate(-35,57,30.5)"
      />
    </svg>
  );
}
