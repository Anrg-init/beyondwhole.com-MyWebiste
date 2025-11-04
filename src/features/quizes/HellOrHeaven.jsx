import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";

/**
 * HellOrHeaven.jsx
 * A responsive, SEO-friendly quiz page that asks 10 reflective questions,
 * provides a transparent score and assessment, and gives a clear "Heaven / Hell"
 * final place based on a simple threshold. Includes a long-form intro for SEO,
 * meta tags, and a JSON-LD snippet for search engines.
 *
 * NOTE: This is an introspective tool — not an authoritative theological judgement.
 */

export default function HellOrHeaven() {
  // QUESTIONS (kept relatable and practical)
  const questions = [
    {
      id: "q1",
      text: "I treat other people with kindness and respect (regardless of who they are).",
      hint: "Small acts of empathy and courtesy add up.",
    },
    {
      id: "q2",
      text: "I help people in need (donate, volunteer, assist neighbors, etc.).",
      hint: "Material help, time, or emotional support all count.",
    },
    {
      id: "q3",
      text: "I take responsibility and apologize when I’m wrong.",
      hint: "Owning mistakes and making amends matters.",
    },
    {
      id: "q4",
      text: "I speak the truth and avoid deliberate deceit.",
      hint: "Honesty even when it’s hard.",
    },
    {
      id: "q5",
      text: "I forgive people who have hurt me (I don't hold lifelong grudges).",
      hint: "Forgiveness is internal — it doesn’t mean condoning harm.",
    },
    {
      id: "q6",
      text: "I avoid harming others (physically, emotionally, or financially).",
      hint: "Includes avoiding gossip and exploitation.",
    },
    {
      id: "q7",
      text: "I practice humility and try not to act from pride or entitlement.",
      hint: "Listen more than you speak; value others.",
    },
    {
      id: "q8",
      text: "I spend time in reflection, gratitude, or prayer according to my beliefs.",
      hint: "Regular reflection helps align actions with values.",
    },
    {
      id: "q9",
      text: "I stand up for justice or speak up when I see wrongdoing.",
      hint: "Small acts of courage matter.",
    },
    {
      id: "q10",
      text: "I try to live consistently with my stated moral or religious convictions.",
      hint: "Integrity between belief and action is important.",
    },
  ];

  // radio options
  const options = [
    { value: 0, label: "Never" },
    { value: 1, label: "Rarely" },
    { value: 2, label: "Sometimes" },
    { value: 3, label: "Often" },
    { value: 4, label: "Always" },
  ];

  // initial answers: -1 means unanswered
  const initialAnswers = questions.reduce((acc, q) => {
    acc[q.id] = -1;
    return acc;
  }, {});

  const [answers, setAnswers] = useState(initialAnswers);
  const [submitted, setSubmitted] = useState(false);

  // UI refs
  const quizRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    // ensure top spacing (in case you render the page in different layouts)
    // not required but keeps focus consistent if other pages use differing nav heights
    if (topRef.current) topRef.current.scrollTop = 0;
  }, []);

  const handleChange = (id, val) => {
    setAnswers((prev) => ({ ...prev, [id]: Number(val) }));
  };

  const allAnswered = Object.values(answers).every((v) => v >= 0);

  // compute only on answered items (safe if user inspects before answering)
  const computeScore = () => {
    const answeredValues = Object.values(answers).filter((v) => v >= 0);
    const sum = answeredValues.reduce((acc, v) => acc + Number(v), 0);
    const max = questions.length * 4;
    // If not all answered, we still compute percent against full max to be transparent.
    const percent = Math.round((sum / max) * 100);
    return { sum, max, percent };
  };

  const { sum, max, percent } = computeScore();

  // old multi-tier assessment retained for helpful messaging,
  // but finalPlace is a simple two-way classification as requested:
  // >= 65% => Heaven, else => Hell
  const getAssessment = ({ sum, max, percent }) => {
    if (percent >= 85) {
      return {
        title: "Strong alignment with commonly valued virtues",
        verdict: "Highly aligned",
        advice: [
          "Keep practicing compassion and integrity.",
          "Mentor others and continue building a positive legacy.",
        ],
        color: "bg-green-50 text-green-900",
      };
    }
    if (percent >= 65) {
      return {
        title: "Generally on the right path",
        verdict: "Likely on the right path",
        advice: [
          "Identify one habit to improve (forgiveness, generosity, humility).",
          "Small daily practices compound — be consistent.",
        ],
        color: "bg-amber-50 text-amber-900",
      };
    }
    if (percent >= 40) {
      return {
        title: "Significant room for growth",
        verdict: "Needs reflection",
        advice: [
          "Reflect on areas with lowest scores and make a small plan.",
          "Consider accountability or community support.",
        ],
        color: "bg-orange-50 text-orange-900",
      };
    }
    return {
      title: "Action recommended — important opportunities to change",
      verdict: "Needs major reflection",
      advice: [
        "Speak with a community elder or counselor for guidance.",
        "Start with tiny, consistent habits: daily gratitude, one act of service/week.",
      ],
      color: "bg-red-50 text-red-900",
    };
  };

  const assessment = getAssessment({ sum, max, percent });

  // final place mapping (explicit as requested)
  const finalPlace = percent >= 65 ? "Heaven" : "Hell";
  const finalTagline =
    finalPlace === "Heaven"
      ? "Congrats — keep doing good things and continue nurturing those habits."
      : "This quiz suggests opportunities to improve. Start with small, consistent acts of kindness and accountability.";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allAnswered) return; // safety
    setSubmitted(true);
    // scroll to results for user convenience
    setTimeout(() => {
      const resultsEl = document.getElementById("hoh-results");
      if (resultsEl) resultsEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  };

  const handleReset = () => {
    setAnswers(initialAnswers);
    setSubmitted(false);
    // scroll back to top of quiz
    if (quizRef.current) quizRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleStart = () => {
    if (quizRef.current) quizRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyJSON = async () => {
    try {
      const payload = { answers, sum, max, percent, place: finalPlace };
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      // small non-intrusive feedback could be added; kept minimal here
    } catch (err) {
      // ignore; clipboard might be blocked in some browsers
      // you could fallback to a visible textarea if desired
    }
  };

  // Lightweight JSON-LD for SEO (page-level)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Am I going to Heaven or Hell? — Self-reflection quiz",
    description:
      "Am I going to Heaven or Hell? — A quick introspective quiz to help you reflect on kindness, responsibility, honesty, and more. This tool offers a transparent scoring rubric and practical suggestions for growth.",
    url: typeof window !== "undefined" ? window.location.href : "",
  };

  return (
    <div ref={topRef} className="min-h-screen" style={{ background: "#0e0f23" }}>
      <Helmet>
        <title>Am I going to Heaven or Hell? — Take the quiz to find out</title>
        <meta
          name="description"
          content="Am I going to Heaven or Hell? Take this introspective quiz: 'Will I go to heaven or will I go to hell?' — Honest, simple scoring and actionable suggestions to help you grow."
        />
        <meta
          name="keywords"
          content="will i go to heaven or hell, am i going to heaven or hell, heaven or hell quiz, will i go to heaven, will i go to hell, afterlife quiz, moral self-reflection quiz"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="max-w-4xl mx-auto text-white px-4 pt-24 sm:pt-32 pb-12">
        {/* --- REPLACED ARTICLE (SEO-OPTIMIZED LONG FORM CONTENT) --- */}
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Am I going to Heaven or Hell?
          </h1>

          <p className="text-base sm:text-lg max-w-3xl mt-4 text-gray-300">
            Wondering “<strong>I'll go to heaven or I'll go to hell?</strong>” then welcome to this quiz where you will know which place do you belong after death and it will clear your questions like  “<strong>Will I go to heaven or hell?</strong>”
            — many people ask the same question when reflecting on their life and choices. This short,
            thoughtful quiz helps you reflect on everyday actions and attitudes that many traditions
            and ethical systems value. It consists of ten clear, behavior-focused questions and a transparent
            scoring system to suggest where your habits currently align. <strong>This is a reflective tool, not
            a religious verdict.</strong>
          </p>

          <h2 className="mt-6 text-2xl font-semibold">What this quiz measures</h2>
          <p className="text-gray-300">
            The quiz emphasizes observable, practical behaviors: kindness, honesty, generosity, humility,
            responsibility, and living consistently with your stated values. Rather than evaluating private
            beliefs or specific doctrines, it asks you to consider how your everyday choices affect others and
            whether you actively practice virtues that many traditions associate with a good life.
          </p>

          <section className="mt-6 bg-gradient-to-r from-white/5 to-white/2 p-6 rounded-2xl border border-white/5">
            <h4 className="font-semibold">How it works — quick overview</h4>
            <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
              <li>Answer ten relatable questions honestly, from <em>Never</em> to <em>Always</em>.</li>
              <li>The page computes a transparent score (0–40) and converts that into a percentage.</li>
              <li>A simple threshold interprets results as <strong>Heaven</strong> or <strong>Hell</strong> for clarity in the UI; this is illustrative, not theological.</li>
            </ul>
          </section>

          <h3 className="mt-6 text-lg font-medium">Who should use this quiz?</h3>
          <p className="text-gray-300">
            Anyone curious about how daily actions line up with ethical habits can use it. It's appropriate for:
          </p>
          <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
            <li>People doing a personal inventory of habits and behavior.</li>
            <li>Those looking for practical ways to improve kindness, generosity, or integrity.</li>
            <li>Anyone wanting a non-judgmental, actionable self-check (not a doctrinal assessment).</li>
          </ul>

          <h3 className="mt-6 text-lg font-medium">Tips for honest reflection</h3>
          <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
            <li>Answer candidly — this tool only helps if you're honest with yourself.</li>
            <li>Use the suggestions at the end to choose one small habit to change.</li>
            <li>If you have theological or doctrinal questions about the afterlife, consult a trusted religious leader.</li>
          </ul>

          <p className="mt-6 text-sm text-gray-400">
            Note: For search engine optimization, make sure the page is served in a crawlable way (SSR or prerender),
            has fast load times, includes a shareable featured image (og:image), and is linked from your site's main
            navigation. These improvements help pages like this rank better for queries such as "will i go to heaven or hell".
          </p>
        </article>
        {/* --- END REPLACED ARTICLE --- */}

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
                      <p className="text-xs text-gray-400 mt-1">{q.hint}</p>
                    </div>
                    <div className="text-xs text-gray-400">Score: {answers[q.id] >= 0 ? answers[q.id] : "—"}</div>
                  </div>

                  <fieldset className="flex gap-3 flex-wrap mt-2" aria-labelledby={q.id}>
                    {options.map((opt) => (
                      <label
                        key={opt.value}
                        className="inline-flex items-center gap-2 bg-white/3 px-3 py-1 rounded-full cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.value}
                          checked={Number(answers[q.id]) === opt.value}
                          onChange={(e) => handleChange(q.id, e.target.value)}
                          className="focus:ring-2 focus:ring-offset-1 rounded text-indigo-600"
                          aria-label={`${q.text} - ${opt.label}`}
                        />
                        <span className="text-sm text-gray-200">{opt.label}</span>
                      </label>
                    ))}
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
                Progress: {Object.values(answers).filter((v) => v >= 0).length}/{questions.length}
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
                  <div className="text-xs text-gray-600">Score</div>
                  <div className="text-2xl font-bold">
                    {sum} / {max}
                  </div>
                  <div className="text-sm text-gray-600">{percent}%</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Final place (simple threshold)</div>
                  <div className="text-2xl font-extrabold mt-1">{finalPlace}</div>
                  <div className="text-sm mt-1 text-gray-600 italic">{finalTagline}</div>
                </div>

                <div className="sm:col-span-2">
                  <div className="text-xs text-gray-500">Breakdown</div>
                  <ul className="mt-2 text-sm list-disc list-inside text-gray-700 max-h-40 overflow-auto">
                    {questions.map((q) => (
                      <li key={q.id} className="mb-1">
                        <span className="font-medium text-gray-800">{q.text}</span> — <strong className="ml-1">{answers[q.id]}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-gray-500">Suggestions</div>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-800">
                  {assessment.advice.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
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
              Tip: This evaluation uses a transparent rubric. Different religious traditions and authorities define
              ultimate outcomes differently — consult a trusted leader for doctrinal questions.
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
