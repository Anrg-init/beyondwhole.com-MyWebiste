// src/components/MessageForm.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const STORAGE_PRIVATE = "mtg_private_messages";
const MAX_CHARS = 3000; // changed to 3000

function nowISO() { return new Date().toISOString(); }

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
    const arr = JSON.parse(localStorage.getItem(STORAGE_PRIVATE) || "[]");
    arr.unshift(item);
    localStorage.setItem(STORAGE_PRIVATE, JSON.stringify(arr));
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) {
      setToast("Please type your message.");
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

    // always save private copy locally
    try { savePrivate(messageObj); } catch (err) { console.error("private save failed", err); }

    if (showPublic) {
      try {
        // write to Firestore collection "publicMessages"
        await addDoc(collection(db, "publicMessages"), {
          text: messageObj.text,
          anonymous: messageObj.anonymous,
          hearts: 0,
          createdAt: serverTimestamp()
        });
        setToast("Shared with the community.");
      } catch (err) {
        console.error("Firestore write failed:", err);
        // fallback: persist locally so message is not lost
        const fallbackKey = "mtg_public_messages_offline";
        const arr = JSON.parse(localStorage.getItem(fallbackKey) || "[]");
        arr.unshift(messageObj);
        localStorage.setItem(fallbackKey, JSON.stringify(arr));
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
    <form onSubmit={handleSend} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Pour your heart out here... Share what's on your mind with the Divine"
        maxLength={MAX_CHARS}
        className="w-full min-h-[140px] rounded-xl p-4 border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none"
        aria-label="Message to God"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={showPublic}
              onChange={(e) => setShowPublic(e.target.checked)}
              className="w-4 h-4 accent-blue-500"
            />
            Show my message to others
          </label>
          <span className="text-xs text-slate-500">You can change this later on this device.</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500">Ad placeholder</div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#6DA7FF] to-[#A1C4FF] text-white px-4 py-2 rounded-full shadow-sm disabled:opacity-60"
            disabled={sending}
          >
            {sending ? "Sending…" : "Send to Heaven ☁️"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-500">
        <div>{text.length} / {MAX_CHARS}</div>
        <div>{remaining <= 30 ? `${remaining} left` : `${pct}%`}</div>
      </div>

      {toast && (
        <div className="mt-2 rounded-md bg-white/80 p-3 text-sm text-slate-800 shadow-sm">
          {toast}
        </div>
      )}
    </form>
  );
}
