import React from "react";

export function GlowDivider() {
    return (
        <div className="w-full h-[150px] md:h-[200px] relative overflow-hidden flex justify-center mt-8 mb-4 pointer-events-none z-0">
            {/* The curved planet horizon effect */}
            <div className="absolute top-[80px] md:top-[120px] w-[200%] md:w-[150%] h-[500px] rounded-[100%] border-t border-cyan-400/5 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.03),transparent_60%)] shadow-[inset_0_20px_50px_rgba(34,211,238,0.1),0_-30px_100px_rgba(34,211,238,0.15),0_-10px_40px_rgba(139,92,246,0.15)] blur-[4px]"></div>
            {/* A bright center highlight */}
            <div className="absolute top-[78px] md:top-[118px] w-[300px] md:w-[600px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-xl opacity-50"></div>
        </div>
    );
}
