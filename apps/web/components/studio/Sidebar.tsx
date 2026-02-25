"use client";

import { motion } from "framer-motion";
import { Users, GitBranch, ListTodo, Activity, BrainCircuit, Database, Sparkles, Settings } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
    { icon: Users, label: "Users", id: "users" },
    { icon: GitBranch, label: "Flow", id: "flow" },
    { icon: ListTodo, label: "Tickets Board", id: "tickets" },
    { icon: Activity, label: "Overview", id: "overview" },
    { icon: BrainCircuit, label: "Memory Bank", id: "memory" },
    { icon: Database, label: "Data", id: "data" },
    { icon: Sparkles, label: "AI Tools", id: "ai" },
];

export function Sidebar() {
    const [activeId, setActiveId] = useState("overview");

    return (
        <div className="flex flex-col w-[72px] h-full bg-[#050505] border-r border-[#1a1a1a] py-4 items-center justify-between shadow-2xl z-50">
            <div className="flex flex-col gap-4 w-full px-2">
                {/* Brand Logo - Skwibble style */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1BC5FF] via-[#2E90FF] to-[#1A7AE6] flex items-center justify-center mb-6 mx-auto shadow-[0_0_20px_rgba(46,144,255,0.4)] cursor-pointer hover:scale-105 transition-transform duration-300">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>

                {NAV_ITEMS.map((item) => {
                    const isActive = activeId === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveId(item.id)}
                            className={cn(
                                "relative group flex items-center justify-center w-[52px] h-[52px] rounded-2xl transition-all duration-300 mx-auto",
                                isActive
                                    ? "bg-[#111] border border-[#333] shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                                    : "hover:bg-[#111] hover:border-[#222] border border-transparent"
                            )}
                            title={item.label}
                        >
                            {isActive && (
                                <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#2E90FF] rounded-r-full shadow-[0_0_12px_rgba(46,144,255,0.8)]" />
                            )}
                            <Icon
                                strokeWidth={isActive ? 2.5 : 2}
                                className={cn(
                                    "w-[22px] h-[22px] relative z-10 transition-all duration-300",
                                    isActive ? "scale-110 text-[#2E90FF] drop-shadow-[0_0_8px_rgba(46,144,255,0.5)]" : "text-[#888] group-hover:text-white"
                                )}
                            />
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col gap-4 w-full px-2">
                {/* Settings */}
                <button
                    className="relative group flex items-center justify-center w-[52px] h-[52px] rounded-2xl transition-all duration-300 mx-auto border border-transparent hover:bg-[#111] hover:border-[#222]"
                    title="Settings"
                >
                    <Settings strokeWidth={2} className="w-[22px] h-[22px] text-[#888] group-hover:text-white transition-colors" />
                </button>
                {/* Avatar Placeholder */}
                <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-tr from-[#222] to-[#333] border border-[#444] flex items-center justify-center mx-auto overflow-hidden  cursor-pointer hover:border-[#666] transition-colors shadow-lg">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Prodigy" alt="User" className="w-[85%] h-[85%] object-cover rounded-xl" />
                </div>
            </div>
        </div>
    );
}
