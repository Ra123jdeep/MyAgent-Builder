"use client";

import React, { useMemo } from "react";
import { LucideLayoutTemplate } from "lucide-react";

interface NodeItem {
    id: string;
    label: string;
    type?: string;
    details?: string;
}

interface EdgeItem {
    source: string;
    target: string;
    label?: string;
}

interface HorizontalFlowProps {
    nodes: NodeItem[];
    edges: EdgeItem[];
}

export default function HorizontalFlow({ nodes = [], edges = [] }: HorizontalFlowProps) {
    // If no nodes, don't break, just return empty
    if (!nodes || nodes.length === 0) return null;

    const { layoutNodes, layoutEdges, containerWidth, containerHeight } = useMemo(() => {
        // 1. Determine root nodes (nodes with 0 incoming edges)
        const incomingCount: Record<string, number> = {};
        const outgoingMap: Record<string, string[]> = {};

        nodes.forEach(n => {
            incomingCount[n.id] = 0;
            if (!outgoingMap[n.id]) outgoingMap[n.id] = [];
        });

        edges.forEach(e => {
            if (incomingCount[e.target] !== undefined) incomingCount[e.target]++;
            if (!outgoingMap[e.source]) outgoingMap[e.source] = [];
            outgoingMap[e.source].push(e.target);
        });

        let roots = nodes.filter(n => incomingCount[n.id] === 0);
        if (roots.length === 0 && nodes.length > 0) {
            // Fallback if there's a cycle or no clear root
            roots = [nodes[0]];
        }

        // 2. BFS to determine node columns (depth) and sort them into a grid layout
        const columns: NodeItem[][] = [];
        const visited = new Set<string>();

        let currentLevel = [...roots];

        while (currentLevel.length > 0) {
            // Add valid nodes to the current column array
            const colNodes = currentLevel.filter(n => !visited.has(n.id));
            if (colNodes.length > 0) {
                columns.push(colNodes);
            }

            const nextLevel: NodeItem[] = [];
            currentLevel.forEach(node => {
                visited.add(node.id);
                const childrenIds = outgoingMap[node.id] || [];
                childrenIds.forEach(targetId => {
                    if (!visited.has(targetId)) {
                        const targetNode = nodes.find(n => n.id === targetId);
                        if (targetNode) nextLevel.push(targetNode);
                    }
                });
            });
            // Deduplicate next level
            currentLevel = Array.from(new Set(nextLevel.map(n => n.id)))
                .map(id => nextLevel.find(n => n.id === id)!)
                .filter(Boolean);
        }

        // 3. Coordinate Math Based on Grid
        const NODE_WIDTH = 220;
        const NODE_HEIGHT = 140;
        const COL_GAP = 120; // horizontal gap
        const ROW_GAP = 60;  // vertical gap

        const calculatedNodes: Array<NodeItem & { x: number; y: number; rowIndex: number; colIndex: number }> = [];

        // Find max rows for centering vertically
        let maxRows = 0;
        columns.forEach(col => {
            if (col.length > maxRows) maxRows = col.length;
        });

        let xCursor = 40; // Intial X padding
        columns.forEach((col, cIndex) => {
            const colHeight = col.length * NODE_HEIGHT + (col.length - 1) * ROW_GAP;
            // Center vertically if there are fewer nodes than maxRows
            let yCursor = ((maxRows * NODE_HEIGHT + (maxRows - 1) * ROW_GAP) - colHeight) / 2 + 40; // Initial Y padding=40

            col.forEach((node, rIndex) => {
                calculatedNodes.push({
                    ...node,
                    x: xCursor,
                    y: yCursor,
                    rowIndex: rIndex,
                    colIndex: cIndex,
                });
                yCursor += NODE_HEIGHT + ROW_GAP;
            });
            xCursor += NODE_WIDTH + COL_GAP;
        });

        return {
            layoutNodes: calculatedNodes,
            layoutEdges: edges,
            containerWidth: xCursor, // Total width + padding
            containerHeight: maxRows * NODE_HEIGHT + (maxRows - 1) * ROW_GAP + 80 // Total height + 40px top/bot padding
        };
    }, [nodes, edges]);

    // Accent colors array matching the reference screenshot (white, red, green, blue, purple, yellow)
    const ACCENTS = ["#ffffff", "#ef4444", "#22c55e", "#0ea5e9", "#a855f7", "#eab308", "#f97316"];

    return (
        <div className="w-full overflow-x-auto overflow-y-hidden" style={{ minHeight: '300px' }}>
            <div
                className="relative"
                style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}
            >
                {/* Draw SVG Background Elements (Lines connecting nodes) */}
                <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                    {layoutEdges.map((edge, i) => {
                        const sourceNode = layoutNodes.find(n => n.id === edge.source);
                        const targetNode = layoutNodes.find(n => n.id === edge.target);

                        if (!sourceNode || !targetNode) return null;

                        const startX = sourceNode.x + 220; // 220 = node width
                        const startY = sourceNode.y + 70;  // 70 = half node height
                        const endX = targetNode.x;
                        const endY = targetNode.y + 70;

                        // Simple cubic bezier curve for smooth S-shape connection
                        const cX1 = startX + (endX - startX) * 0.5;
                        const cX2 = startX + (endX - startX) * 0.5;
                        const path = `M ${startX} ${startY} C ${cX1} ${startY}, ${cX2} ${endY}, ${endX} ${endY}`;

                        return (
                            <path
                                key={`edge-${i}`}
                                d={path}
                                fill="none"
                                stroke="#334155"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                            />
                        );
                    })}
                </svg>

                {/* Draw Nodes */}
                {layoutNodes.map((node, i) => {
                    const color = ACCENTS[node.colIndex % ACCENTS.length] || "#fff";

                    return (
                        <div
                            key={node.id}
                            className="absolute shadow-lg transition-transform hover:scale-[1.02]"
                            style={{
                                left: `${node.x}px`,
                                top: `${node.y}px`,
                                width: '220px',
                                height: '140px'
                            }}
                        >
                            {/* Visual Card structure exactly like screenshot */}
                            <div className="w-full h-full bg-[#0A101F] border border-white/5 relative flex flex-col pt-3 pr-3 pb-3 pl-0 overflow-hidden group">

                                {/* Thick left accent border */}
                                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }} />

                                {/* Top Section */}
                                <div className="pl-4 flex items-center gap-2 mb-2">
                                    <div className="text-white bg-white/5 p-1 rounded-sm border border-white/10">
                                        <LucideLayoutTemplate className="w-3 h-3" />
                                    </div>
                                    <h4 className="text-sm font-bold text-white tracking-wide truncate">{node.label}</h4>
                                </div>

                                {/* Divider */}
                                <div className="w-full h-[1px] bg-white/5 my-1" />

                                {/* Dynamic Details */}
                                {(() => {
                                    const rawFeats = node.details ? node.details.split('.').filter(d => d.trim().length > 0) : [];
                                    const feats = rawFeats.length > 0 ? rawFeats : [node.type || "Component", "Feature Matrix", "Foundation Setup"];

                                    const topFeats = feats.slice(0, 2);
                                    const bottomFeat = feats.length > 2 ? feats[2] : "Foundation Setup";

                                    return (
                                        <>
                                            {/* Body content */}
                                            <div className="pl-4 mt-2 mb-auto flex flex-col gap-1.5 opacity-70 w-full pr-3">
                                                {topFeats.map((feat, idx) => (
                                                    <div key={idx} className="flex items-start gap-1.5 w-full">
                                                        <div className="w-[3px] h-[3px] rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                                                        <span className="text-[8px] font-medium text-white/90 leading-tight uppercase tracking-widest truncate" title={feat.trim()}>{feat.trim()}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Footer red text */}
                                            <div className="pl-4 mt-2 mb-2 flex items-center gap-1.5 w-full pr-3 relative z-20">
                                                <div className="w-1 h-1 rounded-full border border-red-500 bg-transparent flex-shrink-0" />
                                                <span className="text-[8px] font-bold text-red-500 uppercase tracking-widest truncate" title={bottomFeat.trim()}>{bottomFeat.trim()}</span>
                                            </div>
                                        </>
                                    );
                                })()}

                                {/* Top Left Bracket Decorator */}
                                <div className="absolute left-0 top-0 w-6 h-6 border-t-[3px] border-l-[3px] border-white z-10 opacity-100 group-hover:scale-110 transition-transform origin-top-left" style={{ borderLeftColor: color }} />

                                {/* Bottom Right Bracket Decorator */}
                                <div className="absolute right-0 bottom-0 w-6 h-6 border-b-[3px] border-r-[3px] border-white z-10 opacity-100 group-hover:scale-110 transition-transform origin-bottom-right" />

                                {/* Connection Ports */}
                                <div className="absolute left-0 top-1/2 w-[7px] h-[7px] border border-white/20 bg-[#0A101F] rounded-full -translate-x-[3.5px] -translate-y-[3.5px] z-20" />
                                <div className="absolute right-0 top-1/2 w-[7px] h-[7px] border border-white/20 bg-[#0A101F] rounded-full translate-x-[3.5px] -translate-y-[3.5px] z-20" />
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}
