"use client";

import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node
} from "reactflow";
import "reactflow/dist/style.css";

type FlowCanvasProps = {
  nodes: Node[];
  edges: Edge[];
};

export function FlowCanvas({ nodes, edges }: FlowCanvasProps) {
  return (
    <div className="glass-panel h-[360px] w-full overflow-hidden">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}

