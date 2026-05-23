"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundTexture from "../components/BackgroundTexture";

/* ─── Attribution banner ─── */
function AttributionBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("attribution-dismissed");
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  function handleAccept() {
    sessionStorage.setItem("attribution-dismissed", "1");
    setDismissed(true);
  }

  function handleDismiss() {
    setDismissed(true);
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            left: "auto",
            zIndex: 60,
            width: "min(22rem, calc(100vw - 2rem))",
            background: "linear-gradient(145deg, #fffcf8 0%, #fef6ed 100%)",
            border: "1.5px solid rgba(175,125,80,0.22)",
            borderRadius: "1.25rem",
            padding: "1.5rem",
            boxShadow:
              "0 4px 24px rgba(158,107,58,0.12), 0 12px 48px rgba(158,107,58,0.08)",
          }}
        >
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "0.7rem" }}>
            <span
              style={{
                color: "#9e823c",
                fontSize: "clamp(0.58rem, 1.2vw, 0.68rem)",
                fontFamily: "var(--font-bakso), cursive",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              a note
            </span>
          </div>

          {/* Message */}
          <p
            style={{
              color: "#7a6a50",
              fontSize: "clamp(0.7rem, 1.4vw, 0.78rem)",
              fontFamily: "var(--font-gamja), cursive",
              lineHeight: 1.75,
              marginBottom: "1.1rem",
            }}
          >
            all external content is credited to its original creators
            <span style={{ margin: "0 0.35em", opacity: 0.5 }}>·</span>
            no copyright infringement intended
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <motion.button
              onClick={handleAccept}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                flex: 1,
                padding: "0.42rem 0",
                borderRadius: "999px",
                border: "none",
                background: "#9e6b3a",
                color: "#fff8f2",
                fontSize: "clamp(0.58rem, 1.15vw, 0.66rem)",
                fontFamily: "var(--font-bakso), cursive",
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              okay ✦
            </motion.button>
            <motion.button
              onClick={handleDismiss}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "0.42rem 0.9rem",
                borderRadius: "999px",
                border: "1.5px solid rgba(175,125,80,0.3)",
                background: "transparent",
                color: "#9e823c",
                fontSize: "clamp(0.58rem, 1.15vw, 0.66rem)",
                fontFamily: "var(--font-bakso), cursive",
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              close
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Data ─── */
const CATEGORIES = ["All", "Video", "Article", "Inspiration"] as const;
type Category = (typeof CATEGORIES)[number];

interface BlogPost {
  id: number;
  date: string;
  category: Exclude<Category, "All">;
  title: string;
  description: string;
  readMoreUrl: string;
  youtubeId?: string;
  placeholder?: boolean;
  credit?: {
    author: string;
    url: string;
    platform: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    date: "May 20, 2026",
    category: "Video",
    title: "Cultivating an unselfish attitude.",
    description:
      "A short yet powerful reminder on why putting others first is one of the most transformative things we can do. This video sparked a lot of reflection for me about what it truly means to be kind.",
    youtubeId: "ARQ4qe6jgXA",
    credit: {
      author: "Passion Equip",
      url: "https://www.youtube.com/shorts/ARQ4qe6jgXA",
      platform: "YouTube",
    },
    readMoreUrl: "https://www.youtube.com/shorts/ARQ4qe6jgXA",
  },
  {
    id: 2,
    date: "May 15, 2026",
    category: "Article",
    title: "",
    description: "",
    readMoreUrl: "#",
    placeholder: true,
  },
  {
    id: 3,
    date: "May 10, 2026",
    category: "Inspiration",
    title: "",
    description: "",
    readMoreUrl: "#",
    placeholder: true,
  },
  {
    id: 4,
    date: "May 5, 2026",
    category: "Article",
    title: "",
    description: "",
    readMoreUrl: "#",
    placeholder: true,
  },
  {
    id: 5,
    date: "April 28, 2026",
    category: "Inspiration",
    title: "",
    description: "",
    readMoreUrl: "#",
    placeholder: true,
  },
  {
    id: 6,
    date: "April 20, 2026",
    category: "Article",
    title: "",
    description: "",
    readMoreUrl: "#",
    placeholder: true,
  },
];

/* ─── Category pill ─── */
function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: Category;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.18 }}
      style={{
        padding: "0.38rem 1.05rem",
        borderRadius: "999px",
        border: active
          ? "1.5px solid #9e6b3a"
          : "1.5px solid rgba(175,125,80,0.35)",
        background: active ? "#9e6b3a" : "transparent",
        color: active ? "#fff8f2" : "#9e6b3a",
        fontSize: "clamp(0.58rem, 1.25vw, 0.7rem)",
        fontFamily: "var(--font-bakso), cursive",
        letterSpacing: "0.1em",
        cursor: "pointer",
        transition: "background 0.22s, color 0.22s, border-color 0.22s",
      }}
    >
      {label}
    </motion.button>
  );
}

