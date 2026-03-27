"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/predict/ProgressBar";
import QuestionStep from "@/components/predict/QuestionStep";
import ResultCard from "@/components/predict/ResultCard";
import SearchableSelect from "@/components/predict/SearchableSelect";

import PickerCard from "@/components/predict/PickerCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
    type Answers,
    NATIONALITIES,
    DESTINATIONS,
    VISA_TYPES,
    MARITAL_STATUSES,
    EDUCATION_LABELS,
    inputClass,
    cardClass,
    cardActiveClass,
    BACKEND_URL
} from "@/app/predict/constants";

export default function PredictPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({
        nationality: "",
        destination_country: "",
        visa_type: "",
        marital_status: "",
        age: "",
        education_level: "",
        monthly_income_usd: "",
        bank_balance_usd: "",
        duration_of_stay: "",
        prev_countries_visited: "",
        prev_visa_rejections: "",
        has_return_ticket: "",
        has_criminal_record: "",
    });
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ approval_status: boolean; approval_probability: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const TOTAL = 13;

    const update = (key: keyof Answers, val: string) =>
        setAnswers((prev) => ({ ...prev, [key]: val }));

    // Check if current step has a value
    const canProceed = (() => {
        const val = Object.values(answers)[step];
        return val?.trim().length > 0;
    })();

    const handleNext = async () => {
        if (step < TOTAL - 1) {
            setStep((s) => s + 1);
        } else {
            // Final step: submit to backend
            setLoading(true);
            setError(null);
            try {
                const safeInt = (val: string, fallback = 0) => { const n = parseInt(val); return isNaN(n) ? fallback : n; };
                const safeFloat = (val: string, fallback = 0) => { const n = parseFloat(val); return isNaN(n) ? fallback : n; };

                const payload = {
                    nationality: answers.nationality,
                    destination_country: answers.destination_country,
                    visa_type: answers.visa_type,
                    marital_status: answers.marital_status,
                    age: safeInt(answers.age),
                    education_level: safeInt(answers.education_level),
                    monthly_income_usd: safeFloat(answers.monthly_income_usd),
                    bank_balance_usd: safeFloat(answers.bank_balance_usd),
                    duration_of_stay: safeInt(answers.duration_of_stay, 1),
                    prev_countries_visited: safeInt(answers.prev_countries_visited),
                    prev_visa_rejections: safeInt(answers.prev_visa_rejections),
                    has_return_ticket: answers.has_return_ticket === "Yes" ? 1 : 0,
                    has_criminal_record: answers.has_criminal_record === "Yes" ? 1 : 0,
                };

                console.log("Sending payload:", JSON.stringify(payload, null, 2));

                const res = await fetch(`${BACKEND_URL}/predict`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err?.detail || `Server error: ${res.status}`);
                }

                const data = await res.json();
                setResult(data);
                setShowResult(true);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleBack = () => setStep((s) => Math.max(0, s - 1));

    const handleRestart = () => {
        setStep(0);
        setShowResult(false);
        setResult(null);
        setError(null);
        setAnswers({
            nationality: "",
            destination_country: "",
            visa_type: "",
            marital_status: "",
            age: "",
            education_level: "",
            monthly_income_usd: "",
            bank_balance_usd: "",
            duration_of_stay: "",
            prev_countries_visited: "",
            prev_visa_rejections: "",
            has_return_ticket: "",
            has_criminal_record: "",
        });
    };

    const score = result ? Math.round(result.approval_probability * 100) : 0;

    const insights = result
        ? [
            result.approval_status
                ? "Your profile meets the approval threshold."
                : "Your profile falls below the approval threshold.",
            parseInt(answers.prev_visa_rejections) > 0
                ? `${answers.prev_visa_rejections} prior rejection(s) detected — attach supporting documentation.`
                : "No prior rejections detected — strong credibility signal.",
            parseInt(answers.prev_countries_visited) > 3
                ? "Strong travel history boosts your approval probability."
                : "Limited travel history — consider providing extra financial proof.",
            answers.has_return_ticket === "Yes"
                ? "Return ticket confirmed — reduces overstay risk assessment."
                : "No return ticket on file — consider securing one before applying.",
        ]
        : [];



    const steps = [
        {
            label: "Step 1 — Nationality",
            question: "What is your nationality?",
            input: (
                <SearchableSelect
                    options={NATIONALITIES}
                    value={answers.nationality}
                    placeholder="Type to search…"
                    onChange={(val) => update("nationality", val)}
                />
            ),
        },
        {
            label: "Step 2 — Destination",
            question: "Where do you want to travel?",
            input: (
                <SearchableSelect
                    options={DESTINATIONS}
                    value={answers.destination_country}
                    placeholder="Type to search…"
                    onChange={(val) => update("destination_country", val)}
                />
            ),
        },
        {
            label: "Step 3 — Visa Type",
            question: "What type of visa are\nyou applying for?",
            input: <PickerCard options={VISA_TYPES} value={answers.visa_type} onUpdate={(val) => update("visa_type", val)} />,
        },
        {
            label: "Step 4 — Marital Status",
            question: "What is your marital status?",
            input: <PickerCard options={MARITAL_STATUSES} value={answers.marital_status} onUpdate={(val) => update("marital_status", val)} />,
        },
        {
            label: "Step 5 — Age",
            question: "How old are you?",
            input: (
                <input
                    type="number"
                    placeholder="e.g. 28"
                    min={18}
                    max={80}
                    value={answers.age}
                    onChange={(e) => update("age", e.target.value)}
                    className={inputClass}
                    autoFocus
                />
            ),
        },
        {
            label: "Step 6 — Education",
            question: "What is your highest\neducation level?",
            input: (
                <div className="flex flex-wrap gap-3">
                    {([0, 1, 2, 3] as const).map((lvl) => (
                        <button
                            key={lvl}
                            onClick={() => update("education_level", String(lvl))}
                            className={answers.education_level === String(lvl) ? cardActiveClass : cardClass}
                        >
                            {EDUCATION_LABELS[lvl]}
                        </button>
                    ))}
                </div>
            ),
        },
        {
            label: "Step 7 — Monthly Income",
            question: "What is your monthly\nincome (USD)?",
            input: (
                <input
                    type="number"
                    placeholder="e.g. 3500"
                    min={0}
                    value={answers.monthly_income_usd}
                    onChange={(e) => update("monthly_income_usd", e.target.value)}
                    className={inputClass}
                    autoFocus
                />
            ),
        },
        {
            label: "Step 8 — Bank Balance",
            question: "What is your current\nbank balance (USD)?",
            input: (
                <input
                    type="number"
                    placeholder="e.g. 12000"
                    min={0}
                    value={answers.bank_balance_usd}
                    onChange={(e) => update("bank_balance_usd", e.target.value)}
                    className={inputClass}
                    autoFocus
                />
            ),
        },
        {
            label: "Step 9 — Duration of Stay",
            question: "How many days do you\nplan to stay?",
            input: (
                <input
                    type="number"
                    placeholder="e.g. 14"
                    min={1}
                    max={365}
                    value={answers.duration_of_stay}
                    onChange={(e) => update("duration_of_stay", e.target.value)}
                    className={inputClass}
                    autoFocus
                />
            ),
        },
        {
            label: "Step 10 — Travel History",
            question: "How many countries have\nyou visited before?",
            input: (
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => update("prev_countries_visited", String(Math.max(0, parseInt(answers.prev_countries_visited || "0") - 1)))}
                        className="w-12 h-12 rounded-full border border-[#2a2421]/20 dark:border-white/20 bg-[#2a2421]/[0.03] dark:bg-white/[0.03] text-[#2a2421]/70 dark:text-white/70 text-2xl hover:bg-[#2a2421]/[0.08] dark:hover:bg-white/[0.08] transition-all"
                    >
                        −
                    </button>
                    <span className="text-5xl font-light text-[#2a2421]/90 dark:text-white/90 w-16 text-center">
                        {answers.prev_countries_visited || "0"}
                    </span>
                    <button
                        onClick={() => update("prev_countries_visited", String(parseInt(answers.prev_countries_visited || "0") + 1))}
                        className="w-12 h-12 rounded-full border border-[#2a2421]/20 dark:border-white/20 bg-[#2a2421]/[0.03] dark:bg-white/[0.03] text-[#2a2421]/70 dark:text-white/70 text-2xl hover:bg-[#2a2421]/[0.08] dark:hover:bg-white/[0.08] transition-all"
                    >
                        +
                    </button>
                </div>
            ),
        },
        {
            label: "Step 11 — Prior Rejections",
            question: "How many visa rejections\nhave you had before?",
            input: (
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => update("prev_visa_rejections", String(Math.max(0, parseInt(answers.prev_visa_rejections || "0") - 1)))}
                        className="w-12 h-12 rounded-full border border-[#2a2421]/20 dark:border-white/20 bg-[#2a2421]/[0.03] dark:bg-white/[0.03] text-[#2a2421]/70 dark:text-white/70 text-2xl hover:bg-[#2a2421]/[0.08] dark:hover:bg-white/[0.08] transition-all"
                    >
                        −
                    </button>
                    <span className="text-5xl font-light text-[#2a2421]/90 dark:text-white/90 w-16 text-center">
                        {answers.prev_visa_rejections || "0"}
                    </span>
                    <button
                        onClick={() => update("prev_visa_rejections", String(parseInt(answers.prev_visa_rejections || "0") + 1))}
                        className="w-12 h-12 rounded-full border border-[#2a2421]/20 dark:border-white/20 bg-[#2a2421]/[0.03] dark:bg-white/[0.03] text-[#2a2421]/70 dark:text-white/70 text-2xl hover:bg-[#2a2421]/[0.08] dark:hover:bg-white/[0.08] transition-all"
                    >
                        +
                    </button>
                </div>
            ),
        },
        {
            label: "Step 12 — Return Ticket",
            question: "Do you have a\nreturn ticket booked?",
            input: (
                <div className="flex gap-4">
                    {["Yes", "No"].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => update("has_return_ticket", opt)}
                            className={`flex-1 py-5 text-lg font-light rounded-2xl border transition-all duration-300 ${answers.has_return_ticket === opt
                                ? "bg-[#2a2421]/[0.08] dark:bg-white/[0.08] border-[#2a2421]/40 dark:border-white/40 text-[#2a2421]/95 dark:text-white/95"
                                : "bg-[#2a2421]/[0.02] dark:bg-white/[0.02] border-[#2a2421]/10 dark:border-white/10 text-[#2a2421]/40 dark:text-white/40 hover:border-[#2a2421]/20 dark:hover:border-white/20"
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            ),
        },
        {
            label: "Step 13 — Criminal Record",
            question: "Do you have any\ncriminal record?",
            input: (
                <div className="flex gap-4">
                    {["Yes", "No"].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => update("has_criminal_record", opt)}
                            className={`flex-1 py-5 text-lg font-light rounded-2xl border transition-all duration-300 ${answers.has_criminal_record === opt
                                ? "bg-[#2a2421]/[0.08] dark:bg-white/[0.08] border-[#2a2421]/40 dark:border-white/40 text-[#2a2421]/95 dark:text-white/95"
                                : "bg-[#2a2421]/[0.02] dark:bg-white/[0.02] border-[#2a2421]/10 dark:border-white/10 text-[#2a2421]/40 dark:text-white/40 hover:border-[#2a2421]/20 dark:hover:border-white/20"
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            ),
        },
    ];

    // Steps 10 and 11 (0-indexed: 9 and 10) use a number stepper — 0 is a valid answer
    const isStepperStep = step === 9 || step === 10;

    return (
        <main className="relative min-h-screen w-full bg-[#fdfbf7] dark:bg-[#0a0a0a] text-[#1a1a1a] dark:text-[#f4f4f5] font-sans selection:bg-[#2a2421]/20 dark:selection:bg-white/20 flex flex-col">
            {/* Header + full-width progress bar */}
            <div className="sticky top-0 z-50 bg-[#fdfbf7]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2421]/5 dark:border-white/5">
                <div className="px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">
                    <a href="/" className="text-[#2a2421]/80 dark:text-white/70 hover:text-[#2a2421] dark:hover:text-white transition-colors text-xs tracking-widest uppercase">
                        ← Home
                    </a>
                    <div className="flex items-center gap-4">
                        <span className="text-xs tracking-widest uppercase text-[#2a2421]/70 dark:text-white/70 font-mono">
                            {showResult ? "Complete" : `Step ${step + 1} / ${TOTAL}`}
                        </span>
                        <ThemeToggle />
                    </div>
                </div>
                <ProgressBar current={showResult ? TOTAL : step + 1} total={TOTAL} />
            </div>

            {/* Main content */}
            <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-16">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-5"
                        >
                            <div className="w-12 h-12 rounded-full border-2 border-[#2a2421]/10 dark:border-white/10 border-t-[#037e11] animate-spin" />
                            <p className="text-[#2a2421]/40 dark:text-white/30 text-sm tracking-widest uppercase">Analyzing your profile…</p>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center max-w-md"
                        >
                            <p className="text-red-600/80 dark:text-red-400/80 text-sm tracking-widest uppercase mb-4">Connection Error</p>
                            <p className="text-[#2a2421]/50 dark:text-white/40 text-sm mb-8">{error}</p>
                            <p className="text-[#2a2421]/30 dark:text-white/20 text-xs mb-6">Make sure the backend is running at <code className="text-[#2a2421]/50 dark:text-white/40">{BACKEND_URL}</code></p>
                            <button
                                onClick={() => { setError(null); setLoading(false); }}
                                className="px-8 py-3 rounded-full border border-[#2a2421]/20 dark:border-white/20 bg-[#2a2421]/5 dark:bg-white/5 text-sm tracking-widest uppercase text-[#2a2421]/70 dark:text-white/70 hover:bg-[#2a2421]/10 dark:hover:bg-white/10 transition-all"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    ) : showResult && result ? (
                        <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <ResultCard score={score} insights={insights} onRestart={handleRestart} />
                        </motion.div>
                    ) : (
                        <motion.div key={`step-${step}`} className="w-full max-w-2xl">
                            <QuestionStep
                                stepIndex={step}
                                label={steps[step].label}
                                question={steps[step].question}
                                onNext={handleNext}
                                onBack={handleBack}
                                isFirst={step === 0}
                                isLast={step === TOTAL - 1}
                                canProceed={isStepperStep || canProceed}
                            >
                                {steps[step].input}
                            </QuestionStep>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
