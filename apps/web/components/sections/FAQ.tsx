"use client";

import { Section } from "@/components/layout/Section";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        q: "How does the autonomous agent architecture work?",
        a: "Our agents utilize a proprietary neural mesh network that allows for distributed processing and shared context. This ensures that as one agent learns, the entire collective intelligence improves instantly."
    },
    {
        q: "Is my data secure within the decentralized cloud?",
        a: "Absolutely. All data is encrypted with AES-256 before leaving your local environment. We maintain zero-knowledge proof architecture, meaning we cannot access your raw data or agent instructions."
    },
    {
        q: "Can I integrate with existing enterprise tools?",
        a: "Yes. We offer native integrations for over 100+ enterprise tools including Salesforce, Slack, GitHub, and Jira. Custom webhooks allow for connection to any REST API endpoint."
    },
    {
        q: "What constitutes a 'compute credit'?",
        a: "One compute credit equals approximately 1,000 token inputs or 500ms of active agent processing time. Tiered plans offer volume discounts for high-frequency trading or data processing agents."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <Section className="py-32" id="faq">
            <div className="container px-4 mx-auto max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Technical Usage FAQ</h2>
                    <p className="text-muted-foreground">Everything you need to know about the platform architecture.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "border rounded-xl transition-all duration-300 overflow-hidden",
                                openIndex === idx
                                    ? "bg-card/40 border-primary/30 shadow-neon-glow"
                                    : "bg-background border-white/5 hover:border-white/10"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                                <span className={cn("text-lg font-medium transition-colors", openIndex === idx ? "text-white" : "text-muted-foreground")}>
                                    {faq.q}
                                </span>
                                <div className={cn("p-2 rounded-full transition-colors", openIndex === idx ? "bg-primary text-black" : "bg-white/5 text-white")}>
                                    {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </div>
                            </button>

                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    openIndex === idx ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-white/5 mt-2">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
