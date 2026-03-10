"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiAtSymbol } from "react-icons/hi";

const words = [
  { abbr: "I", rest: "f" },
  { abbr: "Y", rest: "ou" },
  { abbr: "F", rest: "eel" },
  { abbr: "U", rest: "ncomfy," },
  { abbr: "P", rest: "lease" },
  { abbr: "O", rest: "pen", special: true },
];

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: "#f8ffd8",
        fontFamily: "var(--font-gamja), cursive",
      }}
    >
      <NavMenu />

      <motion.div
        className="flex flex-col items-center justify-center gap-5 px-6 py-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      >
        {/* Abbreviation / Expanding text */}
        <div
          className="cursor-pointer select-none"
          onMouseEnter={() => setIsRevealed(true)}
          onMouseLeave={() => setIsRevealed(false)}
          onClick={() => setIsRevealed((prev) => !prev)}
        >
          <div
            className="flex flex-wrap items-center justify-center"
            style={{
              gap: "0 clamp(0.25rem, 0.6vw, 0.4rem)",
            }}
          >
            {words.map((word, i) => (
              <WordSlot
                key={i}
                abbr={word.abbr}
                rest={word.rest}
                index={i}
                total={words.length}
                special={word.special}
                isRevealed={isRevealed}
              />
            ))}
          </div>
        </div>

        {/* Hover hint */}
        <motion.p
          animate={{ opacity: isRevealed ? 0 : 0.45 }}
          transition={{ duration: 0.35 }}
          style={{
            color: "#b8a060",
            fontSize: "clamp(0.58rem, 1.3vw, 0.72rem)",
            letterSpacing: "0.12em",
            fontFamily: "var(--font-bakso), cursive",
          }}
        >
          you may hover, if gusto mo
        </motion.p>

        {/* Tagline */}
        <motion.p
          style={{
            color: "#9e823c",
            fontSize: "clamp(0.6rem, 1.4vw, 0.76rem)",
            letterSpacing: "0.05em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          ~ a gentle space for you guys ~
        </motion.p>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────── Word Slot ──────────────────────────── */

const openLetters = [
  { char: "O", color: "#c66251" },
  { char: "p", color: "#779da5" },
  { char: "e", color: "#c4943d" },
  { char: "n", color: "#d6a09c" },
];

function WordSlot({
  abbr,
  rest,
  index,
  total,
  special,
  isRevealed,
}: {
  abbr: string;
  rest: string;
  index: number;
  total: number;
  special?: boolean;
  isRevealed: boolean;
}) {
  const expandDelay = index * 0.06;
  const collapseDelay = (total - 1 - index) * 0.035;
  const delay = isRevealed ? expandDelay : collapseDelay;

  if (special) {
    return <OpenWord isRevealed={isRevealed} delay={delay} />;
  }

  return (
    <span
      className="relative inline-flex items-center"
      style={{
        fontSize: "clamp(1.6rem, 4.5vw, 3.2rem)",
        fontFamily: "var(--font-bakso), cursive",
        lineHeight: 1.1,
        color: "#9e823c",
        marginLeft: "clamp(0.15rem, 0.4vw, 0.3rem)",
      }}
    >
      <span style={{ display: "inline-block" }}>{abbr}</span>

      <span
        className={`word-rest ${isRevealed ? "revealed" : ""}`}
        style={{ transitionDelay: `${delay}s` }}
      >
        <span
          className="word-rest-inner"
          style={{ transitionDelay: `${delay}s` }}
        >
          {rest}
        </span>
      </span>

      {/* Add a natural space after each word */}
      <span
        style={{
          width: isRevealed ? "0.3em" : 0,
          transition: "width 0.4s ease",
          display: "inline-block",
        }}
      />
    </span>
  );
}

/* ──────────────────────────── "Open" — Soft Circle Embrace ──────────────────────────── */

function OpenWord({
  isRevealed,
  delay,
}: {
  isRevealed: boolean;
  delay: number;
}) {
  // Total path length of the hand-drawn oval (measured from the SVG path)
  const ovalLength = 240;

  return (
    <a
      href="/proceed"
      className="relative inline-flex items-center"
      style={{
        textDecoration: "none",
        lineHeight: 1.1,
        fontSize: "clamp(1.6rem, 4.5vw, 3.2rem)",
        fontFamily: "var(--font-bakso), cursive",
        marginLeft: "clamp(0.15rem, 0.4vw, 0.3rem)",
      }}
    >
      {/* Hand-drawn oval circle — wraps the entire word */}
      <svg
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          width: "calc(100% + clamp(20px, 3vw, 36px))",
          height: "calc(100% + clamp(16px, 2.5vw, 28px))",
          transform: "translate(-50%, -50%)",
          overflow: "visible",
        }}
        viewBox="0 0 120 56"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c66251" />
            <stop offset="33%" stopColor="#779da5" />
            <stop offset="66%" stopColor="#c4943d" />
            <stop offset="100%" stopColor="#d6a09c" />
          </linearGradient>
        </defs>
        {/* 
          Imperfect hand-drawn ellipse path — intentionally wobbly.
          Designed to feel like someone circled the word with a soft pencil.
          The slight bumps and asymmetry give it character.
        */}
        <path
          d="M60 4 C82 2, 104 6, 112 14 C120 22, 118 34, 110 42 C102 50, 80 54, 60 53 C40 52, 16 50, 8 42 C0 34, 2 20, 10 12 C18 5, 38 3, 60 4 Z"
          stroke="url(#circleGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: ovalLength,
            strokeDashoffset: isRevealed ? 0 : ovalLength,
            opacity: isRevealed ? 0.55 : 0,
            transition: [
              `stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay + 0.15}s`,
              `opacity 0.35s ease ${delay + 0.1}s`,
            ].join(", "),
          }}
        />
        {/* Second pass — very faint, slightly offset for hand-drawn depth */}
        <path
          d="M58 5 C80 3, 105 7, 113 15 C119 23, 117 35, 109 43 C101 49, 79 53, 59 52 C39 51, 17 49, 9 41 C1 33, 3 21, 11 13 C19 6, 39 4, 58 5 Z"
          stroke="url(#circleGrad)"
          strokeWidth="0.8"
          strokeLinecap="round"
          style={{
            strokeDasharray: ovalLength,
            strokeDashoffset: isRevealed ? 0 : ovalLength,
            opacity: isRevealed ? 0.2 : 0,
            transition: [
              `stroke-dashoffset 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${delay + 0.25}s`,
              `opacity 0.4s ease ${delay + 0.2}s`,
            ].join(", "),
          }}
        />
      </svg>

      {/* Letters */}
      {openLetters.map((letter, i) => {
        const isAbbr = i === 0;
        const stagger = isRevealed
          ? delay + i * 0.055
          : (openLetters.length - 1 - i) * 0.04;

        const letterSpan = (
          <span
            key={i}
            className="open-letter"
            style={{
              color: letter.color,
              opacity: isAbbr ? 1 : isRevealed ? 1 : 0,
              transform: isAbbr
                ? "none"
                : isRevealed
                  ? "translateY(0) scale(1)"
                  : "translateY(3px) scale(0.85)",
              transitionDelay: `${stagger}s`,
            }}
          >
            {letter.char}
          </span>
        );

        if (isAbbr) return letterSpan;

        return (
          <span
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: isRevealed ? "1fr" : "0fr",
              transition: `grid-template-columns 0.45s cubic-bezier(0.25, 1, 0.5, 1) ${stagger}s`,
              overflow: "hidden",
            }}
          >
            <span style={{ minWidth: 0, overflow: "hidden" }}>
              {letterSpan}
            </span>
          </span>
        );
      })}
    </a>
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
      {/* Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer border-none bg-transparent outline-none"
        style={{
          color: "#c4b06d",
          fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
          lineHeight: 1,
          padding: "6px 10px",
        }}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        animate={isOpen ? { rotate: 72 } : {}}
        transition={{ duration: 0.35, ease: "easeOut" }}
        whileHover={{ scale: 1.25, rotate: 45, transition: { duration: 0.3 } }}
      >
        <HiAtSymbol />
      </motion.button>

      {/* Nav links */}
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

            {/* Separator */}
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
