"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', s: '00' });

  useEffect(() => {
    const target = new Date(Date.now() + (4 * 86400 + 12 * 3600 + 18 * 60) * 1000).getTime();

    const tick = () => {
      const d = Math.max(0, target - Date.now());
      setTimeLeft({
        d: String(Math.floor(d / 86400000)).padStart(2, '0'),
        h: String(Math.floor((d % 86400000) / 3600000)).padStart(2, '0'),
        s: String(Math.floor((d % 3600000) / 60000)).padStart(2, '0'),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#050818] text-white font-sans overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        main { font-family: 'Inter', sans-serif; }
        
        .space-bg {
          background:
            radial-gradient(ellipse 100% 60% at 50% 0%, rgba(30,60,180,0.25) 0%, transparent 65%),
            radial-gradient(ellipse 80% 50% at 20% 50%, rgba(20,40,140,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(60,30,160,0.12) 0%, transparent 60%),
            #050818;
        }

        .stars-overlay::before {
          content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            radial-gradient(1px 1px at 8% 12%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 22% 8%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 38% 5%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 15%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 72% 9%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 88% 18%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 28%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 42% 35%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 65% 22%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 78% 42%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 5% 55%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 62%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 48% 58%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 92% 65%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 78%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 82%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 82% 88%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 12% 90%, rgba(255,255,255,0.3) 0%, transparent 100%);
        }

        .gradient-text {
          background: linear-gradient(90deg, #6c8ef5 0%, #a78bfa 40%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .globe {
          background: radial-gradient(ellipse 60% 55% at 40% 32%, rgba(90,120,255,0.55) 0%, rgba(50,20,160,0.4) 45%, rgba(8,4,30,0.9) 75%, transparent 100%);
          box-shadow: 0 0 0 1px rgba(79,110,245,0.25), 0 -20px 80px rgba(79,110,245,0.45), 0 0 160px rgba(60,30,160,0.3);
        }

        .globe::before {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(79,110,245,0.04) 10px, rgba(79,110,245,0.04) 11px);
        }

        .globe::after {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(79,110,245,0.03) 20px, rgba(79,110,245,0.03) 21px);
        }

        .feature-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79,110,245,0.45), transparent);
        }

        .countdown-border::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 10%, rgba(79,110,245,0.7) 50%, transparent 90%);
        }
        
        .countdown-border::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 40% at 50% 110%, rgba(79,110,245,0.08) 0%, transparent 70%);
        }

        .number-gradient {
          background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.55) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-up-1 { animation: fadeUp 0.6s ease both; }
        .animate-fade-up-2 { animation: fadeUp 0.6s 0.1s ease both; }
      `}} />

      <div className="absolute inset-0 space-bg"></div>
      <div className="stars-overlay"></div>

      <div className="relative z-10">
        {/* NAV */}
        <nav className="flex items-center justify-between px-7 py-3 border-b border-white/5 bg-[#050818]/55 backdrop-blur-[10px] sticky top-0 z-50">
          <div className="flex items-center gap-8">
            <div className="font-extrabold text-[0.9rem] tracking-tight flex items-center gap-1.5">
              ⬡ <span className="text-[#6c8ef5]">MyAgent Builder</span>
            </div>
            <div className="hidden sm:flex gap-6">
              <a href="#" className="text-white/50 text-[0.78rem] hover:text-white transition-colors">Features</a>
              <a href="#" className="text-white/50 text-[0.78rem] hover:text-white transition-colors">Architecture</a>
              <a href="#" className="text-white/50 text-[0.78rem] hover:text-white transition-colors">Agents</a>
              <a href="#" className="text-white/50 text-[0.78rem] hover:text-white transition-colors">Docs</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-white/45 text-[0.76rem] hidden sm:block">Log in</a>
            <Link href="/create" className="bg-gradient-to-r from-[#4f6ef5] to-[#7c5cf5] text-white text-[0.75rem] font-semibold px-4 py-[7px] rounded-md shadow-[0_0_14px_rgba(79,110,245,0.35)]">
              Get Started Free
            </Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="grid sm:grid-cols-2 gap-9 items-center pt-[54px] px-7 max-w-[1060px] mx-auto">
          <div className="animate-fade-up-1">
            <div className="text-white/40 text-[0.7rem] font-medium tracking-[0.06em] uppercase mb-3.5">AI-Native Development Platform</div>
            <h1 className="text-[clamp(1.9rem,3.2vw,2.5rem)] font-extrabold leading-[1.15] tracking-[-0.04em] mb-3">
              Turn Ideas Into<br />
              <span className="gradient-text">Production-Ready</span><br />
              Blueprints
            </h1>
            <p className="text-white/45 text-[0.82rem] leading-[1.65] max-w-[330px] mb-[22px]">
              Let structured autonomous agents design your SaaS architecture, user flows, and Kanban tickets instantly.
            </p>
            <Link href="/create" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4f6ef5] to-[#7c5cf5] text-white text-[0.8rem] font-semibold px-5.5 py-2.5 rounded-lg shadow-[0_0_26px_rgba(79,110,245,0.5)] hover:-translate-y-[1px] transition-transform mb-4">
              Get Started Free
            </Link>
            <div className="flex items-center gap-4.5 text-white/30 text-[0.72rem] mt-1.5">
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#22d3a5]"></div> 6100+ Blueprints</span>
              <span className="flex items-center gap-1.5">✦ Cursor AI Ready</span>
            </div>
          </div>

          <div className="animate-fade-up-2">
            <div className="bg-[#0a0e28]/80 border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_60px_rgba(79,110,245,0.18),0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="bg-white/5 px-3.5 py-2.5 flex items-center gap-1.5 border-b border-white/5">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]"></div>
                <div className="w-2 h-2 rounded-full bg-[#febc2e]"></div>
                <div className="w-2 h-2 rounded-full bg-[#28c840]"></div>
                <span className="text-[0.68rem] text-white/35 ml-2">MyAgent Builder Workspace</span>
              </div>
              <div className="p-4">
                <div className="text-[0.82rem] font-bold mb-1">Generate SaaS Blueprint</div>
                <div className="text-white/40 text-[0.7rem] leading-[1.55] mb-3">Describe your product and our multi-agent swarm generates the complete architecture blueprint.</div>
                <div className="flex gap-1.5 mb-2.5">
                  <input type="text" placeholder="Describe your SaaS idea…" className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-white/50 text-[0.7rem] outline-none" />
                  <button className="bg-gradient-to-r from-[#4f6ef5] to-[#7c5cf5] text-white text-[0.7rem] font-semibold px-3.5 py-1.5 rounded-md">Generate</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-3">
                    <div className="text-[0.88rem] font-bold text-[#6c8ef5]">6</div>
                    <div className="text-[0.62rem] text-white/30 mt-0.5">Active Agents</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg py-2.5 px-3">
                    <div className="text-[0.88rem] font-bold text-[#22d3a5]">124+</div>
                    <div className="text-[0.62rem] text-white/30 mt-0.5">Kanban Tickets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOGOS */}
        <section className="border-y border-white/5 py-3.5 px-7">
          <div className="max-w-[900px] mx-auto flex items-center justify-center gap-11 flex-wrap">
            <div className="text-white/40 text-[0.74rem] font-medium flex items-center gap-1.5">⊕ FastAPI</div>
            <div className="text-white/40 text-[0.74rem] font-medium flex items-center gap-1.5">◈ Next.js</div>
            <div className="text-white/40 text-[0.74rem] font-medium flex items-center gap-1.5">⬡ Cursor AI</div>
            <div className="text-white/40 text-[0.74rem] font-medium flex items-center gap-1.5">❄ MongoDB</div>
          </div>
        </section>

        {/* STATS */}
        <section className="max-w-[900px] mx-auto pt-9 px-7 pb-10">
          <div className="text-center text-white/40 text-[0.73rem] mb-5.5 tracking-[0.04em]">Powered by Next-Generation Technologies</div>
          <div className="grid sm:grid-cols-3 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-5.5 px-4.5 sm:border-r border-b sm:border-b-0 border-white/10 bg-white/5">
              <div className="text-[1.55rem] font-extrabold tracking-[-0.03em] flex items-baseline gap-1.5">1.2M+ <span className="text-[#22d3a5] text-[0.68rem] font-semibold">Tokens</span></div>
              <div className="text-white/30 text-[0.7rem] mt-0.5">System Context</div>
              <div className="text-white/20 text-[0.62rem] mt-px">Llama-3.1-8b</div>
              <div className="bg-white/10 h-0.5 rounded-sm mt-2.5 overflow-hidden"><div className="h-full rounded-sm bg-gradient-to-r from-[#4f6ef5] to-[#22d3a5] w-[78%]"></div></div>
            </div>
            <div className="p-5.5 px-4.5 sm:border-r border-b sm:border-b-0 border-white/10 bg-white/5">
              <div className="text-[1.55rem] font-extrabold tracking-[-0.03em] flex items-baseline gap-1.5">6 <span className="text-[#22d3a5] text-[0.68rem] font-semibold">Agents</span></div>
              <div className="text-white/30 text-[0.7rem] mt-0.5">Task Delegation</div>
              <div className="text-white/20 text-[0.62rem] mt-px">Parallel Processing</div>
              <div className="bg-white/10 h-0.5 rounded-sm mt-2.5 overflow-hidden"><div className="h-full rounded-sm bg-gradient-to-r from-[#4f6ef5] to-[#22d3a5] w-full"></div></div>
            </div>
            <div className="p-5.5 px-4.5 bg-white/5">
              <div className="text-[1.55rem] font-extrabold tracking-[-0.03em] flex items-baseline gap-1.5">100% <span className="text-[#22d3a5] text-[0.6rem] font-semibold">→</span></div>
              <div className="text-white/30 text-[0.7rem] mt-0.5">Automation Ready</div>
              <div className="text-white/20 text-[0.62rem] mt-px">MCP Server Integrated</div>
              <div className="bg-white/10 h-0.5 rounded-sm mt-2.5 overflow-hidden"><div className="h-full rounded-sm bg-gradient-to-r from-[#4f6ef5] to-[#22d3a5] w-full"></div></div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="max-w-[900px] mx-auto pt-13 px-7 object-bottom pb-7 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.03em] mb-1.5">Engineered for Structured Generation</h2>
          <p className="text-white/35 text-[0.78rem] mb-9.5">A complete agentic toolkit designed for building the next generation of AI-native applications.</p>
          <div className="grid sm:grid-cols-3 gap-3 text-left">
            <div className="feature-card relative bg-white/5 border border-white/10 rounded-2xl p-4.5 overflow-hidden hover:border-[#4f6ef5]/35 hover:-translate-y-[3px] transition-all duration-250">
              <div className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-[#4f6ef5] to-[#7c5cf5] flex items-center justify-center text-[0.78rem] mb-2.5">🧠</div>
              <div className="text-[0.8rem] font-bold mb-1">Multi-Agent Swarm</div>
              <div className="text-white/40 text-[0.68rem] leading-[1.6]">Planner, Validator, Architect, Flow, and Ticket agents work in tandem to validate and design your app.</div>
              <div className="inline-flex items-center gap-1 bg-[#22d3a5]/10 border border-[#22d3a5]/20 text-[#22d3a5] text-[0.6rem] font-semibold px-[7px] py-[2px] rounded-full mt-[9px]">
                <div className="w-1 h-1 rounded-full bg-[#22d3a5]"></div> Live Active
              </div>
              <div className="mt-2 text-[0.62rem] text-white/25">Modular Python architecture</div>
            </div>
            <div className="feature-card relative bg-white/5 border border-white/10 rounded-2xl p-4.5 overflow-hidden hover:border-[#4f6ef5]/35 hover:-translate-y-[3px] transition-all duration-250">
              <div className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-[#4f6ef5] to-[#7c5cf5] flex items-center justify-center text-[0.78rem] mb-2.5">⚙️</div>
              <div className="text-[0.8rem] font-bold mb-1">Visual Architecture</div>
              <div className="text-white/40 text-[0.68rem] leading-[1.6]">Interactive React Flow integration for seamless map visualizations of user flows and architecture.</div>
              <div className="mt-2 text-[0.62rem] text-white/25">Next.js 14 App Router</div>
              <div className="mt-2"><div className="bg-white/10 rounded-sm h-[2.5px] overflow-hidden"><div className="h-full rounded-sm bg-gradient-to-r from-[#4f6ef5] to-[#60a5fa] w-[92%]"></div></div></div>
            </div>
            <div className="feature-card relative bg-white/5 border border-white/10 rounded-2xl p-4.5 overflow-hidden hover:border-[#4f6ef5]/35 hover:-translate-y-[3px] transition-all duration-250">
              <div className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-[#4f6ef5] to-[#7c5cf5] flex items-center justify-center text-[0.78rem] mb-2.5">⚡</div>
              <div className="text-[0.8rem] font-bold mb-1">MCP Automation</div>
              <div className="text-white/40 text-[0.68rem] leading-[1.6]">Exposes tools to directly create files, generate components, and move Kanban tickets.</div>
              <div className="text-[#60a5fa] text-[1.05rem] font-extrabold mt-2 leading-none">100%</div>
              <div className="text-white/30 text-[0.6rem]">Cursor Compatible</div>
              <div className="mt-1.5"><div className="bg-white/10 rounded-sm h-[2.5px] overflow-hidden"><div className="h-full rounded-sm bg-gradient-to-r from-[#4f6ef5] to-[#60a5fa] w-full"></div></div></div>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link href="/create" className="bg-transparent border border-[#4f6ef5]/45 text-[#7c8ef5] text-[0.78rem] font-semibold px-9 py-2.5 rounded-full cursor-pointer shadow-[0_0_18px_rgba(79,110,245,0.12)] hover:bg-[#4f6ef5]/10 hover:shadow-[0_0_30px_rgba(79,110,245,0.28)] transition-all inline-flex items-center gap-1.5">
              See All Features ›
            </Link>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="max-w-[900px] mx-auto pt-9 px-7 pb-13">
          <div className="countdown-border relative border border-white/10 rounded-[18px] py-11 px-8 text-center bg-white/5 overflow-hidden">
            <h2 className="text-[clamp(1.3rem,2.4vw,1.8rem)] font-extrabold tracking-[-0.03em] mb-1">Agent Swarm Initialization Sequence</h2>
            <p className="text-white/35 text-[0.76rem] mb-8.5">Prepare for the next evolution in automated continuous deployment and architecture design.</p>
            <div className="flex justify-center gap-4.5 relative z-10">
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4.5 min-w-[86px] flex flex-col items-center">
                <div className="text-[0.8rem] opacity-50 mb-1">⏱</div>
                <div className="number-gradient text-[2.1rem] font-extrabold tracking-[-0.04em] leading-none mb-1">{timeLeft.d}</div>
                <div className="text-white/30 text-[0.62rem] uppercase tracking-[0.07em]">Days</div>
                <div className="text-white/20 text-[0.56rem] mt-px">from: v1.0.0</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4.5 min-w-[86px] flex flex-col items-center">
                <div className="text-[0.8rem] opacity-50 mb-1">🕐</div>
                <div className="number-gradient text-[2.1rem] font-extrabold tracking-[-0.04em] leading-none mb-1">{timeLeft.h}</div>
                <div className="text-white/30 text-[0.62rem] uppercase tracking-[0.07em]">Hours</div>
                <div className="text-white/20 text-[0.56rem] mt-px">Qty: 6 Agents</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4.5 min-w-[86px] flex flex-col items-center">
                <div className="text-[0.8rem] opacity-50 mb-1">⏳</div>
                <div className="number-gradient text-[2.1rem] font-extrabold tracking-[-0.04em] leading-none mb-1">{timeLeft.s}</div>
                <div className="text-white/30 text-[0.62rem] uppercase tracking-[0.07em]">Sec</div>
                <div className="text-white/20 text-[0.56rem] mt-px">Status: Ready</div>
              </div>
            </div>
          </div>
        </section>

        {/* INTEGRATIONS */}
        <section className="max-w-[900px] mx-auto pt-4 px-7 pb-[70px] text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.03em] mb-1.5">Connect with your Stack.</h2>
          <p className="text-white/35 text-[0.78rem]">Seamlessly integrate with your favourite frameworks. Our blueprints are ready for modern development.</p>
          <div className="grid sm:grid-cols-3 gap-3 mt-8.5 text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 hover:border-[#4f6ef5]/30 hover:-translate-y-0.5 transition-all">
              <div className="w-[30px] h-[30px] rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-[0.82rem] mb-2.5">🎯</div>
              <div className="text-[0.8rem] font-bold mb-1">Cursor AI</div>
              <div className="text-white/35 text-[0.68rem] leading-[1.55]">Automate component generation and codebase editing instantly using our native MCP server integration.</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 hover:border-[#4f6ef5]/30 hover:-translate-y-0.5 transition-all">
              <div className="w-[30px] h-[30px] rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-[0.82rem] mb-2.5">⚡</div>
              <div className="text-[0.8rem] font-bold mb-1">Next.js</div>
              <div className="text-white/35 text-[0.68rem] leading-[1.55]">Export highly-optimized, modern React components utilizing the App Router and Tailwind CSS.</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 hover:border-[#4f6ef5]/30 hover:-translate-y-0.5 transition-all">
              <div className="w-[30px] h-[30px] rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-[0.82rem] mb-2.5">🐍</div>
              <div className="text-[0.8rem] font-bold mb-1">FastAPI</div>
              <div className="text-white/35 text-[0.68rem] leading-[1.55]">Generate robust asynchronous Python backends seamlessly validated by strict Pydantic schemas.</div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 text-center py-5 text-white/20 text-[0.7rem] relative z-10">
          © 2026 MyAgent Builder. · Built for the future of AI-native SaaS.
        </footer>
      </div>
    </main>
  );
}
