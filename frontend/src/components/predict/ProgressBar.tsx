"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const pct = Math.round((current / total) * 100);

    return (
        <div className="w-full h-[3px] bg-[#2a2421]/5 dark:bg-white/5 relative overflow-hidden">
            <motion.div
                className="absolute left-0 top-0 h-full"
                style={{
                    background: "linear-gradient(to right, #34d068ff, #099a04ff)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            {/* Glowing tip */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#037e11] blur-[4px] opacity-80"
                animate={{ left: `calc(${pct}% - 6px)` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>
    );
}
