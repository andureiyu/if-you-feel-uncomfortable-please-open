"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── narrative sections ─── */
const sections: {
  text: string;
  sub?: string;
  accent?: boolean;
  pause?: boolean;
}[] = [
  {
    text: "Hey.",
    sub: "Take a breath.",
  },
  {
    text: "You opened this,",
    sub: "and that already says something about you.",
  },
  {
    text: "Maybe today was heavy.",
  },
  {
    text: "Maybe it's been heavy for a while.",
  },
  {
    pause: true,
    text: "· · ·",
  },
  {
    text: "You don't have to explain anything here.",
  },
  {
    text: "There's no form to fill out.",
    sub: "No problem to solve.",
  },
  {
    text: "Just a quiet place",
    sub: "for you to exist for a moment.",
  },
  {
    pause: true,
    text: "· · ·",
  },
  {
    text: "It's okay to feel lost sometimes.",
  },
  {
    text: "It's okay to not be okay.",
  },
  {
    text: "The fact that you're still here",
    sub: "— still trying —",
    accent: true,
  },
  {
    text: "that is enough.",
    accent: true,
  },
  {
    pause: true,
    text: "· · ·",
  },
  {
    text: "You are not your worst day.",
  },
  {
    text: "You are not the mistakes you replay at 3 AM.",
  },
  {
    text: "You are someone worth being gentle with.",
    accent: true,
  },
  {
    pause: true,
    text: "· · ·",
  },
  {
    text: "So take your time here.",
  },
  {
    text: "Breathe slowly.",
    sub: "Let your shoulders drop.",
  },
  {
    text: "You're safe in this small corner of the internet.",
  },
  {
    pause: true,
    text: "· · ·",
  },
  {
    text: "And when you're ready,",
    sub: "you can close this tab.",
  },
  {
    text: "Or stay a little longer.",
  },
  {
    text: "Either way,",
  },
  {
    text: "I'm glad you're here.",
    accent: true,
  },
  {
    pause: true,
    text: "🕊",
  },
];

/* ─── page ─── */
export default function ProceedPage() {
  const [showNotif, setShowNotif] = useState(false);
  const notifTriggerRef = useRef<HTMLDivElement>(null);
  const notifInView = useInView(notifTriggerRef, {
    once: true,
    margin: "0px 0px 0px 0px",
  });

  useEffect(() => {
    if (notifInView) {
      const t = setTimeout(() => setShowNotif(true), 800);
      return () => clearTimeout(t);
    }
  }, [notifInView]);

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: "#f8ffd8",
        fontFamily: "var(--font-gamja), cursive",
      }}
    >
      {/* Gentle gradient overlay at top */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-10 h-24"
        style={{
          background:
            "linear-gradient(to bottom, #f8ffd8 20%, transparent 100%)",
        }}
      />

      {/* Back link */}
      <motion.a
        href="/"
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
        transition={{ duration: 1, delay: 0.5 }}
        whileHover={{ x: -3, transition: { duration: 0.2 } }}
      >
        ← back
      </motion.a>

      {/* Initial spacer so first text isn't at the very top */}
      <div className="h-[45vh]" />

      {/* Narrative sections */}
      <div className="mx-auto flex max-w-xl flex-col items-center gap-0 px-6 pb-[50vh]">
        {sections.map((section, i) => (
          <div key={i}>
            <NarrativeBlock section={section} index={i} />
            {/* Place trigger around 60% through the sections */}
            {i === Math.floor(sections.length * 0.6) && (
              <div ref={notifTriggerRef} className="h-px w-0" />
            )}
          </div>
        ))}
      </div>

      {/* Floating notification pop-up */}
      <AnimatePresence>
        {showNotif && (
          <motion.a
            href="/hugs"
            className="fixed bottom-8 right-6 z-30 flex cursor-pointer items-center gap-2.5 rounded-full border-none px-5 py-3 shadow-lg sm:bottom-10 sm:right-8"
            style={{
              background: "linear-gradient(135deg, #e8f0cc, #d8e4b0)",
              textDecoration: "none",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Ping ring */}
            <span className="relative flex h-5 w-5 items-center justify-center">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: "#a8bf6a" }}
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <span
                className="relative inline-flex h-3.5 w-3.5 rounded-full"
                style={{ background: "#7aa03e" }}
              />
            </span>
            <span
              style={{
                color: "#5a7a2e",
                fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
                fontFamily: "var(--font-bakso), cursive",
                letterSpacing: "0.03em",
              }}
            >
              Don't forget this
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Gentle gradient overlay at bottom */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-28"
        style={{
          background: "linear-gradient(to top, #f8ffd8 20%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ─── individual block ─── */
function NarrativeBlock({
  section,
  index,
}: {
  section: (typeof sections)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-15% 0px -15% 0px",
  });

  if (section.pause) {
    return (
      <div
        ref={ref}
        className="flex items-center justify-center py-16 sm:py-20"
      >
        <motion.span
          style={{
            color: "#c4b88a",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            letterSpacing: "0.35em",
          }}
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
    <div
      ref={ref}
      className="flex flex-col items-center py-10 text-center sm:py-14"
    >
      <motion.p
        style={{
          color: section.accent ? "#6b8e3a" : "#9e823c",
          fontSize: section.accent
            ? "clamp(1.15rem, 3.8vw, 2rem)"
            : "clamp(1.05rem, 3.5vw, 1.75rem)",
          fontFamily: "var(--font-bakso), cursive",
          fontStyle: section.accent ? "italic" : "normal",
          lineHeight: 1.5,
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: index * 0.02,
        }}
      >
        {section.text}
      </motion.p>

      {section.sub && (
        <motion.p
          className="mt-2"
          style={{
            color: section.accent ? "#7aa03e" : "#b8a060",
            fontSize: "clamp(0.8rem, 2.5vw, 1.1rem)",
            fontFamily: "var(--font-bakso), cursive",
            letterSpacing: "0.03em",
            lineHeight: 1.6,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.3 + index * 0.02,
          }}
        >
          {section.sub}
        </motion.p>
      )}
    </div>
  );
}
