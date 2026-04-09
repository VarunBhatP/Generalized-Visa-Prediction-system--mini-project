"use client";

import { motion } from "framer-motion";
import { CircleCheck, TriangleAlert, OctagonAlert, Info } from "lucide-react";

export interface ExplanationItem {
    feature: string;
    impact: string;
    score: number;
}

export interface FeatureImpactItem {
    feature: string;
    impact_score: number;
}

export interface PredictionResult {
    approval_status: boolean;
    approval_probability: number;
    explanation?: ExplanationItem[];
    feature_impacts?: FeatureImpactItem[];
}

interface ResultCardProps {
    result: PredictionResult;
    onRestart: () => void;
}

function TopSummaryCard({ result }: { result: PredictionResult }) {
    const probability = result.approval_probability;
    const score = Math.round(probability * 100);
    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (score / 100) * circumference;

    const isApproved = result.approval_status;
    const statusText = isApproved ? "Approved" : "Rejected";
    const color = isApproved ? "#10b981" : "#ef4444";
    const bgClass = isApproved 
        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400" 
        : "bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-400";
        
    const cardBg = isApproved 
        ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30" 
        : "bg-rose-50/40 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30";

    const summaryText = isApproved 
        ? "Based on the analyzed factors, this visa application has a solid profile and meets the criteria for approval."
        : "This visa application has flagged several key risk factors and currently falls below the threshold for approval.";

    let riskLevel = "Moderate Risk";
    let riskColor = "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
    
    if (probability >= 0.70) {
        riskLevel = "Low Risk";
        riskColor = "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
    } else if (probability <= 0.40) {
        riskLevel = "High Risk";
        riskColor = "text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20";
    }

    return (
        <div className={`w-full mb-10 p-8 sm:p-10 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center gap-10 border transition-colors ${cardBg}`}>
            <div className="flex-shrink-0 relative flex items-center justify-center">
                <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r={radius} fill="none" className="stroke-[#2a2421]/10 dark:stroke-white/10" strokeWidth="8" />
                    <motion.circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: dashOffset }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                        transform="rotate(-90 70 70)"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        className="text-3xl font-semibold text-[#2a2421]/95 dark:text-white/95"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        {score}%
                    </motion.span>
                </div>
            </div>

            <div className="flex flex-col text-center md:text-left h-full justify-center">
                <div className="flex gap-3 justify-center md:justify-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] tracking-widest uppercase font-bold border ${bgClass}`}>
                        Status: {statusText}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[11px] tracking-widest uppercase font-bold border ${riskColor}`}>
                        {riskLevel}
                    </span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#2a2421]/90 dark:text-white/90 mb-3">Overall Approval Prediction</h2>
                <p className="text-[#2a2421]/70 dark:text-white/70 text-[15px] leading-relaxed max-w-lg">{summaryText}</p>
            </div>
        </div>
    );
}

const featureSuggestions: Record<string, string> = {
    "prevailing_wage": "Ensure the offered salary meets or significantly exceeds the industry standard for this position.",
    "education_of_employee": "Advanced educational degrees (like a Master's or Doctorate) can substantially strengthen the application.",
    "has_job_experience": "Securing more relevant job experience before applying can improve approval odds.",
    "requires_job_training": "Positions requiring extensive training might face higher scrutiny. Highlight pre-existing specialized skills.",
    "region_of_employment": "Approval rates vary by geographic region. Providing a strong business justification for the specific location can help.",
    "unit_of_wage": "Hourly or weekly wages sometimes face more scrutiny. Consider structuring compensation as an annual salary.",
    "full_time_position": "Full-time positions are viewed more favorably than part-time roles. Consider upgrading the role to full-time.",
    "company_age": "Newer companies might face additional review. Attach strong evidence of financial stability and structural growth.",
    "no_of_employees": "Smaller companies may need to provide additional evidence of their ability to support the employment long-term."
};

function ActionableSuggestions({ impacts, isApproved }: { impacts?: FeatureImpactItem[], isApproved: boolean }) {
    if (isApproved || !impacts || impacts.length === 0) return null;

    const negativeImpacts = impacts.filter(i => i.impact_score < -0.05).sort((a, b) => a.impact_score - b.impact_score);
    if (negativeImpacts.length === 0) {
        const mildNegatives = impacts.filter(i => i.impact_score < -0.01).sort((a, b) => a.impact_score - b.impact_score);
        negativeImpacts.push(...mildNegatives);
    }
    
    if (negativeImpacts.length === 0) return null;

    const topNegative = negativeImpacts.slice(0, 3);

    return (
        <div className="w-full mb-10">
            <div className="flex items-center gap-3 mb-6 px-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-[19px] font-semibold tracking-tight text-[#2a2421]/90 dark:text-white/90">
                    How to Improve Approval Chances
                </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {topNegative.map((item, i) => {
                    const featureName = item.feature.toLowerCase();
                    const suggestion = featureSuggestions[featureName] || `Review the details for your ${item.feature.replace(/_/g, ' ')} to ensure they align with typical approved profiles.`;
                    
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className="flex flex-col gap-3 p-5 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-[#111] dark:to-[#161616] border border-slate-100 dark:border-white/5 shadow-sm"
                        >
                            <span className="text-[14px] font-semibold capitalize text-[#2a2421]/90 dark:text-white/90">
                                {item.feature.replace(/_/g, ' ')}
                            </span>
                            <p className="text-[13px] text-[#2a2421]/70 dark:text-white/70 leading-relaxed font-normal">
                                {suggestion}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

function generateMeaningfulExplanation(impactText: string, feature: string, impactScore: number) {
    const humanFeature = feature.replace(/_/g, ' ');
    const isPositive = impactScore > 0;
    const strength = Math.abs(impactScore) > 0.1 ? "strong" : Math.abs(impactScore) > 0.05 ? "moderate" : "minor";
    
    let rawInsight = (impactText || "").replace(/(supported the approval decision|reduced approval chances|decreased approval chances|increased approval chances|marginal|significant|moderate)/gi, '').replace(/^[^\w]+|[^\w]+$/g, '').trim();
    if (rawInsight.length > 0) {
        rawInsight = rawInsight.charAt(0).toLowerCase() + rawInsight.slice(1);
    }
    
    const isNeutral = Math.abs(impactScore) <= 0.01;

    if (isNeutral) {
        return `The ${humanFeature} had no significant positive or negative impact on the final decision.`;
    }

    if (isPositive) {
        const templates = [
            `Having this ${humanFeature} is a ${strength} positive factor for this application.`,
            `This ${humanFeature} improved the overall application strength.`,
            `The details provided for ${humanFeature} align well with approval criteria.`
        ];
        const template = templates[feature.length % templates.length];
        return rawInsight.length > 5 ? `${template} Specifically, ${rawInsight}.` : template;
    } else {
        const templates = [
            `The current ${humanFeature} presents a ${strength} risk factor.`,
            `This ${humanFeature} negatively impacted the application's overall chances.`,
            `The application was weakened by the ${humanFeature}.`
        ];
        const template = templates[feature.length % templates.length];
        return rawInsight.length > 5 ? `${template} Specifically, ${rawInsight}.` : template;
    }
}

