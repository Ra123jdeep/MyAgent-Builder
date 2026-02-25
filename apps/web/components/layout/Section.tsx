import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
}

export function Section({
    children,
    className,
    fullWidth = false,
    ...props
}: SectionProps) {
    return (
        <section
            className={cn(
                "py-16 md:py-24 relative overflow-hidden",
                className
            )}
            {...props}
        >
            <div className={cn(
                "mx-auto px-4 md:px-6",
                fullWidth ? "w-full" : "max-w-7xl"
            )}>
                {children}
            </div>
        </section>
    );
}
