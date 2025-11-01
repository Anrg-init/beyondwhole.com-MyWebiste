// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

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

export default function App() {
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
