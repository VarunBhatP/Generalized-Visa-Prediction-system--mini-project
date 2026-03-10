"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface QuestionStepProps {
    stepIndex: number;
    label: string;
    question: string;
    children: ReactNode;
    onNext: () => void;
    onBack: () => void;
    isFirst: boolean;
    isLast: boolean;
    canProceed: boolean;
}

const variants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
};

export default function QuestionStep({
    stepIndex,
    label,
    question,
    children,
    onNext,
    onBack,
    isFirst,
    isLast,
    canProceed,
}: QuestionStepProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={stepIndex}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full max-w-2xl mx-auto flex flex-col"
            >
                {/* Step label */}
                <p className="text-sm tracking-widest uppercase text-white/30 mb-6 font-light">
                    {label}
                </p>

                {/* Question */}
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white/95 mb-10 leading-[1.1]">
                    {question}
                </h2>

                {/* Input slot */}
                <div className="mb-12">{children}</div>

                {/* Navigation — Back left, Next right */}
                <div className="flex items-center justify-between w-full">
                    {/* Back button — far left */}
                    {!isFirst ? (
                        <button
                            onClick={onBack}
                            className="text-sm tracking-widest uppercase text-white/25 hover:text-white/60 transition-colors"
                        >
                            ← Back
                        </button>
                    ) : (
                        <span />
                    )}

                    {/* Next button — far right */}
                    <button
                        onClick={onNext}
                        disabled={!canProceed}
                        className="px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all text-sm tracking-widest uppercase text-white/90 shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        {isLast ? "Get Results →" : "Next →"}
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
