"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useProject } from "@/context/ProjectContext";
import { Button } from "@/components/ui/Button";
import { Plus, Home, ArrowLeft } from "lucide-react";

const tabs = [
    { name: "Overview", href: "/create" },
    { name: "Tickets Board", href: "/tickets" },
    { name: "User Flow", href: "/flow" },
    { name: "Memory Bank", href: "/memory-bank" },
];

export function DashboardTabs() {
    const pathname = usePathname();
    const router = useRouter();
    const { resetProject } = useProject();

    const handleNewProject = () => {
        resetProject();
        router.push("/create");
    };

    return (
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2">
            <div className="flex items-center gap-8">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={cn(
                                "text-sm font-medium transition-colors relative",
                                isActive ? "text-white" : "text-muted-foreground hover:text-white/80"
                            )}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {tab.name}
                            {isActive && (
                                <span className="absolute -bottom-4 left-0 w-full h-[2px] bg-primary shadow-[0_0_8px_rgba(46,144,255,0.8)]" />
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className="flex items-center gap-3">
                <Button
                    onClick={() => router.push("/")}
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-slate-300 hover:bg-white/5 hover:text-white"
                >
                    <Home className="h-4 w-4" />
                    Home
                </Button>
                <Button
                    onClick={() => router.push("/create?view=input")}
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent border-white/10 hover:bg-white/5 hover:text-white text-slate-300"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Input
                </Button>
                <Button
                    onClick={handleNewProject}
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent border-white/10 hover:bg-white/5 hover:text-white text-slate-300"
                >
                    <Plus className="h-4 w-4" />
                    New Project
                </Button>
            </div>
        </div>
    );
}
