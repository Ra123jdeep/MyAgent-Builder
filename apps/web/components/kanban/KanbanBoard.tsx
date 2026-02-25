"use client";

import React, { useMemo } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

type Ticket = {
  id: string;
  title: string;
  status: "backlog" | "in_progress" | "review" | "done";
};

type ColumnId = Ticket["status"];

const columns: { id: ColumnId; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "in_progress", label: "In Progress" },
  { id: "review", label: "Review" },
  { id: "done", label: "Done" },
];

// --- Droppable Column Component ---
function KanbanColumn({
  column,
  tickets,
}: {
  column: { id: ColumnId; label: string };
  tickets: Ticket[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-[#111]/80 backdrop-blur-md border rounded-3xl p-5 shadow-xl flex flex-col gap-4 transition-colors ${isOver ? "border-primary/50 bg-[#151515]" : "border-[#222]"
        }`}
    >
      <div className="flex items-center justify-between mb-2 border-b border-[#222] pb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#888]">
          {column.label}
        </span>
        <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-bold text-primary shadow-[0_0_10px_rgba(46,144,255,0.2)]">
          {tickets.length}
        </span>
      </div>
      <div className="flex flex-col gap-3 min-h-[150px]">
        {tickets.map((ticket) => (
          <KanbanTicket key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

// --- Draggable Ticket Component ---
function KanbanTicket({ ticket }: { ticket: Ticket }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: ticket.id,
      data: ticket,
    });

  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      zIndex: isDragging ? 50 : 1,
      opacity: isDragging ? 0.5 : 1,
    }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab rounded-xl border bg-[#1A1A1A] p-4 text-sm font-medium text-white shadow-sm transition-all group relative overflow-hidden ${isDragging
          ? "border-primary shadow-[0_0_20px_rgba(46,144,255,0.3)]"
          : "border-[#333] hover:border-primary/50 hover:bg-[#222] hover:shadow-[0_0_15px_rgba(46,144,255,0.15)]"
        }`}
    >
      <div className="absolute left-0 top-0 w-1 h-full bg-[#333] group-hover:bg-primary transition-colors" />
      {ticket.title}
    </div>
  );
}

// --- Main Kanban Board ---
type KanbanBoardProps = {
  tickets: Ticket[];
  onMove?: (id: string, status: ColumnId) => void;
};

export function KanbanBoard({ tickets, onMove }: KanbanBoardProps) {
  const [items, setItems] = React.useState<Ticket[]>(tickets);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setItems(tickets);
  }, [tickets]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { over, active } = event;
    if (!over) return;

    const ticketId = String(active.id);
    const targetColumn = String(over.id) as ColumnId;

    // Check if dropping onto a valid column
    if (!["backlog", "in_progress", "review", "done"].includes(targetColumn)) {
      return;
    }

    setItems((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: targetColumn } : t))
    );

    onMove?.(ticketId, targetColumn);
  };

  const activeTicket = useMemo(
    () => items.find((t) => t.id === activeId),
    [activeId, items]
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-6 md:grid-cols-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tickets={items.filter((t) => t.status === column.id)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTicket ? (
          <div className="rounded-xl border border-primary bg-[#222] p-4 text-sm font-medium text-white shadow-[0_0_20px_rgba(46,144,255,0.4)] opacity-90 cursor-grabbing relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-primary" />
            {activeTicket.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

