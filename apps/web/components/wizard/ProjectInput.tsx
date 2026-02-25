"use client";

import React, { useState } from "react";
import { LucideSparkles, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useProject } from "@/context/ProjectContext";

interface ProjectInputProps {
    onStart: (title: string, idea: string) => void;
    loading: boolean;
}

export function ProjectInput({ onStart, loading }: ProjectInputProps) {
    const { error, projectState } = useProject();
    const [title, setTitle] = useState(
        projectState?.idea ? projectState.idea.split(" ").slice(0, 3).join(" ") + "..." : ""
    );
    const [idea, setIdea] = useState(projectState?.idea || "");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (idea.trim() && title.trim()) {
            onStart(title.trim(), idea.trim());
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none mix-blend-screen" />

            <div className="w-full max-w-2xl relative z-10">
                {/* Top Navigation */}
                <div className="absolute top-8 left-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                {/* Header Section */}
                <div className="mb-10 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider mb-2">
                        <Zap className="w-3 h-3" />
                        AI Agent Architect
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        What are we building?
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                        Describe your vision. Our swarm of autonomous agents will handle the engineering, design, and deployment.
                    </p>
                    {error && (
                        <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/50 p-3 text-sm text-red-200">
                            Error: {error}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-[#0A101F]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl">

                    {/* Project Title Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider ml-1">
                            Project Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-secondary/30 px-5 py-4 text-base text-white shadow-inner outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-secondary/50 focus:ring-1 focus:ring-primary/50"
                            placeholder="e.g. DeFi Liquidity Aggregator"
                            required
                        />
                    </div>

                    {/* Project Description Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-muted-foreground tracking-wider ml-1">
                            Project Vision
                        </label>
                        <textarea
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            rows={6}
                            className="w-full rounded-xl border border-white/10 bg-secondary/30 px-5 py-4 text-base text-white shadow-inner outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-secondary/50 focus:ring-1 focus:ring-primary/50 resize-none"
                            placeholder="Describe the core features, target audience, and any specific technical requirements..."
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                        <button
                            type="submit"
                            disabled={loading || !idea.trim() || !title.trim()}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-black shadow-neon-glow transition-all hover:bg-primary/90 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {loading ? "Allocating Resources..." : (projectState ? "Re-Initialize Construction" : "Initialize Construction")}
                            {!loading && (
                                <LucideSparkles className="h-4 w-4" />
                            )}
                        </button>

                        {projectState && !loading && (
                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); router.push('/create'); }}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
                            >
                                Return to Dashboard
                            </button>
                        )}
                    </div>

                    <div className="text-center text-xs text-muted-foreground/50">
                        est. build time: ~2 minutes
                    </div>
                </form>

            </div>
        </div>
    );
}