function KeyDecisionFactors({ explanations, impacts, isApproved }: { explanations: ExplanationItem[], impacts?: FeatureImpactItem[], isApproved: boolean }) {
    if (!explanations || explanations.length === 0) return null;

    const combined = explanations.map(exp => {
        const impactItem = impacts?.find(imp => imp.feature.toLowerCase() === exp.feature.toLowerCase());
        return {
            ...exp,
            impact_score: impactItem ? impactItem.impact_score : 0
        };
    });

    combined.sort((a, b) => {
        if (isApproved) {
            return b.impact_score - a.impact_score;
        } else {
            return a.impact_score - b.impact_score;
        }
    });

    const topFactors = combined.slice(0, 5);

    return (
        <div className="w-full flex flex-col h-full">
            <h3 className="text-[17px] font-semibold tracking-tight text-[#2a2421]/90 dark:text-white/90 mb-4 px-2">
                Key Decision Insights
            </h3>
            <div className="flex flex-col gap-3 text-left flex-1">
                {topFactors.map((item, i) => {
                    const score = item.impact_score;
                    let indicator = "neutral";
                    if (score > 0.01) indicator = "positive";
                    else if (score < -0.05) indicator = "negative";
                    else if (score <= -0.01) indicator = "risk";

                    let icon;
                    if (indicator === "positive") {
                        icon = (
                            <div className="text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 w-8 h-8 flex items-center justify-center rounded-full shrink-0">
                                <CircleCheck className="w-[18px] h-[18px] stroke-[2.5]" />
                            </div>
                        );
                    } else if (indicator === "risk") {
                        icon = (
                            <div className="text-amber-600 dark:text-amber-500 bg-amber-500/10 w-8 h-8 flex items-center justify-center rounded-full shrink-0">
                                <TriangleAlert className="w-[18px] h-[18px] stroke-[2.5]" />
                            </div>
                        );
                    } else if (indicator === "negative") {
                        icon = (
                            <div className="text-rose-600 dark:text-rose-500 bg-rose-500/10 w-8 h-8 flex items-center justify-center rounded-full shrink-0">
                                <OctagonAlert className="w-[18px] h-[18px] stroke-[2.5]" />
                            </div>
                        );
                    } else {
                        icon = (
                            <div className="text-[#2a2421]/60 dark:text-white/60 bg-[#2a2421]/5 dark:bg-white/5 w-8 h-8 flex items-center justify-center rounded-full shrink-0">
                                <Info className="w-[18px] h-[18px] stroke-[2.5]" />
                            </div>
                        );
                    }

                    const explanationText = generateMeaningfulExplanation(item.impact, item.feature, score);

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="flex flex-col gap-2 p-5 rounded-2xl bg-white dark:bg-[#111] border border-[#2a2421]/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3">
                                {icon}
                                <span className="text-[14px] font-semibold text-[#2a2421]/90 dark:text-white/90 capitalize leading-tight">
                                    {item.feature.replace(/_/g, ' ')}
                                </span>
                            </div>
                            <span className="text-[13px] text-[#2a2421]/70 dark:text-white/70 leading-relaxed font-normal pl-9">
                                {explanationText}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

function FeatureContribution({ impacts }: { impacts: FeatureImpactItem[] }) {
    if (!impacts || impacts.length === 0) return null;

    const positiveImpacts = impacts.filter(i => i.impact_score > 0).sort((a, b) => b.impact_score - a.impact_score);
    const negativeImpacts = impacts.filter(i => i.impact_score < 0).sort((a, b) => a.impact_score - b.impact_score);

    const maxScore = Math.max(...impacts.map(i => Math.abs(i.impact_score)), 0.001);

    const renderBar = (item: FeatureImpactItem, i: number, isPositive: boolean) => {
        const widthPercent = Math.max((Math.abs(item.impact_score) / maxScore) * 100, 4);
        const scoreColor = isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400";
        const isTopThree = i < 3;

        return (
            <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: isPositive ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`flex flex-col gap-2 ${isTopThree ? 'opacity-100' : 'opacity-80'} hover:opacity-100 transition-opacity`}
            >
                <div className="flex justify-between items-end px-1">
                    <span className="text-[13px] font-medium text-[#2a2421]/90 dark:text-white/90 capitalize flex items-center">
                        {isTopThree && <span className="mr-2 text-[10px] bg-[#2a2421]/5 dark:bg-white/5 border border-[#2a2421]/10 dark:border-white/10 px-1.5 py-0.5 rounded text-[#2a2421]/70 dark:text-white/70">#{i + 1}</span>}
                        {item.feature.replace(/_/g, ' ')}
                    </span>
                    <span className={`text-[13px] font-semibold font-mono ${scoreColor}`}>
                        {isPositive ? "+" : ""}{item.impact_score.toFixed(3)}
                    </span>
                </div>
                
                <div className="w-full flex items-center relative h-[6px] bg-[#2a2421]/[0.03] dark:bg-white/[0.03] rounded-full overflow-hidden">
                    <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-[#2a2421]/20 dark:bg-white/20 z-0"></div>
                    
                    <div className="w-1/2 h-full flex justify-end z-10 pr-[1px]">
                        {!isPositive && (
                            <div 
                                className="h-full rounded-full bg-gradient-to-l from-rose-400 to-rose-500 min-w-[4px]" 
                                style={{ width: `${widthPercent}%` }}
                            />
                        )}
                    </div>
                    <div className="w-1/2 h-full flex justify-start z-10 pl-[1px]">
                        {isPositive && (
                            <div 
                                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 min-w-[4px]" 
                                style={{ width: `${widthPercent}%` }}
                            />
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="w-full flex flex-col h-full">
            <h3 className="text-[17px] font-semibold tracking-tight text-[#2a2421]/90 dark:text-white/90 mb-4 px-2">
                Feature Contribution Analysis
            </h3>

            <div className="w-full p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#111] border border-[#2a2421]/5 dark:border-white/5 shadow-sm flex-1 flex flex-col gap-8">
                {positiveImpacts.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <p className="text-[11px] text-[#2a2421]/50 dark:text-white/50 uppercase tracking-widest font-bold">Top Positive Factors</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            {positiveImpacts.map((item, i) => renderBar(item, i, true))}
                        </div>
                    </div>
                )}

                {negativeImpacts.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                            <p className="text-[11px] text-[#2a2421]/50 dark:text-white/50 uppercase tracking-widest font-bold">Top Risk Factors</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            {negativeImpacts.map((item, i) => renderBar(item, i, false))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ResultCard({ result, onRestart }: ResultCardProps) {
    if (!result) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto flex flex-col items-center"
        >
            <TopSummaryCard result={result} />
            
            <ActionableSuggestions impacts={result.feature_impacts} isApproved={result.approval_status} />

            <div className="w-full grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-10 mb-14">
                <div>
                    {result.explanation && (
                        <KeyDecisionFactors explanations={result.explanation} impacts={result.feature_impacts} isApproved={result.approval_status} />
                    )}
                </div>

                <div>
                    {result.feature_impacts && (
                        <FeatureContribution impacts={result.feature_impacts} />
                    )}
                </div>
            </div>

            <div className="flex gap-4 w-full justify-center pb-8 border-t border-[#2a2421]/5 dark:border-white/5 pt-10">
                <button
                    onClick={onRestart}
                    className="px-8 py-3 rounded-full hover:shadow-lg border border-[#2a2421]/20 dark:border-white/20 bg-white dark:bg-[#111] hover:bg-[#f6f6f6] dark:hover:bg-[#1a1a1a] transition-all text-sm tracking-widest uppercase font-medium text-[#2a2421]/90 dark:text-white/90"
                >
                    Start Over
                </button>
                <a
                    href="/"
                    className="px-8 py-3 rounded-full border border-[#2a2421]/10 dark:border-white/10 text-[#2a2421]/50 dark:text-white/40 hover:text-[#2a2421]/90 dark:hover:text-white/90 hover:border-[#2a2421]/30 dark:hover:border-white/30 transition-all text-sm tracking-widest uppercase font-medium flex items-center"
                >
                    ← Home
                </a>
            </div>
        </motion.div>
    );
}
