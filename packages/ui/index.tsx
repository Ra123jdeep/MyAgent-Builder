import React from "react";

type GlassCardProps = {
  title?: string;
  children?: React.ReactNode;
};

export function GlassCard({ title, children }: GlassCardProps) {
  return (
    <div className="glass-panel p-4">
      {title && (
        <h2 className="mb-2 text-sm font-semibold text-slate-200">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

