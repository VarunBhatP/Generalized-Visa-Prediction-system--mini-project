"use client";

import { cardClass, cardActiveClass } from "@/app/predict/constants";

interface PickerCardProps {
    options: string[];
    value: string;
    onUpdate: (val: string) => void;
}

export default function PickerCard({ options, value, onUpdate }: PickerCardProps) {
    return (
        <div className="flex flex-wrap gap-3">
            {options.map((opt) => (
                <button
                    key={opt}
                    onClick={() => onUpdate(opt)}
                    className={value === opt ? cardActiveClass : cardClass}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}
