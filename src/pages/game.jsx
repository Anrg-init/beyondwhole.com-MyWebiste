// src/features/game/FindTheCross.jsx
import React, { useEffect, useMemo, useState } from "react";
import { event as gaEvent } from "../../track/ga"; // optional analytics helper

const TOTAL_LEVELS = 5;

function randInt(max) {
  return Math.floor(Math.random() * max);
}

export default function FindTheCross() {
  const [level, setLevel] = useState(1);
  const [gridSize, setGridSize] = useState(30); // adjustable per level
  const [trueIndex, setTrueIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState("playing"); // playing | won | lost
  const [showHintModal, setShowHintModal] = useState(false);
  const [foundIndices, setFoundIndices] = useState({}); // record wrong clicks
  const [cooldown, setCooldown] = useState(0);

  // adjust difficulty by level
  useEffect(() => {
    const base = 16 + level * 6; // increases with level
    setGridSize(base);
    // randomly choose a true index
    setTrueIndex(randInt(base));
    setFoundIndices({});
    setMistakes(0);
    setStatus("playing");
    // analytics
    try { gaEvent("game_level_start", { level }); } catch (e) {}
  }, [level]);

  // cooldown timer for wrong-click penalty
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const cells = useMemo(() => Array.from({ length: gridSize }), [gridSize]);

  function handleCellClick(i) {
    if (status !== "playing" || cooldown > 0) return;

    if (i === trueIndex) {
      // correct
      try { gaEvent("game_correct_click", { level }); } catch (e) {}
      if (level >= TOTAL_LEVELS) {
        setStatus("won");
        try { gaEvent("game_finished", { level }); } catch (e) {}
      } else {
        setLevel((l) => l + 1);
      }
    } else {
      // wrong
      setMistakes((m) => m + 1);
      setFoundIndices((s) => ({ ...s, [i]: true }));
      setCooldown(1.2); // short temporary block
      try { gaEvent("game_wrong_click", { level, mistakes: mistakes + 1 }); } catch (e) {}
      // Offer hint modal after 2 mistakes
      if (mistakes + 1 >= 2) setShowHintModal(true);
    }
  }

  function useHint_viaAd() {
    setShowHintModal(false);
    // ===== REWARD INTEGRATION POINT =====
    // Trigger your rewarded ad flow here and on success call applyHint()
    // e.g., rewardedAd.show().then(() => applyHint());
    // For now we simulate:
    setTimeout(() => {
      applyHint();
      try { gaEvent("game_hint_used", { level, method: "ad" }); } catch (e) {}
    }, 800);
  }

  function buyHint() {
    // ===== PAYMENT INTEGRATION POINT =====
    // Call your Stripe/PayPal micro-payment flow.
    // On success call applyHint();
    applyHint();
    try { gaEvent("game_hint_used", { level, method: "purchase" }); } catch (e) {}
    setShowHintModal(false);
  }

  function applyHint() {
    // Reveal a small area around the true index: mark some surrounding indices
    // For simplicity, mark the trueIndex as visible (but not auto-click)
    setFoundIndices((s) => ({ ...s, [trueIndex]: true }));
  }

  function skipLevel() {
    if (level >= TOTAL_LEVELS) return;
    setLevel((l) => l + 1);
    try { gaEvent("game_skip_level", { level }); } catch (e) {}
  }

  function resetGame() {
    setLevel(1);
    setFoundIndices({});
    setMistakes(0);
    setStatus("playing");
    try { gaEvent("game_restart"); } catch (e) {}
  }

  return (
    <div style={{ padding: 20, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h2 style={{ margin: 0 }}>Find the Cross — Level {level}</h2>
      <p style={{ marginTop: 6 }}>
        One correct cross hides among many. Click it to advance. Wrong clicks show penalties — use hints if stuck.
      </p>

      {/* top controls */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 10 }}>
        <div>Mistakes: {mistakes}</div>
        <div>Cooldown: {cooldown > 0 ? `${cooldown.toFixed(0)}s` : "—"}</div>
        <button onClick={() => setShowHintModal(true)}>Get a hint</button>
        <button onClick={skipLevel}>Skip level</button>
        <button onClick={resetGame}>Restart</button>
      </div>

      {/* ad-like noisy placeholders (labelled) */}
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        {/* These are decorative boxes that look like ads but are not real ads */}
        {new Array(6).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              width: 120,
              height: 60,
              background: "#eee",
              border: "2px dashed #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
            }}
            aria-hidden
          >
            AD PLACEHOLDER
          </div>
        ))}
      </div>

      {/* grid */}
      <div
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(12, Math.ceil(Math.sqrt(gridSize)))}, 1fr)`,
          gap: 6,
        }}
      >
        {cells.map((_, i) => {
          const revealed = !!foundIndices[i];
          const isTrue = i === trueIndex;
          return (
            <button
              key={i}
              onClick={() => handleCellClick(i)}
              disabled={status !== "playing" || cooldown > 0}
              style={{
                height: 48,
                background: revealed ? (isTrue ? "#0f766e" : "#f87171") : "#fafafa",
                border: "1px solid #ccc",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                color: revealed ? "#fff" : "#333",
                position: "relative",
              }}
              aria-label={revealed ? (isTrue ? "true cross revealed" : "wrong cross revealed") : "hidden cross"}
            >
              {/* show cross glyph — real/decoy visually similar */}
              <span style={{ transform: isTrue ? "scale(1.05)" : "scale(0.98)" }}>
                ✚
              </span>
              {/* subtle marker when revealed */}
              {revealed && !isTrue && (
                <div style={{ position: "absolute", bottom: 2, right: 4, fontSize: 10, opacity: 0.9 }}>
                  wrong
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* status */}
      <div style={{ marginTop: 16 }}>
        {status === "won" && (
          <div style={{ padding: 12, background: "#ecfdf5", border: "1px solid #a7f3d0" }}>
            🎉 You finished all levels — great! Share or play again.
          </div>
        )}
      </div>

      {/* Hint modal */}
      {showHintModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <div style={{ width: 360, background: "#fff", padding: 18, borderRadius: 8 }}>
            <h3 style={{ marginTop: 0 }}>Need a hint?</h3>
            <p style={{ fontSize: 14 }}>
              Watch a short optional ad or buy a hint to reveal an area where the true cross might be.
            </p>

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
              <button onClick={() => setShowHintModal(false)}>Cancel</button>
              <button onClick={useHint_viaAd}>Watch ad (free)</button>
              <button onClick={buyHint}>Buy hint</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
