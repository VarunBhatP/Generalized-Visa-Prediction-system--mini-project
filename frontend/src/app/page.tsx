"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HowItWorks from "@/components/HowItWorks";
import RankingFactors from "@/components/RankingFactors";

// Dynamic import for the interactive background globe
const InteractiveGlobe = dynamic(() => import("@/components/InteractiveGlobe"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative h-screen w-full bg-[#0a0a0a] text-[#f4f4f5] font-sans selection:bg-white/20 overflow-y-auto overflow-x-hidden">
      {/* 3D Background Globe */}
      <div className="absolute top-0 right-[-30%] w-[100%] h-screen flex items-center justify-end z-0 pointer-events-auto transform scale-[1.5] translate-y-[15%]">
        <InteractiveGlobe />
      </div>

      {/* Cinematic Overlays to mimic the lighting in the image */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      {/* UI Content Layer */}
      <div className="relative z-20 flex flex-col h-screen w-full px-6 py-8 md:px-12 lg:px-20 pointer-events-none">

        {/* Navigation Layer */}
        <nav className="flex flex-wrap items-center justify-between w-full pointer-events-auto">
          {/* Logo */}
          <div className="text-xl md:text-2xl font-light tracking-tight w-full md:w-auto mb-4 md:mb-0">
            GlobalVisa<sup className="text-[10px] ml-0.5">®</sup>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-12 lg:space-x-20 text-xs md:text-sm tracking-widest text-[#a1a1aa] items-center">
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <a href="/predict" className="hover:text-white transition-colors">Predict</a>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <a href="#ranking-factors" className="hover:text-white transition-colors">Key Factors</a>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
          </div>

          {/* CTA */}
          <a
            href="/predict"
            className="px-6 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all text-xs tracking-widest uppercase text-white/90 shadow-2xl"
          >
            Start Assessment
          </a>
        </nav>

        {/* Hero Typography */}
        <div className="flex-1 flex flex-col justify-center mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="max-w-4xl"
          >
            <p className="text-sm md:text-base tracking-wide text-white/50 mb-6 font-light pointer-events-auto cursor-default">
              Advanced predictive modeling for global mobility.
            </p>
            <h1 className="text-[3.5rem] leading-[1.1] md:text-7xl lg:text-[7.5rem] lg:leading-[1.05] font-medium tracking-tight text-white/95 pointer-events-auto cursor-default">
              Know<br /> your odds.<br />
              Before you apply.
            </h1>
          </motion.div>
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end w-full pb-2 md:pb-6"
        >
          {/* Paragraph */}
          <div className="max-w-sm pointer-events-auto border-l border-white/10 pl-6 mb-8 md:mb-0">
            <p className="text-sm text-[#82828b] leading-relaxed font-light">
              We replace uncertainty with data. By analyzing global travel patterns,
              financial requirements, and historical approval rates, we
              illuminate your path across borders.
            </p>
          </div>

        </motion.div>
      </div>

      {/* Sections Below Hero */}
      <div className="relative z-30 bg-[#0a0a0a] w-full">
        <div id="how-it-works"><HowItWorks /></div>
        <div id="ranking-factors"><RankingFactors /></div>
      </div>
    </main>
  );
}
