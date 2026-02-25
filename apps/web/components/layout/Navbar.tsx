import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(46,107,255,0.4)] group-hover:shadow-[0_0_25px_rgba(46,107,255,0.6)] transition-all">
                        M
                    </div>
                    <span className="font-semibold text-white tracking-tight text-lg">MyAgent Builder</span>
                </Link>

                {/* Center Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Features</Link>
                    <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">How it Works</Link>
                    <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Pricing</Link>
                    <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Blog</Link>
                </div>

                {/* Right CTA */}
                <div className="flex items-center gap-4">
                    <Link href="/login" className="hidden sm:block text-sm font-medium text-white hover:text-primary transition-colors">
                        Sign In
                    </Link>
                    <Link href="/create">
                        <Button className="bg-primary hover:bg-primary-hover text-white rounded-pill px-6 shadow-neon-glow transition-all">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
