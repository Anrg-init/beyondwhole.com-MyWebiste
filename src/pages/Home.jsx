// src/pages/Home.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Home() {
  const featuresRef = useRef(null);

  const SITE_BG = "#0e0f23";

  const PALETTE = {
    lightCard: "#FFFFFF",
    lightAlt: "#C5CDC7",
    mid: "#9DA69F",
    midDark: "#565D56",
    darkBg: "#383B39",
  };

  function scrollToFeatures() {
    featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ✅ FEATURES now includes confession, quizzes and tools (each with its own bg color)
  const FEATURES = [
    {
      key: "anonymous-message",
      title: "Send a Message to God",
      desc: "Write and send your message privately to God — a spiritual space for peace and clarity.",
      to: "/message",
      bgColor: PALETTE.lightCard, // keep current (white) for confession area
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-14 h-14"
          fill="none"
          stroke={PALETTE.midDark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
          <path d="M7 8l5 3 5-3" />
        </svg>
      ),
    },
    {
      key: "anonymous-confess",
      title: "Confess Anonymously",
      desc: "Unburden your heart with full privacy. Confess freely and feel emotional release.",
      to: "/confess",
      bgColor: PALETTE.lightCard,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-14 h-14"
          fill="none"
          stroke={PALETTE.midDark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" />
          <path d="M7 10l5 5 5-5" />
        </svg>
      ),
    },
    {
      key: "share-secret",
      title: "Share a Dark Secret",
      desc: "Release your thoughts anonymously and read what others have shared in kindness.",
      to: "/secret",
      bgColor: PALETTE.lightCard,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-14 h-14"
          fill="none"
          stroke={PALETTE.midDark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 20s-6-4.35-8-7a6 6 0 1116 0c-2 2.65-8 7-8 7z" />
        </svg>
      ),
    },

    // quizzes
    {
      key: "quiz-hellorheaven",
      title: "Quiz: Hell or Heaven",
      desc: "Play the quick ‘Hell or Heaven’ quiz — a short fun test that reveals a playful spiritual result.",
      to: "/quizzes/hellorheaven",
      bgColor: "#DCE8FF", // slightly darker blue tint for quizzes
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-14 h-14"
          fill="none"
          stroke={PALETTE.midDark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 2v6" />
          <path d="M6 8l6 6 6-6" />
        </svg>
      ),
    },
    {
      key: "quiz-animalspirit",
      title: "Quiz: Find Your Animal Spirit",
      desc: "Discover the animal spirit that matches your personality — curious, playful and shareable.",
      to: "/quizzes/findanimalspirit",
      bgColor: "#FFDFEA", // slightly darker pink tint for second quiz
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-14 h-14"
          fill="none"
          stroke={PALETTE.midDark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M4 12a8 8 0 1016 0 8 8 0 00-16 0z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },

    // tool
    {
      key: "tool-deathcalc",
      title: "Tool: Death Calculator",
      desc: "A playful life-estimate tool — enter your birth date for a light-hearted estimate (entertainment only).",
      to: "/tools/deathcalulator",
      bgColor: "#FFF4CC", // slightly darker yellow tint for tools
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-14 h-14"
          fill="none"
          stroke={PALETTE.midDark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 2v6" />
          <path d="M5 12h14" />
          <path d="M12 22v-6" />
        </svg>
      ),
    },
  ];

  // group features
  const confessions = FEATURES.filter((f) =>
    ["anonymous-message", "anonymous-confess", "share-secret"].includes(f.key)
  );
  const quizzes = FEATURES.filter((f) => f.key.startsWith("quiz-"));
  const tools = FEATURES.filter((f) => f.key.startsWith("tool-"));

  // ✅ SEO: Updated title + description containing common keywords (confession, anonymous, quizzes, tools)
  const siteTitle =
    "BeyondWhole | Anonymous Confessions, Spiritual Quizzes & Manifestation Tools";
  const siteDescription =
    "BeyondWhole — a calm, anonymous space to pray, confess, and reflect. Explore spiritual quizzes, manifestation tools, and private confession features for healing, fun, and self-discovery.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BeyondWhole",
    url:
      typeof window !== "undefined"
        ? window.location.origin
        : "https://beyondwhole.web.app",
    description: siteDescription,
  };

  return (
    <div
      className="min-h-screen text-slate-900 antialiased"
      style={{
        backgroundColor: SITE_BG,
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta
          name="keywords"
          content="anonymous confession, anonymous prayer, spiritual quizzes, find your animal spirit, manifestation tools, share secret anonymously, healing journal"
        />
        <meta name="author" content="BeyondWhole" />
        <meta name="theme-color" content={SITE_BG} />
        <link
          rel="canonical"
          href={
            typeof window !== "undefined"
              ? window.location.href
              : "https://beyondwhole.web.app/"
          }
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta
          property="og:image"
          content={
            typeof window !== "undefined"
              ? `${window.location.origin}/og-image.png`
              : "/og-image.png"
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ✅ HERO */}
      <main>
        <section
          className="relative"
          aria-labelledby="home-hero-title"
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1
                id="home-hero-title"
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                style={{ color: PALETTE.lightCard, fontFamily: "Monopoly, serif" }}
              >
                Find Peace, Purpose & Fun — All in One Space
              </h1>

              <p
                className="mt-4 text-base md:text-lg"
                style={{
                  color: PALETTE.lightAlt,
                  fontFamily: "'Fjalla One', sans-serif",
                  lineHeight: 1.55,
                }}
              >
                BeyondWhole is your calm online corner for self-reflection and
                gentle entertainment. Confess or pray in private, explore
                spiritual quizzes that reveal your personality, and use
                manifestation tools to align your thoughts and goals.
              </p>

              {/* ✅ Primary CTA */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={scrollToFeatures}
                  className="px-8 py-3 text-lg font-medium shadow-sm"
                  style={{
                    backgroundColor: PALETTE.mid,
                    color: PALETTE.lightCard,
                    borderRadius: 0,
                  }}
                  aria-label="Explore Confessions and Quizzes"
                >
                  Start Now
                </button>

                {/* secondary CTA - direct to message
                <Link
                  to="/Confess"
                  className="px-6 py-3 text-lg font-medium border"
                  style={{
                    color: PALETTE.lightCard,
                    borderColor: "rgba(255,255,255,0.12)",
                    borderRadius: 0,
                  }}
                >
                  Send a Private Message
                </Link> */}
                
              </div>
            </div>
          </div>
        </section>

        {/* ✅ FEATURES */}
        <section
          id="features"
          ref={featuresRef}
          className="px-6 py-16"
          style={{ backgroundColor: SITE_BG }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2
              className="text-2xl font-semibold"
              style={{
                color: PALETTE.lightCard,
                fontFamily: "Monopoly, serif",
              }}
            >
              Explore Your Space
            </h2>

            <h3
              className="mt-2 text-3xl md:text-4xl"
              style={{
                color: PALETTE.lightCard,
                fontFamily: "Manifold, system-ui, sans-serif",
                fontWeight: 800,
              }}
            >
              Tools for Emotional Healing, Self Reflection & Soulful Play
            </h3>

            <p
              className="mt-2 max-w-2xl mx-auto"
              style={{ color: PALETTE.lightAlt, fontWeight: 400 }}
            >
              BeyondWhole offers private confession and prayer features plus
              playful quizzes and reflective tools — everything to help you
              express, explore, and grow.
            </p>

            {/* ===== Confessions group ===== */}
            <div className="mt-10 text-left">
              <h4
                className="text-xl font-semibold mb-4"
                style={{ color: PALETTE.lightCard }}
              >
                Confessions
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {confessions.map((f) => (
                  <Link key={f.key} to={f.to} className="no-underline" title={f.title}>
                    <article
                      className="p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow hover:scale-[1.02] transition-transform duration-300"
                      style={{
                        backgroundColor: f.bgColor || PALETTE.lightCard,
                        // subtle dark overlay to make it a "lil darker"
                        boxShadow: "inset 0 0 0 1000px rgba(0,0,0,0.03)",
                        border: `1px solid ${PALETTE.mid}`,
                        borderRadius: 6,
                        minHeight: 180,
                      }}
                      aria-labelledby={`feature-${f.key}`}
                    >
                      <div className="mb-4" aria-hidden>
                        {f.icon}
                      </div>

                      <div>
                        <h3
                          id={`feature-${f.key}`}
                          className="text-lg font-semibold"
                          style={{
                            color: PALETTE.darkBg,
                            fontFamily: "Manifold, system-ui, sans-serif",
                          }}
                        >
                          {f.title}
                        </h3>
                        <p
                          className="mt-2 text-sm"
                          style={{ color: PALETTE.midDark }}
                        >
                          {f.desc}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            {/* ===== Quizzes group ===== */}
            <div className="mt-10 text-left">
              <h4
                className="text-xl font-semibold mb-4"
                style={{ color: PALETTE.lightCard }}
              >
                Quizzes
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((f) => (
                  <Link key={f.key} to={f.to} className="no-underline" title={f.title}>
                    <article
                      className="p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow hover:scale-[1.02] transition-transform duration-300"
                      style={{
                        backgroundColor: f.bgColor || PALETTE.lightCard,
                        // slightly stronger dark overlay for quizzes
                        boxShadow: "inset 0 0 0 1000px rgba(0,0,0,0.06)",
                        border: `1px solid ${PALETTE.mid}`,
                        borderRadius: 6,
                        minHeight: 180,
                      }}
                      aria-labelledby={`feature-${f.key}`}
                    >
                      <div className="mb-4" aria-hidden>
                        {f.icon}
                      </div>

                      <div>
                        <h3
                          id={`feature-${f.key}`}
                          className="text-lg font-semibold"
                          style={{
                            color: PALETTE.darkBg,
                            fontFamily: "Manifold, system-ui, sans-serif",
                          }}
                        >
                          {f.title}
                        </h3>
                        <p
                          className="mt-2 text-sm"
                          style={{ color: PALETTE.midDark }}
                        >
                          {f.desc}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            {/* ===== Tools group ===== */}
            <div className="mt-10 text-left">
              <h4
                className="text-xl font-semibold mb-4"
                style={{ color: PALETTE.lightCard }}
              >
                Tools
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((f) => (
                  <Link key={f.key} to={f.to} className="no-underline" title={f.title}>
                    <article
                      className="p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow hover:scale-[1.02] transition-transform duration-300"
                      style={{
                        backgroundColor: f.bgColor || PALETTE.lightCard,
                        // medium dark overlay for tools
                        boxShadow: "inset 0 0 0 1000px rgba(0,0,0,0.05)",
                        border: `1px solid ${PALETTE.mid}`,
                        borderRadius: 6,
                        minHeight: 180,
                      }}
                      aria-labelledby={`feature-${f.key}`}
                    >
                      <div className="mb-4" aria-hidden>
                        {f.icon}
                      </div>

                      <div>
                        <h3
                          id={`feature-${f.key}`}
                          className="text-lg font-semibold"
                          style={{
                            color: PALETTE.darkBg,
                            fontFamily: "Manifold, system-ui, sans-serif",
                          }}
                        >
                          {f.title}
                        </h3>
                        <p
                          className="mt-2 text-sm"
                          style={{ color: PALETTE.midDark }}
                        >
                          {f.desc}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Link
                to="/features"
                className="inline-block px-5 py-2 border"
                style={{
                  color: PALETTE.lightCard,
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              >
                View all features
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
