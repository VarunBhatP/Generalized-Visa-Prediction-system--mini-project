"use client";

import Link from "next/link";
import { Globe } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-md border-b border-glass-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <Globe className="w-8 h-8 text-primary" />
                        <span className="font-bold text-xl tracking-tight text-white">GlobalVisa</span>
                    </Link>
                    <div className="flex space-x-6">
                        <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
                        <Link href="#predict" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Predict</Link>
                        <Link href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
