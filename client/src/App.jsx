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

          {/* Confess placeholder (feature empty for now) */}
          <Route
            path="/confess"
            element={
              <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-2xl font-semibold mt-12">Confess Your Feeling</h2>
                <p className="mt-4 text-slate-600">Confession feature coming soon — form will appear here.</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
