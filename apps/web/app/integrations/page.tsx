"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Search, Github, Slack, MessageSquare, Command, Zap, Bot, Database, Mail, Cloud, Globe, Shield, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock data for integrations
const categories = ["All", "Communication", "Development", "Productivity", "AI & ML", "Infrastructure"];

const allIntegrations = [
    { name: "Slack", category: "Communication", icon: Slack, description: "Real-time messaging and collaboration." },
    { name: "GitHub", category: "Development", icon: Github, description: "Code hosting and collaboration." },
    { name: "Discord", category: "Communication", icon: MessageSquare, description: "Community chat and voice communication." },
    { name: "Notion", category: "Productivity", icon: Command, description: "All-in-one workspace for notes and tasks." },
    { name: "Linear", category: "Productivity", icon: Zap, description: "Issue tracking and project management." },
    { name: "OpenAI", category: "AI & ML", icon: Bot, description: "Access powerful AI models." },
    { name: "PostgreSQL", category: "Infrastructure", icon: Database, description: "Advanced open source relational database." },
    { name: "Gmail", category: "Communication", icon: Mail, description: "Email service by Google." },
    { name: "AWS", category: "Infrastructure", icon: Cloud, description: "Cloud computing services." },
    { name: "Vercel", category: "Development", icon: Globe, description: "Develop, preview, and ship." },
    { name: "Auth0", category: "Infrastructure", icon: Shield, description: "Secure access for everyone." },
    { name: "Sentry", category: "Development", icon: Activity, description: "Application monitoring and error tracking." },
];

export default function IntegrationsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [connectedTools, setConnectedTools] = useState<string[]>([]);
    const [loadingTool, setLoadingTool] = useState<string | null>(null);

    const filteredIntegrations = allIntegrations.filter(tool => {
        const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleConnect = (toolName: string) => {
        if (connectedTools.includes(toolName) || loadingTool === toolName) return;

        setLoadingTool(toolName);
        setTimeout(() => {
            setConnectedTools(prev => [...prev, toolName]);
            setLoadingTool(null);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground flex flex-col">
            {/* Header */}
            <div className="border-b border-white/5 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>
                    <div className="font-bold text-lg tracking-tight">Integration Library</div>
                    <div className="w-24" /> {/* Spacer for alignment */}
                </div>
            </div>

            <Section className="flex-1 py-12">
                <div className="container mx-auto px-4 space-y-12">

                    {/* Hero Text */}
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            Supercharge your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                Workflow
                            </span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Explore our extensive library of integrations. Connect your favorite tools to streamline capabilities and automate tasks.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="space-y-6">
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search integrations..."
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-primary/50 text-base h-12 rounded-xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                                        selectedCategory === category
                                            ? "bg-primary/10 border-primary text-primary shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                                            : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredIntegrations.map((tool) => {
                            const isConnected = connectedTools.includes(tool.name);
                            const isLoading = loadingTool === tool.name;

                            return (
                                <div
                                    key={tool.name}
                                    className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all duration-300 flex flex-col gap-4"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-primary/20 transition-colors">
                                            <tool.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <Button
                                            size="sm"
                                            variant={isConnected ? "outline" : "primary"}
                                            className={cn(
                                                "rounded-full transition-all duration-300",
                                                isConnected
                                                    ? "border-primary/50 text-primary bg-primary/5 hover:bg-primary/10"
                                                    : "bg-white text-black hover:bg-white/90"
                                            )}
                                            onClick={() => handleConnect(tool.name)}
                                            disabled={isLoading || isConnected}
                                        >
                                            {isLoading ? (
                                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            ) : isConnected ? (
                                                "Connected"
                                            ) : (
                                                "Connect"
                                            )}
                                        </Button>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-white text-lg">{tool.name}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {tool.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-auto border-t border-white/5 flex items-center gap-2">
                                        <div className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-muted-foreground border border-white/5">
                                            {tool.category}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredIntegrations.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <p className="text-lg">No integrations found matching your criteria.</p>
                            <Button variant="ghost" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                                Clear filters
                            </Button>
                        </div>
                    )}

                </div>
            </Section>
        </main>
    );
}
