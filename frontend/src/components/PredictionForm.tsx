"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { MapPin, PlaneTakeoff, GraduationCap, Wallet, History, Calendar } from "lucide-react";

export default function PredictionForm() {
    const [isPredicting, setIsPredicting] = useState(false);
    const [result, setResult] = useState<number | null>(null);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    const handlePredict = () => {
        setIsPredicting(true);
        setResult(null);
        setTimeout(() => {
            setIsPredicting(false);
            setResult(87); // Mock result
        }, 2000);
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
                {/* Origin & Destination */}
                <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2 glass-panel p-6 flex flex-col justify-between group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-primary/20 rounded-lg text-primary group-hover:bg-primary/30 transition-colors"><MapPin className="w-6 h-6" /></div>
                        <h3 className="font-semibold text-lg text-white">Route Details</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-auto">
                        <div>
                            <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Origin Country</label>
                            <select className="w-full bg-background/50 border border-glass-border rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-primary focus:outline-none appearance-none">
                                <option>India</option>
                                <option>Nigeria</option>
                                <option>Brazil</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Destination</label>
                            <select className="w-full bg-background/50 border border-glass-border rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-primary focus:outline-none appearance-none">
                                <option>United States</option>
                                <option>United Kingdom</option>
                                <option>Canada</option>
                                <option>Australia</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Income Card */}
                <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 glass-panel p-6 flex flex-col justify-between group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-500/20 rounded-lg text-green-400 group-hover:bg-green-500/30 transition-colors"><Wallet className="w-6 h-6" /></div>
                        <h3 className="font-semibold text-lg text-white">Financial Details</h3>
                    </div>
                    <div className="mt-auto">
                        <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Annual Income (USD)</label>
                        <input type="number" placeholder="e.g. 50000" className="w-full bg-background/50 border border-glass-border rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                </motion.div>

                {/* Education & Age */}
                <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4 md:gap-6">
                    <div className="glass-panel p-6 flex flex-col justify-between group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:bg-purple-500/30 transition-colors"><GraduationCap className="w-6 h-6" /></div>
                        </div>
                        <div className="mt-auto">
                            <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Education</label>
                            <select className="w-full bg-background/50 border border-glass-border rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-primary focus:outline-none appearance-none">
                                <option>Bachelors</option>
                                <option>Masters</option>
                                <option>PhD</option>
                                <option>High School</option>
                            </select>
                        </div>
                    </div>

                    <div className="glass-panel p-6 flex flex-col justify-between group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400 group-hover:bg-orange-500/30 transition-colors"><Calendar className="w-6 h-6" /></div>
                        </div>
                        <div className="mt-auto">
                            <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Age</label>
                            <input type="number" placeholder="25" className="w-full bg-background/50 border border-glass-border rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-primary focus:outline-none" />
                        </div>
                    </div>
                </motion.div>

                {/* Travel History */}
                <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 glass-panel p-6 flex flex-col justify-between group relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 group-hover:bg-blue-500/30 transition-colors"><History className="w-6 h-6" /></div>
                        <h3 className="font-semibold text-lg text-white">Travel History</h3>
                    </div>
                    <div className="mt-auto">
                        <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">Previous Approvals</label>
                        <select className="w-full bg-background/50 border border-glass-border rounded-lg p-3 text-sm text-white focus:ring-2 focus:ring-primary focus:outline-none appearance-none">
                            <option>None</option>
                            <option>1-2 Countries</option>
                            <option>3+ Countries</option>
                            <option>Schengen / US / UK</option>
                        </select>
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-4 mt-4">
                    <button
                        onClick={handlePredict}
                        disabled={isPredicting}
                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-purple-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-3"
                    >
                        {isPredicting ? (
                            <span className="animate-pulse">Analyzing Data...</span>
                        ) : (
                            <>
                                <PlaneTakeoff className="w-6 h-6" />
                                Calculate Probability
                            </>
                        )}
                    </button>
                </motion.div>
            </motion.div>

            {/* Result Card Sliding In */}
            {result !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="mt-12 glass-panel p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border-green-500/30 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-green-500/5 blur-xl pointer-events-none" />
                    <div className="relative z-10 w-full md:w-2/3">
                        <h3 className="text-2xl font-bold text-white mb-2">Prediction Complete</h3>
                        <p className="text-slate-400">Based on our model, your profile looks strong. You have a high likelihood of approval, but ensure your financial documents are well-prepared.</p>
                    </div>
                    <div className="mt-6 md:mt-0 flex flex-col items-center relative z-10">
                        <div className="relative w-32 h-32 flex items-center justify-center bg-background rounded-full border-8 border-green-500/20">
                            <span className="text-4xl font-extrabold text-green-400">{result}%</span>
                            <svg className="absolute top-[-8px] left-[-8px] w-[144px] h-[144px] rotate-[-90deg]">
                                <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-green-500" strokeDasharray="402" strokeDashoffset={402 - (402 * result) / 100} strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-xs text-green-400 mt-3 uppercase tracking-wider font-semibold">Approval Chance</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
