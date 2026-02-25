"use client";

import React, { useState, useEffect } from "react";

// ─── PALETTE ────────────────────────────────────────────────────────────────
// Deep midnight base, electric indigo hero, warm rose accent, cool mint success
const P = {
  bg: "#08080F",
  surface: "#0F0F1C",
  border: "#1E1E35",
  text: "#EEE9FF",
  muted: "#4B4869",
  // node accents — analogous with strategic contrast pops
  indigo: "#7B6FFF",
  violet: "#A855F7",
  rose: "#F43F7A",
  amber: "#FFAE35",
  teal: "#2DD4BF",
  sky: "#38BCFF",
};

const NODES = [
  { id: "login", label: "Login", sublabel: "Entry point", accent: P.indigo, x: 55, y: 70, w: 230, h: 120 },
  { id: "dashboard", label: "Dashboard", sublabel: "Command center", accent: P.violet, x: 375, y: 70, w: 230, h: 120 },
  { id: "transactions", label: "Transactions", sublabel: "Financial ledger", accent: P.teal, x: 695, y: 70, w: 230, h: 120 },
  { id: "inventory", label: "Inventory", sublabel: "Stock & supply", accent: P.sky, x: 55, y: 310, w: 230, h: 120 },
  { id: "customers", label: "Customer Insights", sublabel: "Analytics hub", accent: P.rose, x: 375, y: 310, w: 230, h: 120 },
  { id: "settings", label: "Settings", sublabel: "System config", accent: P.amber, x: 695, y: 310, w: 230, h: 120 },
];

const EDGES = [
  { from: "login", to: "dashboard", label: "Authenticated" },
  { from: "dashboard", to: "transactions", label: "View ledger" },
  { from: "dashboard", to: "inventory", label: "Manage stock" },
  { from: "dashboard", to: "customers", label: "Customer data" },
  { from: "dashboard", to: "settings", label: "Configure" },
];

function edgePath(edge: any, nodes: any[]) {
  const a = nodes.find(n => n.id === edge.from);
  const b = nodes.find(n => n.id === edge.to);
  if (!a || !b) return { d: "", mid: { x: 0, y: 0 }, p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 } };

  const sameRow = Math.abs(a.y - b.y) < 50;
  let p1, p2, cp1, cp2;
  if (sameRow) {
    p1 = { x: a.x + a.w, y: a.y + a.h / 2 };
    p2 = { x: b.x, y: b.y + b.h / 2 };
    const mx = (p1.x + p2.x) / 2;
    cp1 = { x: mx, y: p1.y };
    cp2 = { x: mx, y: p2.y };
  } else {
    p1 = { x: a.x + a.w / 2, y: a.y + a.h };
    p2 = { x: b.x + b.w / 2, y: b.y };
    const off = (b.x + b.w / 2) - (a.x + a.w / 2);
    cp1 = { x: p1.x + off * 0.35, y: p1.y + 70 };
    cp2 = { x: p2.x - off * 0.1, y: p2.y - 70 };
  }
  const d = `M${p1.x},${p1.y} C${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${p2.x},${p2.y}`;
  const t = 0.5, mt = 0.5;
  const mid = {
    x: mt * mt * mt * p1.x + 3 * mt * mt * t * cp1.x + 3 * mt * t * t * cp2.x + t * t * t * p2.x,
    y: mt * mt * mt * p1.y + 3 * mt * mt * t * cp1.y + 3 * mt * t * t * cp2.y + t * t * t * p2.y,
  };
  return { d, mid, p1, p2 };
}

// Animated dash offset for active edges
function useAnimatedDash(active: boolean) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (!active) return;
    let id: number, v = 0;
    const loop = () => { v -= 0.8; setOffset(v); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [active]);
  return offset;
}

