import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export function Button({
    children,
    className,
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-pill focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none",
                {
                    // Variants
                    "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 hover:shadow-neon-glow hover:-translate-y-0.5 border border-white/10": variant === "primary",
                    "bg-white/5 text-foreground border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-glass": variant === "secondary",
                    "bg-transparent text-foreground hover:bg-white/5 hover:text-cyan": variant === "ghost",
                    "bg-transparent border border-white/20 text-foreground hover:border-cyan/50 hover:text-cyan hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]": variant === "outline",

                    // Sizes
                    "text-sm px-4 py-2": size === "sm",
                    "text-base px-6 py-3": size === "md",
                    "text-lg px-8 py-4": size === "lg",
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
