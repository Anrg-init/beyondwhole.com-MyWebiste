import React from "react";
import { Helmet } from "react-helmet";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0e0f23] text-[#ffffff] px-6 py-16">
      <Helmet>
        <title>Privacy Policy | BeyondWhole</title>
        <meta
          name="description"
          content="Read BeyondWhole’s privacy policy — understand how your confessions and shared feelings are protected, stored, and kept completely private."
        />
        <meta
          name="keywords"
          content="beyondwhole privacy policy, data protection, confession privacy, secure confessions, anonymous messages"
        />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">Privacy Policy</h1>

        <p className="text-lg leading-relaxed text-[#ffffff]/90">
          Your privacy is at the heart of everything we build at BeyondWhole.
          When you share your message, confession, or feelings, we ensure they
          remain private, secure, and anonymous. No personal information is
          collected unless you explicitly provide it.
        </p>

        <p className="text-lg leading-relaxed text-[#ffffff]/90">
          Data you submit is encrypted and stored securely on Firebase. We do
          not sell, rent, or share your information with third parties. We only
          use limited analytics to improve the site experience, never to track
          individuals.
        </p>

        <p className="text-lg leading-relaxed text-[#ffffff]/90">
          By using BeyondWhole, you agree to this Privacy Policy. It may be
          updated occasionally to reflect best practices and transparency in how
          we protect user data.
        </p>

        <p className="text-lg leading-relaxed text-[#ffffff]/90 italic">
          Last updated: November 2025
        </p>
      </div>
    </div>
  );
}