/* ─── (CreditBadge inlined into BlogCard) ─── */

/* ─── Blog card ─── */
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const isVideo = Boolean(post.youtubeId);

  const categoryColor =
    post.category === "Video"
      ? { bg: "rgba(100,160,220,0.1)", border: "rgba(80,140,200,0.28)", text: "#5a8ec8" }
      : post.category === "Article"
      ? { bg: "rgba(158,107,58,0.09)", border: "rgba(158,107,58,0.26)", text: "#9e6b3a" }
      : { bg: "rgba(100,170,90,0.1)", border: "rgba(90,160,80,0.28)", text: "#4a9a40" };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      whileHover="cardHover"
      variants={{
        cardHover: {
          boxShadow:
            "0 0 0 2px rgba(158,107,58,0.42), 0 8px 36px rgba(158,107,58,0.14), 0 2px 10px rgba(158,107,58,0.06)",
        },
      }}
      style={{
        background: "linear-gradient(160deg, #fffcf8 0%, #fef6ed 100%)",
        border: "1.5px solid rgba(175,125,80,0.16)",
        borderRadius: "1.25rem",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 10px rgba(158,107,58,0.06), 0 6px 22px rgba(158,107,58,0.04)",
      }}
    >
      {/* Date */}
      <span
        style={{
          color: "#b8a060",
          fontSize: "clamp(0.5rem, 1.05vw, 0.59rem)",
          fontFamily: "var(--font-bakso), cursive",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: "0.9rem",
        }}
      >
        {post.date}
      </span>

      {/* Title — hidden for placeholders */}
      {!post.placeholder && (
        <motion.h2
          variants={{
            cardHover: {
              textShadow: "0 0 18px rgba(158,107,58,0.5), 0 0 36px rgba(158,107,58,0.22)",
            },
          }}
          transition={{ duration: 0.3 }}
          style={{
            color: "#2e2820",
            fontSize: "clamp(0.98rem, 2.2vw, 1.14rem)",
            fontFamily: "var(--font-bakso), cursive",
            lineHeight: 1.42,
            marginBottom: "0.65rem",
          }}
        >
          {post.title}
        </motion.h2>
      )}

      {/* Category badge */}
      <span
        style={{
          alignSelf: "flex-start",
          padding: "0.18rem 0.58rem",
          borderRadius: "999px",
          background: categoryColor.bg,
          border: `1px solid ${categoryColor.border}`,
          color: categoryColor.text,
          fontSize: "clamp(0.47rem, 0.98vw, 0.55rem)",
          fontFamily: "var(--font-bakso), cursive",
          letterSpacing: "0.09em",
          marginBottom: "1.5rem",
        }}
      >
        {post.category}
      </span>

      {/* Placeholder state */}
      {post.placeholder && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            opacity: 0.45,
          }}
        >
          <span
            style={{
              fontSize: "1.4rem",
              letterSpacing: "0.25em",
              color: "#b8a060",
            }}
          >
            · · ·
          </span>
          <span
            style={{
              fontSize: "clamp(0.58rem, 1.1vw, 0.65rem)",
              fontFamily: "var(--font-bakso), cursive",
              letterSpacing: "0.18em",
              color: "#9e823c",
              textTransform: "uppercase",
            }}
          >
            coming soon
          </span>
        </div>
      )}

      {/* YouTube embed */}
      {isVideo && post.youtubeId && (
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              borderRadius: "0.8rem",
              overflow: "hidden",
              background: "#111",
              aspectRatio: "9 / 16",
              maxHeight: "400px",
              width: "100%",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${post.youtubeId}`}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            />
          </div>
          {post.credit && (
            <a
              href={post.credit.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.28rem",
                marginTop: "0.55rem",
                color: "#a08050",
                fontSize: "clamp(0.49rem, 1vw, 0.58rem)",
                fontFamily: "var(--font-bakso), cursive",
                letterSpacing: "0.06em",
                textDecoration: "none",
                opacity: 0.8,
              }}
            >
              ↗ Video by {post.credit.author} · {post.credit.platform}
            </a>
          )}
        </div>
      )}

      {/* Description + Read more — hidden for placeholders */}
      {!post.placeholder && (
        <>
          <p
            style={{
              color: "#7a6a50",
              fontSize: "clamp(0.72rem, 1.5vw, 0.82rem)",
              fontFamily: "var(--font-gamja), cursive",
              lineHeight: 1.8,
              flex: 1,
              marginBottom: "1rem",
            }}
          >
            {post.description}
          </p>

          <div style={{ height: "1px", background: "rgba(175,125,80,0.13)", marginBottom: "0.85rem" }} />

          <a
            href={post.readMoreUrl}
            target={post.readMoreUrl.startsWith("http") ? "_blank" : "_self"}
            rel={post.readMoreUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.32rem",
              color: "#c96a1a",
              fontSize: "clamp(0.65rem, 1.35vw, 0.76rem)",
              fontFamily: "var(--font-bakso), cursive",
              letterSpacing: "0.07em",
              textDecoration: "none",
              transition: "gap 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.gap = "0.6rem";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.gap = "0.32rem";
            }}
          >
            {isVideo ? "Watch" : "Read more"}{" "}
            <span style={{ fontSize: "0.9em" }}>→</span>
          </a>
        </>
      )}
    </motion.article>
  );
}

/* ─── Page ─── */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: "#fff8f2",
        fontFamily: "var(--font-gamja), cursive",
      }}
    >
      <BackgroundTexture id="blog" />

      {/* Back link */}
      <motion.a
        href="/hugs"
        className="fixed top-5 left-5 z-30 sm:top-7 sm:left-7"
        style={{
          fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
          fontFamily: "var(--font-bakso), cursive",
          letterSpacing: "0.05em",
          textDecoration: "none",
          color: "#9e823c",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        whileHover={{ x: -3, transition: { duration: 0.2 } }}
      >
        &larr; back
      </motion.a>

      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: "60rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "8rem",
          paddingBottom: "9rem",
          paddingLeft: "clamp(1.25rem, 5vw, 2.5rem)",
          paddingRight: "clamp(1.25rem, 5vw, 2.5rem)",
        }}
      >

        {/* Header */}
        <motion.header
          className="flex flex-col items-center text-center"
          style={{ marginBottom: "5rem" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            style={{
              color: "#b8a060",
              fontSize: "clamp(0.5rem, 1.1vw, 0.62rem)",
              fontFamily: "var(--font-bakso), cursive",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
              display: "block",
            }}
          >
            things that inspired me ✦
          </span>
          <h1
            style={{
              color: "#9e823c",
              fontSize: "clamp(2rem, 5.5vw, 3.6rem)",
              fontFamily: "var(--font-bakso), cursive",
              lineHeight: 1.2,
              letterSpacing: "0.02em",
            }}
          >
            Blog &amp; Inspiration
          </h1>
          <motion.div
            style={{
              height: "1px",
              background: "rgba(175,125,80,0.35)",
              width: "clamp(40px, 8vw, 80px)",
              marginTop: "1.75rem",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          />
          <p
            style={{
              color: "#8a7a50",
              fontSize: "clamp(0.72rem, 1.6vw, 0.88rem)",
              fontFamily: "var(--font-gamja), cursive",
              lineHeight: 2,
              maxWidth: "44ch",
              marginTop: "1.6rem",
              opacity: 0.85,
            }}
          >
            articles, videos, and reflections — the things that help me remember
            to be a little kinder every day.
          </p>
        </motion.header>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "0.75rem", marginBottom: "3.5rem" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
        >
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            style={{ alignItems: "start" }}
          >
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            className="flex flex-col items-center gap-4 py-28 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p
              style={{
                color: "#b8a060",
                fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                fontFamily: "var(--font-bakso), cursive",
                letterSpacing: "0.05em",
              }}
            >
              · · ·
            </p>
            <p
              style={{
                color: "#9e823c",
                fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
                fontFamily: "var(--font-bakso), cursive",
              }}
            >
              more coming soon
            </p>
          </motion.div>
        )}

      </div>

      {/* Attribution banner */}
      <AttributionBanner />
    </div>
  );
}
