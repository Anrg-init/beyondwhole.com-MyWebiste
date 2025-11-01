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

  // ✅ Updated feature descriptions (more emotional + keyword-rich)
  const FEATURES = [
    {
      key: "anonymous-message",
      title: "Send a Message to God",
      desc: "Write and send your message privately to God — a spiritual space for peace and clarity.",
      to: "/message",
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
  ];

  // ✅ Updated meta content (SEO)
  const siteTitle = "Anonymous Confessions & Manifestation Planner | BeyondWhole";
  const siteDescription =
    "BeyondWhole helps you pray, confess, and reflect — all anonymously. A calm, judgment-free space for relaxation, manifestation, and emotional relief.";

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
          content="anonymous confession, manifestation planner, anonymous prayer, share secret, emotional peace, reflection"
        />
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
            <div className="max-w-3xl mx-auto text-left">
              <h1
                id="home-hero-title"
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight"
                style={{ color: PALETTE.lightCard, fontFamily: "Monopoly, serif" }}
              >
                Find Calm in Anonymous Reflection & Manifestation
              </h1>

              <p
                className="mt-4 text-base md:text-lg"
                style={{
                  color: PALETTE.lightAlt,
                  fontFamily: "'Fjalla One', sans-serif",
                }}
              >
                BeyondWhole offers you a peaceful space to pray, confess, and
                manifest — all anonymously. No judgment, no pressure, just
                healing and mindfulness.
              </p>

              {/* ✅ Non-curved CTA */}
              <div className="mt-8 flex items-start gap-3">
                <button
                  onClick={scrollToFeatures}
                  className="px-8 py-3 font-medium shadow-sm"
                  style={{
                    backgroundColor: PALETTE.mid,
                    color: PALETTE.lightCard,
                    borderRadius: 0,
                  }}
                  aria-label="Scroll to explore features"
                >
                  Share a confession, send a prayer, or start manifesting
                </button>
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
              Tools for Emotional Healing & Self Reflection
            </h3>

            <p
              className="mt-2 max-w-2xl mx-auto"
              style={{ color: PALETTE.lightAlt, fontWeight: 400 }}
            >
              BeyondWhole gives you three simple paths — write to God, confess
              privately, or share a secret. Each tool supports inner clarity,
              calmness, and positive manifestation.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f) => (
                <Link key={f.key} to={f.to} className="no-underline" title={f.title}>
                  <article
                    className="p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
                    style={{
                      backgroundColor: PALETTE.lightCard,
                      border: `1px solid ${PALETTE.mid}`,
                      borderRadius: 0,
                      minHeight: 200,
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
                          color: SITE_BG,
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
