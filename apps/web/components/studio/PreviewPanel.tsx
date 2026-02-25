"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Copy, Check, Eye, Code2, Monitor, Loader2 } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

// Simulated generated component
function PreviewComponent() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-4 mt-32">
            <Monitor className="w-16 h-16 stroke-[1]" />
            <p className="text-sm font-medium tracking-wide">Live preview awaiting generation</p>
        </div>
    );
}

export function PreviewPanel() {
    const [view, setView] = useState<"preview" | "code">("preview");
    const [copied, setCopied] = useState(false);
    const [isBuilding, setIsBuilding] = useState(true);

    // Simulate build time
    useState(() => {
        const timer = setTimeout(() => setIsBuilding(false), 2500);
        return () => clearTimeout(timer);
    });

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-full bg-[#040810] border-l border-white/5 relative z-20">
            {/* Panel Header */}
            <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-background/50 backdrop-blur-sm shadow-sm">
                <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                    <button
                        onClick={() => setView("preview")}
                        className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all", view === "preview" ? "bg-white/10 text-white shadow-sm" : "text-secondary-foreground hover:text-white")}
                    >
                        <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                    <button
                        onClick={() => setView("code")}
                        className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all", view === "code" ? "bg-white/10 text-white shadow-sm" : "text-secondary-foreground hover:text-white")}
                    >
                        <Code2 className="w-3.5 h-3.5" /> Source
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs text-secondary-foreground mr-2">
                        <Monitor className="w-3.5 h-3.5" /> 1024x768
                    </div>
                    <button onClick={handleCopy} className="p-1.5 text-secondary-foreground hover:text-white hover:bg-white/5 rounded-md transition-colors" title="Copy Code">
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary-foreground border border-primary/20 rounded-md text-xs font-medium transition-all group">
                        <Play className="w-3 h-3 group-hover:text-primary-foreground transition-colors" /> Deploy
                    </button>
                </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {view === "preview" && (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 w-full h-full bg-grid-white/[0.02] bg-[size:20px_20px]"
                        >
                            {isBuilding ? (
                                <div className="flex flex-col items-center justify-center h-full gap-4 text-secondary-foreground">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                    <span className="text-sm font-mono animate-pulse text-white/70">Building preview environment...</span>
                                </div>
                            ) : (
                                <div className="w-full h-full overflow-y-auto custom-scrollbar p-8 presentation-wrapper">
                                    <PreviewComponent />
                                </div>
                            )}
                        </motion.div>
                    )}

                    {view === "code" && (
                        <motion.div
                            key="code"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 w-full h-full overflow-y-auto bg-[#0d1117] p-8 text-sm font-mono leading-relaxed flex items-center justify-center flex-col text-white/30 space-y-4"
                        >
                            <Code2 className="w-16 h-16 stroke-[1]" />
                            <p className="text-sm font-medium tracking-wide">Source code awaiting generation...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
