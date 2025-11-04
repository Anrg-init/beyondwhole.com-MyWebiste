import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";

/**
 * FindAnimalSpirit.jsx
 * A responsive, SEO-friendly quiz page that asks 10 reflective questions,
 * determines a spirit-animal result by tallying answers, and provides an assessment.
 *
 * NOTE: This is an introspective tool — not an authoritative spiritual verdict.
 */

export default function FindAnimalSpirit() {
  // --- Quiz data (from the JSON you provided) ---
  const quizData = {
    title: "What Is Your True Spirit Animal?",
    description:
      "Your spirit animal reflects your inner self — your instincts, strengths, and energy. Answer honestly to find your true match.",
    questions: [
      {
        id: "q1",
        question: "When facing a difficult situation, what do you rely on most?",
        options: {
          A: { text: "My intuition and gut feeling.", animal: "Wolf" },
          B: { text: "My courage and confidence.", animal: "Lion" },
          C: { text: "My intelligence and perspective.", animal: "Owl" },
          D: { text: "My creativity and quick thinking.", animal: "Fox" }
        }
      },
      {
        id: "q2",
        question: "What type of environment makes you feel most at peace?",
        options: {
          A: { text: "The quiet forest.", animal: "Deer" },
          B: { text: "The wide open skies.", animal: "Eagle" },
          C: { text: "The flowing ocean.", animal: "Dolphin" },
          D: { text: "The mountains and wilderness.", animal: "Bear" }
        }
      },
      {
        id: "q3",
        question: "How do your friends describe you?",
        options: {
          A: { text: "Loyal and dependable.", animal: "Wolf" },
          B: { text: "Adventurous and free-spirited.", animal: "Eagle" },
          C: { text: "Gentle and kind-hearted.", animal: "Deer" },
          D: { text: "Confident and bold.", animal: "Tiger" }
        }
      },
      {
        id: "q4",
        question: "What motivates you the most in life?",
        options: {
          A: { text: "Personal growth and self-discovery.", animal: "Butterfly" },
          B: { text: "Helping others and spreading joy.", animal: "Dolphin" },
          C: { text: "Protecting the ones I love.", animal: "Bear" },
          D: { text: "Achieving success and recognition.", animal: "Lion" }
        }
      },
      {
        id: "q5",
        question: "How do you typically solve problems?",
        options: {
          A: { text: "With patience and reflection.", animal: "Owl" },
          B: { text: "With strategy and wit.", animal: "Fox" },
          C: { text: "With determination and willpower.", animal: "Tiger" },
          D: { text: "By staying calm and adaptable.", animal: "Butterfly" }
        }
      },
      {
        id: "q6",
        question: "What do you value most in your relationships?",
        options: {
          A: { text: "Loyalty and trust.", animal: "Wolf" },
          B: { text: "Joy and emotional connection.", animal: "Dolphin" },
          C: { text: "Respect and balance.", animal: "Eagle" },
          D: { text: "Protection and support.", animal: "Bear" }
        }
      },
      {
        id: "q7",
        question: "Which word feels closest to your true self?",
        options: {
          A: { text: "Courageous", animal: "Lion" },
          B: { text: "Gentle", animal: "Deer" },
          C: { text: "Wise", animal: "Owl" },
          D: { text: "Adaptable", animal: "Fox" }
        }
      },
      {
        id: "q8",
        question: "What’s your biggest strength?",
        options: {
          A: { text: "My empathy and understanding.", animal: "Deer" },
          B: { text: "My insight and awareness.", animal: "Owl" },
          C: { text: "My inner strength and courage.", animal: "Tiger" },
          D: { text: "My flexibility and humor.", animal: "Dolphin" }
        }
      },
      {
        id: "q9",
        question: "How do you prefer to spend your free time?",
        options: {
          A: { text: "Exploring nature or traveling.", animal: "Eagle" },
          B: { text: "Relaxing quietly in peace.", animal: "Owl" },
          C: { text: "Socializing or making people laugh.", animal: "Dolphin" },
          D: { text: "Working on personal goals.", animal: "Tiger" }
        }
      },
      {
        id: "q10",
        question: "If you could be known for one thing, what would it be?",
        options: {
          A: { text: "My courage and leadership.", animal: "Lion" },
          B: { text: "My kindness and compassion.", animal: "Deer" },
          C: { text: "My creativity and transformation.", animal: "Butterfly" },
          D: { text: "My wisdom and insight.", animal: "Owl" }
        }
      }
    ],
    animals: {
      Wolf: {
        title: "🐺 The Wolf",
        description:
          "Loyal, instinctive, and deeply connected to those you trust. You value freedom but never forget your pack."
      },
      Eagle: {
        title: "🦅 The Eagle",
        description:
          "Visionary and independent — you see life from above, focused on truth and freedom."
      },
      Bear: {
        title: "🐻 The Bear",
        description:
          "Strong yet introspective. You protect what matters and draw strength from solitude."
      },
      Deer: {
        title: "🦌 The Deer",
        description:
          "Gentle, graceful, and empathetic. You move through life with kindness and emotional depth."
      },
      Fox: {
        title: "🦊 The Fox",
        description:
          "Clever, resourceful, and adaptable — you thrive in change and think three steps ahead."
      },
      Lion: {
        title: "🦁 The Lion",
        description:
          "A natural leader — bold, confident, and protective of your pride and purpose."
      },
      Owl: {
        title: "🦉 The Owl",
        description:
          "Wise and intuitive. You see truths that others miss and value inner peace over noise."
      },
      Butterfly: {
        title: "🦋 The Butterfly",
        description:
          "You embody growth and transformation. Life for you is about evolving into your best self."
      },
      Dolphin: {
        title: "🐬 The Dolphin",
        description:
          "Joyful and intelligent, you bring light to others and connect deeply through empathy."
      },
      Tiger: {
        title: "🐅 The Tiger",
        description:
          "Fierce, passionate, and powerful. You act with intensity and live with unstoppable drive."
      }
    }
  };

  // --- Build questions array from quizData for rendering (keeps ids and labels) ---
  const questions = quizData.questions.map((q, idx) => ({
    id: q.id || `q${idx + 1}`,
    text: q.question,
    options: q.options
  }));

  // display options labels (A-D)
  const optionLabels = ["A", "B", "C", "D"];

  // initial answers: use '' as unanswered sentinel to avoid numeric comparisons
  const initialAnswers = questions.reduce((acc, q) => {
    acc[q.id] = ""; // empty string -> unanswered
    return acc;
  }, {});

  const [answers, setAnswers] = useState(initialAnswers);
  const [submitted, setSubmitted] = useState(false);

  // UI refs
  const quizRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) topRef.current.scrollTop = 0;
  }, []);

  const handleChange = (id, val) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  // allAnswered check: every answer selected (not empty)
  const allAnswered = Object.values(answers).every((v) => v !== "");

  // compute result: tally animals from selected options
  const computeResult = () => {
    const counts = {}; // animal -> count
    const positions = {}; // animal -> array of question indices where chosen
    let totalAnswered = 0;

    questions.forEach((q, qIdx) => {
      const sel = answers[q.id];
      if (sel && q.options[sel]) {
        totalAnswered += 1;
        const animal = q.options[sel].animal;
        counts[animal] = (counts[animal] || 0) + 1;
        if (!positions[animal]) positions[animal] = [];
        positions[animal].push(qIdx); // store zero-based index
      }
    });

    // find max count(s) — primary rule: most selected animal wins
    const entries = Object.entries(counts);
    let topAnimals = [];
    let topCount = 0;
    entries.forEach(([animal, cnt]) => {
      if (cnt > topCount) {
        topAnimals = [animal];
        topCount = cnt;
      } else if (cnt === topCount) {
        topAnimals.push(animal);
      }
    });

    // if no answers chosen, default values
    if (entries.length === 0) {
      return { counts, positions, topAnimals: [], topCount: 0, totalAnswered, percent: 0, selectedAnimal: null };
    }

    // percent relative to total questions
    const percent = Math.round((topCount / questions.length) * 100);

    // If tie, apply simple deterministic tie-breaker:
    // 1) compute weightedScore for each tied animal as sum(questionIndex+1) (later questions weigh slightly more)
    // 2) choose animal with highest weightedScore
    // 3) if still tied, choose alphabetical earliest animal key
    let selectedAnimal = null;
    if (topAnimals.length === 1) {
      selectedAnimal = topAnimals[0];
    } else if (topAnimals.length > 1) {
      const weightedScores = {};
      topAnimals.forEach((animal) => {
        const idxArr = positions[animal] || [];
        weightedScores[animal] = idxArr.reduce((acc, idx) => acc + (idx + 1), 0);
      });

      let maxWeight = -Infinity;
      let candidates = [];
      Object.entries(weightedScores).forEach(([animal, score]) => {
        if (score > maxWeight) {
          maxWeight = score;
          candidates = [animal];
        } else if (score === maxWeight) {
          candidates.push(animal);
        }
      });

      if (candidates.length === 1) {
        selectedAnimal = candidates[0];
      } else {
        selectedAnimal = candidates.sort()[0]; // deterministic fallback
      }
    }

    return { counts, positions, topAnimals, topCount, totalAnswered, percent, selectedAnimal };
  };

  const { counts, positions, topAnimals, topCount, totalAnswered, percent, selectedAnimal } = computeResult();

  // For assessment we keep the preexisting thresholds but feed the percent computed above
  const getAssessment = ({ percentVal }) => {
    // Transparent thresholds — easy to tweak.
    if (percentVal >= 85) {
      return {
        title: "Strong alignment with qualities often found in spirit-animal guides",
        verdict: "Highly aligned",
        advice: [
          "Keep practicing integrity and compassion — these traits often reflect a strong spirit-animal resonance.",
          "Explore meditation, nature walks, or journaling to deepen the connection."
        ],
        color: "bg-green-50 text-green-900"
      };
    }
    if (percentVal >= 65) {
      return {
        title: "Generally on the right path for discovering a spirit animal",
        verdict: "Likely aligned",
        advice: [
          "Identify one quality to develop (courage, patience, generosity).",
          "Try small daily practices — they compound over time."
        ],
        color: "bg-amber-50 text-amber-900"
      };
    }
    if (percentVal >= 40) {
      return {
        title: "Significant room for reflection",
        verdict: "Needs reflection",
        advice: [
          "Reflect on the areas with lowest scores and consider small changes.",
          "Join a community or seek a guide who can help you explore spirit-animal themes."
        ],
        color: "bg-orange-50 text-orange-900"
      };
    }
    return {
      title: "Action recommended — consider mindful exploration",
      verdict: "Needs major reflection",
      advice: [
        "Speak with a mentor or spiritual guide if you want support.",
        "Start with tiny, consistent practices: daily gratitude, nature time, and one act of kindness per week."
      ],
      color: "bg-red-50 text-red-900"
    };
  };

  const assessment = getAssessment({ percentVal: percent });

  // Determine final animal display (single deterministic answer guaranteed using above rules)
  let finalAnimalKey = null;
  let finalAnimalTitle = null;
  let finalAnimalDescription = null;
  let finalPlace = "No clear match yet";
  let finalTagline = "Answer all questions to see your spirit-animal result.";

  if (selectedAnimal) {
    finalAnimalKey = selectedAnimal;
    const animalData = quizData.animals[finalAnimalKey];
    finalAnimalTitle = animalData?.title || finalAnimalKey;
    finalAnimalDescription = animalData?.description || "";
    finalPlace = finalAnimalTitle;
    finalTagline =
      percent >= 65
        ? "Congrats — your behaviors suggest a strong alignment. Explore nature and reflective practices to meet your spirit guide."
        : "This quiz suggests more reflection is helpful. Spend time in nature, journaling, or guided practice to explore your spirit animal.";
  }

  // For UI summary values: keep 'sum' and 'max' style but use topCount and questions.length
  const sum = topCount;
  const max = questions.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allAnswered) return;
    setSubmitted(true);
    setTimeout(() => {
      const resultsEl = document.getElementById("hoh-results");
      if (resultsEl) resultsEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  };

  const handleReset = () => {
    setAnswers(initialAnswers);
    setSubmitted(false);
    if (quizRef.current) quizRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleStart = () => {
    if (quizRef.current) quizRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyJSON = async () => {
    try {
      const payload = {
        answers,
        counts,
        positions,
        topAnimals,
        topCount,
        totalQuestions: questions.length,
        totalAnswered,
        percent,
        finalAnimalKey,
        finalPlace
      };
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    } catch (err) {
      // ignore clipboard errors
    }
  };

  // JSON-LD (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Find your real animal spirit for free — Self-reflection quiz",
    description:
      "Find your real animal spirit for free — A quick introspective quiz to help you reflect on traits and habits that align with spirit animals. Honest scoring and practical suggestions to explore your spirit guide.",
    url: typeof window !== "undefined" ? window.location.href : ""
  };

  return (
    <div ref={topRef} className="min-h-screen" style={{ background: "#0e0f23" }}>
      <Helmet>
        <title>Find your real animal spirit for free — Take the spirit animal quiz</title>
        <meta
          name="description"
          content="Find your real animal spirit for free. Take this introspective spirit-animal quiz to learn traits that align with spirit animals and discover practical next steps."
        />
        <meta
          name="keywords"
          content="find my animal spirit, how to find my animal spirit, find my animal spirit free, find my spirit animal quiz, how do i find my animal spirit guide"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="max-w-4xl mx-auto text-white px-4 pt-24 sm:pt-32 pb-12">
        {/* SEO article */}
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Find your real animal spirit for free
          </h1>

          <p className="text-base sm:text-lg max-w-3xl mt-4 text-gray-300">
            Curious how to find your animal spirit? This free, thoughtful quiz helps you reflect on traits and daily habits
            that often point toward a spirit-animal guide. Many people search phrases like <strong>"find my animal spirit"</strong> or
            <strong> "how to find my animal spirit"</strong>; this page is designed to be helpful and discoverable for those queries.
            It uses ten behavior-focused questions and a transparent tally system to suggest which animal best matches your patterns.
            <strong> This is a reflective tool, not a definitive spiritual diagnosis.</strong>
          </p>

          <h2 className="mt-6 text-2xl font-semibold">What this quiz measures</h2>
          <p className="text-gray-300">
            The quiz focuses on observable behaviors — courage, compassion, patience, protectiveness, curiosity, and consistency of action.
            Rather than claiming to name a single spirit animal definitively, it helps you see which qualities you naturally express; those qualities can guide
            further exploration into spirit-animal practices.
          </p>

          <section className="mt-6 bg-gradient-to-r from-white/5 to-white/2 p-6 rounded-2xl border border-white/5">
            <h4 className="font-semibold">How it works — quick overview</h4>
            <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
              <li>Answer ten relatable multiple-choice questions honestly (A–D).</li>
              <li>Each option maps to a spirit animal; the tool tallies your answers to find the strongest match.</li>
              <li>The UI shows a final animal (resolved deterministically) and provides practical next steps to explore your connection further.</li>
            </ul>
          </section>

          <h3 className="mt-6 text-lg font-medium">Tips for honest exploration</h3>
          <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
            <li>Answer candidly — authenticity yields the most useful reflection.</li>
            <li>Combine results with time in nature, journaling, or guided spirit-animal practice to learn more.</li>
            <li>If you want a deeper, personalized reading, seek a teacher experienced in the tradition you trust.</li>
          </ul>
        </article>

        {/* Quiz section */}
        <section
          ref={quizRef}
          id="quiz-section"
          className="mt-10 bg-white/5 rounded-2xl p-6 border border-white/6 shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Take the Quiz</h2>

          <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="quiz-section">
            <ol className="list-decimal list-inside space-y-6">
              {questions.map((q, idx) => (
                <li key={q.id} className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <label htmlFor={q.id} className="block font-medium text-white">
                        {idx + 1}. {q.text}
                      </label>
                    </div>
                    <div className="text-xs text-gray-400">Selected: {answers[q.id] || "—"}</div>
                  </div>

                  <fieldset className="flex gap-3 flex-wrap mt-2" aria-labelledby={q.id}>
                    {optionLabels.map((label) => {
                      const opt = q.options[label];
                      if (!opt) return null;
                      return (
                        <label
                          key={label}
                          className="inline-flex flex-col items-start gap-1 bg-white/3 px-3 py-2 rounded-lg cursor-pointer max-w-md"
                          style={{ minWidth: 160 }}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={q.id}
                              value={label}
                              checked={answers[q.id] === label}
                              onChange={(e) => handleChange(q.id, e.target.value)}
                              className="focus:ring-2 focus:ring-offset-1 rounded text-indigo-600"
                              aria-label={`${label} - ${opt.text}`}
                            />
                            <span className="text-sm text-gray-200 font-medium">{label}.</span>
                            <span className="text-sm text-gray-200 ml-2">{opt.text}</span>
                          </div>
                          <div className="text-xs text-gray-300 italic ml-7">— {opt.animal}</div>
                        </label>
                      );
                    })}
                  </fieldset>
                </li>
              ))}
            </ol>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!allAnswered}
                  className={`px-4 py-2 rounded-md font-medium ${
                    allAnswered ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-700 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  Evaluate
                </button>

                <button type="button" onClick={handleReset} className="px-3 py-2 rounded-md border border-gray-600 text-sm text-gray-200">
                  Reset
                </button>
              </div>

              <div className="text-sm text-gray-300">
                Progress: {Object.values(answers).filter((v) => v !== "").length}/{questions.length}
              </div>
            </div>
          </form>
        </section>

        {/* Results */}
        {submitted && (
          <section id="hoh-results" className="mt-8 p-6 rounded-2xl border border-white/6 bg-white/4 shadow">
            <div className={`p-4 rounded-lg ${assessment.color}`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">Assessment — {assessment.verdict}</h3>
                  <p className="mt-1 text-sm text-gray-700">{assessment.title}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-600">Top matches</div>
                  <div className="text-2xl font-bold">{sum} / {max}</div>
                  <div className="text-sm text-gray-600">{percent}%</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Spirit animal result</div>
                  <div className="text-2xl font-extrabold mt-1">{finalPlace}</div>
                  <div className="text-sm mt-2 text-gray-700">{finalAnimalDescription}</div>
                  <div className="text-sm mt-2 text-gray-600 italic">{finalTagline}</div>
                </div>

                <div className="sm:col-span-2">
                  <div className="text-xs text-gray-500">Breakdown — your selected options</div>
                  <ul className="mt-2 text-sm list-disc list-inside text-gray-700 max-h-52 overflow-auto">
                    {questions.map((q) => {
                      const sel = answers[q.id];
                      const optText = sel && q.options[sel] ? q.options[sel].text : "—";
                      const optAnimal = sel && q.options[sel] ? q.options[sel].animal : "—";
                      return (
                        <li key={q.id} className="mb-1">
                          <span className="font-medium text-gray-800">{q.text}</span>
                          <div className="text-xs text-gray-600 ml-0">Choice: <strong>{sel || "—"}</strong> — {optText} <span className="italic">({optAnimal})</span></div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={() => window.print()} className="px-3 py-2 rounded bg-white/90 text-sm">
                  Print
                </button>
                <button onClick={copyJSON} className="px-3 py-2 rounded bg-white/90 text-sm">
                  Copy result (JSON)
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-300">
              Tip: This evaluation uses a transparent tallying method. Spirit-animal traditions vary widely — consult a teacher or guide in the tradition
              you follow for personalized interpretation.
            </p>
          </section>
        )}

        {/* Footer suggestion / CTA */}
        <section className="mt-8 text-sm text-gray-400">
          <p>
            Want to embed this quiz on another page or customize the thresholds? I can adapt the logic (weighted questions,
            social share, or save-to-user accounts) — tell me how you want it to behave.
          </p>
        </section>
      </main>
    </div>
  );
}
