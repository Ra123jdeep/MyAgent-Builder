import { Hexagon, Twitter, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-background border-t border-white/5 pt-20 pb-10">
            <div className="container px-4 mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
                            <Hexagon className="w-8 h-8 text-primary fill-primary/20" />
                            Next Gen
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            The advanced terminal for building, deploying, and scaling autonomous AI agent workforces.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-black transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/create" className="hover:text-primary transition-colors">Agent Builder</Link></li>
                            <li><Link href="/integrations" className="hover:text-primary transition-colors">Marketplace</Link></li>
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">API Reference</Link></li>
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Status</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Partners</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Security Audit</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <div>
                        &copy; 2026 Next Gen Protocol. All rights reserved.
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        All Systems Operational
                    </div>
                </div>
            </div>
        </footer>
    );
}
