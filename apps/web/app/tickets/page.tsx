"use client";

import React, { useEffect, useState } from "react";
import { KanbanBoard } from "../../components/kanban/KanbanBoard";
import { useProject } from "../../context/ProjectContext";
import { Ticket } from "../../types";

export default function TicketsPage() {
    const { projectState } = useProject();
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        if (projectState?.tickets) {
            setTickets(projectState.tickets as Ticket[]);
        } else {
            setTickets([]);
        }
    }, [projectState]);

    if (!projectState) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center text-slate-400">
                <p>No project data found. Please generate a blueprint on the Overview page.</p>
            </div>
        );
    }

    return (
        <main className="flex flex-col gap-8 pb-20 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        Tickets Board
                    </h2>
                    <p className="text-[#888] text-sm mt-1">
                        Drag and drop tickets to update their status.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold shadow-[0_0_10px_rgba(46,144,255,0.2)]">
                        {tickets.length} TICKETS GENERATED
                    </span>
                </div>
            </div>
            <KanbanBoard tickets={tickets} />
        </main>
    );
}
