"use client";

import Link from "next/link";

export default function SiteHeader() {
  return (
    <nav className="flex flex-wrap items-center justify-between w-full pointer-events-auto">
      {/* Logo */}
      <Link href="/" className="text-xl md:text-2xl font-light tracking-tight w-full md:w-auto mb-4 md:mb-0 hover:text-white/80 transition-colors">
        GlobalVisa<sup className="text-[10px] ml-0.5">®</sup>
      </Link>

      {/* Links */}
      <div className="hidden md:flex space-x-12 lg:space-x-20 text-xs md:text-sm tracking-widest text-[#a1a1aa] items-center">
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <Link href="/predict" className="hover:text-white transition-colors">Predict</Link>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <Link href="/#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <Link href="/#ranking-factors" className="hover:text-white transition-colors">Key Factors</Link>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
      </div>

      {/* CTA */}
      <Link
        href="/predict"
        className="px-6 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all text-xs tracking-widest uppercase text-white/90 shadow-2xl"
      >
        Start Assessment
      </Link>
    </nav>
  );
}
