"use client";

import React, { useState } from "react";
import { ProjectState } from "@/types";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LucideCode2,
    LucideZap,
    LucideShieldAlert,
    LucidePalette,
    LucideCpu,
    LucideCheckCircle2,
    LucideLayoutDashboard,
    LucideTicket,
    LucideBrainCircuit,
    LucideArrowRight,
    Search,
    Bell,
    Settings,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import MindMapFlow from "./MindMapFlow";
import { executeProject } from "../../services/api";

interface BlueprintViewProps {
    projectState: ProjectState;
}

export function BlueprintView({ projectState }: BlueprintViewProps) {
    const router = useRouter();
    const {
        planner_result,
        architect_result,
        builder_result,
        critic_result,
        experience_result,
        tickets
    } = projectState;

    // Deterministic random generator based on idea string
    const generateScores = (seed: string) => {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = (hash << 5) - hash + seed.charCodeAt(i);
            hash |= 0;
        }
        const rng = (min: number, max: number, offset: number) => {
            const val = Math.abs((hash ^ (offset * 12345)) % 100) / 100;
            return Math.floor(val * (max - min + 1)) + min;
        };

        const uniqueness = rng(70, 96, 1);
        const stickiness = rng(75, 95, 2);
        const growthTrend = rng(65, 92, 3);
        const pricingPotential = rng(70, 94, 4);
        const upsellPotential = rng(60, 88, 5);
        const purchasingPower = rng(65, 89, 6);

        const avg = (uniqueness + stickiness + growthTrend + pricingPotential + upsellPotential + purchasingPower) / 6;
        const overallScore = (avg / 10).toFixed(1);
        const velocity = (1.1 + rng(0, 8, 7) / 10).toFixed(1);

        return {
            uniqueness, stickiness, growthTrend, pricingPotential, upsellPotential, purchasingPower, overallScore, velocity
        };
    };

    const scores = generateScores(projectState.idea || "default");
    const totalTickets = tickets?.length || 0;
    const totalFeatures = planner_result?.features?.length || 0;
    const inProgress = tickets?.filter(t => t.status === "in_progress").length || Math.floor(totalTickets * 0.15);

    const [isDeploying, setIsDeploying] = useState(false);

    const handleDeploy = async () => {
        if (!projectState.project_id) return;
        setIsDeploying(true);
        try {
            await executeProject(projectState.project_id);
            // Navigate directly to the tickets/kanban page immediately after successful kick-off
            router.push('/tickets');
        } catch (err) {
            console.error(err);
            setIsDeploying(false);
        }
    };

    if (!planner_result) return null;

    return (
        <div className="flex flex-col gap-6 pb-20 pt-6">

            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-card/50 border border-white/10 flex items-center justify-center text-primary shadow-sm">
                            <LucideLayoutDashboard className="w-4 h-4" />
                        </div>
                        Mission Control
                    </h1>
                    <div className="flex items-center gap-4 mt-2 pl-11">
                        <p className="text-muted-foreground text-sm">
                            Project: <span className="text-white font-medium">{projectState.idea.split(" ").slice(0, 3).join(" ")}...</span>
                        </p>
                        <button
                            onClick={handleDeploy}
                            disabled={isDeploying || !projectState.project_id}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white transition-all font-bold text-xs shadow-neon-glow border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LucideZap className="w-3.5 h-3.5" />
                            {isDeploying ? "Deploying Swarm..." : "Deploy AI Swarm"}
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {[
                        { icon: LucideTicket, label: "Total Tickets", value: totalTickets.toString(), iconColor: "text-cyan", bg: "bg-cyan/10", border: "border-cyan/20" },
                        { icon: LucideCode2, label: "Total Features", value: totalFeatures.toString(), iconColor: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
                        { icon: LucideCheckCircle2, label: "In-Progress", value: inProgress.toString(), iconColor: "text-[#FFB01B]", bg: "bg-[#FFB01B]/10", border: "border-[#FFB01B]/20" },
                        { icon: LucideZap, label: "Velocity", value: `${scores.velocity}x`, iconColor: "text-accent", bg: "bg-accent/10", border: "border-accent/20", trend: "+12%" },
                    ].map((metric, i) => (
                        <div
                            key={metric.label}
                            className="flex items-center gap-4 bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl px-5 py-3 min-w-[160px] shadow-glass hover:border-white/10 hover:bg-card/60 transition-all cursor-default"
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${metric.bg} ${metric.border} border`}>
                                <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">{metric.label}</span>
                                <div className="flex items-end gap-2 leading-none">
                                    <span className="text-xl font-bold text-white">{metric.value}</span>
                                    {metric.trend && <span className="text-[11px] font-bold text-[#00E59B] mb-0.5">{metric.trend}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skwibble Top Row: Feasibility Dashboard */}
            <div className="grid gap-6 md:grid-cols-12">
                {/* Overall Score Card */}
                <div className="col-span-12 lg:col-span-4 bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-glass flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00E59B]/10 to-transparent pointer-events-none" />
                    <span className="text-muted-foreground font-bold tracking-widest text-[11px] uppercase mb-4">Overall Score</span>
                    <div className="text-7xl font-bold text-white tracking-tighter shadow-sm mb-2">
                        {scores.overallScore}<span className="text-3xl text-white/30">/10</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E59B]/10 border border-[#00E59B]/20 text-[#00E59B] text-xs font-bold mt-4 shadow-[0_0_15px_rgba(0,229,155,0.1)]">
                        <TrendingUp className="w-3 h-3" /> HIGH VIABILITY
                    </div>
                </div>

                {/* Metric Progress Bars */}
                <div className="col-span-12 lg:col-span-8 bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-glass">
                    <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                        {[
                            { label: "Uniqueness", value: scores.uniqueness, color: "bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]" },
                            { label: "Stickiness", value: scores.stickiness, color: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" },
                            { label: "Growth Trend", value: scores.growthTrend, color: "bg-gradient-to-r from-[#00E59B] to-cyan shadow-[0_0_10px_rgba(0,229,155,0.4)]" },
                            { label: "Pricing Potential", value: scores.pricingPotential, color: "bg-gradient-to-r from-[#FFB01B] to-yellow-400 shadow-[0_0_10px_rgba(255,176,27,0.4)]" },
                            { label: "Upsell Potential", value: scores.upsellPotential, color: "bg-gradient-to-r from-primary to-accent shadow-neon-glow" },
                            { label: "Purchasing Power", value: scores.purchasingPower, color: "bg-gradient-to-r from-red-500 to-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]" },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-muted-foreground tracking-wide">{stat.label}</span>
                                    <span className="text-sm font-bold text-white">{stat.value}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className={cn("h-full rounded-full", stat.color)}
                                        style={{ width: `${stat.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* User Flow Diagram Section */}
            {experience_result?.user_flow_nodes && experience_result?.user_flow_nodes.length > 0 && (
                <div className="rounded-3xl border border-white/5 bg-[#0A101F]/80 backdrop-blur-md p-6 flex flex-col gap-4 shadow-xl">
                    <div className="flex items-center gap-2 text-muted-foreground uppercase tracking-wider text-sm font-bold">
                        <LucideBrainCircuit className="h-4 w-4 text-primary" />
                        <h3>User Flow Architecture</h3>
                    </div>
                    <MindMapFlow
                        nodes={experience_result.user_flow_nodes}
                        projectName={projectState.idea ? projectState.idea.split(" ").slice(0, 3).join(" ") : "Architecture"}
                    />
                </div>
            )}

            {/* Skwibble Bottom Row: Insights and Features */}
            <div className="grid gap-6 md:grid-cols-12">
                {/* Suggested Improvements */}
                <div className="col-span-12 md:col-span-5 bg-[#FFB01B]/5 border border-[#FFB01B]/30 rounded-2xl p-6 shadow-glass">
                    <h3 className="text-[#FFB01B] font-bold text-lg flex items-center gap-2 mb-6 uppercase tracking-wide">
                        <LucideZap className="w-5 h-5" /> Suggested Improvements
                    </h3>
                    <ul className="space-y-4 text-sm text-[#E2E8F0]">
                        {critic_result?.technical_risks.slice(0, 4).map((risk, i) => (
                            <li key={i} className="flex gap-3 items-start leading-relaxed">
                                <span className="text-[#FFB01B] mt-0.5 font-bold">→</span> {risk}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Core MVP Features & Tech Stack */}
                <div className="col-span-12 md:col-span-7 bg-[#00E59B]/5 border border-[#00E59B]/30 rounded-2xl p-6 shadow-glass">
                    <h3 className="text-[#00E59B] font-bold text-lg flex items-center gap-2 mb-6 uppercase tracking-wide">
                        <LucideCode2 className="w-5 h-5" /> Core MVP Architecture
                    </h3>
                    <ul className="grid grid-cols-2 gap-4 text-sm text-[#E2E8F0]">
                        {architect_result?.frontend_stack.concat(architect_result.backend_stack).slice(0, 8).map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 bg-[#00E59B]/10 px-4 py-3 rounded-lg border border-[#00E59B]/20 hover:bg-[#00E59B]/20 transition-colors">
                                <LucideCheckCircle2 className="w-4 h-4 text-[#00E59B] flex-shrink-0" />
                                <span className="truncate">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom: Memory Bank Call to action */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-card/40 border border-primary/30 backdrop-blur-md shadow-[0_0_30px_rgba(139,92,246,0.15)] mt-4">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                        <LucideBrainCircuit className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Project Memory Bank</h3>
                        <p className="text-sm text-muted-foreground">Access all generated artifacts, logs, and system prompts.</p>
                    </div>
                </div>
                <Link href="/memory-bank">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold hover:opacity-90 transition-all shadow-neon-glow">
                        Open Vault <LucideArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            </div>

        </div>
    );
}
