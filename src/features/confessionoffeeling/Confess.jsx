// src/features/confessionoffeeling/Confess.jsx
import React, { useState } from "react";
import { Helmet } from "react-helmet";

import ConfessForm from "./ConfessForm";
import PublicFeed from "./PublicFeed";

/* dark aesthetic forest image — replace if you want another */
const BG_URL = "https://images.pexels.com/photos/29575375/pexels-photo-29575375.png";

export default function Confess() {
  const [forcedFilter, setForcedFilter] = useState("recent"); // recent | yesterday | most

  // ✅ SEO-friendly title + description
  const pageTitle = "Write Your Confession & Share Your Feelings | BeyondWhole";
  const pageDescription =
    "Feeling weighed down by secrets? Write your confession anonymously and see people's confessions, share your feelings with a compassionate community, and find relief — private, judgment-free, no account required.";

  const canonical = typeof window !== "undefined" ? window.location.href : "/confess";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Write Your Confession & Share Your Feelings",
    description: pageDescription,
    url: canonical,
  };

  return (
    <div
      className="min-h-screen antialiased"
      style={{
        backgroundColor: "#ffffff",
        color: "#383B39",
        fontFamily: 'Manifold, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="anonymous confession, share feelings, confess anonymously, private confession, community support, emotional relief" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BeyondWhole" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={typeof window !== "undefined" ? `${window.location.origin}/og-image-confess.png` : "/og-image-confess.png"} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Preconnect for images */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />

        {/* Structured data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <div
        className="w-full bg-no-repeat bg-center bg-cover relative"
        style={{ backgroundImage: `url(${BG_URL})` }}
      >
        <div className="absolute inset-0 bg-black/64 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 pt-28 md:pt-36 lg:pt-44 pb-12">
          <div className="text-center">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
              style={{
                color: "#ffffff",
                fontFamily: '"Ethos Nova", "Manifold", system-ui, sans-serif',
                fontWeight: 800,
                textShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            >
              Write Your Confession &amp; Share Your Feelings
            </h1>

            <p
              className="mt-3 mx-auto max-w-2xl text-base sm:text-lg md:text-xl"
              style={{
                color: "#ffffff",
                fontFamily: "Manifold, system-ui, sans-serif",
                lineHeight: 1.6,
                opacity: 0.98,
                textShadow: "0 3px 12px rgba(0,0,0,0.45)",
              }}
            >
              Feeling weighed down by secrets? Write your confession anonymously and see people confession, express your feelings, and connect with a compassionate community for emotional relief — private, judgment-free, and no account required.
            </p>
          </div>

          <div
            className="mt-8 mx-auto max-w-2xl px-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(6px)",
            }}
          >
            <div className="p-6 md:p-8">
              <ConfessForm />
            </div>
          </div>
        </div>
      </div>

      {/* Community confessions */}
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <section
          className="rounded-2xl p-4 md:p-6 lg:p-8"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(56,59,57,0.08)",
            boxShadow: "0 6px 18px rgba(56,59,57,0.04)",
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-xl sm:text-2xl md:text-3xl text-center"
              style={{
                color: "#383B39",
                fontFamily: '"Ethos Nova", Manifold, system-ui',
                marginBottom: 6,
                fontWeight: 700,
              }}
            >
              See People's Confessions
            </h2>

            <p
              className="text-center mt-2 text-sm sm:text-base"
              style={{
                color: "#383B39",
                fontFamily: "Manifold, system-ui, sans-serif",
                opacity: 0.95,
                maxWidth: 720,
                margin: "0 auto",
                lineHeight: 1.5,
              }}
            >
              Shared anonymously by members of the community — find solidarity in knowing others feel like you do.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button
                onClick={() => setForcedFilter("recent")}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: forcedFilter === "recent" ? "#383B39" : "#ffffff",
                  color: forcedFilter === "recent" ? "#ffffff" : "#383B39",
                  border: "1px solid rgba(56,59,57,0.12)",
                }}
              >
                Recent
              </button>

              <button
                onClick={() => setForcedFilter("yesterday")}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: forcedFilter === "yesterday" ? "#383B39" : "#ffffff",
                  color: forcedFilter === "yesterday" ? "#ffffff" : "#383B39",
                  border: "1px solid rgba(56,59,57,0.12)",
                }}
              >
                Yesterday
              </button>

              <button
                onClick={() => setForcedFilter("most")}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: forcedFilter === "most" ? "#383B39" : "#ffffff",
                  color: forcedFilter === "most" ? "#ffffff" : "#383B39",
                  border: "1px solid rgba(56,59,57,0.12)",
                }}
              >
                Most Hearts
              </button>
            </div>

            <div className="mt-8">
              <PublicFeed forcedFilter={forcedFilter} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
