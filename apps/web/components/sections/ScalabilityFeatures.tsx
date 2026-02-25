import { Section } from "@/components/layout/Section";
import { Globe, Layers, Triangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ScalabilityFeatures() {
    return (
        <Section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
            <div className="container relative z-10 px-4 mx-auto max-w-6xl">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        Engineered for <span className="text-cyan-400">Infinite Scalability</span>
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base tracking-wide uppercase">
                        A complete toolkit designed for the next generation of AI-native applications.
                    </p>
                </div>

                {/* 3-Card Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1 */}
                    <div className="relative group p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 hover:from-primary/40 hover:to-white/10 transition-all duration-500">
                        <div className="relative h-full bg-[#0B0F14]/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/20 transition-all">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">Live Agent Thinking</h3>
                            </div>
                            <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                Watch AI architects plan and refine your ideas.
                            </p>

                            <div className="bg-black/40 border border-white/5 rounded-lg p-4 mt-auto">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-xs text-white/60 font-mono">See four agents navigate soon.</div>
                                    <div className="text-xs text-white/40 font-mono">100% v</div>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-primary to-cyan-400 w-full rounded-full cursor-pointer"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative group p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 hover:from-primary/40 hover:to-white/10 transition-all duration-500">
                        <div className="relative h-full bg-[#0B0F14]/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-primary/30 group-hover:bg-primary/20 transition-all">
                                    <Layers className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">Demand Engine</h3>
                            </div>
                            <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                See multiple AI agents working hand in hand to solve complex problems.
                            </p>

                            <div className="bg-black/40 border border-white/5 rounded-lg p-4 mt-auto">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-4 h-4 rounded bg-cyan-400" />
                                    <div className="text-xs text-white/60 font-mono">Reasoning | Segmented Pagination</div>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-white/40">
                                    <div className="w-1/2 h-1 bg-cyan-400/50 rounded-full"></div>
                                    <span>200</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative group p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 hover:from-primary/40 hover:to-white/10 transition-all duration-500">
                        <div className="relative h-full bg-[#0B0F14]/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-primary/30 group-hover:bg-cyan-500/20 transition-all">
                                    <Triangle className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">Neural Engine</h3>
                            </div>
                            <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                Parse details of development in stages to multi-agent.
                            </p>

                            <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex items-center gap-4 mt-auto">
                                <div className="relative w-12 h-12 flex items-center justify-center">
                                    <svg viewBox="0 0 36 36" className="w-full h-full text-cyan-400 transform -rotate-90">
                                        <path
                                            className="text-white/10"
                                            strokeWidth="3"
                                            stroke="currentColor"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            strokeWidth="3"
                                            strokeDasharray="8.4, 100"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <span className="absolute text-[10px] font-bold text-white">8.4%</span>
                                </div>
                                <div className="space-y-2 flex-grow">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                        <div className="h-1.5 w-full bg-white/10 rounded-full"></div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                        <div className="h-1.5 w-full bg-white/10 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Centered CTA */}
                <div className="flex justify-center">
                    <Button className="bg-blue-900/10 hover:bg-blue-900/30 border border-blue-500/50 text-white rounded-full px-8 h-12 shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                        <span className="mr-2">See All Features</span>
                        <span className="text-blue-400">&raquo;</span>
                    </Button>
                </div>

            </div>
        </Section>
    );
}
