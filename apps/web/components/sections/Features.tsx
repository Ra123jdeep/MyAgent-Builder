import { Section } from "@/components/layout/Section";
import { Globe, Layers, Triangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Features() {
    return (
        <Section className="bg-background relative overflow-hidden py-24" id="features">
            <div className="container relative z-10 px-4 mx-auto max-w-6xl">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        Everything You Need to Launch <br />
                        the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">Next Big SaaS Product</span>
                    </h2>
                </div>

                {/* 3-Card Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1 */}
                    <div className="relative group p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-primary/50 to-white/5 hover:from-cyan-400/50 hover:to-primary/30 transition-all duration-500 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative h-full bg-[#0B0F14]/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">Live Agent Thinking</h3>
                            </div>
                            <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                Watch AI architects plan and refine your SaaS architecture in real-time.
                            </p>

                            {/* Inner UI element */}
                            <div className="bg-black/40 border border-white/5 rounded-lg p-4 mt-auto">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                    <div className="text-xs text-white/60 font-mono">Real-time thought process...</div>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-primary to-cyan-400 w-3/4 rounded-full"></div>
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
                                <h3 className="text-lg font-semibold text-white">Debate Engine</h3>
                            </div>
                            <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                See multiple AI agents debate the best solution for your architecture.
                            </p>

                            {/* Inner UI element */}
                            <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                    <div className="text-xs text-white/80 font-mono"><span className="text-white">Reasoning</span> | Deepened Perspectives</div>
                                </div>
                                <div className="w-8 h-4 bg-primary/30 rounded-full border border-primary/50 flex items-center px-0.5">
                                    <div className="w-3 h-3 rounded-full bg-white ml-auto shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
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
                                <h3 className="text-lg font-semibold text-white">Reality Check Mode</h3>
                            </div>
                            <p className="text-muted-foreground text-sm mb-6 flex-grow">
                                See realistic AI agent evaluations for post-scalability and security.
                            </p>

                            {/* Inner UI element */}
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
                                            strokeDasharray="84, 100"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <span className="absolute text-xs font-bold text-white">84%</span>
                                </div>
                                <div className="space-y-2 flex-grow">
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-400 w-full rounded-full"></div>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary/70 w-2/3 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Centered CTA */}
                <div className="flex justify-center">
                    <Button className="bg-primary/20 hover:bg-primary/40 border border-primary/50 text-white rounded-full px-8 h-12 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
                        <span className="mr-2">See All Features</span>
                        <span className="text-primary-foreground">&raquo;</span>
                    </Button>
                </div>

            </div>
        </Section>
    );
}
