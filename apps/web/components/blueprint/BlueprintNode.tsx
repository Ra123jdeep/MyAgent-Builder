import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { LucideLayout, LucideCpu, LucideDatabase, LucideShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BlueprintNode = memo(({ data }: { data: any }) => {
    // Parse details or default
    const rawFeatures = data?.details
        ? data.details.split('.').filter((d: string) => d.trim().length > 0)
        : ["Initialize module structure", "Setup basic routing", "Implement core logic"];
    const features = rawFeatures.slice(0, 3);
    const bottomFeature = rawFeatures.length > 3 ? rawFeatures[3] : null;

    // Icon selection
    const isDatabase = data?.label?.toLowerCase().includes("database") || data?.label?.toLowerCase().includes("schema");
    const isAuth = data?.label?.toLowerCase().includes("auth") || data?.label?.toLowerCase().includes("login");
    const isApi = data?.label?.toLowerCase().includes("api") || data?.label?.toLowerCase().includes("server");

    const Icon = isDatabase ? LucideDatabase : isAuth ? LucideShieldCheck : isApi ? LucideCpu : LucideLayout;

    return (
        <div className="relative group w-[280px]">

            {/* Connector Anchors (Visual only, to match screenshot look) */}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white border border-black z-50 rounded-[1px]" />
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white border border-black z-50 rounded-[1px]" />

            {/* Main Card */}
            <div className="relative bg-[#0F1218] rounded-none border-l-2 border-white/20 shadow-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">

                {/* Top Border Accent */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/20 to-transparent" />

                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                    <Icon className="w-5 h-5 text-white/80" />
                    <span className="text-base font-bold text-white tracking-wide font-sans">
                        {data.label}
                    </span>
                </div>

                {/* Body */}
                <div className="p-5 pt-4 space-y-4">

                    {/* Feature List */}
                    <div className="space-y-3">
                        {features.map((feature: string, i: number) => {
                            // Exact colors from reference: Green, Blue, Red
                            const bulletColor = i === 0 ? "bg-[#22C55E]" // Green
                                : i === 1 ? "bg-[#3B82F6]"   // Blue
                                    : i === 2 ? "bg-[#EF4444]"   // Red
                                        : "bg-[#A855F7]";            // Purple/Other

                            return (
                                <div key={i} className="flex items-start gap-3">
                                    {/* Square Bullet */}
                                    <div className={cn("mt-1.5 w-2.5 h-2.5 rounded-[1px] shrink-0", bulletColor)} />
                                    <span className="text-[11px] text-slate-300 font-medium font-mono leading-tight uppercase tracking-tight">
                                        {feature}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Action Line (Simulating the bottom item) */}
                    {bottomFeature && (
                        <div className="flex items-center gap-3 pt-1">
                            <div className="w-2.5 h-2.5 rounded-full border-2 border-red-500 shrink-0" />
                            <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider truncate w-full" title={bottomFeature.trim()}>
                                {bottomFeature.trim()}
                            </span>
                        </div>
                    )}

                    {/* Progress Bar (Thin line style) */}
                    <div className="w-full h-[2px] bg-white/10 mt-2">
                        <div className="h-full bg-white/40 w-3/4" />
                    </div>
                </div>

            </div>

            {/* Actual ReactFlow Handles (Invisible but functional, strictly positioned) */}
            <Handle
                type="target"
                position={Position.Left}
                className="!opacity-0 !w-4 !h-4 !left-[-10px]"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="!opacity-0 !w-4 !h-4 !right-[-10px]"
            />
        </div>
    );
});

BlueprintNode.displayName = "BlueprintNode";