function FlowEdge({ edge, active, nodes }: { edge: any, active: boolean, nodes: any[] }) {
  const dash = useAnimatedDash(active);
  const { d, mid } = edgePath(edge, nodes);
  const a = nodes.find(n => n.id === edge.from);
  const b = nodes.find(n => n.id === edge.to);
  if (!a || !b) return null;
  const fa = a.accent;
  const ta = b.accent;

  return (
    <g style={{ transition: "opacity 0.4s" }} opacity={active ? 1 : 0.08}>
      <defs>
        <linearGradient id={`eg-${edge.from}-${edge.to}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={fa} />
          <stop offset="100%" stopColor={ta} />
        </linearGradient>
        <marker id={`arr-${edge.from}-${edge.to}`} markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3z" fill={ta} />
        </marker>
      </defs>
      {/* bloom */}
      {active && <path d={d} fill="none" stroke={`url(#eg-${edge.from}-${edge.to})`}
        strokeWidth="10" opacity="0.08" strokeLinecap="round" />}
      {/* track */}
      <path d={d} fill="none" stroke={active ? `url(#eg-${edge.from}-${edge.to})` : "#1E1E35"}
        strokeWidth={active ? "2" : "1"} strokeLinecap="round"
        strokeDasharray={active ? "12 5" : "5 4"}
        strokeDashoffset={active ? dash : 0}
        markerEnd={active ? `url(#arr-${edge.from}-${edge.to})` : undefined} />
      {/* label chip */}
      {active && (
        <g>
          <rect x={mid.x - 60} y={mid.y - 13} width="120" height="24" rx="12"
            fill={P.bg} stroke={fa} strokeWidth="0.8" strokeOpacity="0.6" />
          <text x={mid.x} y={mid.y + 5} textAnchor="middle" fill={fa}
            fontSize="9" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="600">
            {edge.label?.length > 20 ? edge.label.substring(0, 20) + '...' : edge.label}
          </text>
        </g>
      )}
    </g>
  );
}

function FlowNode({ node, index, isActive, isRelevant, onClick }: { node: any, index: number, isActive: boolean, isRelevant: boolean, onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const lit = isActive || hov;
  return (
    <g onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: "pointer", transition: "opacity 0.35s" }}
      opacity={isRelevant ? 1 : 0.07}>
      <defs>
        <radialGradient id={`ng-${node.id}`} cx="30%" cy="25%" r="75%">
          <stop offset="0%" stopColor={node.accent} stopOpacity={lit ? "0.22" : "0.1"} />
          <stop offset="100%" stopColor={node.accent} stopOpacity="0.02" />
        </radialGradient>
        <filter id={`ns-${node.id}`}>
          <feDropShadow dx="0" dy={lit ? 8 : 4} stdDeviation={lit ? 18 : 8}
            floodColor={node.accent} floodOpacity={lit ? "0.45" : "0.12"} />
        </filter>
        <clipPath id={`clip-${node.id}`}>
          <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="20" />
        </clipPath>
      </defs>

      {/* animated ring */}
      {isActive && (
        <rect x={node.x - 6} y={node.y - 6} width={node.w + 12} height={node.h + 12} rx="25"
          fill="none" stroke={node.accent} strokeWidth="1.5" opacity="0.5" strokeDasharray="8 5">
          <animateTransform attributeName="transform" type="rotate"
            from={`0 ${node.x + node.w / 2} ${node.y + node.h / 2}`}
            to={`360 ${node.x + node.w / 2} ${node.y + node.h / 2}`}
            dur="10s" repeatCount="indefinite" />
        </rect>
      )}

      {/* shadow */}
      <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="20"
        fill={node.accent} opacity="0" filter={`url(#ns-${node.id})`} />

      {/* body */}
      <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="20"
        fill={`url(#ng-${node.id})`}
        stroke={node.accent} strokeWidth={lit ? "1.5" : "0.7"}
        strokeOpacity={lit ? 0.9 : 0.25}
        style={{ transition: "all 0.25s ease" }} />

      {/* glass sheen */}
      <rect x={node.x + 1} y={node.y + 1} width={node.w - 2} height={node.h * 0.4} rx="19"
        fill="white" fillOpacity="0.04" clipPath={`url(#clip-${node.id})`} />

      {/* accent top bar */}
      <rect x={node.x + 20} y={node.y} width={60} height="3" rx="2"
        fill={node.accent} opacity={lit ? "0.9" : "0.4"}
        style={{ transition: "opacity 0.25s" }} />

      {/* step badge */}
      <rect x={node.x + node.w - 46} y={node.y + 14} width="32" height="18" rx="9"
        fill={node.accent} fillOpacity="0.15" />
      <text x={node.x + node.w - 30} y={node.y + 27}
        textAnchor="middle" fill={node.accent} fontSize="9.5"
        fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" letterSpacing="0.06em">
        {String(index + 1).padStart(2, "0")}
      </text>

      {/* label */}
      <text x={node.x + node.w / 2} y={node.y + 60}
        textAnchor="middle" fill={P.text} fontSize="16" fontWeight="700"
        fontFamily="'Plus Jakarta Sans',sans-serif" letterSpacing="-0.02em">
        {node.label?.length > 22 ? node.label.substring(0, 22) + '...' : node.label}
      </text>

      {/* divider */}
      <line x1={node.x + 24} y1={node.y + 76} x2={node.x + node.w - 24} y2={node.y + 76}
        stroke={node.accent} strokeWidth="0.6" strokeOpacity="0.3" />

      {/* sublabel */}
      <text x={node.x + node.w / 2} y={node.y + 96}
        textAnchor="middle" fill={node.accent} fontSize="10"
        fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="600"
        letterSpacing="0.05em" opacity="0.9">
        {node.sublabel?.length > 32
          ? (node.sublabel.substring(0, 32) + '...').toUpperCase()
          : node.sublabel?.toUpperCase()}
      </text>

      {/* port dots */}
      {[{ cx: node.x + node.w / 2, cy: node.y }, { cx: node.x + node.w / 2, cy: node.y + node.h },
      { cx: node.x, cy: node.y + node.h / 2 }, { cx: node.x + node.w, cy: node.y + node.h / 2 }]
        .map((pt, i) => (
          <g key={i}>
            <circle cx={pt.cx} cy={pt.cy} r="6" fill={node.accent} opacity={lit ? 0.3 : 0.1}
              style={{ transition: "opacity 0.25s" }} />
            <circle cx={pt.cx} cy={pt.cy} r="3" fill={node.accent} opacity={lit ? 0.9 : 0.35}
              style={{ transition: "opacity 0.25s" }} />
            <circle cx={pt.cx} cy={pt.cy} r="1.2" fill={P.bg} />
          </g>
        ))}
    </g>
  );
}

