"use client";

import React, { useState } from "react";
import ReactFlow, { Background, Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { useProject } from "../../context/ProjectContext";
import { cn } from "../../lib/utils";
import { LucideFileText, LucideCopy, LucideInfo } from "lucide-react";

// Static nodes for the Memory Bank structure diagram
const initialNodes: Node[] = [
    { id: "1", position: { x: 250, y: 0 }, data: { label: "projectbrief.md" }, type: "input", style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #475569', width: 140 } },
    { id: "2", position: { x: 50, y: 100 }, data: { label: "productContext.md" }, style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #475569', width: 140 } },
    { id: "3", position: { x: 250, y: 100 }, data: { label: "systemPatterns.md" }, style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #475569', width: 140 } },
    { id: "4", position: { x: 450, y: 100 }, data: { label: "techContext.md" }, style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #475569', width: 140 } },
    { id: "5", position: { x: 250, y: 200 }, data: { label: "activeContext.md" }, style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #475569', width: 140 } },
    { id: "6", position: { x: 250, y: 300 }, data: { label: "progress.md" }, type: "output", style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #475569', width: 140 } },
];

const initialEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: '#64748b' } },
    { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: '#64748b' } },
    { id: "e1-4", source: "1", target: "4", animated: true, style: { stroke: '#64748b' } },
    { id: "e2-5", source: "2", target: "5", animated: true, style: { stroke: '#64748b' } },
    { id: "e3-5", source: "3", target: "5", animated: true, style: { stroke: '#64748b' } },
    { id: "e4-5", source: "4", target: "5", animated: true, style: { stroke: '#64748b' } },
    { id: "e5-6", source: "5", target: "6", animated: true, style: { stroke: '#64748b' } },
];

export default function MemoryBankPage() {
    const { projectState } = useProject();
    const [selectedFile, setSelectedFile] = useState("projectbrief.md");

    // Generate content based on projectState (ULTRA-NEXT Schema)
    const generateContent = (filename: string) => {
        if (!projectState) return "# No Project Data\nRun a blueprint generation first.";
        const {
            idea,
            planner_result,
            architect_result,
            builder_result,
            critic_result,
            experience_result
        } = projectState;

        if (!planner_result) return "# No Data Available\nPlease regenerate the blueprint.";

        switch (filename) {
            case "projectbrief.md":
                return `# Project Brief\n\n## Vision\n${planner_result.vision}\n\n## Problem Statement\n${planner_result.problem_statement}\n\n## Core Concept\n${idea}\n\n## Differentiator\n${planner_result.unique_differentiator}`;
            case "productContext.md":
                return `# Product Context\n\n## Target Audience\n${planner_result.target_audience.map(a => `- ${a}`).join("\n")}\n\n## UX Strategy\n- Tone: ${experience_result?.branding_tone || "Professional"}\n- Key Flows:\n${experience_result?.user_flow.map(f => `  - ${f}`).join("\n") || "  - Pending design"}`;
            case "techContext.md":
                return `# Technical Context\n\n## Frontend Stack\n${architect_result?.frontend_stack.map(t => `- ${t}`).join("\n")}\n\n## Backend Stack\n${architect_result?.backend_stack.map(t => `- ${t}`).join("\n")}\n\n## Database\n${architect_result?.database_schema.map(t => `- Table: ${t.table} (${t.fields.join(", ")})`).join("\n")}`;
            case "systemPatterns.md":
                return `# System Patterns\n\n## Infrastructure\n${architect_result?.infrastructure.map(i => `- ${i}`).join("\n")}\n\n## Deployment\n${architect_result?.deployment_strategy}`;
            case "activeContext.md":
                return `# Active Context\n\n## Execution Roadmap\n${builder_result?.roadmap.map(p => `### ${p.phase}\n${p.steps.map(s => `- ${s}`).join("\n")}`).join("\n\n")}`;
            case "progress.md":
                return `# Project Progress\n\n## Features Status\n${planner_result.features.map(f => `- [ ] **${f.name}** (${f.priority}): ${f.description}`).join("\n")}\n\n## Risks (Critic Agent)\n${critic_result?.technical_risks.map(r => `- [!] ${r}`).join("\n")}`;
            default:
                return "# File not found";
        }
    };

    const files = ["projectbrief.md", "productContext.md", "techContext.md", "systemPatterns.md", "activeContext.md", "progress.md"];
    const content = generateContent(selectedFile);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
    };

    if (!projectState) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center text-slate-400">
                <p>No project data found. Please generate a blueprint on the Overview page.</p>
            </div>
        );
    }

    return (
        <main className="flex flex-col gap-6 h-[calc(100vh-220px)] min-h-[600px] pb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        Memory Bank
                    </h2>
                    <p className="text-[#888] text-sm mt-1">
                        Interact with the project's long-term agent memory files.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold shadow-[0_0_10px_rgba(27,197,255,0.2)]">
                        {files.length} CORE FILES
                    </span>
                </div>
            </div>

            {/* Top Section: Diagram & Explanation */}
            <section className="flex flex-col md:flex-row gap-6 h-1/2 min-h-[300px]">
                {/* Diagram */}
                <div className="flex-1 rounded-3xl border border-[#222] bg-[#0A101F]/80 backdrop-blur-md shadow-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
                    <div className="absolute top-4 left-4 z-10 rounded-lg bg-[#111]/80 border border-[#222] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#888] backdrop-blur-sm">
                        Knowledge Graph
                    </div>
                    <ReactFlow
                        nodes={initialNodes}
                        edges={initialEdges}
                        fitView
                        proOptions={{ hideAttribution: true }}
                    >
                        <Background color="#1BC5FF" gap={20} size={1} />
                    </ReactFlow>
                </div>

                {/* Explainer */}
                <div className="flex-1 rounded-3xl border border-[#222] bg-[#111]/80 backdrop-blur-md shadow-xl p-8 overflow-y-auto hidden lg:block">
                    <h3 className="text-lg font-bold text-white mb-2 tracking-wide">Understanding the Files</h3>
                    <p className="text-sm text-[#888] mb-6 leading-relaxed">
                        Memory Bank files are markdown documents stored in your repository that act as the swarm's single source of truth.
                    </p>

                    <h4 className="text-xs font-bold text-[#555] mb-4 uppercase tracking-widest">Core Architecture</h4>
                    <ul className="space-y-4">
                        <li className="flex flex-col gap-1">
                            <span className="font-mono text-sm text-[#1BC5FF]">projectbrief.md</span>
                            <span className="text-xs text-[#888]">The foundation. High-level overview and core requirements.</span>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span className="font-mono text-sm text-[#00E59B]">productContext.md</span>
                            <span className="text-xs text-[#888]">Why we are building this. User problems and solutions.</span>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span className="font-mono text-sm text-[#FFB01B]">activeContext.md</span>
                            <span className="text-xs text-[#888]">What is happening right now. Current focus and active decisions.</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Bottom Section: Editor */}
            <section className="flex flex-1 gap-6 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-56 flex-shrink-0 flex flex-col gap-1 pr-2 overflow-y-auto">
                    <h3 className="mb-4 px-2 text-xs font-bold uppercase tracking-widest text-[#555]">
                        Files Explorer
                    </h3>
                    {files.map((file) => (
                        <button
                            key={file}
                            onClick={() => setSelectedFile(file)}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all text-left border",
                                selectedFile === file
                                    ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(46,144,255,0.1)]"
                                    : "text-[#888] border-transparent hover:bg-[#1A1A1A] hover:text-white"
                            )}
                        >
                            <LucideFileText className="h-4 w-4" />
                            {file}
                        </button>
                    ))}
                </aside>

                {/* Viewer */}
                <div className="flex-1 flex flex-col overflow-hidden rounded-3xl border border-[#222] bg-[#0A101F]/80 backdrop-blur-md shadow-xl relative">
                    <div className="flex items-center justify-between border-b border-[#222] bg-[#111]/80 px-6 py-4">
                        <span className="text-sm font-mono text-primary">{selectedFile}</span>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 rounded-lg bg-[#222] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#333] hover:text-[#00E59B]"
                        >
                            <LucideCopy className="h-3.5 w-3.5" />
                            COPY
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-[#222] scrollbar-track-transparent">
                        <pre className="font-mono text-sm text-[#CCC] whitespace-pre-wrap leading-relaxed">
                            {content}
                        </pre>
                    </div>
                </div>
            </section>
        </main>
    );
}
