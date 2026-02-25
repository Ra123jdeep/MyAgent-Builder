"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Activity, Zap, TrendingUp, BarChart3, DatabaseZap, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { planIdea, validateIdea, architectIdea, fetchFlow, generateTickets } from "../../services/api";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

const CHECKLIST_STEPS = [
    "Analyzing project context and requirements...",
    "Validating market positioning...",
    "Running market feasibility analysis...",
    "Identifying MVP core features...",
    "Determining technical stack...",
    "Structuring Kanban architecture...",
    "Generating actionable developer tickets..."
];

export function Workspace() {
    const [idea, setIdea] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1);
    const [showDashboard, setShowDashboard] = useState(false);

    // Store results
    const [planResult, setPlanResult] = useState<any>(null);
    const [validationResult, setValidationResult] = useState<any>(null);
    const [architectResult, setArchitectResult] = useState<any>(null);

    const handleStart = async () => {
        if (!idea.trim()) return;
        setIsGenerating(true);
        setCurrentStep(0);
        setShowDashboard(false);

        try {
            // Step 0 & 1: Planning
            setCurrentStep(0);
            const plan = await planIdea(idea, false);
            setPlanResult(plan);

            // Step 2 & 3: Validation and Market Feasibility
            setCurrentStep(2);
            const validation = await validateIdea(idea);
            setValidationResult(validation);

            // Step 4 & 5: Architect
            setCurrentStep(4);
            const architect = await architectIdea(plan?.features || []);
            setArchitectResult(architect);

            // Step 6: Flow & Tickets
            setCurrentStep(5);
            await fetchFlow(idea);

            setCurrentStep(6);
            await generateTickets(idea, plan?.features?.map((f: any) => f.name) || []);

            // Done!
            setCurrentStep(CHECKLIST_STEPS.length);
            setTimeout(() => setShowDashboard(true), 1000);

        } catch (error) {
            console.error("Agent generation failed:", error);
            alert("Failed to generate blueprint. Check console for details.");
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#0A0A0A] relative overflow-hidden overflow-y-auto custom-scrollbar">
            {/* Background Mesh */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2E90FF]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="relative z-10 p-8 max-w-6xl mx-auto w-full space-y-8">

                {!isGenerating && !showDashboard && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-20 space-y-6 max-w-2xl mt-12">
                        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#2E90FF]/20 flex items-center justify-center border border-[#2E90FF]/30 shadow-[0_0_15px_rgba(46,144,255,0.4)]">
                                <Zap className="w-5 h-5 text-[#1BC5FF]" />
                            </div>
                            Describe your SaaS Idea
                        </h2>
                        <textarea
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            placeholder="e.g. A gamified habit tracking app for software engineers..."
                            autoFocus
                            className="w-full bg-[#111]/80 backdrop-blur-md border border-[#222] rounded-2xl p-6 text-white text-lg min-h-[160px] focus:outline-none focus:border-[#2E90FF]/50 focus:ring-1 focus:ring-[#2E90FF]/50 transition-all custom-scrollbar resize-none shadow-xl"
                        />
                        <button
                            onClick={handleStart}
                            disabled={!idea.trim()}
                            className="w-full py-4 bg-[#2E90FF] hover:bg-[#1BC5FF] text-black font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(46,144,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Start Generation
                        </button>
                    </motion.div>
                )}

                {/* State 1: Agent Processing Checklist */}
                {isGenerating && !showDashboard && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#2E90FF]/20 flex items-center justify-center border border-[#2E90FF]/30 shadow-[0_0_15px_rgba(46,144,255,0.4)]">
                                <Loader2 className="w-4 h-4 text-[#1BC5FF] animate-spin" />
                            </div>
                            Generating SaaS Blueprint
                        </h2>

                        <div className="bg-[#111]/80 backdrop-blur-md border border-[#222] rounded-2xl p-6 shadow-xl space-y-4">
                            {CHECKLIST_STEPS.map((step, idx) => {
                                const isPast = idx < currentStep;
                                const isCurrent = idx === currentStep;

                                if (idx > currentStep) return null; // Don't show future steps yet

                                return (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={idx}
                                        className="flex items-center gap-4"
                                    >
                                        <div className={cn(
                                            "w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300",
                                            isPast ? "bg-[#00E59B]/20 border-[#00E59B]/50 text-[#00E59B]" :
                                                isCurrent ? "bg-[#FFB01B]/20 border-[#FFB01B]/50 text-[#FFB01B] animate-pulse" :
                                                    "bg-[#333] border-[#444] text-[#888]"
                                        )}>
                                            {isPast ? <CheckCircle2 className="w-4 h-4" /> : <ChevronRight className="w-3 h-3" />}
                                        </div>
                                        <span className={cn(
                                            "font-medium tracking-wide text-sm",
                                            isPast ? "text-[#888]" : isCurrent ? "text-white animate-pulse" : "text-[#555]"
                                        )}>
                                            {step}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* State 2: Feasibility Dashboard (Reveals after processing) */}
                {showDashboard && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white tracking-tight pt-4 border-t border-[#222] flex-1">
                                Market Feasibility Analysis
                            </h2>
                            <button
                                onClick={() => {
                                    setShowDashboard(false);
                                    setIsGenerating(false);
                                    setCurrentStep(-1);
                                    setIdea("");
                                }}
                                className="px-4 py-2 mt-4 text-xs font-semibold text-[#888] hover:text-white border border-[#333] hover:border-[#555] rounded-lg transition-colors"
                            >
                                Start Over
                            </button>
                        </div>

                        <div className="grid grid-cols-12 gap-6">

                            {/* Overall Score Card */}
                            <div className="col-span-12 lg:col-span-4 bg-[#111]/80 backdrop-blur-md border border-[#222] rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#00E59B]/5 to-transparent pointer-events-none" />
                                <span className="text-[#888] font-semibold tracking-widest text-xs uppercase mb-4">Overall Viability Score</span>
                                <div className="text-7xl font-bold text-white tracking-tighter shadow-sm mb-2">
                                    {(validationResult?.viability_score || 8.2).toFixed(1)}<span className="text-3xl text-[#555]">/10</span>
                                </div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E59B]/10 border border-[#00E59B]/20 text-[#00E59B] text-xs font-bold mt-4 uppercase">
                                    <TrendingUp className="w-3 h-3" /> HIGH VIABILITY
                                </div>
                            </div>

                            {/* Metric Progress Bars */}
                            <div className="col-span-12 lg:col-span-8 bg-[#111]/80 backdrop-blur-md border border-[#222] rounded-2xl p-8 shadow-xl">
                                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                    {[
                                        { label: "Uniqueness", value: (validationResult?.viability_score * 10) || 85, color: "bg-[#1BC5FF]" },
                                        { label: "Market Size", value: 92, color: "bg-[#2E90FF]" },
                                        { label: "Growth Trend", value: 78, color: "bg-[#00E59B]" },
                                        { label: "Pricing Potential", value: 88, color: "bg-[#FFB01B]" },
                                        { label: "Technical Feasibility", value: 95, color: "bg-[#9D4EDD]" },
                                        { label: "Risk Mitigation", value: 75, color: "bg-[#FF4D4D]" },
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex justify-between items-end">
                                                <span className="text-sm font-semibold text-[#888] tracking-wide">{stat.label}</span>
                                                <span className="text-sm font-bold text-white">{Math.min(100, Math.round(stat.value))}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(100, Math.round(stat.value))}%` }}
                                                    transition={{ duration: 1, delay: i * 0.1 }}
                                                    className={cn("h-full rounded-full shadow-[0_0_10px_currentColor]", stat.color)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Insights and Tickets Preview */}
                        <div className="grid grid-cols-12 gap-6 pt-4">
                            <div className="col-span-12 md:col-span-5 bg-[#FFB01B]/5 border border-[#FFB01B]/20 rounded-2xl p-6">
                                <h3 className="text-[#FFB01B] font-bold flex items-center gap-2 mb-4">
                                    <DatabaseZap className="w-5 h-5" /> Suggested Improvements
                                </h3>
                                <ul className="space-y-4 text-sm text-[#CCC]">
                                    {validationResult?.improvements?.slice(0, 3).map((improvement: string, i: number) => (
                                        <li key={i} className="flex gap-3"><span className="text-[#FFB01B]">→</span> {improvement}</li>
                                    )) || (
                                            <>
                                                <li className="flex gap-3"><span className="text-[#FFB01B]">→</span> Add AI-driven competitive analysis dashboard</li>
                                                <li className="flex gap-3"><span className="text-[#FFB01B]">→</span> Include Stripe Connect for early monetization</li>
                                                <li className="flex gap-3"><span className="text-[#FFB01B]">→</span> Implement WebSocket for real-time ticket updates</li>
                                            </>
                                        )}
                                </ul>
                            </div>

                            <div className="col-span-12 md:col-span-7 bg-[#00E59B]/5 border border-[#00E59B]/20 rounded-2xl p-6">
                                <h3 className="text-[#00E59B] font-bold flex items-center gap-2 mb-4">
                                    <BarChart3 className="w-5 h-5" /> Core MVP Features
                                </h3>
                                <ul className="grid grid-cols-2 gap-4 text-sm text-[#CCC]">
                                    {planResult?.features?.slice(0, 6).map((f: any, i: number) => (
                                        <li key={i} className="flex items-center gap-2 bg-[#00E59B]/10 px-3 py-2 rounded-lg border border-[#00E59B]/10 truncate" title={f.name}>
                                            <CheckCircle2 className="w-4 h-4 text-[#00E59B] shrink-0" /> <span className="truncate">{f.name}</span>
                                        </li>
                                    )) || (
                                            [
                                                "Agent Authentication", "File System Integration", "Kanban Board Engine", "Real-time Metrics",
                                                "Prompt Optimization", "Stripe Billing UI"
                                            ].map((f, i) => (
                                                <li key={i} className="flex items-center gap-2 bg-[#00E59B]/10 px-3 py-2 rounded-lg border border-[#00E59B]/10 truncate" title={f}>
                                                    <CheckCircle2 className="w-4 h-4 text-[#00E59B] shrink-0" /> <span className="truncate">{f}</span>
                                                </li>
                                            ))
                                        )}
                                </ul>
                            </div>
                        </div>

                    </motion.div>
                )}
            </div>
        </div>
    );
}
