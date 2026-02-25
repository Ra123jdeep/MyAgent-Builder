"use client";

import { Section } from "@/components/layout/Section";
import { Hammer, ArrowRight, Twitter, Github, Linkedin, Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ComingSoonPage() {
    return (
        <Section className="min-h-screen flex flex-col items-center justify-center bg-[#070E1A] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none mix-blend-screen" />

            <div className="text-center space-y-8 max-w-2xl px-4 relative z-10">

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider mb-2 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Development in Progress
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                        Fabricating <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            Next-Gen Module
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg mx-auto">
                        Our autonomous agents are currently architecting this feature.
                        Join the waitlist to be notified when it goes live.
                    </p>
                </div>

                {/* Notify Me Form */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary/50 outline-none backdrop-blur-sm"
                    />
                    <button className="bg-primary hover:bg-primary/90 text-black font-bold px-6 py-3 rounded-xl transition-all shadow-neon-glow flex items-center justify-center gap-2">
                        Notify Me <Bell className="w-4 h-4" />
                    </button>
                </div>

                <div className="pt-8 flex flex-col items-center gap-6">
                    <div className="flex gap-4">
                        {[Twitter, Github, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-secondary/30 border border-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-all">
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>

                    <Link href="/">
                        <Button variant="ghost" className="text-muted-foreground hover:text-white hover:bg-transparent gap-2">
                            <ArrowRight className="w-4 h-4 rotate-180" /> Return to Mission Control
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </Section>
    );
}
