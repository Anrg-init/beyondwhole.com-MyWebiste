// src/features/messagetogod/MessageForm.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // <- ensure src/firebase.js exports `db`
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const STORAGE_PRIVATE = "mtg_private_messages";
const MAX_CHARS = 3000;

function nowISO() {
  return new Date().toISOString();
}

export default function MessageForm() {
  const [text, setText] = useState("");
  const [showPublic, setShowPublic] = useState(false);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  function savePrivate(item) {
    try {
      if (typeof window === "undefined") return;
      const arr = JSON.parse(localStorage.getItem(STORAGE_PRIVATE) || "[]");
      arr.unshift(item);
      localStorage.setItem(STORAGE_PRIVATE, JSON.stringify(arr));
    } catch (err) {
      console.error("private save failed", err);
    }
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) {
      setToast("Please type your message.");
      return;
    }

    if (text.length > MAX_CHARS) {
      setToast(`Message too long — max ${MAX_CHARS} characters.`);
      return;
    }

    setSending(true);
    setToast("Sending...");

    const messageObj = {
      id: Date.now(),
      text: text.trim(),
      date: nowISO(),
      anonymous: true,
      hearts: 0,
    };

    savePrivate(messageObj);

    if (showPublic) {
      try {
        await addDoc(collection(db, "publicMessages"), {
          text: messageObj.text,
          anonymous: messageObj.anonymous,
          hearts: 0,
          createdAt: serverTimestamp(),
        });
        setToast("Shared with the community.");
      } catch (err) {
        console.error("Firestore write failed:", err);
        try {
          if (typeof window !== "undefined") {
            const fallbackKey = "mtg_public_messages_offline";
            const arr = JSON.parse(localStorage.getItem(fallbackKey) || "[]");
            arr.unshift(messageObj);
            localStorage.setItem(fallbackKey, JSON.stringify(arr));
          }
        } catch (e) {
          // ignore fallback error
        }
        setToast("Saved locally (offline). Will sync when online.");
      }
    } else {
      setToast("Saved privately.");
    }

    setTimeout(() => {
      setSending(false);
      setText("");
    }, 700);
  }

  const remaining = MAX_CHARS - text.length;
  const pct = Math.round((text.length / MAX_CHARS) * 100);

  return (
    <form onSubmit={handleSend} className="space-y-4" style={{ fontFamily: "Manifold, system-ui, sans-serif", color: "#ffffff" }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Pour your heart out here... Share what's on your mind with the Divine"
        maxLength={MAX_CHARS}
        className="w-full min-h-[140px] p-4 rounded-lg outline-none resize-vertical"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "rgba(255,255,255,0.03)",
          color: "#ffffff",
        }}
        aria-label="Message to God"
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm" style={{ color: "#ffffff" }}>
            <input
              type="checkbox"
              checked={showPublic}
              onChange={(e) => setShowPublic(e.target.checked)}
              className="w-4 h-4"
              style={{ accentColor: "#ffffff" }}
            />
            <span style={{ fontFamily: "Manifold, system-ui" }}>Show my message to others</span>
          </label>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>You can change this later on this device.</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>Ad placeholder</div>
          <button
            type="submit"
            className="px-4 py-2 rounded-md shadow-sm"
            style={{
              backgroundColor: "#ffffff",
              color: "#383B39",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            disabled={sending}
            aria-disabled={sending}
          >
            {sending ? "Sending…" : "Send to Heaven ☁️"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
        <div>{text.length} / {MAX_CHARS}</div>
        <div>{remaining <= 30 ? `${remaining} left` : `${pct}%`}</div>
      </div>

      {toast && (
        <div className="mt-2 rounded-md p-3 text-sm shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.03)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.06)" }}>
          {toast}
        </div>
      )}
    </form>
  );
}
