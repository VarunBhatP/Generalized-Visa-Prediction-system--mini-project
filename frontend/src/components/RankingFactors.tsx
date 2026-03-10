"use client";

import { motion } from "framer-motion";

const cardBase = "border border-white/[0.08] bg-[#0d0d0d] flex flex-col overflow-hidden p-7 group hover:bg-[#111111] transition-colors duration-300";

// ── Wireframe SVG illustrations ───────────────────────────────────────────────

const FinanceSVG = () => (
    <svg viewBox="0 0 240 140" fill="none" className="w-full opacity-20 mt-auto">
        <rect x="30" y="80" width="28" height="40" stroke="white" strokeWidth="1.2" />
        <rect x="70" y="56" width="28" height="64" stroke="white" strokeWidth="1.2" />
        <rect x="110" y="36" width="28" height="84" stroke="white" strokeWidth="1.2" />
        <rect x="150" y="18" width="28" height="102" stroke="white" strokeWidth="1.2" />
        <rect x="190" y="44" width="28" height="76" stroke="white" strokeWidth="1.2" />
        <line x1="20" y1="122" x2="230" y2="122" stroke="white" strokeWidth="1" />
        <line x1="20" y1="122" x2="20" y2="10" stroke="white" strokeWidth="1" />
        <polyline points="44,74 84,50 124,30 164,12 204,38" stroke="white" strokeWidth="0.8" strokeDasharray="4 2" />
        <circle cx="44" cy="74" r="2.5" fill="white" />
        <circle cx="84" cy="50" r="2.5" fill="white" />
        <circle cx="124" cy="30" r="2.5" fill="white" />
        <circle cx="164" cy="12" r="2.5" fill="white" />
        <circle cx="204" cy="38" r="2.5" fill="white" />
    </svg>
);

const TravelSVG = () => (
    <svg viewBox="0 0 220 130" fill="none" className="w-full opacity-20 mt-auto">
        <ellipse cx="110" cy="68" rx="80" ry="52" stroke="white" strokeWidth="1.2" />
        <ellipse cx="110" cy="68" rx="28" ry="52" stroke="white" strokeWidth="0.8" />
        <ellipse cx="110" cy="68" rx="80" ry="16" stroke="white" strokeWidth="0.8" />
        <line x1="30" y1="68" x2="190" y2="68" stroke="white" strokeWidth="0.6" />
        <line x1="110" y1="16" x2="110" y2="120" stroke="white" strokeWidth="0.6" />
        <circle cx="62" cy="60" r="3" stroke="white" strokeWidth="1" />
        <circle cx="148" cy="80" r="3" stroke="white" strokeWidth="1" />
        <circle cx="120" cy="44" r="3" stroke="white" strokeWidth="1" />
        <line x1="62" y1="60" x2="120" y2="44" stroke="white" strokeWidth="0.6" strokeDasharray="3 2" />
        <line x1="120" y1="44" x2="148" y2="80" stroke="white" strokeWidth="0.6" strokeDasharray="3 2" />
    </svg>
);

const PassportSVG = () => (
    <svg viewBox="0 0 200 120" fill="none" className="w-full opacity-20 mt-auto">
        <rect x="30" y="14" width="140" height="96" rx="5" stroke="white" strokeWidth="1.2" />
        <rect x="46" y="28" width="40" height="50" rx="2" stroke="white" strokeWidth="1" />
        <circle cx="66" cy="49" r="11" stroke="white" strokeWidth="1" />
        <rect x="98" y="32" width="54" height="5" rx="1" stroke="white" strokeWidth="1" />
        <rect x="98" y="43" width="40" height="4" rx="1" stroke="white" strokeWidth="0.8" />
        <rect x="98" y="53" width="46" height="4" rx="1" stroke="white" strokeWidth="0.8" />
        <rect x="46" y="87" width="106" height="4" rx="1" stroke="white" strokeWidth="0.8" />
        <rect x="46" y="97" width="86" height="4" rx="1" stroke="white" strokeWidth="0.8" />
        <rect x="118" y="68" width="18" height="14" rx="2" stroke="white" strokeWidth="1" />
        <line x1="122" y1="68" x2="122" y2="82" stroke="white" strokeWidth="0.6" />
        <line x1="126" y1="68" x2="126" y2="82" stroke="white" strokeWidth="0.6" />
        <line x1="130" y1="68" x2="130" y2="82" stroke="white" strokeWidth="0.6" />
        <line x1="118" y1="73" x2="136" y2="73" stroke="white" strokeWidth="0.6" />
        <line x1="118" y1="77" x2="136" y2="77" stroke="white" strokeWidth="0.6" />
    </svg>
);

