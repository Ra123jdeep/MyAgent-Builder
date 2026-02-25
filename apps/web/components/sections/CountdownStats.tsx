"use client";

import { Section } from "@/components/layout/Section";
import { Circle, Hexagon, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export function CountdownStats() {
    const [timeLeft, setTimeLeft] = useState({
        days: 4,
        hours: 12,
        secs: 18
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let newSecs = prev.secs - 1;
                let newHours = prev.hours;
                let newDays = prev.days;

                if (newSecs < 0) {
                    newSecs = 59;
                    // Mock hour countdown for demo purposes
                    newHours -= 1;
                }
                if (newHours < 0) {
                    newHours = 23;
                    newDays -= 1;
                }

                return { days: Math.max(0, newDays), hours: newHours, secs: newSecs };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
            <div className="container px-4 mx-auto relative z-10 max-w-5xl">

                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Mainnet Ignition <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">Sequence Initiated</span>
                    </h2>
                    <p className="text-muted-foreground text-sm uppercase tracking-wide">
                        A complete toolkit designed for the next generation of AI-native applications.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Days */}
                    <div className="bg-[#0f1420]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                        <div className="w-12 h-12 mr-6 text-white/20 flex items-center justify-center">
                            <Circle className="w-10 h-10" />
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</span>
                                <span className="text-lg text-white/60">Days</span>
                            </div>
                            <div className="text-xs text-white/40 mt-1 font-mono flex items-center gap-2">
                                Version <span className="text-cyan-400">RC 19.8%  ↑</span>
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="bg-[#0f1420]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                        <div className="w-12 h-12 mr-6 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center text-primary">
                            <Hexagon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                                <span className="text-lg text-white/60">Hours</span>
                            </div>
                            <div className="text-xs text-white/40 mt-1 font-mono">
                                DataSync <span className="ml-2 text-white/30">CTD - 891 10BB</span>
                            </div>
                        </div>
                    </div>

                    {/* Seconds */}
                    <div className="bg-[#0f1420]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                        <div className="w-12 h-12 mr-6 bg-cyan-400/10 rounded-xl border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-white">{String(timeLeft.secs).padStart(2, '0')}</span>
                                <span className="text-lg text-white/60">Sec</span>
                            </div>
                            <div className="text-xs text-white/40 mt-1 font-mono">
                                1425 Viws <span className="ml-2 text-white/30">Product Designs</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Section>
    );
}
