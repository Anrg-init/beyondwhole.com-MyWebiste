// DeathCalculator.jsx
import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";

/**
 * DeathCalculator.jsx
 *
 * Enhanced realism:
 * - live countdown to estimated date
 * - health score (0-100) and gauge
 * - milestone timeline (retirement, midlife, last-decade)
 * - deterministic Report ID and "AI model" header
 * - save/restore and download/print options
 *
 * IMPORTANT: This is an entertainment/reflection tool (disclaimer accessible via the info button).
 */

export default function DeathCalculator() {
  const bgUrl = "https://images.pexels.com/photos/2747893/pexels-photo-2747893.jpeg";
  const formRef = useRef(null);

  // form inputs
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("unspecified");
  const [smoker, setSmoker] = useState(false);
  const [drinks, setDrinks] = useState("none");
  const [exercise, setExercise] = useState("sometimes");
  const [sleepHours, setSleepHours] = useState(7);
  const [stressLevel, setStressLevel] = useState(3);
  const [chronic, setChronic] = useState(false);

  // UI & result
  const [result, setResult] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [savedResultAvailable, setSavedResultAvailable] = useState(false);

  // small constants
  const MODEL_NAME = "MortCalc AI v1.2";

  useEffect(() => {
    const saved = localStorage.getItem("dc_last_result");
    setSavedResultAvailable(!!saved);
    window.scrollTo(0, 0);
  }, []);

  // utility: add years keeping month/day (handles Feb 29)
  const addYears = (date, years) => {
    const d = new Date(date.getTime());
    const target = d.getFullYear() + years;
    d.setFullYear(target);
    // adjust if month changed (leap-year case)
    if (d.getMonth() !== new Date(date.getTime()).getMonth()) d.setDate(0);
    return d;
  };

  // deterministic small hash for name & date -> number
  const smallHash = (s) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  };

  // compute health score 0..100 (fictional but plausible)
  const computeHealthScore = ({ smoker, drinks, exercise, sleepHours, stressLevel, chronic }) => {
    let score = 60; // baseline
    if (smoker) score -= 20;
    if (drinks === "moderate") score -= 3;
    if (drinks === "heavy") score -= 8;
    if (exercise === "never") score -= 6;
    if (exercise === "sometimes") score -= 1;
    if (exercise === "regular") score += 4;
    if (exercise === "daily") score += 8;
    if (sleepHours < 5) score -= 7;
    else if (sleepHours >= 5 && sleepHours < 7) score -= 2;
    else if (sleepHours >= 7 && sleepHours <= 9) score += 3;
    else if (sleepHours > 9) score -= 2;
    // stress weight
    score -= Math.round(stressLevel * 1.5);
    if (chronic) score -= 12;
    // clamp
    score = Math.max(0, Math.min(100, score));
    return score;
  };

  // main estimator (keeps previous deterministic logic, improved a bit)
  const calculateEstimate = () => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return null;

    // baseline life expectancy
    let baseline = 80;
    let modifier = 0;

    if (gender === "female") modifier += 3;
    if (gender === "male") modifier += 0;

    if (smoker) modifier -= 9;
    if (drinks === "moderate") modifier -= 2;
    if (drinks === "heavy") modifier -= 5;

    if (exercise === "never") modifier -= 5;
    if (exercise === "sometimes") modifier += 0;
    if (exercise === "regular") modifier += 3;
    if (exercise === "daily") modifier += 5;

    if (sleepHours < 5) modifier -= 5;
    else if (sleepHours >= 5 && sleepHours < 7) modifier -= 1;
    else if (sleepHours >= 7 && sleepHours <= 9) modifier += 2;
    else if (sleepHours > 9) modifier -= 1;

    modifier += Math.round((3 - stressLevel) * 0.45);
    if (chronic) modifier -= 11;

    // deterministic name tweak (-2..+2)
    let nameOffset = 0;
    if (name && name.trim()) {
      const h = smallHash(`${name}|${birthDate}`);
      nameOffset = (h % 5) - 2; // -2..+2
      modifier += nameOffset;
    }

    // final years
    let estimatedYears = Math.round(baseline + modifier);
    estimatedYears = Math.max(18, Math.min(120, estimatedYears));

    // death date (precise)
    const deathDateRaw = addYears(birth, estimatedYears);

    // deterministic time-of-day
    const seed = smallHash(`${name}|${birthDate}|${gender}`);
    const secondsOfDay = seed % 86400;
    const hours = Math.floor(secondsOfDay / 3600);
    const minutes = Math.floor((secondsOfDay % 3600) / 60);
    const deathDate = new Date(deathDateRaw.getTime());
    deathDate.setHours(hours, minutes, 0, 0);

    // health score
    const healthScore = computeHealthScore({ smoker, drinks, exercise, sleepHours, stressLevel, chronic });

    // derived metrics
    const now = new Date();
    const msRemaining = Math.max(0, deathDate.getTime() - now.getTime());
    const daysRemaining = Math.floor(msRemaining / (1000 * 60 * 60 * 24));
    const yearsRemaining = (msRemaining / (1000 * 60 * 60 * 24 * 365)).toFixed(2);
    const ageNowYears = ((now - birth) / (1000 * 60 * 60 * 24 * 365)).toFixed(22);
    const lifePercentUsed = Math.min(100, Math.round((ageNowYears / estimatedYears) * 100));

    // milestones
    const retirementAge = 65;
    const retirementDate = addYears(birth, retirementAge);
    const midlifeAge = Math.round(estimatedYears / 2);
    const midlifeDate = addYears(birth, midlifeAge);
    const lastDecadeStart = addYears(birth, Math.max(0, estimatedYears - 10));

    // report id
    const reportSeed = smallHash(`${name}|${birthDate}|${Date.now()}`);
    const reportId = `MC-${String(reportSeed).slice(0, 6)}`;

    // confidence (fictional, inversely to modifier magnitude and uncertainty)
    const uncertainty = Math.abs(modifier);
    const confidence = Math.max(10, 100 - Math.min(80, Math.round(uncertainty * 5)));

    return {
      birth,
      deathDate,
      estimatedYears,
      daysRemaining,
      yearsRemaining,
      ageNowYears,
      lifePercentUsed,
      retirementAge,
      retirementDate,
      midlifeAge,
      midlifeDate,
      lastDecadeStart,
      healthScore,
      reportId,
      confidence
    };
  };

  // live countdown updater
  useEffect(() => {
    if (!result) {
      setCountdown(null);
      return;
    }
    const tick = () => {
      const now = new Date().getTime();
      const target = result.deathDate.getTime();
      let delta = Math.max(0, target - now);
      const years = Math.floor(delta / (1000 * 60 * 60 * 24 * 365));
      delta -= years * (1000 * 60 * 60 * 24 * 365);
      const days = Math.floor(delta / (1000 * 60 * 60 * 24));
      delta -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(delta / (1000 * 60 * 60));
      delta -= hours * (1000 * 60 * 60);
      const minutes = Math.floor(delta / (1000 * 60 * 60));
      delta -= minutes * (1000 * 60 * 60);
      const seconds = Math.floor(delta / 1000);
      setCountdown({ years, days, hours, minutes, seconds });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [result]);

  const handleCalculate = (e) => {
    e && e.preventDefault();
    const r = calculateEstimate();
    setResult(r);
    if (r) {
      try {
        localStorage.setItem(
          "dc_last_result",
          JSON.stringify({
            ts: Date.now(),
            name,
            birthDate,
            reportId: r.reportId,
            deathISO: r.deathDate.toISOString()
          })
        );
        setSavedResultAvailable(true);
      } catch (err) {}
    }
    setTimeout(() => {
      const el = document.getElementById("dc-result");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  const handleReset = () => {
    setName("");
    setBirthDate("");
    setGender("unspecified");
    setSmoker(false);
    setDrinks("none");
    setExercise("sometimes");
    setSleepHours(7);
    setStressLevel(3);
    setChronic(false);
    setResult(null);
    setCountdown(null);
    if (formRef.current) formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyResult = async () => {
    if (!result) return;
    const payload = {
      name,
      birthDate,
      reportId: result.reportId,
      estimatedDeathISO: result.deathDate.toISOString(),
      estimatedYears: result.estimatedYears,
      healthScore: result.healthScore,
      confidence: result.confidence
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    } catch (err) {}
  };

  const downloadSummary = () => {
    if (!result) return;
    const payload = {
      name,
      birthDate,
      reportId: result.reportId,
      estimatedDeathISO: result.deathDate.toISOString(),
      estimatedYears: result.estimatedYears,
      healthScore: result.healthScore,
      confidence: result.confidence
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(name || "anonymous").replace(/\s+/g, "_")}_mortcalc_report.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const restoreSaved = () => {
    try {
      const raw = localStorage.getItem("dc_last_result");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.name) setName(parsed.name);
      if (parsed.birthDate) setBirthDate(parsed.birthDate);
      // compute from restored inputs
      setTimeout(() => handleCalculate(), 200);
    } catch (err) {}
  };

  // input style improved contrast
  const inputClass = "mt-1 px-3 py-2 rounded-md bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300";

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <Helmet>
        <title>Accurate ai death calculator</title>
        <meta name="description" content="Accurate AI death calculator | lifespan calculator — deterministic estimate for reflection. Includes milestones, health score and live countdown." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Accurate AI death calculator | Lifespan calculator" />
        <meta property="og:description" content="Deterministic lifespan estimator for reflection — includes milestones, health score and live countdown." />
        <meta property="og:image" content={bgUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accurate AI death calculator | Lifespan calculator" />
        <meta name="twitter:description" content="Deterministic lifespan estimator for reflection — includes milestones, health score and live countdown." />
        <meta name="twitter:image" content={bgUrl} />

        {/* canonical — best-effort client-side */}
        <link rel="canonical" href={(typeof window !== 'undefined' && window.location ? window.location.href : "")} />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Accurate AI death calculator | Lifespan calculator",
          "description": "Deterministic lifespan estimator for reflection — includes milestones, health score and live countdown.",
          "url": (typeof window !== 'undefined' && window.location ? window.location.href : ""),
          "headline": "Accurate AI death calculator",
          "author": { "@type": "Organization", "name": "MortCalc" }
        })}</script>
      </Helmet>

      <div style={{ background: "linear-gradient(180deg, rgba(6,7,11,0.25), rgba(6,7,11,0.35))" }} className="min-h-screen">
        <main role="main" className="max-w-5xl mx-auto px-4 pt-36 pb-28 text-white"> {/* more top padding */}
          <header className="mb-6 flex flex-col md:flex-row items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl sm:text-5xl font-extrabold">Accurate Ai death calculator | Lifespan calculator </h1>
                <div className="text-xs px-2 py-1 rounded bg-white/10 text-gray-200">{MODEL_NAME}</div>
              </div>
              <p className="mt-2 text-sm text-gray-300 max-w-2xl">
                Enter birth details and lifestyle inputs. This estimator produces a deterministic, reproducible result with a confidence metric, health score,
                and timeline of key milestones. Use responsibly.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {savedResultAvailable && (
                <button onClick={restoreSaved} className="px-3 py-2 rounded bg-white/10 text-sm text-gray-100 border border-white/10">
                  Restore last
                </button>
              )}
            </div>
          </header>

          {/* form */}
          <section ref={formRef} className="bg-white/6 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
            <h2 className="text-xl font-semibold">Enter your details</h2>
            <form onSubmit={handleCalculate} className="mt-4 space-y-4" aria-label="Death calculator form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex flex-col text-sm">
                  <span className="text-gray-200">Name (optional)</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
                </label>

                <label className="flex flex-col text-sm">
                  <span className="text-gray-200">Birth date</span>
                  <input required type="date" value={birthDate} max={new Date().toISOString().split("T")[0]} onChange={(e) => setBirthDate(e.target.value)} className={inputClass} />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex flex-col text-sm">
                  <span className="text-gray-200">Gender (optional)</span>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputClass} style={{ appearance: "auto" }}>
                    <option value="unspecified">Unspecified</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label className="flex items-center gap-3 text-sm">
                  <input type="checkbox" checked={smoker} onChange={(e) => setSmoker(e.target.checked)} className="h-4 w-4" />
                  <div>
                    <div className="text-gray-200 text-xs">Smoker?</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 text-sm">
                  <input type="checkbox" checked={chronic} onChange={(e) => setChronic(e.target.checked)} className="h-4 w-4" />
                  <div>
                    <div className="text-gray-200 text-xs">Chronic health condition?</div>
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex flex-col text-sm">
                  <span className="text-gray-200">Drinking</span>
                  <select value={drinks} onChange={(e) => setDrinks(e.target.value)} className={inputClass} style={{ appearance: "auto" }}>
                    <option value="none">None</option>
                    <option value="occasional">Occasional</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </label>

                <label className="flex flex-col text-sm">
                  <span className="text-gray-200">Exercise</span>
                  <select value={exercise} onChange={(e) => setExercise(e.target.value)} className={inputClass} style={{ appearance: "auto" }}>
                    <option value="never">Never</option>
                    <option value="sometimes">Sometimes</option>
                    <option value="regular">Regular</option>
                    <option value="daily">Daily</option>
                  </select>
                </label>

                <label className="flex flex-col text-sm">
                  <span className="text-gray-200">Sleep hours (avg)</span>
                  <input type="number" min="0" max="20" value={sleepHours} onChange={(e) => setSleepHours(Number(e.target.value))} className={inputClass} />
                </label>
              </div>

              <div>
                <label className="flex flex-col text-sm">
                  <span className="text-gray-200">Stress level (0 — calm, 10 — extreme)</span>
                  <input type="range" min="0" max="10" value={stressLevel} onChange={(e) => setStressLevel(Number(e.target.value))} className="mt-2 w-full" />
                  <div className="text-xs text-gray-300 mt-1">Current: {stressLevel}</div>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button type="submit" className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 font-semibold">Reveal estimated date</button>
                <button type="button" onClick={handleReset} className="px-4 py-2 rounded-full border border-white/20 text-sm">Reset</button>
                <button type="button" onClick={() => { const preview = calculateEstimate(); setResult(preview); }} className="px-3 py-2 rounded-full border border-white/10 text-sm text-gray-100">Quick preview</button>
                <div className="ml-auto text-sm text-gray-300">Deterministic • Reproducible</div>
              </div>
            </form>
          </section>

          {/* Result */}
          {result && (
            <section id="dc-result" className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* main card */}
              <div className="lg:col-span-2 bg-white/6 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">Your estimated date</h2>
                    <div className="mt-1 text-sm text-gray-300">Report ID: <span className="font-mono">{result.reportId}</span></div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-400">Confidence</div>
                    <div className="w-44 h-6 bg-white/10 rounded-full mt-1 overflow-hidden">
                      <div style={{ width: `${result.confidence}%` }} className={`h-full ${result.confidence >= 65 ? "bg-green-400" : result.confidence >= 40 ? "bg-amber-400" : "bg-red-400"}`} />
                    </div>
                    <div className="text-sm text-gray-300 mt-1">{result.confidence}%</div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-400">Name</div>
                    <div className="text-lg font-medium">{name || "Anonymous"}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400">Birth date</div>
                    <div className="text-lg font-medium">{new Date(birthDate).toDateString()}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400">Estimated death</div>
                    <div className="text-2xl font-extrabold">{result.deathDate.toDateString()} — {String(result.deathDate.getHours()).padStart(2,"0")}:{String(result.deathDate.getMinutes()).padStart(2,"0")}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400">Estimated lifespan</div>
                    <div className="text-lg font-medium">{result.estimatedYears} years</div>
                  </div>
                </div>

                {/* Countdown */}
                <div className="mt-6">
                  <div className="text-xs text-gray-400">Live countdown</div>
                  <div className="mt-2 text-2xl font-bold">
                    {countdown ? (
                      <span>{countdown.years}y • {countdown.days}d • {String(countdown.hours).padStart(2,"0")}:{String(countdown.minutes).padStart(2,"0")}:{String(countdown.seconds).padStart(2,"0")}</span>
                    ) : (
                      <span>Calculating…</span>
                    )}
                  </div>
                </div>

                {/* life progress */}
                <div className="mt-6">
                  <div className="text-xs text-gray-400">Life progress</div>
                  <div className="w-full bg-white/10 h-4 rounded-full mt-2 overflow-hidden">
                    <div style={{ width: `${result.lifePercentUsed}%` }} className="h-full bg-indigo-500 transition-all" />
                  </div>
                  <div className="flex justify-between text-xs text-gray-300 mt-2">
                    <span>{result.lifePercentUsed}% used</span>
                    <span>{result.yearsRemaining} years left</span>
                  </div>
                </div>

                {/* milestones */}
                <div className="mt-6">
                  <h3 className="font-semibold">Milestones</h3>
                  <ul className="mt-2 text-sm text-gray-300 space-y-2">
                    <li><strong>Midlife ({result.midlifeAge}):</strong> {result.midlifeDate.toDateString()}</li>
                    <li><strong>Retirement ({result.retirementAge}):</strong> {result.retirementDate.toDateString()}</li>
                    <li><strong>Last decade starts:</strong> {result.lastDecadeStart.toDateString()}</li>
                  </ul>
                </div>

                <div className="mt-6 flex gap-2">
                  <button onClick={() => window.print()} className="px-3 py-2 rounded bg-white/90 text-sm">Print</button>
                  <button onClick={copyResult} className="px-3 py-2 rounded bg-white/90 text-sm">Copy result (JSON)</button>
                  <button onClick={downloadSummary} className="px-3 py-2 rounded bg-white/90 text-sm">Download summary</button>
                </div>
              </div>

              {/* right column: health & timeline cards */}
              <aside className="space-y-6">
                {/* health gauge */}
                <div className="bg-white/6 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400">Health score</div>
                      <div className="text-xl font-bold mt-1">{result.healthScore}/100</div>
                    </div>
                    <div className="w-28 h-28 flex items-center justify-center relative">
                      {/* circular gauge: simple SVG */}
                      <svg viewBox="0 0 36 36" className="w-20 h-20 transform -rotate-90">
                        <path d="M18 2a16 16 0 1 0 0 32a16 16 0 0 0 0-32" fill="none" stroke="#333" strokeWidth="3" />
                        <path
                          d="M18 2a16 16 0 1 0 0 32a16 16 0 0 0 0-32"
                          fill="none"
                          stroke={result.healthScore >= 70 ? "#16a34a" : result.healthScore >= 40 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="3"
                          strokeDasharray={`${(result.healthScore / 100) * 100} 100`}
                        />
                      </svg>
                      <div className="absolute text-sm text-gray-200 font-semibold">{Math.round(result.healthScore)}</div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-300">
                    Health score is derived from smoking, drinking, exercise, sleep, stress level, and chronic conditions.
                  </div>
                </div>

                {/* timeline card */}
                <div className="bg-white/6 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow">
                  <h4 className="font-semibold">Personal timeline</h4>
                  <div className="mt-3 text-sm text-gray-300">
                    <div className="mb-2"><strong>Born:</strong> {new Date(result.birth).toDateString()}</div>
                    <div className="mb-2"><strong>Now (age):</strong> {result.ageNowYears} years</div>
                    <div className="mb-2"><strong>Death (est):</strong> {result.deathDate.toDateString()}</div>
                  </div>

                  <div className="mt-4">
                    <svg className="w-full h-8" viewBox="0 0 100 10" preserveAspectRatio="none">
                      {/* timeline bar */}
                      <rect x="0" y="4" width="100" height="2" fill="#2d3748" />
                      <rect x="0" y="4" width={`${result.lifePercentUsed}`} height="2" fill="#7c3aed" />
                      {/* markers */}
                      <circle cx={`${Math.min(100, Math.max(0, (result.ageNowYears / result.estimatedYears) * 100))}`} cy="5" r="1.4" fill="#fff" />
                    </svg>
                    <div className="flex justify-between text-xs text-gray-300 mt-1">
                      <span>Birth</span>
                      <span>Now</span>
                      <span>Estimated end</span>
                    </div>
                  </div>
                </div>

                {/* signature card */}
                <div className="bg-white/6 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-xs text-gray-300">
                  <div><strong>{MODEL_NAME}</strong></div>
                  <div className="mt-1">Report ID: <span className="font-mono">{result.reportId}</span></div>
                  <div className="mt-1">Generated: {new Date().toLocaleString()}</div>
                  <div className="mt-2 text-xs text-gray-400">For thoughtful reflection. Use responsibly.</div>
                </div>
              </aside>
            </section>
          )}

          <footer className="mt-10 text-center text-xs text-gray-400">
             Ai death calculator — {MODEL_NAME}
          </footer>
        </main>

        
      </div>
    </div>
  );
}
