export async function generateComponentTool(name: string): Promise<string> {
  const safeName = name.replace(/[^a-zA-Z0-9]/g, "");
  return `import React from "react";

type ${safeName}Props = {
  title?: string;
  subtitle?: string;
};

export function ${safeName}({ title = "${safeName}", subtitle }: ${safeName}Props) {
  return (
    <div className="glass-panel p-4">
      <h2 className="text-base font-semibold text-slate-50">{title}</h2>
      {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
}
`;
}

