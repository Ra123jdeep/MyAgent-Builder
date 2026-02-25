import { Section } from "@/components/layout/Section";
import { Hexagon, Box, Umbrella, Snowflake } from "lucide-react";

export function TrustedBy() {
    return (
        <Section className="pt-12 md:pt-16 pb-2 md:pb-4 relative z-10 w-full overflow-hidden">
            {/* Subtle top/bottom borders and glows */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60">
                    <div className="flex items-center gap-3 text-2xl font-semibold text-white/80 hover:text-white hover:opacity-100 transition-all cursor-pointer">
                        <Hexagon className="w-8 h-8 text-primary" fill="currentColor" fillOpacity={0.2} />
                        Vertigo
                    </div>
                    <div className="flex items-center gap-3 text-2xl font-semibold text-white/80 hover:text-white hover:opacity-100 transition-all cursor-pointer">
                        <Box className="w-8 h-8 text-primary" fill="currentColor" fillOpacity={0.2} />
                        Stitemark
                    </div>
                    <div className="flex items-center gap-3 text-2xl font-medium text-white/80 hover:text-white hover:opacity-100 transition-all cursor-pointer">
                        <Umbrella className="w-8 h-8 text-white/50" />
                        umbrella
                    </div>
                    <div className="flex items-center gap-3 text-2xl font-semibold text-white/80 hover:text-white hover:opacity-100 transition-all cursor-pointer">
                        <Snowflake className="w-8 h-8 text-primary" />
                        Snowflake
                    </div>
                </div>
            </div>
        </Section>
    );
}
