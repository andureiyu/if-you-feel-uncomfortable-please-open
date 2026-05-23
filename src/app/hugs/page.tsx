"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import BackgroundTexture from "../components/BackgroundTexture";

/* --- GIF sources --- */
const gifs = [
  { id: 1, src: "/assets/gifs/hug.gif", alt: "hug" },
  { id: 2, src: "/assets/gifs/hugs-hug.gif", alt: "hugs hug" },
  { id: 3, src: "/assets/gifs/hugs-love.gif", alt: "hugs love" },
  { id: 4, src: "/assets/gifs/love-animated.gif", alt: "love animated" },
  {
    id: 5,
    src: "/assets/gifs/virtual-hugs-virtual-hug.gif",
    alt: "virtual hug",
  },
  { id: 6, src: "/assets/gifs/run-hug-run.gif", alt: "run hug" },
  { id: 7, src: "/assets/gifs/running-hug.gif", alt: "running hug" },
  { id: 8, src: "/assets/gifs/b99-brooklyn99.gif", alt: "brooklyn 99 hug" },
  { id: 9, src: "/assets/gifs/giphy-downsized-medium.gif", alt: "hug gif" },
  { id: 10, src: "/assets/gifs/giphy-downsized.gif", alt: "hug gif 2" },
  { id: 11, src: "/assets/gifs/this.gif", alt: "this hug" },
  {
    id: 12,
    src: "/assets/gifs/2214de405a40b8daa0b423ece403fa81.gif",
    alt: "cute hug",
  },
  {
    id: 13,
    src: "/assets/gifs/5ec02c189d9ffdf1e26ef334497fd9d1.gif",
    alt: "warm hug",
  },
  {
    id: 14,
    src: "/assets/gifs/tumblr_51ce53e678a7d7eb3ecfa1ee8805684b_ff182d43_540.gif",
    alt: "tumblr hug",
  },
  {
    id: 15,
    src: "/assets/gifs/phone-notification.gif",
    alt: "notification hug",
  },
];

const desktopPositions = [
  // Left cluster
  { x: 0,  y: 8,  size: 148, rotate: -14, zIndex: 1 },
  { x: 13, y: 30, size: 162, rotate:   8, zIndex: 3 },
  { x: 2,  y: 54, size: 136, rotate:  -7, zIndex: 1 },
  { x: 19, y: 14, size: 118, rotate:  12, zIndex: 2 },
  { x: 6,  y: 68, size: 144, rotate:  -5, zIndex: 2 },
  // Right cluster
  { x: 74, y: 6,  size: 150, rotate:  11, zIndex: 1 },
  { x: 82, y: 28, size: 134, rotate: -12, zIndex: 3 },
  { x: 72, y: 52, size: 155, rotate:   7, zIndex: 1 },
  { x: 87, y: 16, size: 120, rotate:  -6, zIndex: 2 },
  { x: 78, y: 70, size: 140, rotate:  15, zIndex: 2 },
  // Top centre accents
  { x: 34, y: 2,  size: 100, rotate: -10, zIndex: 1 },
  { x: 53, y: 3,  size:  92, rotate:   8, zIndex: 1 },
  // Bottom centre accents
  { x: 30, y: 82, size: 108, rotate:   9, zIndex: 1 },
  { x: 55, y: 80, size: 100, rotate: -11, zIndex: 1 },
  { x: 43, y: 88, size:  94, rotate:   5, zIndex: 1 },
];

const mobilePositions = [
  // Top cluster — clears the vertical centre for the heading
  { x: 1,  y: 2,  size: 68, rotate:  -8, zIndex: 2 },
  { x: 27, y: 1,  size: 62, rotate:   6, zIndex: 1 },
  { x: 55, y: 2,  size: 66, rotate:  -4, zIndex: 2 },
  { x: 74, y: 1,  size: 60, rotate:  10, zIndex: 1 },
  { x: 4,  y: 13, size: 58, rotate:   7, zIndex: 3 },
  { x: 31, y: 12, size: 62, rotate:  -6, zIndex: 2 },
  { x: 60, y: 13, size: 60, rotate:   5, zIndex: 1 },
  { x: 79, y: 12, size: 56, rotate:  -9, zIndex: 3 },
  // Bottom cluster
  { x: 2,  y: 70, size: 64, rotate:   6, zIndex: 2 },
  { x: 25, y: 72, size: 60, rotate:  -7, zIndex: 1 },
  { x: 52, y: 71, size: 66, rotate:   5, zIndex: 2 },
  { x: 73, y: 70, size: 58, rotate:  -8, zIndex: 1 },
  { x: 8,  y: 82, size: 60, rotate:  -5, zIndex: 3 },
  { x: 37, y: 83, size: 64, rotate:   9, zIndex: 2 },
  { x: 63, y: 82, size: 60, rotate:  -4, zIndex: 1 },
];

