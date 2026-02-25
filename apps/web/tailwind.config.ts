import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F14", // Deep charcoal/near-black
        foreground: "#F3F4F6", // Light gray
        primary: {
          DEFAULT: "#8B5CF6", // Neon Purple
          foreground: "#FFFFFF",
          hover: "#9333EA" // Lighter Neon Purple
        },
        secondary: {
          DEFAULT: "#111827", // Darker slate panel
          foreground: "#9CA3AF", // Muted gray text
          hover: "#1F2937"
        },
        accent: {
          DEFAULT: "#EC4899", // Neon Pink
          glow: "rgba(236, 72, 153, 0.4)" // Soft pink glow
        },
        cyan: {
          DEFAULT: "#22D3EE",
          hover: "#38BDF8",
          glow: "rgba(34, 211, 238, 0.4)"
        },
        muted: {
          DEFAULT: "#0F172A", // Slate / midnight accent
          foreground: "#9CA3AF" // Muted Gray
        },
        card: {
          DEFAULT: "rgba(17, 24, 39, 0.7)", // Glassy Slate
          foreground: "#F3F4F6",
          border: "rgba(139, 92, 246, 0.2)" // Subtle Neon Purple Border
        },
        destructive: {
          DEFAULT: "#EF4444", // Red
          foreground: "#FFFFFF"
        },
        border: "rgba(139, 92, 246, 0.15)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"]
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        pill: "9999px"
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        "neon-glow": "0 0 20px rgba(124, 58, 237, 0.25)",
        "neon-hover": "0 0 30px rgba(147, 51, 234, 0.4)",
        "card-hover": "0 10px 40px -10px rgba(124, 58, 237, 0.15)"
      },
      backdropBlur: {
        glass: "12px",
        heavy: "20px"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "conic-gradient(from 180deg at 50% 50%, #0B0F14 0deg, #1e1b4b 180deg, #0B0F14 360deg)",
        "card-gradient": "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        "tech-grid": "radial-gradient(circle, #312e81 1px, transparent 1px)"
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "marquee": "marquee 25s linear infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" } // Reduced float distance for tighter feel
        },
        shimmer: {
          "0%": { backgroundPosition: "100% 0" },
          "100%": { backgroundPosition: "-100% 0" }
        }
      }
    }
  },
  plugins: []
};

export default config;
