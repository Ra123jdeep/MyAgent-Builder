import { Section } from "@/components/layout/Section";

export function MetricsCard() {
    return (
        <Section className="pt-4 pb-16 md:pt-6 md:pb-24 relative z-10 w-full overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl">

                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-medium text-white/90 tracking-wide">
                        Trusted by Forward-Thinking Teams at
                    </h2>
                </div>

                <div className="bg-black/20 backdrop-blur-3xl border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row shadow-[0_0_50px_rgba(34,211,238,0.02),inset_0_0_20px_rgba(139,92,246,0.02)]">

                    {/* Stat 1 */}
                    <div className="flex-1 px-4 md:px-8 py-4 md:py-0 md:border-r border-white/10">
                        <div className="text-white/60 text-sm font-medium mb-3">Total Value Locked</div>
                        <div className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">$842.5<span className="text-3xl">M</span></div>
                        <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                            <span>Protocol Development</span>
                            <span className="text-cyan-400 font-mono">85.3%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-cyan-400 w-[85.3%] rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                        </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex-1 px-4 md:px-8 py-4 md:py-0 md:border-r border-white/10 flex flex-col justify-center">
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-primary text-xl font-bold">+</span>
                            <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 tracking-tight">1241</span>
                            <span className="text-white/40 text-sm font-mono tracking-widest uppercase ml-2">/ Sec</span>
                        </div>
                        <div className="text-white/60 text-sm font-medium">Transactions / Sec</div>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex-1 px-4 md:px-8 py-4 md:py-0 flex flex-col justify-center">
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-white font-bold text-xl">+</span>
                            <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">122</span>
                            <span className="text-white/40 text-xs font-mono ml-2 border border-white/10 rounded px-1.5 py-0.5">NET</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/60 mt-2">
                            <span className="flex items-center text-primary text-xs font-bold bg-primary/10 px-2 py-0.5 rounded-full">
                                ↑ 18.2%
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    );
}