const hugsDialogue: { text: string; sub?: string; pause?: boolean }[] = [
  { text: "Asides from hugs." },
  { text: "There are more ways" },
  { text: 'to remind ourselves to be "good"' },
  { pause: true, text: "· · ·" },
  { text: "and what a better way to show" },
  { text: "than to share a few small ways", sub: "to be kind" },
];

const niceWays = [
  {
    id: 1,
    title: "Help people in need as long as you can",
    description:
      "It could be either carrying heavy things or offering your seat to someone who needs it. Everything counts.",
    accent: "linear-gradient(145deg, #fde8d0, #f9c4a0)",
    images: [
      "/assets/images/number1/19b7c56160fb5684ef069fea0f2aff67.jpg",
      "/assets/images/number1/c3fe47125df34dbc83d6efbd6fbff62c.jpg",
      "/assets/images/number1/d0e107f94ebeddf6065aca53dac59fea.jpg",
      "/assets/images/number1/e08028fde05637d15f888eaf371599a2.jpg",
      "/assets/images/number1/f7e54495a1b329774523a2cb88b12a7c.jpg",
    ],
  },
  {
    id: 2,
    title: "Check in on a friend",
    description:
      "A simple 'hey, kamusta, okay ka lang?' means more and it's important to be considerate.",
    accent: "linear-gradient(145deg, #d4f0e4, #b0e0c8)",
    images: [
      "/assets/images/number2/2313a4247cb20878d44aa53b48fe8021.jpg",
      "/assets/images/number2/40887e823d938eb52ae2618d30ab8034.jpg",
      "/assets/images/number2/5fa729c19abbc6eca041e0fa1f99665c.jpg",
      "/assets/images/number2/6392eb634d31119164f0696f0044d64b.jpg",
      "/assets/images/number2/9697d5fbe324b30c889120e91c31c355.jpg",
    ],
  },
  {
    id: 3,
    title: "Give a genuine compliment",
    description:
      "Not just on the surface — something you truly noticed about them.",
    accent: "linear-gradient(145deg, #d4e8f8, #b4ccec)",
    images: [
      "/assets/images/number3/05603078d47e4384faf49b48eabf6964.jpg",
      "/assets/images/number3/2b021056820d9875a9c3fdcbd35aa909.jpg",
      "/assets/images/number3/6528100e81a0c5bc74be26a913f9d876.jpg",
      "/assets/images/number3/aa68f520e6722cfc7388969ede2df3e5.jpg",
      "/assets/images/number3/f34d55356d54658f4737de652202d3c4.jpg",
    ],
  },
  {
    id: 4,
    title: "Open the door for someone",
    description: "A small act of consideration that can cheer someone up.",
    accent: "linear-gradient(145deg, #f8f0d4, #ecdcac)",
    images: [
      "/assets/images/number4/209cc04a154a965535d316853126a407.jpg",
      "/assets/images/number4/4855f77012504dd792898c63efcdafb3.jpg",
      "/assets/images/number4/4b5412f5b20c7cbfcc2b6376435565f7.jpg",
      "/assets/images/number4/a1c4d918737c39818bcd052f82b0abaf.jpg",
      "/assets/images/number4/ba74bf4adb6b950300fddab36041e64b.jpg",
      "/assets/images/number4/f652a1e2018d9a4f0e400ab00eb221fb.jpg",
    ],
  },
  {
    id: 5,
    title: "Simply show up",
    description: "Sometimes being present is the kindest thing you can offer.",
    accent: "linear-gradient(145deg, #f0d8f0, #d8b4d8)",
    images: [
      "/assets/images/number5/238aa88705afa22696e4b33a705df817.jpg",
      "/assets/images/number5/49abc00496677e0c0e0eb0eb88356a9b.jpg",
      "/assets/images/number5/4b86ccf89eb1afb9f10a86f0ce979159.jpg",
      "/assets/images/number5/9fe4dc49a0274999a8f705adf0ca3509.jpg",
      "/assets/images/number5/b257b33651a67271502a09e350d00947.jpg",
      "/assets/images/number5/c95e42983ca94c44601675af02344bf1.jpg",
      "/assets/images/number5/dab11aa8135d5999ed977b7d662ecab4.jpg",
    ],
  },
  {
    id: 6,
    title: "Make positivity notes",
    description:
      "Leave a little handwritten note for someone; stick it on their desk, bag, or door. Tiny words of encouragement go a long way.",
    accent: "linear-gradient(145deg, #d0f0d8, #a8e4b8)",
    images: [
      "/assets/images/number6/0298e3c44822b87f5e799a4d833fe3da.jpg",
      "/assets/images/number6/0ec676a96b0f3f44dc177367f11c2755.jpg",
      "/assets/images/number6/76d836aaf467c263cacb8839d69d0149.jpg",
      "/assets/images/number6/96f9e17c084ccb3d2a35d00d52480486.jpg",
      "/assets/images/number6/ea949bb04359258975c94e7164c600ae.jpg",
    ],
  },
  {
    id: 7,
    title: "Cultivating an unselfish attitude",
    description:
      "Practice thinking of others before yourself; even in small moments. True kindness grows when we let go of the need to always be first.",
    accent: "linear-gradient(145deg, #e8d8f8, #c4aae8)",
    images: [
      "/assets/images/number7/28b3f8678beae1204d12970929fbfe4f.jpg",
      "/assets/images/number7/3d60bed8301201283b0114a7c9c2f712.jpg",
      "/assets/images/number7/4f70f792f7e7425e7c2552fe86093434-2.jpg",
      "/assets/images/number7/5b178173edd9360959c89927affae5f4.jpg",
      "/assets/images/number7/f1039eb3f0d6953cc3173a6f091deb97.jpg",
    ],
  },
];

