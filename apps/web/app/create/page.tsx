"use client";

import React, { useState, Suspense } from "react";
import { ProjectInput } from "@/components/wizard/ProjectInput";
import { GenerationLoader } from "@/components/wizard/GenerationLoader";
import { BlueprintView } from "@/components/blueprint/BlueprintView";
import { useProject } from "@/context/ProjectContext";
import { useSearchParams } from "next/navigation";

function WizardContent() {
    const searchParams = useSearchParams();
    const isViewingInput = searchParams.get("view") === "input";

    const { projectState, runAgent } = useProject();
    const [internalLoading, setInternalLoading] = useState(false);

    // If we have project state, show the result (Step 3)
    // Otherwise show input (Step 1) or loader (Step 2)
    const showResult = !!projectState;

    const handleStart = async (title: string, idea: string) => {
        setInternalLoading(true);
        await runAgent(title, idea);
        setInternalLoading(false);
    };

    if (showResult && !isViewingInput) {
        return <BlueprintView projectState={projectState} />;
    }

    if (internalLoading) {
        return <GenerationLoader />;
    }

    return <ProjectInput onStart={handleStart} loading={internalLoading} />;
}

export default function WizardPage() {
    return (
        <Suspense fallback={
            <div className="flex h-[50vh] flex-col items-center justify-center text-slate-400">
                <p>Loading...</p>
            </div>
        }>
            <WizardContent />
        </Suspense>
    );
}