const EmploymentSVG = () => (
    <svg viewBox="0 0 200 110" fill="none" className="w-full opacity-20 mt-auto">
        <rect x="60" y="18" width="80" height="58" rx="4" stroke="white" strokeWidth="1.2" />
        <rect x="80" y="8" width="40" height="14" rx="2" stroke="white" strokeWidth="1" />
        <line x1="60" y1="38" x2="140" y2="38" stroke="white" strokeWidth="0.8" />
        <rect x="72" y="47" width="20" height="18" rx="1" stroke="white" strokeWidth="0.8" />
        <rect x="100" y="48" width="28" height="5" rx="1" stroke="white" strokeWidth="0.8" />
        <rect x="100" y="58" width="20" height="4" rx="1" stroke="white" strokeWidth="0.8" />
        <circle cx="70" cy="95" r="8" stroke="white" strokeWidth="1" />
        <circle cx="100" cy="95" r="8" stroke="white" strokeWidth="1" />
        <circle cx="130" cy="95" r="8" stroke="white" strokeWidth="1" />
        <line x1="58" y1="105" x2="82" y2="105" stroke="white" strokeWidth="1" />
        <line x1="88" y1="105" x2="112" y2="105" stroke="white" strokeWidth="1" />
        <line x1="118" y1="105" x2="142" y2="105" stroke="white" strokeWidth="1" />
    </svg>
);

const TiesSVG = () => (
    <svg viewBox="0 0 200 110" fill="none" className="w-full opacity-20 mt-auto">
        <path d="M60 90 L60 50 L100 22 L140 50 L140 90 Z" stroke="white" strokeWidth="1.2" />
        <rect x="80" y="65" width="20" height="25" rx="1" stroke="white" strokeWidth="0.9" />
        <rect x="65" y="54" width="15" height="13" rx="1" stroke="white" strokeWidth="0.8" />
        <rect x="120" y="54" width="15" height="13" rx="1" stroke="white" strokeWidth="0.8" />
        <line x1="100" y1="90" x2="100" y2="108" stroke="white" strokeWidth="1" />
        <line x1="100" y1="100" x2="80" y2="108" stroke="white" strokeWidth="0.8" />
        <line x1="100" y1="100" x2="120" y2="108" stroke="white" strokeWidth="0.8" />
    </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const cards = [
    {
        title: "Financial Standing",
        description: "Proof of funds is the single strongest signal for approval.",
        bullets: ["Monthly income & bank balance", "Stable income source", "Sufficient funds per day of stay"],
        svg: <FinanceSVG />,
        gridArea: "1 / 1 / 3 / 2", // spans both rows, col 1
    },
    {
        title: "Travel History",
        description: "A rich travel record builds credibility with officers.",
        bullets: ["Countries previously visited", "Prior visa approvals", "No overstay history"],
        svg: <TravelSVG />,
        gridArea: "1 / 2 / 2 / 3",
    },
    {
        title: "Passport Strength",
        description: "Your nationality shapes your baseline approval probability.",
        bullets: ["Visa-free access rank", "Bilateral relations", "Historical approval rates"],
        svg: <PassportSVG />,
        gridArea: "1 / 3 / 2 / 4",
    },
    {
        title: "Employment Status",
        description: "Strong ties to your home employer signal intent to return.",
        bullets: ["Full-time employment", "Employer support letter", "Stable career record"],
        svg: <EmploymentSVG />,
        gridArea: "2 / 2 / 3 / 3",
    },
    {
        title: "Ties to Home Country",
        description: "Demonstrable roots reduce perceived overstay risk.",
        bullets: ["Family & dependents", "Property ownership", "Community obligations"],
        svg: <TiesSVG />,
        gridArea: "2 / 3 / 3 / 4",
    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function RankingFactors() {
    return (
        <section className="w-full bg-[#0a0a0a] py-24 px-6 md:px-12 lg:px-20 font-sans">
            {/* Header */}
            <div className="mb-10">
                <p className="text-xs tracking-widest uppercase text-white/25 mb-3 font-light">
                    Factors
                </p>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white/90">
                    Key ranking factors.
                </h2>
            </div>

            {/* Bento grid with explicit placement */}
            <div
                className="grid gap-[1px] bg-white/[0.06]"
                style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto" }}
            >
                {cards.map((card, i) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className={cardBase}
                        style={{ gridArea: card.gridArea }}
                    >
                        {/* Title */}
                        <p className="text-[11px] tracking-widest uppercase text-white/35 mb-3 font-mono">
                            {card.title}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-white/55 font-light leading-relaxed mb-5">
                            {card.description}
                        </p>

                        {/* Bullets */}
                        <ul className="space-y-2 mb-6">
                            {card.bullets.map((b) => (
                                <li key={b} className="flex items-start gap-2.5 text-[11px] text-white/30 font-light font-mono">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/15 flex-shrink-0" />
                                    {b}
                                </li>
                            ))}
                        </ul>

                        {/* SVG illustration */}
                        <div className="flex-1 flex items-end overflow-hidden">
                            {card.svg}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
