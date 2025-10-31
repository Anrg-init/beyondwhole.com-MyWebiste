// src/components/PublicFeed.jsx
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
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  const groups = { Today: [], Yesterday: [], Earlier: [] };
  msgs.forEach(m => {
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
    // listen to Firestore collection "publicMessages" ordered by createdAt desc
    const q = query(collection(db, "publicMessages"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, snapshot => {
      const arr = snapshot.docs.map(docSnap => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          text: d.text,
          anonymous: d.anonymous ?? true,
          hearts: d.hearts ?? 0,
          // createdAt may be a Firestore Timestamp
          date: d.createdAt ? d.createdAt.toDate().toISOString() : new Date().toISOString()
        };
      });
      setMsgs(arr);
    }, err => {
      console.error("Firestore snapshot error:", err);
      setMsgs([]); // fallback
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (forcedFilter) setFilter(forcedFilter);
  }, [forcedFilter]);

  // increment hearts in Firestore (transaction-free simple increment)
  async function giveHeart(id) {
    try {
      const ref = doc(db, "publicMessages", id);
      await updateDoc(ref, { hearts: increment(1) });
      // onSnapshot will update UI automatically
    } catch (err) {
      console.error("Failed to update hearts:", err);
    }
  }

  // derive displayed content
  let displayed = [];
  if (filter === "most") {
    displayed = [...msgs].sort((a,b) => (b.hearts || 0) - (a.hearts || 0) || (b.id > a.id ? 1 : -1));
  } else {
    const groups = groupByDay(msgs);
    if (filter === "yesterday") displayed = groups.Yesterday.slice();
    else displayed = [...groups.Today, ...groups.Yesterday, ...groups.Earlier];
  }

  const count = displayed.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {/* parent controlled filter? show passive label */}
        {forcedFilter ? (
          <div className="px-3 py-1 rounded text-sm text-slate-600 bg-white/60 border border-slate-100">
            Viewing: <strong className="ml-2 capitalize">{filter}</strong>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setFilter("recent")} className={`px-3 py-1 rounded ${filter==="recent"?"bg-slate-100":"bg-transparent"}`}>Recent</button>
            <button onClick={() => setFilter("yesterday")} className={`px-3 py-1 rounded ${filter==="yesterday"?"bg-slate-100":"bg-transparent"}`}>Yesterday</button>
            <button onClick={() => setFilter("most")} className={`px-3 py-1 rounded ${filter==="most"?"bg-slate-100":"bg-transparent"}`}>Most Hearts</button>
          </div>
        )}

        <div className="text-sm text-slate-500">{count} messages</div>
      </div>

      {count === 0 ? (
        <div className="py-8 text-center text-slate-500 bg-white rounded-xl p-6 border border-dashed border-slate-100 shadow-sm">
          <div className="mb-2 font-medium">No public messages in this view.</div>
          <div className="text-xs">Share yours above — it may bring someone peace today.</div>
        </div>
      ) : filter === "most" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map(m => (
            <article key={m.id} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
              <p className="text-slate-800 mb-3 whitespace-pre-wrap">{m.text}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{m.anonymous ? "Anonymous" : "Member"}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => giveHeart(m.id)} className="text-sm px-2 py-1 rounded-full bg-slate-50 hover:bg-slate-100">💗 {m.hearts || 0}</button>
                  <span>{formatDateShort(m.date)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        // grouped view: Today / Yesterday / Earlier
        (() => {
          const groups = groupByDay(displayed);
          const sections = [];
          if (groups.Today.length) sections.push({ title: "Today", items: groups.Today });
          if (groups.Yesterday.length) sections.push({ title: "Yesterday", items: groups.Yesterday });
          if (groups.Earlier.length) sections.push({ title: "Earlier", items: groups.Earlier });

          return (
            <div className="space-y-8">
              {sections.map(s => (
                <div key={s.title}>
                  <h3 className="text-lg font-semibold text-slate-700 mb-4">{s.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {s.items.map(m => (
                      <article key={m.id} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                        <p className="text-slate-800 mb-3 whitespace-pre-wrap">{m.text}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{m.anonymous ? "Anonymous" : "Member"}</span>
                          <div className="flex items-center gap-3">
                            <button onClick={() => giveHeart(m.id)} className="text-sm px-2 py-1 rounded-full bg-slate-50 hover:bg-slate-100">💗 {m.hearts || 0}</button>
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
