"use client";

import { motion } from "framer-motion";

interface ResultCardProps {
    score: number; // 0–100
    insights: string[];
    onRestart: () => void;
}

export default function ResultCard({ score, insights, onRestart }: ResultCardProps) {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (score / 100) * circumference;

    const color = score >= 70 ? "#10b981" : score >= 45 ? "#f59e0b" : "#ef4444";
    const label = score >= 70 ? "High Approval Probability" : score >= 45 ? "Moderate Chance" : "Low Probability";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto flex flex-col items-center text-center"
        >
            {/* Ring */}
            <div className="relative mb-8">
                <svg width="180" height="180" viewBox="0 0 180 180">
                    {/* Track */}
                    <circle cx="90" cy="90" r={radius} fill="none" className="stroke-[#2a2421]/5 dark:stroke-white/5" strokeWidth="8" />
                    {/* Progress */}
                    <motion.circle
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: dashOffset }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                        transform="rotate(-90 90 90)"
                    />
                </svg>
                {/* Score text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        className="text-4xl font-medium text-[#2a2421]/95 dark:text-white/95"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        {score}%
                    </motion.span>
                </div>
            </div>

            {/* Label */}
            <p className="text-sm tracking-widest uppercase mb-3 font-medium" style={{ color }}>
                {label}
            </p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#2a2421]/95 dark:text-white/95 mb-10">
                Your Prediction Score
            </h2>

            {/* Insights */}
            <div className="w-full flex flex-col gap-3 mb-12">
                {insights.map((insight, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#2a2421]/[0.03] dark:bg-white/[0.03] border border-[#2a2421]/5 dark:border-white/5 text-left"
                    >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                        <span className="text-sm text-[#2a2421]/60 dark:text-white/60 font-light">{insight}</span>
                    </motion.div>
                ))}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onRestart}
                    className="px-8 py-3 rounded-full border border-[#2a2421]/20 dark:border-white/20 bg-[#2a2421]/5 dark:bg-white/5 backdrop-blur-md hover:bg-[#2a2421]/10 dark:hover:bg-white/10 hover:border-[#2a2421]/40 dark:hover:border-white/40 transition-all text-sm tracking-widest uppercase text-[#2a2421]/90 dark:text-white/90"
                >
                    Start Over
                </button>
                <a
                    href="/"
                    className="px-8 py-3 rounded-full border border-[#2a2421]/10 dark:border-white/10 text-[#2a2421]/40 dark:text-white/30 hover:text-[#2a2421]/70 dark:hover:text-white/60 hover:border-[#2a2421]/20 dark:hover:border-white/20 transition-all text-sm tracking-widest uppercase"
                >
                    ← Home
                </a>
            </div>
        </motion.div>
    );
}
