"use client";

import { motion } from "framer-motion";

/* ─── GIF sources ─── */
const gifs = [
  { id: 1,  src: "/assets/gifs/hug.gif",                alt: "hug" },
  { id: 2,  src: "/assets/gifs/hugs-hug.gif",            alt: "hugs hug" },
  { id: 3,  src: "/assets/gifs/hugs-love.gif",           alt: "hugs love" },
  { id: 4,  src: "/assets/gifs/love-animated.gif",       alt: "love animated" },
  { id: 5,  src: "/assets/gifs/virtual-hugs-virtual-hug.gif", alt: "virtual hug" },
  { id: 6,  src: "/assets/gifs/run-hug-run.gif",         alt: "run hug" },
  { id: 7,  src: "/assets/gifs/running-hug.gif",         alt: "running hug" },
  { id: 8,  src: "/assets/gifs/b99-brooklyn99.gif",      alt: "brooklyn 99 hug" },
  { id: 9,  src: "/assets/gifs/giphy-downsized-medium.gif", alt: "hug gif" },
  { id: 10, src: "/assets/gifs/giphy-downsized.gif",     alt: "hug gif 2" },
  { id: 11, src: "/assets/gifs/this.gif",                alt: "this hug" },
  { id: 12, src: "/assets/gifs/2214de405a40b8daa0b423ece403fa81.gif", alt: "cute hug" },
  { id: 13, src: "/assets/gifs/5ec02c189d9ffdf1e26ef334497fd9d1.gif", alt: "warm hug" },
  { id: 14, src: "/assets/gifs/tumblr_51ce53e678a7d7eb3ecfa1ee8805684b_ff182d43_540.gif", alt: "tumblr hug" },
  { id: 15, src: "/assets/gifs/phone-notification.gif",  alt: "notification hug" },
];

/* scattered positions — desktop (%, %) on the full viewport */
const desktopPositions = [
  { x: 5, y: 5, size: 110, rotate: -8 },
  { x: 30, y: 3, size: 95, rotate: 5 },
  { x: 60, y: 6, size: 105, rotate: -3 },
  { x: 85, y: 4, size: 90, rotate: 10 },
  { x: 2, y: 35, size: 100, rotate: 6 },
  { x: 82, y: 30, size: 115, rotate: -12 },
  { x: 8, y: 62, size: 90, rotate: 4 },
  { x: 35, y: 70, size: 105, rotate: -7 },
  { x: 58, y: 68, size: 95, rotate: 9 },
  { x: 83, y: 60, size: 100, rotate: -5 },
  { x: 15, y: 88, size: 95, rotate: 12 },
  { x: 72, y: 85, size: 110, rotate: -10 },
  /* extra left-side cards to fill the gap */
  { x: 18, y: 20, size: 88, rotate: 7 },
  { x: 22, y: 48, size: 95, rotate: -6 },
  { x: 10, y: 75, size: 90, rotate: 9 },
];

