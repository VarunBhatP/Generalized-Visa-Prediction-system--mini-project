"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between w-full pointer-events-auto relative z-50">
      {/* Top row: Logo + Mobile controls */}
      <div className="flex items-center justify-between w-full lg:w-auto">
        <Link href="/" className="text-xl md:text-4xl font-light tracking-tight hover:text-black/80 dark:hover:text-white/80 transition-colors text-black dark:text-white">
          GlobalVisa<sup className="text-[10px] ml-0.5">®</sup>
        </Link>
        
        {/* Mobile / Tablet controls */}
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <button aria-label="Toggle menu" onClick={() => setIsOpen(!isOpen)} className="text-black dark:text-white p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Links (Hidden on tablet and below) */}
      <div className="hidden lg:flex space-x-12 text-xs md:text-sm tracking-widest text-[#555555] dark:text-[#a1a1aa] items-center">
        <span className="w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
        <Link href="/predict" className="hover:text-black dark:hover:text-white transition-colors">Predict</Link>
        <span className="w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
        <Link href="/#how-it-works" className="hover:text-black dark:hover:text-white transition-colors">How it Works</Link>
        <span className="w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
        <Link href="/#ranking-factors" className="hover:text-black dark:hover:text-white transition-colors">Key Factors</Link>
        <span className="w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
      </div>

      {/* Desktop CTA & Toggle (Hidden on tablet and below) */}
      <div className="hidden lg:flex items-center gap-4">
        <ThemeToggle />
        <Link
          href="/predict"
          className="px-6 py-2.5 rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/40 dark:hover:border-white/40 transition-all text-sm tracking-widest uppercase text-black/90 dark:text-white/90 shadow-xl"
        >
          Start Assessment
        </Link>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full mt-6 p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-[#fdfbf7] dark:bg-[#0a0a0a] shadow-2xl flex flex-col gap-6 lg:hidden"
          >
            <Link href="/predict" onClick={() => setIsOpen(false)} className="text-sm tracking-widest uppercase text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white text-center">Predict</Link>
            <div className="w-full h-px bg-black/5 dark:bg-white/5 mx-auto" />
            <Link href="/#how-it-works" onClick={() => setIsOpen(false)} className="text-sm tracking-widest uppercase text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white text-center">How it Works</Link>
            <div className="w-full h-px bg-black/5 dark:bg-white/5 mx-auto" />
            <Link href="/#ranking-factors" onClick={() => setIsOpen(false)} className="text-sm tracking-widest uppercase text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white text-center">Key Factors</Link>
            
            <Link
              href="/predict"
              onClick={() => setIsOpen(false)}
              className="mt-6 mx-auto px-8 py-3 rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 text-sm tracking-widest uppercase text-black/90 dark:text-white/90 shadow-xl text-center"
            >
              Start Assessment
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
