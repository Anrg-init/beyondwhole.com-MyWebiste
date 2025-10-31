
// src/features/messagetogod/Message.jsx
import React, { useState } from "react";
import MessageForm from "./MessageForm";
import PublicFeed from "./PublicFeed";

/* Single fixed hero background image (replace with your preferred URL) */
const BG_URL = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80";

export default function Message() {
  const [forcedFilter, setForcedFilter] = useState("recent"); // recent | yesterday | most

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* FULL-BLEED HERO + MESSAGE AREA */}
      <div
        className="w-full bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${BG_URL})` }}
      >
        <div className="max-w-5xl mx-auto px-4 pt-20 pb-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
              Express your heart —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">
                let the Divine read your words
              </span>
            </h1>
            <p className="mt-3 text-slate-700 max-w-2xl mx-auto">
              No login. No judgement. Share privately or let the world see your heart.
            </p>
          </div>

          <div className="mt-10 bg-white/90 rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
            <MessageForm />
          </div>
        </div>
      </div>

      {/* Community messages */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <section className="bg-white rounded-2xl shadow-inner p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">
              Community Messages
            </h2>
            <p className="text-center text-slate-500 mt-2">
              Hearts and hopes shared by our community. Find comfort in knowing you're not alone.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button
                onClick={() => setForcedFilter("recent")}
                className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium ${forcedFilter === "recent" ? "bg-blue-600 text-white" : "bg-white border"}`}
              >
                Recent
              </button>

              <button
                onClick={() => setForcedFilter("yesterday")}
                className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium ${forcedFilter === "yesterday" ? "bg-blue-600 text-white" : "bg-white border"}`}
              >
                Yesterday
              </button>

              <button
                onClick={() => setForcedFilter("most")}
                className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium ${forcedFilter === "most" ? "bg-blue-600 text-white" : "bg-white border"}`}
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
