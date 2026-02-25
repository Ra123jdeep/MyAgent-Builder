import { Section } from "@/components/layout/Section";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        quote: "The interface is absolutely stunning. It feels like I'm using software from 2030. The agent builder is intuitive and powerful.",
        author: "Alex Morgan",
        role: "Senior Developer",
        company: "TechCorp",
        rating: 5
    },
    {
        quote: "We've automated 80% of our customer support workflow using these agents. The dark mode is easy on the eyes for late night builds.",
        author: "Sarah Chen",
        role: "CTO",
        company: "FutureFlow",
        rating: 5
    },
    {
        quote: "Finally, a builder that respects visual design as much as functionality. The neural engine creates startlingly human-like responses.",
        author: "James Wilson",
        role: "Product Designer",
        company: "Designify",
        rating: 5
    },
];

export function Testimonials() {
    return (
        <Section className="relative py-32 bg-background overflow-hidden">
            {/* Background Grid & Glow (Tech Aesthetic) */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none mix-blend-screen" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Community Consensus</h2>
                    <p className="text-muted-foreground">Join thousands of visionaries building the future.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="bg-card/30 border border-white/5 p-8 rounded-3xl flex flex-col justify-between backdrop-blur-md relative overflow-hidden group hover:border-primary/30 hover:bg-card/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-neon-glow"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="flex gap-1 mb-6 relative z-10">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "w-4 h-4",
                                            i < t.rating ? "text-primary fill-primary" : "text-white/10 fill-white/10"
                                        )}
                                    />
                                ))}
                            </div>

                            <p className="text-lg text-white/90 mb-8 font-light italic leading-relaxed relative z-10">"{t.quote}"</p>

                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-bold text-white/50 text-xs">
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm">{t.author}</div>
                                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                        {t.role}, <span className="text-primary/80">{t.company}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
