// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";

// IMPORTANT: Message component moved to features/messagetogod
import Message from "./features/messagetogod/Message";

// Confess page (matches your folder structure)
import Confess from "./features/confessionoffeeling/Confess";

// Share your dark secret feature
import Share from "./features/shareyourdarksecret/Share";

// NEW: Quizzes & Tools (imports must exactly match filename casing)
import HellOrHeaven from "./features/quizes/HellOrHeaven";
import FindAnimalSpirit from "./features/quizes/FindAnimalSpirit";
import DeathCalculator from "./features/tools/DeathCalculator";

// Analytics helper (send SPA pageviews). Create this file if you haven't:
// src/track/ga.js -> export const pageview = (path) => { if (window.gtag) window.gtag('event','page_view',{ page_path: path }); };
import { pageview } from "./track/ga";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Send a page_view to GA on every route change (SPA)
    try {
      pageview(location.pathname + location.search);
    } catch (e) {
      // fail silently if analytics not configured
      // console.debug("GA pageview error:", e);
    }
    // optional: scroll to top on navigation
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* top nav */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* main: pages decide their own layout */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Message (full-bleed page) */}
          <Route path="/message" element={<Message />} />

          {/* Confess (full-bleed page) */}
          <Route path="/confess" element={<Confess />} />

          {/* Share your dark secret */}
          <Route path="/secret" element={<Share />} />

          {/* Quizzes */}
          <Route path="/quizzes/hellorheaven" element={<HellOrHeaven />} />
          <Route path="/quizzes/findanimalspirit" element={<FindAnimalSpirit />} />

          {/* Tools */}
          <Route path="/tools/deathcalulator" element={<DeathCalculator />} />

          {/* Other pages (centered) */}
          <Route
            path="/about"
            element={
              <div className="max-w-3xl mx-auto px-4">
                <About />
              </div>
            }
          />
          <Route
            path="/privacy"
            element={
              <div className="max-w-3xl mx-auto px-4">
                <Privacy />
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="max-w-3xl mx-auto px-4">
                <Contact />
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
