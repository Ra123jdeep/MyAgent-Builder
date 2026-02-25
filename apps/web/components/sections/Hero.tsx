import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { Users, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <Section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden relative">
            {/* Background Gradients & Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1e1b4b_0%,#0B0F14_50%)] pointer-events-none" />
            <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full opacity-30 mix-blend-screen pointer-events-none" />
            <div className="absolute top-40 right-10 w-[800px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full opacity-40 mix-blend-screen pointer-events-none" />
            <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent)]" />

            <div className="container relative z-10 mx-auto px-4 lg:grid lg:grid-cols-2 lg:gap-12 items-center">

                {/* Left Text Block */}
                <div className="flex flex-col text-left mb-16 lg:mb-0 max-w-2xl mx-auto lg:mx-0">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                        Turn Ideas Into <br />
                        <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">AI-Ready</span> SaaS <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-primary to-primary pb-2">
                            Blueprints.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 font-light max-w-xl">
                        Let autonomous agents design your SaaS architecture instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-6 mb-8">
                        <Link href="/create">
                            <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all border border-blue-400/50">
                                Get Started Free
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2 mr-2">
                                <div className="w-8 h-8 rounded-full border-2 border-background bg-cyan-500/20 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-primary/50" />
                                </div>
                            </div>
                            <span className="text-cyan-400 font-bold">6000+</span> Builders
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            Trusted Worldwide
                        </div>
                    </div>
                </div>

                {/* Right Mockup Block */}
                <div className="relative w-full max-w-3xl mx-auto lg:mr-[-100px] xl:mr-[-200px]">
                    {/* Glowing effect behind mockups */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-cyan-500/20 to-transparent blur-3xl opacity-50 rounded-full" />

                    {/* Main UI Mockup */}
                    <div className="relative z-20 bg-[#0B0F14]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(139,92,246,0.3)] overflow-hidden transform lg:-rotate-2 transition-transform hover:rotate-0 duration-700">
                        {/* Header */}
                        <div className="h-10 bg-white/[0.03] border-b border-white/5 flex items-center px-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                                <div className="w-3 h-3 rounded-full bg-white/20" />
                            </div>
                            <div className="mx-auto text-[11px] font-mono text-white/40 flex items-center gap-2 bg-white/5 px-4 py-1 rounded">
                                MyAgent Builder <span className="text-primary">Agent Running</span>
                            </div>
                        </div>
                        {/* Body */}
                        <div className="p-6">
                            <div className="mb-6 flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-lg p-4">
                                <div>
                                    <div className="text-sm text-white/60 mb-1 font-mono">Describe your SaaS Project...</div>
                                    <div className="h-2 w-48 bg-white/10 rounded-full" />
                                </div>
                                <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-4 mb-6">
                                <div className="h-3 w-3/4 bg-white/10 rounded-full" />
                                <div className="h-3 w-5/6 bg-white/10 rounded-full" />
                                <div className="h-3 w-1/2 bg-white/10 rounded-full" />
                            </div>
                            <div className="flex gap-4">
                                <input type="text" placeholder="Step your email" className="bg-white/5 border border-white/10 rounded-full px-6 py-2 flex-grow text-sm outline-none placeholder:text-white/30" />
                                <Button className="bg-blue-600 hover:bg-blue-500 border border-blue-400/50 shadow-[0_0_20px_rgba(37,99,235,0.5)] text-white rounded-full px-6">Get Started</Button>
                            </div>
                        </div>

                        {/* Agent status bar mock */}
                        <div className="border-t border-white/5 bg-black/40 p-3 flex items-center justify-around text-xs text-white/50 font-mono">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-cyan-400" /> Mongo DB Setup</span>
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-primary" /> Planner Agent</span>
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-pink-500" /> Architect Agent</span>
                        </div>
                    </div>

                    {/* Secondary overlapping mockups */}
                    <div className="absolute top-1/2 -left-12 -translate-y-1/2 z-30 bg-[#0B0F14]/95 backdrop-blur-xl p-4 flex items-center gap-4 rounded-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transform -rotate-[5deg]">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-primary p-0.5">
                            <div className="w-full h-full bg-background rounded-full flex items-center justify-center border-2 border-background">
                                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-white mb-1">Architecture Generated</div>
                            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="w-full h-full bg-cyan-400 rounded-full" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    );
}
