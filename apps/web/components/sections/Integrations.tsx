import { Section } from "@/components/layout/Section";
import { Github, Slack, Zap } from "lucide-react";

export function Integrations() {
    return (
        <Section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
            <div className="container px-4 mx-auto relative z-10 max-w-6xl">

                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">Everything.</span>
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
                        Seamlessly integrate with your favorite tools. From databases to messaging apps. Our ecosystem handles it all with zero friction APIs.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">

                    {/* Slack */}
                    <div className="bg-[#0f1420]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col group hover:border-cyan-400/50 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                                <Slack className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Slack</h3>
                        </div>
                        <ul className="space-y-3 mb-12 flex-grow">
                            <li className="flex items-start gap-2 text-sm text-white/60">
                                <div className="w-1 h-1 rounded-full bg-white/40 mt-2" />
                                Watch AI architects plan and refine
                            </li>
                        </ul>

                        <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                            <div className="text-xs text-white/40 font-mono mb-2">Data Analysis | Done</div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-400 w-full rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* GitHub */}
                    <div className="bg-[#0f1420]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col group hover:border-primary/50 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                                <Github className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white">GitHub</h3>
                        </div>
                        <ul className="space-y-3 mb-12 flex-grow">
                            <li className="flex items-start gap-2 text-sm text-white/60">
                                <div className="w-1 h-1 rounded-full bg-white/40 mt-2" />
                                Automate deployment convention
                            </li>
                        </ul>

                        <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                            <div className="text-xs text-white/40 font-mono mb-2">Gen Admin Section</div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-white/20 w-1/3 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Linear */}
                    <div className="bg-[#0f1420]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col group hover:border-primary/50 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Linear</h3>
                        </div>
                        <ul className="space-y-3 mb-12 flex-grow">
                            <li className="flex items-start gap-2 text-sm text-white/60">
                                <div className="w-1 h-1 rounded-full bg-white/40 mt-2" />
                                Database issues Tracking tags
                            </li>
                        </ul>

                        <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                            <div className="text-xs text-white/40 font-mono mb-2">Detail Server</div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-2/3 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Section>
    );
}
