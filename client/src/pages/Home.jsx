// src/pages/Home.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";

/**
 * Home page (no Navbar import here).
 * - HERO_BG: replace with your hero image URL when ready.
 * - Hero background uses cover/center so any image size fits and keeps full intensity.
 * - Footer removed per request.
 */

export default function Home() {
  const HERO_BG = "/aboutuspic/piclumen-1761852116124.png"; // <-- put your hero image URL here
  const featuresRef = useRef(null);

  const PALETTE = {
    lightCard: "#F0F4F1",
    lightAlt: "#C5CDC7",
    mid: "#9DA69F",
    midDark: "#565D56",
    darkBg: "#383B39",
  };

  function scrollToFeatures() {
    featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const FEATURES = [
    {
      key: "message-to-god",
      title: "Message to God",
      desc: "Write a private message, prayer or wish.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={PALETTE.midDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
          <path d="M7 8l5 3 5-3" />
        </svg>
      ),
    },
    {
      key: "anonymous-prayers",
      title: "Anonymous Prayers",
      desc: "Share prayers and wishes without revealing yourself.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={PALETTE.midDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v4M5 21v-2a6 6 0 0112 0v2" />
        </svg>
      ),
    },
    {
      key: "confess",
      title: "Confess Your Feelings",
      desc: "Let out what’s heavy — safely and simply.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={PALETTE.midDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" />
          <path d="M7 10l5 5 5-5" />
        </svg>
      ),
    },
    {
      key: "private-mode",
      title: "Private Mode",
      desc: "Device-only privacy for your entries.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={PALETTE.midDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4z" />
          <path d="M4 20a8 8 0 0116 0" />
        </svg>
      ),
    },
    {
      key: "daily-reflections",
      title: "Daily Reflections",
      desc: "Guided prompts to reflect and grow.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={PALETTE.midDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v4l3 3" />
          <path d="M21 12A9 9 0 1112 3a9 9 0 019 9z" />
        </svg>
      ),
    },
    {
      key: "emotional-healing",
      title: "Emotional Healing",
      desc: "Tools to help process and soothe emotions.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={PALETTE.midDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-6-4.35-8-7a6 6 0 1116 0c-2 2.65-8 7-8 7z" />
        </svg>
      ),
    },
    {
      key: "gratitude-journal",
      title: "Gratitude Journal",
      desc: "A simple daily practice to cultivate thanks.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={PALETTE.midDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20l9-5-9-5-9 5 9 5z" />
          <path d="M12 5v7" />
        </svg>
      ),
    },
    {
      key: "spiritual-guidance",
      title: "Spiritual Guidance",
      desc: "Short wisdom, quotes and gentle guidance.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={PALETTE.midDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2 7H10l2-7z" />
          <path d="M5 12h14" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen text-slate-900 antialiased"
      style={{
        backgroundColor: PALETTE.darkBg, // overall dark background
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      {/* HERO */}
      <main>
        <section
          className="relative"
          style={{
            backgroundImage: HERO_BG ? `url(${HERO_BG})` : undefined,
            backgroundPosition: "center",
            backgroundSize: "cover",      // ensures perfect fit and preserves image intensity
            backgroundRepeat: "no-repeat",
            minHeight: "60vh",
          }}
        >
          <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-3xl mx-auto text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold" style={{ color: PALETTE.lightCard }}>
                A place where you can manifest your deepest thoughts
              </h1>

              <p className="mt-4 text-base md:text-lg" style={{ color: PALETTE.lightAlt }}>
                A calm, private space to connect with yourself and the divine — safe, anonymous, and free of judgement.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  onClick={scrollToFeatures}
                  className="px-6 py-3 rounded-full font-medium shadow-sm"
                  style={{ backgroundColor: PALETTE.mid, color: PALETTE.lightCard }}
                >
                  Start Manifesting
                </button>

                <div className="flex gap-3">
                  <Link
                    to="/message"
                    className="px-5 py-3 rounded-full bg-white/95 border border-white/10 font-medium"
                    style={{ color: PALETTE.darkBg }}
                  >
                    Send Message
                  </Link>
                  <Link
                    to="/confess"
                    className="px-5 py-3 rounded-full bg-white/80 text-slate-800 border border-white/20"
                  >
                    Confess Your Feeling
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES: same background as navbar (dark) */}
        <section
          id="features"
          ref={featuresRef}
          className="px-6 py-16"
          style={{ backgroundColor: PALETTE.darkBg }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl font-semibold" style={{ color: PALETTE.lightCard }}>
              Explore the features
            </h2>
            <p className="mt-2 max-w-2xl mx-auto" style={{ color: PALETTE.lightAlt }}>
              Simple, focused tools designed for peaceful reflection and emotional wellness.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f) => (
                <article
                  key={f.key}
                  className="rounded-2xl p-4 shadow-sm"
                  style={{
                    backgroundColor: PALETTE.lightCard, // light card on dark bg
                    border: `1px solid ${PALETTE.mid}`, // subtle border in mid tone
                  }}
                  aria-labelledby={`feature-${f.key}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center"
                      aria-hidden
                      style={{ backgroundColor: PALETTE.lightAlt }}
                    >
                      {f.icon}
                    </div>

                    <div>
                      <h3 id={`feature-${f.key}`} className="text-sm font-semibold" style={{ color: PALETTE.darkBg }}>
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm" style={{ color: PALETTE.midDark }}>
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/features"
                className="inline-block px-5 py-2 rounded-full border"
                style={{ color: PALETTE.lightCard, borderColor: "rgba(255,255,255,0.12)" }}
              >
                View all features
              </Link>
            </div>
          </div>
        </section>

        {/* footer intentionally removed from this file per your request */}
      </main>
    </div>
  );
}
