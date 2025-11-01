import React from "react";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0e0f23] text-[#ffffff] px-6 py-16">
      <Helmet>
        <title>About | BeyondWhole - Share Feelings & Confessions</title>
        <meta
          name="description"
          content="Learn more about BeyondWhole — a peaceful platform where you can share your feelings, confess your emotions, and connect through honesty and reflection."
        />
        <meta
          name="keywords"
          content="about beyondwhole, confess feelings, message to god, emotional healing, self reflection, express feelings online"
        />
      </Helmet>

      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">About BeyondWhole</h1>
        <p className="text-lg leading-relaxed text-[#ffffff]/90">
          BeyondWhole is a safe, peaceful, and private online space designed to
          help you share your deepest emotions — from confessions to messages to
          the universe. We believe in emotional freedom, honesty, and healing
          through expression.
        </p>
        <p className="text-lg leading-relaxed text-[#ffffff]/90">
          Whether you’re sending a message to God, confessing your feelings, or
          releasing your inner thoughts, BeyondWhole provides a calm space for
          you to reflect and feel lighter. Our mission is to connect people with
          their emotions and encourage emotional clarity in a noisy world.
        </p>
        <p className="text-lg leading-relaxed text-[#ffffff]/90">
          Built with care and privacy at its heart, BeyondWhole never sells or
          shares your data. We’re committed to providing an authentic, ad-free
          experience for everyone who visits.
        </p>
      </div>
    </div>
  );
}
