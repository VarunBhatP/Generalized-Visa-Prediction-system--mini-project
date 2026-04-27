export interface Answers {
    nationality: string;
    destination_country: string;
    visa_type: string;
    marital_status: string;
    age: string;
    education_level: string;
    monthly_income_usd: string;
    bank_balance_usd: string;
    duration_of_stay: string;
    prev_countries_visited: string;
    prev_visa_rejections: string;
    has_return_ticket: string;
    has_criminal_record: string;
}

export const NATIONALITIES = ["Canadian", "Chinese", "German", "Indian", "American", "Nigerian", "Australian", "British"];
export const DESTINATIONS = ["Australia", "Canada", "France", "Germany", "UK", "USA"];
export const VISA_TYPES = ["Tourist", "Student", "Work"];
export const MARITAL_STATUSES = ["Single", "Married", "Divorced"];
export const EDUCATION_LABELS: Record<number, string> = { 0: "High School", 1: "Bachelor's", 2: "Master's", 3: "PhD" };

export const inputClass =
    "w-full bg-transparent border-b border-[#2a2421]/20 dark:border-white/20 focus:border-[#2a2421]/60 dark:focus:border-white/60 outline-none text-[#2a2421]/90 dark:text-white/90 text-2xl font-light py-3 placeholder-black/20 dark:placeholder-white/20 transition-colors duration-300";

export const cardClass =
    "px-5 py-3.5 rounded-xl border border-[#2a2421]/10 dark:border-white/10 bg-[#2a2421]/[0.03] dark:bg-white/[0.03] cursor-pointer transition-all duration-300 text-[#2a2421]/50 dark:text-white/50 text-sm tracking-wide hover:bg-[#2a2421]/[0.06] dark:hover:bg-white/[0.06] hover:border-[#2a2421]/25 dark:hover:border-white/25 hover:text-[#2a2421]/80 dark:hover:text-white/80";

export const cardActiveClass =
    "px-5 py-3.5 rounded-xl border cursor-pointer transition-all duration-300 text-sm tracking-wide bg-[#2a2421]/[0.08] dark:bg-white/[0.08] border-[#2a2421]/40 dark:border-white/40 text-[#2a2421]/95 dark:text-white/95";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// Mirrors backend Pydantic constraints for real-time frontend validation
export const fieldValidation: Partial<Record<keyof Answers, { min?: number; max?: number; message: (v: number) => string }>> = {
    age: {
        min: 0, max: 120,
        message: (v) => v < 0 ? "Age must be at least 0" : "Age must be 120 or below",
    },
    monthly_income_usd: {
        min: 0,
        message: () => "Income cannot be negative",
    },
    bank_balance_usd: {
        min: 0,
        message: () => "Bank balance cannot be negative",
    },
    duration_of_stay: {
        min: 1, max: 365,
        message: (v) => v < 1 ? "Stay must be at least 1 day" : "Stay cannot exceed 365 days",
    },
};
