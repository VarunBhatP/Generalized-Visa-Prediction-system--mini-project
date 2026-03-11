"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Step {
    title: string;
    description: ReactNode;
    stats: { label: string; value: string }[];
    svg: ReactNode;
}

const steps: Step[] = [
    {
        title: "Data Intake",
        description: (
            <>
                Securely aggregate demographics and{" "}
                <span className="text-white/70">travel history</span>. Ideal for{" "}
                <span className="text-white/70">financial verification</span> and
                unpredictable profile mapping.
            </>
        ),
        stats: [
            { label: "Input Sources", value: "50+ Data Points" },
            { label: "Processing", value: "Real-time" },
            { label: "Accuracy", value: "99.2% Verified" },
        ],
        svg: (
            <svg viewBox="0 0 120 120" className="w-28 h-28" fill="none" stroke="white" strokeWidth="1" opacity="0.25">
                <ellipse cx="60" cy="60" rx="22" ry="40" />
                <ellipse cx="60" cy="60" rx="22" ry="40" transform="rotate(60 60 60)" />
                <ellipse cx="60" cy="60" rx="22" ry="40" transform="rotate(120 60 60)" />
                <circle cx="60" cy="60" r="3" fill="#06b6d4" stroke="none" />
                <line x1="60" y1="19" x2="60" y2="26" strokeWidth="2" />
                <line x1="60" y1="94" x2="60" y2="101" strokeWidth="2" />
            </svg>
        ),
    },
    {
        title: "AI Analysis",
        description: (
            <>
                Leverages deep pattern matching across historical data to provide a{" "}
                <span className="text-white/70">generalized prediction score</span>{" "}
                with targeted insights. Engineered for{" "}
                <span className="text-white/70">stable, reliable results</span>.
            </>
        ),
        stats: [
            { label: "Model Type", value: "Ensemble ML" },
            { label: "Training Data", value: "500K+ Records" },
            { label: "Score Range", value: "65-87% Confidence" },
        ],
        svg: (
            <svg viewBox="0 0 120 120" className="w-28 h-28" fill="none" stroke="white" strokeWidth="1" opacity="0.25">
                <rect x="28" y="28" width="64" height="64" />
                <rect x="42" y="42" width="36" height="36" />
                <circle cx="60" cy="60" r="5" fill="#06b6d4" stroke="none" fillOpacity="0.6" />
                <line x1="28" y1="28" x2="42" y2="42" />
                <line x1="92" y1="28" x2="78" y2="42" />
                <line x1="28" y1="92" x2="42" y2="78" />
                <line x1="92" y1="92" x2="78" y2="78" />
            </svg>
        ),
    },
    {
        title: "The Verdict",
        description: (
            <>
                Distributed across{" "}
                <span className="text-white/70">multiple result categories</span>.
                Programmatic scoring shifts emphasis across key factors for{" "}
                <span className="text-white/70">peak accuracy</span>.
            </>
        ),
        stats: [
            { label: "Output", value: "Dynamic" },
            { label: "Availability", value: "Instant Report" },
            { label: "Efficiency", value: "98.2% Adaptive" },
        ],
        svg: (
            <svg viewBox="0 0 120 120" className="w-28 h-28" fill="none" stroke="white" strokeWidth="1" opacity="0.25">
                <circle cx="40" cy="42" r="16" />
                <circle cx="80" cy="42" r="10" />
                <circle cx="40" cy="80" r="10" />
                <circle cx="80" cy="80" r="16" />
                <text x="36" y="46" fontSize="9" fill="white" stroke="none" fontFamily="monospace" opacity="0.5">x</text>
                <text x="76" y="46" fontSize="9" fill="white" stroke="none" fontFamily="monospace" opacity="0.5">x</text>
                <text x="76" y="84" fontSize="9" fill="white" stroke="none" fontFamily="monospace" opacity="0.5">x</text>
                <text x="36" y="84" fontSize="9" fill="white" stroke="none" fontFamily="monospace" opacity="0.5">x</text>
            </svg>
        ),
    },
];

export default function HowItWorks() {
    return (
        <section className="w-full bg-[#0a0a0a] pt-20">
            {/* Section Heading */}
            <div className="px-8 md:px-12 lg:px-20 pt-20 pb-12">
                <p className="text-xs tracking-widest uppercase text-white/25 mb-4 font-medium font-mono">The Intelligence Engine</p>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white/95">
                    How we predict <br />
                    your approval rate.
                </h2>
            </div>

            {/* 3-Column Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-t border-white/10">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="flex flex-col px-8 pt-12 pb-0"
                    >
                        {/* SVG Illustration */}
                        <div className="mb-10 opacity-70">{step.svg}</div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-light text-white mb-4 tracking-tight">
                            {step.title}
                        </h2>

                        {/* Description */}
                        <p className="text-sm text-white/45 leading-relaxed mb-10 font-light">
                            {step.description}
                        </p>

                        {/* Stats at bottom */}
                        <div className="mt-auto border-t border-white/10 py-6">
                            {step.stats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center py-3 border-b border-white/5"
                                >
                                    <span className="text-[10px] tracking-widest uppercase text-white/20 font-mono">
                                        {stat.label}
                                    </span>
                                    <span className="text-[10px] tracking-widest uppercase text-white/40 font-mono">
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                            {/* Bottom green accent line matching reference */}
                            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#06b6d4]/30 to-transparent mt-2 mb-0" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