export default function HugsPage() {
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null);
  const [selectedWallpaper, setSelectedWallpaper] = useState<(typeof niceWays)[number] | null>(null);

  const showcaseSectionRef = useRef<HTMLElement>(null);
  const bgShift = useInView(showcaseSectionRef, { once: false, amount: 0.01 });

  return (
    <div
      className="relative overflow-x-hidden"
      style={{
        backgroundColor: "#fff8f2",
        fontFamily: "var(--font-gamja), cursive",
      }}
    >
      {/* Back link */}
      <motion.a
        href="/"
        className="fixed top-5 left-5 z-30 cursor-pointer sm:top-7 sm:left-7"
        style={{
          fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
          fontFamily: "var(--font-bakso), cursive",
          letterSpacing: "0.05em",
          textDecoration: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          color: bgShift ? "rgba(255,255,255,0.85)" : "#9e823c",
        }}
        transition={{
          opacity: { duration: 1, delay: 0.3 },
          color: { duration: 0.5, ease: "easeInOut" },
        }}
        whileHover={{ x: -3, transition: { duration: 0.2 } }}
      >
        &larr; back
      </motion.a>

      {/* -- Hero: GIF cards floating around central heading (100vh) -- */}
      <div className="relative w-full" style={{ height: "100vh", background: "#fff8f2" }}>
        <BackgroundTexture id="hugs-hero" />

        {/* Depth vignettes — blend clusters into the background */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0" style={{ width: "clamp(48px, 11vw, 155px)", background: "linear-gradient(to right, rgba(255,248,242,0.96), transparent)", zIndex: 9 }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0" style={{ width: "clamp(48px, 11vw, 155px)", background: "linear-gradient(to left, rgba(255,248,242,0.96), transparent)", zIndex: 9 }} />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0" style={{ height: "140px", background: "linear-gradient(to bottom, transparent, #fff8f2)", zIndex: 9 }} />
        <div className="pointer-events-none absolute top-0 left-0 right-0" style={{ height: "80px", background: "linear-gradient(to top, transparent, rgba(255,248,242,0.75))", zIndex: 9 }} />

        {/* Desktop GIF cards */}
        <div className="hidden sm:block">
          {gifs.map((gif, i) => {
            const pos = desktopPositions[i];
            return (
              <motion.div
                key={gif.id}
                className="absolute overflow-hidden rounded-2xl"
                style={{
                  width: pos.size,
                  height: pos.size,
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  zIndex: pos.zIndex,
                  background: "linear-gradient(160deg, #fffaf5 0%, #fde8d0 55%, #f5d4b0 100%)",
                  border: "2px solid rgba(175,125,80,0.22)",
                  boxShadow: "0 6px 24px rgba(158,107,58,0.14), 0 1px 4px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                }}
                initial={{ opacity: 0, scale: 0.4, rotate: pos.rotate * 1.8 }}
                animate={{ opacity: 1, scale: 1, rotate: pos.rotate }}
                transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.2 + i * 0.08 }}
                whileHover={{ scale: 1.12, rotate: 0, boxShadow: "0 14px 40px rgba(158,107,58,0.28)", transition: { duration: 0.22 } }}
                onClick={() => setSelected(gif)}
              >
                <Image src={gif.src} alt={gif.alt} fill className="rounded-2xl" style={{ objectFit: "cover" }} />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile GIF cards */}
        <div className="block sm:hidden">
          {gifs.map((gif, i) => {
            const pos = mobilePositions[i];
            return (
              <motion.div
                key={gif.id}
                className="absolute overflow-hidden rounded-xl"
                style={{
                  width: pos.size,
                  height: pos.size,
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  zIndex: pos.zIndex,
                  background: "linear-gradient(160deg, #fffaf5 0%, #fde8d0 55%, #f5d4b0 100%)",
                  border: "2px solid rgba(175,125,80,0.22)",
                  boxShadow: "0 4px 16px rgba(158,107,58,0.13), 0 1px 3px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                }}
                initial={{ opacity: 0, scale: 0.4, rotate: pos.rotate * 1.8 }}
                animate={{ opacity: 1, scale: 1, rotate: pos.rotate }}
                transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.2 + i * 0.08 }}
                whileHover={{ scale: 1.1, rotate: 0, boxShadow: "0 10px 28px rgba(158,107,58,0.25)", transition: { duration: 0.22 } }}
                onClick={() => setSelected(gif)}
              >
                <Image src={gif.src} alt={gif.alt} fill className="rounded-xl" style={{ objectFit: "cover" }} />
              </motion.div>
            );
          })}
        </div>

        {/* Central heading + CTAs */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              style={{
                color: "#b8a060",
                fontSize: "clamp(0.52rem, 1.1vw, 0.66rem)",
                fontFamily: "var(--font-bakso), cursive",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              for you ✦
            </motion.span>

            <h1
              style={{
                color: "#9e823c",
                fontSize: "clamp(1.45rem, 4.2vw, 2.7rem)",
                fontFamily: "var(--font-bakso), cursive",
                lineHeight: 1.3,
                maxWidth: "clamp(260px, 36vw, 520px)",
              }}
            >
              here are multiple virtual hugs,
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 1.4, ease: "easeOut" }}
              style={{ width: "40px", height: "1px", background: "#c9a86c", opacity: 0.55 }}
            />

            <p
              style={{
                color: "#6dafed",
                fontSize: "clamp(1.05rem, 2.8vw, 1.65rem)",
                fontFamily: "var(--font-bakso), cursive",
                fontStyle: "italic",
              }}
            >
              cuz we need them.
            </p>

            <p
              style={{
                color: "#b8a060",
                fontSize: "clamp(0.6rem, 1.35vw, 0.76rem)",
                fontFamily: "var(--font-bakso), cursive",
                letterSpacing: "0.05em",
                opacity: 0.8,
                marginTop: "0.1rem",
              }}
            >
              you deserve every single one of these
            </p>

            <motion.div
              style={{ marginTop: "clamp(0.9rem, 2.2vw, 1.4rem)" }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.8 }}
            >
              <span
                style={{
                  color: "#b8a060",
                  fontSize: "clamp(0.56rem, 1.15vw, 0.68rem)",
                  fontFamily: "var(--font-bakso), cursive",
                  letterSpacing: "0.18em",
                  opacity: 0.6,
                }}
              >
                scroll ↓
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="flex justify-center py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.2 }}
      >
        <motion.span
          style={{
            color: "#b8a060",
            fontSize: "clamp(0.65rem, 1.4vw, 0.78rem)",
            fontFamily: "var(--font-bakso), cursive",
            letterSpacing: "0.12em",
          }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          scroll &darr;
        </motion.span>
      </motion.div>

      {/* -- Dialogue -- */}
      <div
        className="relative flex min-h-screen flex-col justify-center"
        style={{ backgroundColor: "#fff8f2" }}
      >
        <BackgroundTexture id="dialogue" />
        <div className="mx-auto flex w-full max-w-2xl flex-col items-end gap-0 px-8 py-[15vh] sm:pr-20">
          {hugsDialogue.map((section, i) => (
            <RightDialogueBlock key={i} section={section} index={i} />
          ))}
        </div>
      </div>

      {/* -- Showcase -- */}
      <motion.section
        ref={showcaseSectionRef}
        animate={{ backgroundColor: bgShift ? "#9e823c" : "#fff8f2" }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      >
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-8 text-center">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />
          <div className="relative flex flex-wrap items-center justify-center gap-x-[0.4em] gap-y-0">
            {["little", "ways", "to", "be", "kind"].map((word, i) => (
              <motion.span
                key={word}
                style={{
                  color: "rgba(255,255,255,0.95)",
                  fontSize: "clamp(2.8rem, 10vw, 7rem)",
                  fontFamily: "var(--font-bakso), cursive",
                  lineHeight: 1.15,
                  display: "inline-block",
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.14 }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.div
            style={{ height: "1px", background: "rgba(255,255,255,0.22)", width: "min(40vw, 240px)", marginTop: "clamp(1.2rem, 3vw, 2rem)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.9 }}
          />
          <motion.p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "clamp(0.8rem, 2vw, 1.05rem)",
              fontFamily: "var(--font-bakso), cursive",
              letterSpacing: "0.06em",
              marginTop: "clamp(0.9rem, 2.5vw, 1.4rem)",
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.1 }}
          >
            little gestures that can make a big difference
          </motion.p>
          <motion.span
            style={{
              position: "absolute",
              bottom: "clamp(1.8rem, 5vh, 3rem)",
              color: "rgba(255,255,255,0.25)",
              fontSize: "clamp(0.6rem, 1.3vw, 0.72rem)",
              fontFamily: "var(--font-bakso), cursive",
              letterSpacing: "0.12em",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 1.6 }}
            animate={{ y: [0, 6, 0] }}
          >
            scroll &darr;
          </motion.span>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden flex flex-col gap-6 px-5 pb-[8vh]">
          {niceWays.map((way, i) => (
            <NiceWayCard key={way.id} way={way} index={i} onClick={() => setSelectedWallpaper(way)} />
          ))}
        </div>

        {/* Desktop rows */}
        {niceWays.map((way, i) => (
          <NiceWayRow key={way.id} way={way} index={i} />
        ))}

        <motion.div
          className="flex justify-center pb-[8vh] pt-[4vh]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
              fontFamily: "var(--font-bakso), cursive",
              letterSpacing: "0.08em",
            }}
          >
            &middot; &middot; &middot;
          </p>
        </motion.div>
      </motion.section>

      {/* -- GIF Lightbox -- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10 flex flex-col items-center gap-4"
              initial={{ scale: 0.5, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="overflow-hidden rounded-3xl shadow-2xl"
                style={{
                  position: "relative",
                  width: "min(85vw, 480px)",
                  height: "min(75vh, 480px)",
                  background: "linear-gradient(145deg, #fde8d0, #f5d4b0)",
                  border: "3px solid rgba(175,125,80,0.35)",
                }}
              >
                <Image src={selected.src} alt={selected.alt} fill style={{ objectFit: "contain" }} />
              </div>
              <motion.p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "clamp(0.6rem,1.5vw,0.8rem)",
                  fontFamily: "var(--font-bakso), cursive",
                  letterSpacing: "0.08em",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                tap anywhere to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -- Nice Way Lightbox (mobile) -- */}
      <AnimatePresence>
        {selectedWallpaper && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedWallpaper(null)}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10 flex flex-col items-center gap-5 px-6"
              initial={{ scale: 0.5, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: "min(82vw, 340px)",
                  borderRadius: "1.8rem",
                  background: "linear-gradient(145deg, #fde8d0, #f5d4b0)",
                  border: "2px solid rgba(175,125,80,0.35)",
                  padding: "12px",
                  boxShadow: "0 28px 70px rgba(0,0,0,0.45)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    borderRadius: "1.2rem",
                    background: selectedWallpaper.accent,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <ImageSlideshow images={selectedWallpaper.images} alt={selectedWallpaper.title} />
                </div>
                <div className="flex flex-col gap-1.5 px-3 pt-3 pb-2">
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", flexWrap: "wrap" }}>
                    <h3 style={{ color: "#9e6b3a", fontSize: "clamp(0.9rem, 4vw, 1.1rem)", fontFamily: "var(--font-bakso), cursive", lineHeight: 1.3 }}>
                      {selectedWallpaper.title}
                    </h3>
                    {selectedWallpaper.id === 7 && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.2rem",
                          padding: "0.18rem 0.55rem",
                          borderRadius: "999px",
                          background: "rgba(190,140,20,0.1)",
                          border: "1px solid rgba(180,130,15,0.35)",
                          color: "#9e6b18",
                          fontSize: "clamp(0.44rem, 2.2vw, 0.56rem)",
                          fontFamily: "var(--font-bakso), cursive",
                          letterSpacing: "0.08em",
                          whiteSpace: "nowrap",
                          alignSelf: "center",
                          marginTop: "0.1rem",
                        }}
                      >
                        ✦ most important
                      </span>
                    )}
                  </div>
                  <div style={{ height: "1px", background: "rgba(175,125,80,0.25)" }} />
                  <p style={{ color: "#8a7a50", fontSize: "clamp(0.7rem, 3vw, 0.82rem)", fontFamily: "var(--font-bakso), cursive", lineHeight: 1.6 }}>
                    {selectedWallpaper.description}
                  </p>
                </div>
              </div>
              <motion.p
                style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.55rem, 1.5vw, 0.7rem)", fontFamily: "var(--font-bakso), cursive", letterSpacing: "0.08em" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                tap anywhere to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RightDialogueBlock({
  section,
  index,
}: {
  section: (typeof hugsDialogue)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });

  if (section.pause) {
    return (
      <div ref={ref} className="flex w-full items-center justify-end py-16 sm:py-20">
        <motion.span
          style={{ color: "#c4b88a", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", letterSpacing: "0.35em" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {section.text}
        </motion.span>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex w-full flex-col items-end py-12 text-right sm:py-16">
      <motion.p
        style={{ color: "#9e823c", fontSize: "clamp(1.05rem, 3.5vw, 1.75rem)", fontFamily: "var(--font-bakso), cursive", lineHeight: 1.5 }}
        initial={{ opacity: 0, x: 28 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
        transition={{ duration: 1, ease: "easeOut", delay: index * 0.02 }}
      >
        {section.text}
      </motion.p>
      {section.sub && (
        <motion.p
          className="mt-2"
          style={{ color: "#b8a060", fontSize: "clamp(0.8rem, 2.5vw, 1.1rem)", fontFamily: "var(--font-bakso), cursive", letterSpacing: "0.03em", lineHeight: 1.6 }}
          initial={{ opacity: 0, x: 18 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 + index * 0.02 }}
        >
          {section.sub}
        </motion.p>
      )}
    </div>
  );
}

function ImageSlideshow({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          style={{ position: "absolute", inset: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        >
          <Image
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>
      {/* Subtle vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(0,0,0,0.18) 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
      {/* Progress dots */}
      <div
        style={{
          position: "absolute",
          bottom: "0.55rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.28rem",
          zIndex: 11,
        }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === current ? "1.1rem" : "0.32rem",
              height: "0.32rem",
              borderRadius: "999px",
              background:
                i === current
                  ? "rgba(255,255,255,0.92)"
                  : "rgba(255,255,255,0.38)",
              transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
              boxShadow:
                i === current ? "0 0 6px rgba(0,0,0,0.25)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function NiceWayCard({
  way,
  index,
  onClick,
}: {
  way: (typeof niceWays)[number];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-5% 0px -5% 0px" });
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background: "linear-gradient(145deg, #fde8d0, #f5d4b0)",
        border: "2px solid rgba(175,125,80,0.25)",
        boxShadow: "0 8px 24px rgba(158,107,58,0.1)",
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.75, ease: "easeOut", delay: index * 0.07 }}
      whileHover={{ scale: 1.02, boxShadow: "0 14px 38px rgba(158,107,58,0.2)", transition: { duration: 0.25 } }}
      onClick={onClick}
    >
      <div style={{ width: "100%", aspectRatio: "4 / 3", background: way.accent, position: "relative", overflow: "hidden" }}>
        <ImageSlideshow images={way.images} alt={way.title} />
        <span style={{ position: "absolute", top: "0.7rem", right: "0.8rem", color: "rgba(255,255,255,0.9)", fontSize: "clamp(1.1rem, 5vw, 1.5rem)", fontFamily: "var(--font-bakso), cursive", lineHeight: 1, userSelect: "none", zIndex: 12, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
          {num}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-4 py-4">
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", flexWrap: "wrap" }}>
          <h3 style={{ color: "#9e6b3a", fontSize: "clamp(0.9rem, 4.5vw, 1.05rem)", fontFamily: "var(--font-bakso), cursive", lineHeight: 1.3 }}>
            {way.title}
          </h3>
          {way.id === 7 && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.2rem",
                padding: "0.18rem 0.55rem",
                borderRadius: "999px",
                background: "rgba(190,140,20,0.1)",
                border: "1px solid rgba(180,130,15,0.35)",
                color: "#9e6b18",
                fontSize: "clamp(0.44rem, 2.2vw, 0.56rem)",
                fontFamily: "var(--font-bakso), cursive",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                alignSelf: "center",
                marginTop: "0.1rem",
              }}
            >
              ✦ most important
            </span>
          )}
        </div>
        <div style={{ height: "1px", background: "rgba(175,125,80,0.25)" }} />
        <p style={{ color: "#8a7a50", fontSize: "clamp(0.72rem, 3.5vw, 0.85rem)", fontFamily: "var(--font-bakso), cursive", lineHeight: 1.6 }}>
          {way.description}
        </p>
      </div>
    </motion.div>
  );
}

function NiceWayRow({ way, index }: { way: (typeof niceWays)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-8% 0px -8% 0px" });
  const num = String(index + 1).padStart(2, "0");

  return (
    <div ref={ref} className="hidden sm:flex min-h-screen w-full items-center justify-center px-6 sm:px-12 lg:px-20">
      <div className="flex w-full max-w-4xl flex-row items-center gap-16 lg:gap-24">
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
        >
          <div
            style={{
              width: "clamp(200px, 26vw, 300px)",
              aspectRatio: "4 / 5",
              borderRadius: "1.8rem",
              background: "linear-gradient(145deg, #fde8d0, #f5d4b0)",
              border: "2px solid rgba(175,125,80,0.3)",
              padding: "14px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ width: "100%", height: "100%", borderRadius: "1.2rem", background: way.accent, overflow: "hidden", position: "relative" }}>
              <ImageSlideshow images={way.images} alt={way.title} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-start gap-4 text-left"
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.18 }}
        >
          <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontFamily: "var(--font-bakso), cursive", lineHeight: 1, letterSpacing: "0.02em", userSelect: "none" }}>
            {num}
          </span>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", flexWrap: "wrap", marginTop: "-0.5rem" }}>
            <h3 style={{ color: "rgba(255,255,255,0.94)", fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontFamily: "var(--font-bakso), cursive", lineHeight: 1.2 }}>
              {way.title}
            </h3>
            {way.id === 7 && (
              <motion.div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.28rem",
                  padding: "0.22rem 0.65rem",
                  borderRadius: "999px",
                  background: "rgba(255,220,90,0.15)",
                  border: "1px solid rgba(255,210,70,0.45)",
                  color: "rgba(255,232,130,0.95)",
                  fontSize: "clamp(0.48rem, 0.85vw, 0.62rem)",
                  fontFamily: "var(--font-bakso), cursive",
                  letterSpacing: "0.1em",
                  whiteSpace: "nowrap",
                  alignSelf: "center",
                  marginTop: "0.4rem",
                  boxShadow: "0 0 12px rgba(255,210,60,0.2)",
                }}
                initial={{ opacity: 0, y: 6, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.8 }}
                transition={{ duration: 0.55, delay: 0.7 }}
              >
                ✦ most important
              </motion.div>
            )}
          </div>
          <motion.div
            style={{ height: "1px", background: "rgba(255,255,255,0.25)", alignSelf: "stretch" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          />
          <p style={{ color: "rgba(255,255,255,0.58)", fontSize: "clamp(0.82rem, 2vw, 1.05rem)", fontFamily: "var(--font-bakso), cursive", lineHeight: 1.75, letterSpacing: "0.02em", maxWidth: "36ch" }}>
            {way.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