/* mobile positions — 15 cards: top zone, 4 orbit the center text, bottom zone */
const mobilePositions = [
  /* ── top zone: 6 cards (y: 3–24%) ── */
  { x: 5,  y: 3,  size: 62, rotate: -5 },
  { x: 48, y: 4,  size: 58, rotate: 6 },
  { x: 75, y: 3,  size: 60, rotate: -3 },
  { x: 12, y: 14, size: 60, rotate: 4 },
  { x: 55, y: 15, size: 62, rotate: -7 },
  { x: 8,  y: 25, size: 58, rotate: 8 },
  /* ── center orbit: 4 cards flanking the text (y: 35–59%) ── */
  { x: 1,  y: 36, size: 50, rotate: -6 },   /* left-above  */
  { x: 76, y: 35, size: 48, rotate: 5 },     /* right-above */
  { x: 3,  y: 57, size: 48, rotate: 7 },     /* left-below  */
  { x: 74, y: 58, size: 50, rotate: -4 },    /* right-below */
  /* ── bottom zone: 5 cards (y: 68–86%) ── */
  { x: 8,  y: 68, size: 60, rotate: -6 },
  { x: 52, y: 67, size: 62, rotate: 5 },
  { x: 5,  y: 78, size: 58, rotate: 7 },
  { x: 45, y: 79, size: 60, rotate: -4 },
  { x: 72, y: 77, size: 62, rotate: -8 },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function HugsPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "#f8ffd8",
        fontFamily: "var(--font-gamja), cursive",
      }}
    >
      {/* Back link */}
      <motion.a
        href="/proceed"
        className="fixed top-5 left-5 z-20 cursor-pointer sm:top-7 sm:left-7"
        style={{
          color: "#9e823c",
          fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
          fontFamily: "var(--font-bakso), cursive",
          letterSpacing: "0.05em",
          textDecoration: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        whileHover={{ x: -3, transition: { duration: 0.2 } }}
      >
        ← back
      </motion.a>

      {/* Container — taller on mobile for breathing room, 100vh on desktop */}
      <div
        className="relative w-full"
        style={{ height: "100vh" }}
      >
        {/* Desktop scattered cards — hidden on mobile */}
        <div className="hidden sm:block">
          {gifs.map((gif, i) => {
            const pos = desktopPositions[i];
            return (
              <motion.div
                key={gif.id}
                className="absolute flex items-center justify-center overflow-hidden rounded-2xl"
                style={{
                  width: pos.size,
                  height: pos.size,
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  background: "linear-gradient(145deg, #eef4d4, #e2ecc0)",
                  border: "2px solid rgba(168, 191, 106, 0.3)",
                }}
                initial={{ opacity: 0, scale: 0, rotate: pos.rotate * 2 }}
                animate={{ opacity: 1, scale: 1, rotate: pos.rotate }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 16,
                  delay: 0.3 + i * 0.1,
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 0,
                  boxShadow: "0 8px 30px rgba(107, 142, 58, 0.2)",
                  transition: { duration: 0.25 },
                }}
              >
                <img
                  src={gif.src}
                  alt={gif.alt}
                  className="h-full w-full rounded-2xl"
                  style={{ objectFit: "cover" }}
                  draggable={false}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile scattered cards — hidden on desktop */}
        <div className="block sm:hidden">
          {gifs.map((gif, i) => {
            const pos = mobilePositions[i];
            return (
              <motion.div
                key={gif.id}
                className="absolute flex items-center justify-center overflow-hidden rounded-2xl"
                style={{
                  width: pos.size,
                  height: pos.size,
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  background: "linear-gradient(145deg, #eef4d4, #e2ecc0)",
                  border: "2px solid rgba(168, 191, 106, 0.3)",
                }}
                initial={{ opacity: 0, scale: 0, rotate: pos.rotate * 2 }}
                animate={{ opacity: 1, scale: 1, rotate: pos.rotate }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 16,
                  delay: 0.3 + i * 0.1,
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 0,
                  boxShadow: "0 8px 30px rgba(107, 142, 58, 0.2)",
                  transition: { duration: 0.25 },
                }}
              >
                <img
                  src={gif.src}
                  alt={gif.alt}
                  className="h-full w-full rounded-2xl"
                  style={{ objectFit: "cover" }}
                  draggable={false}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Center text — always centered in the viewport */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" as const }}
        >
          <div
            style={{
              background: "radial-gradient(ellipse at center, #f8ffd8 55%, transparent 100%)",
              padding: "1.5rem 2.5rem",
              borderRadius: "2rem",
            }}
            className="flex flex-col items-center gap-2"
          >
        <h1
          style={{
            color: "#9e823c",
            fontSize: "clamp(1rem, 3.5vw, 2rem)",
            fontFamily: "var(--font-bakso), cursive",
            lineHeight: 1.4,
          }}
        >
          here are multiple virtual hugs,
        </h1>
        <p
          style={{
            color: "#6dafed",
            fontSize: "clamp(0.85rem, 2.5vw, 1.3rem)",
            fontFamily: "var(--font-bakso), cursive",
            fontStyle: "italic",
          }}
        >
          cuz we need them.
        </p>
        <motion.p
          className="mt-1"
          style={{
            color: "#b8a060",
            fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
            fontFamily: "var(--font-bakso), cursive",
            letterSpacing: "0.04em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          you deserve every single one of these{" "}
        </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
