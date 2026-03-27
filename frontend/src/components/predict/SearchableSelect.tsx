"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    options: string[];
    value: string;
    placeholder: string;
    onChange: (val: string) => void;
}

export default function SearchableSelect({ options, value, placeholder, onChange }: Props) {
    const [query, setQuery] = useState(value);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync display when value changes externally
    useEffect(() => { setQuery(value); }, [value]);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
                // If nothing selected, clear the partial query
                if (!options.includes(query)) setQuery(value);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [query, value, options]);

    const filtered = options.filter((o) =>
        o.toLowerCase().includes(query.toLowerCase())
    );

    const select = (opt: string) => {
        onChange(opt);
        setQuery(opt);
        setOpen(false);
    };

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Input */}
            <input
                type="text"
                value={query}
                placeholder={placeholder}
                autoFocus
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                    // Clear parent value if user edits away from selection
                    if (e.target.value !== value) onChange("");
                }}
                onFocus={() => setOpen(true)}
                className="w-full bg-transparent border-b border-[#2a2421]/20 dark:border-white/20 focus:border-[#2a2421]/60 dark:focus:border-white/60 outline-none text-[#2a2421]/90 dark:text-white/90 text-2xl font-light py-3 placeholder-black/20 dark:placeholder-white/20 transition-colors duration-300"
            />

            {/* Dropdown arrow */}
            <span className="absolute right-0 top-4 text-[#2a2421]/30 dark:text-white/20 pointer-events-none text-sm">▾</span>

            {/* Dropdown list */}
            <AnimatePresence>
                {open && filtered.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-2 w-full z-50 rounded-xl border border-[#2a2421]/10 dark:border-white/10 bg-[#eedfc8] dark:bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-2xl max-h-64 overflow-y-auto"
                    >
                        {filtered.map((opt) => (
                            <li
                                key={opt}
                                onClick={() => select(opt)}
                                className={`px-5 py-3 text-base font-light cursor-pointer transition-colors duration-150 ${opt === value
                                        ? "bg-[#2a2421]/[0.08] dark:bg-white/[0.08] text-[#2a2421]/95 dark:text-white/95"
                                        : "text-[#2a2421]/50 dark:text-white/50 hover:bg-[#2a2421]/[0.05] dark:hover:bg-white/[0.05] hover:text-[#2a2421]/80 dark:hover:text-white/80"
                                    }`}
                            >
                                {opt}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
