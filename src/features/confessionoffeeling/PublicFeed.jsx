// src/features/confessionoffeeling/PublicFeed.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, increment } from "firebase/firestore";

function formatDateShort(iso) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(d);
}

function isSameDay(aIso, bDate) {
  const a = new Date(aIso);
  const b = new Date(bDate);
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function groupByDay(msgs) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const groups = { Today: [], Yesterday: [], Earlier: [] };
  msgs.forEach((m) => {
    if (isSameDay(m.date, today)) groups.Today.push(m);
    else if (isSameDay(m.date, yesterday)) groups.Yesterday.push(m);
    else groups.Earlier.push(m);
  });
  return groups;
}

export default function PublicFeed({ forcedFilter }) {
  const [msgs, setMsgs] = useState([]);
  const [filter, setFilter] = useState(forcedFilter || "recent"); // 'recent' | 'yesterday' | 'most'

  useEffect(() => {
    try {
      const q = query(collection(db, "publicConfessions"), orderBy("createdAt", "desc"));
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          const arr = snapshot.docs.map((docSnap) => {
            const d = docSnap.data();
            return {
              id: docSnap.id,
              text: d.text,
              anonymous: d.anonymous ?? true,
              hearts: d.hearts ?? 0,
              date: d.createdAt ? d.createdAt.toDate().toISOString() : new Date().toISOString(),
            };
          });
          setMsgs(arr);
        },
        (err) => {
          console.error("Firestore snapshot error:", err);
          setMsgs([]);
        }
      );

      return () => unsub();
    } catch (err) {
      console.error("PublicFeed setup error:", err);
      setMsgs([]);
    }
  }, []);

  useEffect(() => {
    if (forcedFilter) setFilter(forcedFilter);
  }, [forcedFilter]);

  async function giveHeart(id) {
    try {
      const ref = doc(db, "publicConfessions", id);
      await updateDoc(ref, { hearts: increment(1) });
    } catch (err) {
      console.error("Failed to update hearts:", err);
    }
  }

  let displayed = [];
  if (filter === "most") {
    displayed = [...msgs].sort((a, b) => (b.hearts || 0) - (a.hearts || 0) || (b.id > a.id ? 1 : -1));
  } else {
    const groups = groupByDay(msgs);
    if (filter === "yesterday") displayed = groups.Yesterday.slice();
    else displayed = [...groups.Today, ...groups.Yesterday, ...groups.Earlier];
  }

  const count = displayed.length;

  return (
    <div style={{ fontFamily: "Manifold, system-ui, sans-serif", color: "#383B39" }}>
      <div className="flex items-center justify-between mb-4">
        {forcedFilter ? (
          <div
            className="px-3 py-1 rounded text-sm"
            style={{
              backgroundColor: "#ffffff",
              color: "#383B39",
              border: "1px solid rgba(56,59,57,0.12)",
              fontFamily: "Manifold, system-ui",
            }}
          >
            Viewing: <strong className="ml-2 capitalize" style={{ fontFamily: "Manifold, system-ui" }}>{filter}</strong>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("recent")}
              className="px-3 py-1 rounded text-sm"
              style={{
                backgroundColor: filter === "recent" ? "#383B39" : "#ffffff",
                color: filter === "recent" ? "#ffffff" : "#383B39",
                border: "1px solid rgba(56,59,57,0.12)",
                fontFamily: "Manifold, system-ui",
              }}
            >
              Recent
            </button>
            <button
              onClick={() => setFilter("yesterday")}
              className="px-3 py-1 rounded text-sm"
              style={{
                backgroundColor: filter === "yesterday" ? "#383B39" : "#ffffff",
                color: filter === "yesterday" ? "#ffffff" : "#383B39",
                border: "1px solid rgba(56,59,57,0.12)",
                fontFamily: "Manifold, system-ui",
              }}
            >
              Yesterday
            </button>
            <button
              onClick={() => setFilter("most")}
              className="px-3 py-1 rounded text-sm"
              style={{
                backgroundColor: filter === "most" ? "#383B39" : "#ffffff",
                color: filter === "most" ? "#ffffff" : "#383B39",
                border: "1px solid rgba(56,59,57,0.12)",
                fontFamily: "Manifold, system-ui",
              }}
            >
              Most Hearts
            </button>
          </div>
        )}

        <div className="text-sm" style={{ color: "rgba(56,59,57,0.8)", fontFamily: "Manifold, system-ui" }}>{count} confessions</div>
      </div>

      {count === 0 ? (
        <div
          className="py-8 text-center bg-white rounded-md p-6"
          style={{
            border: "1px dashed rgba(56,59,57,0.12)",
            boxShadow: "none",
          }}
        >
          <div className="mb-2 font-medium" style={{ color: "#383B39", fontFamily: "Manifold, system-ui" }}>No public confessions in this view.</div>
          <div className="text-xs" style={{ color: "rgba(56,59,57,0.7)", fontFamily: "Manifold, system-ui" }}>Share yours above — it may bring someone peace today.</div>
        </div>
      ) : filter === "most" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map((m) => (
            <article
              key={m.id}
              className="p-4 bg-white"
              style={{
                border: "1px solid rgba(56,59,57,0.12)",
                borderRadius: 8,
                boxShadow: "0 2px 6px rgba(56,59,57,0.03)",
                transition: "transform .12s ease, box-shadow .12s ease",
              }}
            >
              <p className="mb-3 whitespace-pre-wrap" style={{ color: "#383B39", fontFamily: "Manifold, system-ui" }}>{m.text}</p>
              <div className="flex items-center justify-between text-xs" style={{ color: "rgba(56,59,57,0.7)", fontFamily: "Manifold, system-ui" }}>
                <span>{m.anonymous ? "Anonymous" : "Member"}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => giveHeart(m.id)}
                    className="text-sm px-2 py-1 rounded"
                    style={{
                      border: "1px solid rgba(56,59,57,0.12)",
                      backgroundColor: "#ffffff",
                      color: "#383B39",
                      fontFamily: "Manifold, system-ui",
                    }}
                  >
                    💗 {m.hearts || 0}
                  </button>
                  <span>{formatDateShort(m.date)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        (() => {
          const groups = groupByDay(displayed);
          const sections = [];
          if (groups.Today.length) sections.push({ title: "Today", items: groups.Today });
          if (groups.Yesterday.length) sections.push({ title: "Yesterday", items: groups.Yesterday });
          if (groups.Earlier.length) sections.push({ title: "Earlier", items: groups.Earlier });

          return (
            <div className="space-y-8">
              {sections.map((s) => (
                <div key={s.title}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "#383B39", fontFamily: "Ethos Nova, Manifold" }}>{s.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {s.items.map((m) => (
                      <article
                        key={m.id}
                        className="p-4 bg-white"
                        style={{
                          border: "1px solid rgba(56,59,57,0.12)",
                          borderRadius: 8,
                          boxShadow: "0 2px 6px rgba(56,59,57,0.03)",
                          transition: "transform .12s ease, box-shadow .12s ease",
                        }}
                      >
                        <p className="mb-3 whitespace-pre-wrap" style={{ color: "#383B39", fontFamily: "Manifold, system-ui" }}>{m.text}</p>
                        <div className="flex items-center justify-between text-xs" style={{ color: "rgba(56,59,57,0.7)", fontFamily: "Manifold, system-ui" }}>
                          <span>{m.anonymous ? "Anonymous" : "Member"}</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => giveHeart(m.id)}
                              className="text-sm px-2 py-1 rounded"
                              style={{
                                border: "1px solid rgba(56,59,57,0.12)",
                                backgroundColor: "#ffffff",
                                color: "#383B39",
                                fontFamily: "Manifold, system-ui",
                              }}
                            >
                              💗 {m.hearts || 0}
                            </button>
                            <span>{formatDateShort(m.date)}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })()
      )}
    </div>
  );
}
