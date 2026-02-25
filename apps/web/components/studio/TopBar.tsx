"use client";

import Link from "next/link";
import { CheckCircle2, ListTodo, Layers, TrendingUp, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export function TopBar() {
    return (
        <div className="h-[90px] w-full border-b border-[#1a1a1a] bg-[#0A0A0A]/95 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">

            {/* Project Context Left */}
            <div className="flex items-center gap-4 h-full max-w-[400px]">
                <Link href="/" className="p-2 -ml-2 rounded-lg text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex flex-col justify-center">
                    <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        Prodigies University
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#111] border border-[#333] text-[#888] uppercase tracking-wider">
                            Draft
                        </span>
                    </h1>
                    <p className="text-sm text-[#888] truncate mt-1">Multi-page SaaS application with 3-step wizard flow.</p>
                </div>
            </div>

            {/* Key Metrics Cards Right */}
            <div className="flex items-center gap-4">
                {[
                    { icon: ListTodo, label: "Total Tickets", value: "24", iconColor: "text-[#2E90FF]", bg: "bg-[#2E90FF]/10", border: "border-[#2E90FF]/20" },
                    { icon: Layers, label: "Total Features", value: "8", iconColor: "text-[#2E90FF]", bg: "bg-[#2E90FF]/10", border: "border-[#2E90FF]/20" },
                    { icon: CheckCircle2, label: "In-Progress", value: "3", iconColor: "text-[#FFB01B]", bg: "bg-[#FFB01B]/10", border: "border-[#FFB01B]/20" },
                    { icon: TrendingUp, label: "Velocity", value: "1.4x", iconColor: "text-[#1BC5FF]", bg: "bg-[#1BC5FF]/10", border: "border-[#1BC5FF]/20", trend: "+12%" },
                ].map((metric, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        key={metric.label}
                        className="flex items-center gap-3 bg-[#111]/80 border border-[#222] rounded-xl px-4 py-3 min-w-[160px] shadow-sm hover:border-[#333] hover:bg-[#151515] transition-all cursor-default"
                    >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric.bg} ${metric.border} border`}>
                            <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-medium text-[#888] uppercase tracking-wider">{metric.label}</span>
                            <div className="flex items-end gap-2 leading-none mt-1">
                                <span className="text-xl font-bold text-white">{metric.value}</span>
                                {metric.trend && <span className="text-[11px] font-medium text-[#00E59B] mb-0.5">{metric.trend}</span>}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}
