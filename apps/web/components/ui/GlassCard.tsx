import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: "default" | "feature" | "dark";
    hoverEffect?: boolean;
}

export function GlassCard({
    children,
    className,
    variant = "default",
    hoverEffect = false,
    ...props
}: GlassCardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl backdrop-blur-glass border transition-all duration-300",
                {
                    "bg-card border-card-border": variant === "default",
                    "bg-secondary/40 border-secondary-hover": variant === "feature",
                    "bg-[#0B0F0D]/80 border-white/5": variant === "dark",
                },
                hoverEffect && "hover:bg-secondary/60 hover:shadow-neon-glow hover:-translate-y-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
