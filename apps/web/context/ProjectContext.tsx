"use client";

import React, { createContext, useContext, useState } from "react";
import { ProjectState } from "../types";
import { planIdea } from "../services/api";

interface ProjectContextType {
    projectState: ProjectState | null;
    loading: boolean;
    error: string | null;
    runAgent: (title: string, idea: string) => Promise<void>;
    resetProject: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
    const [projectState, setProjectState] = useState<ProjectState | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        if (!projectState?.project_id) return;

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        const source = new EventSource(`${API_BASE_URL}/project/stream`);

        source.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.project_id === projectState.project_id) {
                    // Update the tickets and any other state changes live
                    setProjectState(prev => ({
                        ...(prev || {}),
                        ...data,
                        title: prev?.title || data.title
                    }));
                }
            } catch (err) {
                console.error("SSE Error parsing state:", err);
            }
        };

        return () => {
            source.close();
        };
    }, [projectState?.project_id]);

    const runAgent = async (title: string, idea: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await planIdea(idea, true);
            setProjectState({ ...data, title });
        } catch (err: any) {
            console.error(err);
            setError("Failed to generate project blueprint. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetProject = () => {
        setProjectState(null);
        setError(null);
        setLoading(false);
    };

    return (
        <ProjectContext.Provider value={{ projectState, loading, error, runAgent, resetProject }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
}
