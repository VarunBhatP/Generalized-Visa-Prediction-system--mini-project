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
    "w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none text-white/90 text-2xl font-light py-3 placeholder-white/20 transition-colors duration-300";

export const cardClass =
    "px-5 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] cursor-pointer transition-all duration-300 text-white/50 text-sm tracking-wide hover:bg-white/[0.06] hover:border-white/25 hover:text-white/80";

export const cardActiveClass =
    "px-5 py-3.5 rounded-xl border cursor-pointer transition-all duration-300 text-sm tracking-wide bg-white/[0.08] border-white/40 text-white/95";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
