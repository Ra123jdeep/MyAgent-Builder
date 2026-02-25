"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface NodeItem {
    id: string;
    label: string;
    details?: string;
}

interface MindMapFlowProps {
    nodes: NodeItem[];
    projectName?: string;
}

export default function MindMapFlow({ nodes = [], projectName = "Product Design" }: MindMapFlowProps) {
    if (!nodes || nodes.length === 0) return null;

    const CENTER_WIDTH = 200;
    const COLUMN_WIDTH = 280;
    const X_OFFSET = 140;
    const Y_SPACING = 110;

    const { leftNodes, rightNodes, height } = useMemo(() => {
        const left: any[] = [];
        const right: any[] = [];

        nodes.forEach((n, i) => {
            if (i % 2 === 0) {
                left.push(n);
            } else {
                right.push(n);
            }
        });

        const maxSide = Math.max(left.length, right.length);
        const containerHeight = Math.max(500, maxSide * Y_SPACING + 100);

        return { leftNodes: left, rightNodes: right, height: containerHeight };
    }, [nodes]);

    const containerWidth = 1000;
    const cx = containerWidth / 2;
    const cy = height / 2;

    const ACCENTS = ["#c026d3", "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6"];

    const renderNodes = (sideNodes: any[], isLeft: boolean) => {
        return sideNodes.map((node, i) => {
            const totalOnSide = sideNodes.length;
            const startY = cy - ((totalOnSide - 1) * Y_SPACING) / 2;
            const y = startY + i * Y_SPACING;

            const dotX = isLeft ? cx - X_OFFSET : cx + X_OFFSET;

            let features = node.details ? node.details.split('.').filter((d: string) => d.trim().length > 0) : [];
            // limit to 4 to match image style
            features = features.slice(0, 4);

            const colorIndex = (i * 2 + (isLeft ? 0 : 1)) % ACCENTS.length;
            const color = ACCENTS[colorIndex];

            // Smooth curve
            const controlOffset = 60;
            const startX = isLeft ? cx - 80 : cx + 80;
            const pathD = `M ${startX} ${cy} C ${startX} ${y}, ${startX + (isLeft ? -controlOffset : controlOffset)} ${y}, ${dotX} ${y}`;

            return (
                <React.Fragment key={node.id || i}>
                    {/* Path */}
                    <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" opacity="0.9" strokeLinecap="round" />

                    {/* Diamond */}
                    <rect x={dotX - 4} y={y - 4} width="8" height="8" fill={color} transform={`rotate(45 ${dotX} ${y})`} rx="1" />

                    {/* Content */}
                    <foreignObject
                        x={isLeft ? dotX - COLUMN_WIDTH - 15 : dotX + 15}
                        y={y - 80}
                        width={COLUMN_WIDTH}
                        height="160"
                        className="overflow-visible"
                    >
                        <div className={cn(
                            "w-full h-full flex flex-col justify-center gap-1.5",
                            isLeft ? "items-end text-right" : "items-start text-left"
                        )}>
                            <span className="text-[14px] font-bold text-white/95 leading-tight tracking-wide">
                                {node.label}
                            </span>
                            {features.length > 0 && (
                                <div className={cn(
                                    "flex flex-col gap-1 w-full",
                                    isLeft ? "items-end" : "items-start"
                                )}>
                                    {features.map((f: string, idx: number) => (
                                        <span key={idx} className="text-[11px] font-medium text-white/50 tracking-wide leading-snug max-w-[260px]">
                                            {f.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </foreignObject>
                </React.Fragment>
            );
        });
    };

    const words = projectName.split(" ");
    const centerLine1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
    const centerLine2 = words.slice(Math.ceil(words.length / 2)).join(" ");

    return (
        <div className="w-full flex justify-center overflow-x-auto overflow-y-hidden bg-[#000000] border border-white/5 rounded-3xl py-12" style={{ minHeight: '600px' }}>
            <svg width={containerWidth} height={height} className="overflow-visible font-sans" style={{ minWidth: `${containerWidth}px` }}>

                {renderNodes(leftNodes, true)}
                {renderNodes(rightNodes, false)}

                {/* Central Focus */}
                <foreignObject x={cx - CENTER_WIDTH / 2} y={cy - 50} width={CENTER_WIDTH} height="100">
                    <div className="w-full h-full flex flex-col items-center justify-center pt-2">
                        <span className="text-[22px] font-extrabold text-white leading-[1.1] text-center tracking-tight">
                            {centerLine1}<br />{centerLine2}
                        </span>
                    </div>
                </foreignObject>
            </svg>
        </div>
    );
}
