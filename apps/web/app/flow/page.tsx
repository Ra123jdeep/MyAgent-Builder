"use client";

import React from "react";
import { UserFlow } from "@/components/sections/UserFlow";
import { useProject } from "@/context/ProjectContext";

export default function FlowPage() {
    const { projectState } = useProject();

    if (!projectState) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center text-slate-400">
                <p>No project data found. Please generate a blueprint on the Overview page.</p>
            </div>
        );
    }

    const { user_flow_nodes, user_flow_edges } = projectState?.experience_result || {};

    return (
        <div className="w-full h-full rounded-3xl overflow-hidden border border-[#1e1e35] shadow-2xl relative">
            <UserFlow backendNodes={user_flow_nodes || []} backendEdges={user_flow_edges || []} />
        </div>
    );
}