export function UserFlow({ backendNodes = [], backendEdges = [] }: { backendNodes: any[], backendEdges: any[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [dynamicNodes, setDynamicNodes] = useState<any[]>([]);
  const [dynamicEdges, setDynamicEdges] = useState<any[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);

    // Fallback to hardcoded if no backend data
    if (!backendNodes || backendNodes.length === 0) {
      setDynamicNodes(NODES);
      setDynamicEdges(EDGES);
      return () => clearTimeout(t);
    }

    // Map backend data to visual nodes with coordinates
    const colors = [P.indigo, P.violet, P.teal, P.sky, P.rose, P.amber];
    const mappedNodes = backendNodes.map((n: any, i: number) => {
      // 3 items per row
      const col = i % 3;
      const row = Math.floor(i / 3);
      return {
        id: n.id,
        label: n.label || n.id,
        sublabel: n.details || n.type || "Process step",
        accent: colors[i % colors.length],
        x: 55 + (col * 320),
        y: 70 + (row * 240),
        w: 230,
        h: 120
      };
    });

    const mappedEdges = backendEdges.map((e: any) => ({
      from: e.source,
      to: e.target,
      label: e.label || ""
    }));

    setDynamicNodes(mappedNodes);
    setDynamicEdges(mappedEdges);

    return () => clearTimeout(t);
  }, [backendNodes, backendEdges]);

  // Use dynamic data instead of hardcoded
  const activeEdges = active ? dynamicEdges.filter(e => e.from === active || e.to === active) : [];
  const connectedIds = activeEdges.flatMap(e => [e.from, e.to]);
  const isRelevant = (id: string) => !active || connectedIds.includes(id);
  const isEdgeActive = (e: any) => !active || e.from === active || e.to === active;

  const an = active ? dynamicNodes.find(n => n.id === active) : null;

  return (
    <div style={{
      height: "100%",
      minHeight: "600px",
      background: P.bg,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "24px 20px",
      position: "relative", overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:ital,wght@0,700;1,400;1,700&display=swap" rel="stylesheet" />

      {/* Background atmosphere */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        {/* Large orbs */}
        {[
          { c: "#7B6FFF", x: "15%", y: "20%", size: "500px", op: 0.06 },
          { c: "#F43F7A", x: "80%", y: "70%", size: "400px", op: 0.05 },
          { c: "#2DD4BF", x: "85%", y: "15%", size: "350px", op: 0.04 },
          { c: "#FFAE35", x: "10%", y: "80%", size: "300px", op: 0.04 },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute",
            left: o.x, top: o.y,
            width: o.size, height: o.size,
            borderRadius: "50%",
            background: o.c,
            opacity: o.op,
            filter: "blur(80px)",
            transform: "translate(-50%,-50%)",
          }} />
        ))}
        {/* dot grid */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}>
          <defs>
            <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="#1E1E35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Header */}
      <div style={{
        position: "relative", zIndex: 1, textAlign: "center", marginBottom: "20px",
        opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(-20px)",
        transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          padding: "5px 18px", borderRadius: "100px",
          background: "rgba(123,111,255,0.1)", border: "1px solid rgba(123,111,255,0.25)",
          marginBottom: "18px",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: P.indigo, display: "block",
            boxShadow: `0 0 8px ${P.indigo}`
          }} />
          <span style={{
            color: P.indigo, fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.18em", fontFamily: "'Plus Jakarta Sans',sans-serif"
          }}>
            PRODUCT ARCHITECTURE
          </span>
        </div>

        <h1 style={{
          margin: 0, lineHeight: 1.0, letterSpacing: "-0.03em",
          fontFamily: "'Fraunces',serif",
        }}>
          <span style={{ display: "block", color: P.text, fontSize: "clamp(38px,5.5vw,68px)", fontWeight: 700 }}>
            User
          </span>
          <span style={{
            display: "block",
            fontSize: "clamp(38px,5.5vw,68px)",
            fontWeight: 700,
            fontStyle: "italic",
            background: `linear-gradient(135deg, ${P.indigo} 0%, ${P.violet} 40%, ${P.rose} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Flow.</span>
        </h1>

        <p style={{
          color: P.muted, marginTop: 14, fontSize: "15px",
          fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 400
        }}>
          Visualize the complete AI-generated user journey
        </p>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
          {[[String(dynamicNodes.length), "Nodes", P.indigo], [String(dynamicEdges.length), "Edges", P.violet], [String(Math.ceil(dynamicNodes.length / 3) || 1), "Layers", P.teal]].map(([n, l, c]) => (
            <div key={l} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 16px", borderRadius: 12,
              background: `${c}0F`, border: `1px solid ${c}28`,
            }}>
              <span style={{ color: c, fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 20 }}>{n}</span>
              <span style={{
                color: P.muted, fontSize: 11, fontWeight: 600,
                letterSpacing: "0.1em", fontFamily: "'Plus Jakarta Sans',sans-serif"
              }}>{l.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "rgba(15,15,28,0.8)",
        border: `1px solid ${P.border}`,
        borderRadius: 28, padding: "24px 32px",
        backdropFilter: "blur(24px)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
        opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(28px) scale(0.97)",
        transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s",
        maxWidth: "920px", width: "100%", overflowX: "auto", overflowY: "hidden"
      }}>
        <svg
          viewBox={`0 0 ${Math.max(980, Math.min(dynamicNodes.length, 3) * 320 + 80)} ${Math.max(500, Math.ceil(dynamicNodes.length / 3) * 240 + 80)}`}
          style={{ width: "100%", height: "auto", minWidth: `${Math.max(900, Math.min(dynamicNodes.length, 3) * 320)}px`, display: "block" }}>
          <defs>
            <filter id="global-glow">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Layer labels */}
          {Array.from({ length: Math.ceil(dynamicNodes.length / 3) || 1 }).map((_, i) => (
            <text key={i} x="14" y={52 + (i * 240)} fill="#1E1E35" fontSize="9.5" fontFamily="'Plus Jakarta Sans',sans-serif"
              fontWeight="700" letterSpacing="0.18em">LAYER {String(i + 1).padStart(2, '0')}</text>
          ))}
          {dynamicNodes.length > 0 && (
            <line x1="72" y1="44" x2="72" y2={44 + ((Math.ceil(dynamicNodes.length / 3) - 1) * 240) + 120} stroke="#1A1A2E" strokeWidth="1" strokeDasharray="4,6" />
          )}

          {/* Edges */}
          {dynamicEdges.map(e => (
            <FlowEdge key={`${e.from}-${e.to}`} edge={e} active={isEdgeActive(e)} nodes={dynamicNodes} />
          ))}

          {/* Nodes */}
          {dynamicNodes.map((node, i) => (
            <g key={node.id} style={{
              opacity: mounted ? 1 : 0, transform: mounted ? "none" : `translateY(16px)`,
              transition: `opacity 0.6s ease ${0.3 + i * 0.08}s, transform 0.6s ease ${0.3 + i * 0.08}s`,
            }}>
              <FlowNode
                node={node}
                index={i}
                isActive={active === node.id}
                isRelevant={isRelevant(node.id)}
                onClick={() => setActive(a => a === node.id ? null : node.id)}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Detail card */}
      {an && (
        <div style={{
          position: "relative", zIndex: 1, marginTop: 20,
          maxWidth: 620, width: "100%",
          background: `linear-gradient(135deg, ${an.accent}0C, ${an.accent}05)`,
          border: `1px solid ${an.accent}35`,
          borderRadius: 20, padding: "18px 24px",
          display: "flex", alignItems: "center", gap: 16,
          animation: "su 0.3s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: `0 20px 60px ${an.accent}15`,
        }}>
          <style>{`@keyframes su{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
          <div style={{
            width: 46, height: 46, flexShrink: 0, borderRadius: 14,
            background: `${an.accent}18`, border: `1px solid ${an.accent}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 19, color: an.accent,
          }}>
            {String(dynamicNodes.indexOf(an) + 1).padStart(2, "0")}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              color: P.text, fontWeight: 700, fontSize: 15,
              fontFamily: "'Plus Jakarta Sans',sans-serif"
            }}>{an.label}</div>
            <div style={{
              color: P.muted, fontSize: 12.5, marginTop: 3,
              fontFamily: "'Plus Jakarta Sans',sans-serif"
            }}>
              {activeEdges.map(e => e.label).join("  ·  ")}
            </div>
          </div>
          <button onClick={() => setActive(null)} style={{
            background: "none", border: `1px solid ${P.border}`, borderRadius: 8,
            color: P.muted, padding: "5px 12px", cursor: "pointer", fontSize: 11,
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, letterSpacing: "0.06em",
          }}>CLOSE</button>
        </div>
      )}

      {/* Legend */}
      <div style={{
        position: "relative", zIndex: 1, marginTop: 20,
        display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center",
      }}>
        {dynamicNodes.map(n => (
          <div key={n.id}
            onClick={() => setActive(a => a === n.id ? null : n.id)}
            style={{
              display: "flex", alignItems: "center", gap: 7, cursor: "pointer",
              opacity: isRelevant(n.id) ? 1 : 0.2, transition: "opacity 0.35s",
            }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: n.accent,
              boxShadow: active === n.id ? `0 0 10px ${n.accent}` : "none",
              transition: "box-shadow 0.3s",
            }} />
            <span style={{
              color: active === n.id ? n.accent : P.muted, fontSize: 12, fontWeight: 600,
              fontFamily: "'Plus Jakarta Sans',sans-serif", transition: "color 0.3s",
            }}>{n.label}</span>
          </div>
        ))}
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        marginTop: 16, color: "#1A1A2E", fontSize: 10,
        letterSpacing: "0.18em", fontWeight: 700,
        fontFamily: "'Plus Jakarta Sans',sans-serif",
      }}>
        USER FLOW ∙ 2026
      </div>
    </div>
  );
}
