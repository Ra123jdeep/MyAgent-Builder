"use client";

import React, { useMemo } from "react";
import ReactFlow, {
    Node,
    Edge,
    Background,
    Controls,
    ConnectionLineType,
    MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { FlowNode, FlowEdge } from "../../types";

import { BlueprintNode } from "./BlueprintNode";

type FlowDiagramProps = {
    nodes: FlowNode[];
    edges: FlowEdge[];
};

const nodeTypes = {
    default: BlueprintNode,
};

const getLayoutedElements = (nodes: FlowNode[], edges: FlowEdge[]) => {
    // Horizontal layout with significant spacing
    const offset = { x: 380, y: 0 };

    const rfNodes: Node[] = nodes.map((node, index) => ({
        id: node.id,
        data: { label: node.label, details: node.details },
        // Slight vertical offset for "linked" feel
        position: { x: index * offset.x, y: index % 2 === 0 ? 0 : 40 },
        type: "default",
    }));

    const rfEdges: Edge[] = edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: false, // Static looking lines like blueprint
        type: "step", // STRICT right angles for "step" look
        style: { stroke: "#FFFFFF", strokeWidth: 1, strokeDasharray: "4 2", opacity: 0.5 }, // White dashed lines
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 10,
            height: 10,
            color: "#FFFFFF",
        },
    }));

    return { nodes: rfNodes, edges: rfEdges };
};

const FlowDiagram = ({ nodes, edges }: FlowDiagramProps) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
        () => getLayoutedElements(nodes, edges),
        [nodes, edges]
    );

    return (
        <div style={{ height: 600, width: "100%" }} className="glass-panel rounded-xl border border-white/5 overflow-hidden bg-[#080808] relative">
            <ReactFlow
                nodes={layoutedNodes}
                edges={layoutedEdges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                attributionPosition="bottom-right"
                proOptions={{ hideAttribution: true }}
            >
                {/* Strict Dot Grid */}
                <Background color="#333" gap={24} size={1} />
                <Controls className="bg-[#121a2b] border border-white/10 fill-white rounded-none" />
            </ReactFlow>
        </div>
    );
};

export default FlowDiagram;
