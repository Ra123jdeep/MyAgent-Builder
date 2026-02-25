"use client";

import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Workspace } from "./Workspace";

export function StudioLayout() {
    return (
        <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex text-sm">
            {/* Fixed Left Sidebar */}
            <Sidebar />

            {/* Main Resizable Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <TopBar />

                <div className="flex-1 overflow-hidden relative">
                    <Workspace />
                </div>
            </div>
        </div>
    );
}
