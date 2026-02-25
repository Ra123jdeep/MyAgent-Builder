"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Cpu, Database, Layout, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
    { label: "Initializing Neural Core...", icon: Cpu },
    { label: "Architecting Database Schema...", icon: Database },
    { label: "Constructing API Routes...", icon: Layout },
    { label: "Auditing Security Protocols...", icon: ShieldCheck },
    { label: "Finalizing System Blueprint...", icon: Zap },
    { label: "Generating Kanban Tickets...", icon: Layout },
    { label: "Running Feasibility Analysis...", icon: Database },
    { label: "Assembling Agent Outputs...", icon: Cpu },
];

export function GenerationLoader() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0));
        }, 400);

        return () => clearInterval(interval);
    }, []);

    const progress = ((currentStep + 1) / STEPS.length) * 100;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-12 relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

            <div className="text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-primary animate-spin" />
                    <div className="absolute inset-2 rounded-full border-r-2 border-b-2 border-accent animate-spin-reverse opacity-70" />
                    <Cpu className="w-8 h-8 text-white animate-pulse" />
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        Fabricating Agents
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Allocating autonomous workers to your project...
                    </p>
                </div>
            </div>

            <div className="w-full max-w-md space-y-8">
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <span>System Build</span>
                        <span className="text-primary">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out shadow-[0_0_10px_rgba(46,144,255,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                    {STEPS.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = idx === currentStep;
                        const isCompleted = idx < currentStep;

                        return (
                            <div
                                key={idx}
                                className={cn(
                                    "flex items-center gap-4 transition-all duration-500 p-3 rounded-lg border border-transparent",
                                    isActive ? "bg-secondary/40 border-primary/20 translate-x-2" : "opacity-40"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center border",
                                    isActive ? "border-primary text-primary bg-primary/10 shadow-[0_0_10px_rgba(46,144,255,0.2)]" :
                                        isCompleted ? "border-green-500 text-green-500 bg-green-500/10" : "border-white/10 text-muted-foreground"
                                )}>
                                    {isActive ? <Loader2 className="w-4 h-4 animate-spin" /> :
                                        isCompleted ? <CheckCircle2 className="w-4 h-4" /> :
                                            <div className="w-2 h-2 rounded-full bg-muted-foreground" />}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground")} />
                                    <span className={cn("text-sm font-medium", isActive ? "text-white" : "text-muted-foreground")}>
                                        {step.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
