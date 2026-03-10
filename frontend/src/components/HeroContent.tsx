"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroContent() {
    return (
        <div className="flex flex-col justify-center space-y-8 text-left z-10 w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                    Predict Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                        Global Journey
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
                    Leverage advanced data insights to predict your visa approval chances with high accuracy.
                    Navigate international borders with confidence.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <a
                    href="#predict"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-background bg-primary hover:bg-primary-dark rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300 gap-2"
                >
                    Start Prediction
                    <ArrowRight className="w-5 h-5" />
                </a>
                <a
                    href="#learn-more"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white glass-panel hover:bg-glass/80 rounded-full transition-all duration-300"
                >
                    Learn More
                </a>
            </motion.div>
        </div>
    );
}
