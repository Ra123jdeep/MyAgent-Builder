import { DashboardTabs } from "@/components/layout/DashboardTabs";

export default function TicketsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
                        MyAgent Builder
                    </h1>
                    <p className="text-sm text-slate-400">
                        From raw SaaS idea to AI-orchestrated delivery plan.
                    </p>
                </div>
            </header>
            <DashboardTabs />
            <main>{children}</main>
        </div>
    );
}
