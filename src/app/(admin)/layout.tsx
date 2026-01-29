import React from "react";
import { Aurora } from "@/components/Aurora";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="pt-20 min-h-screen bg-[#050505] text-foreground relative">
            <div className="fixed inset-0 z-0 opacity-[0.08] pointer-events-none">
                <Aurora colorStops={["#050505", "#F97316", "#050505"]} speed={0.5} />
            </div>
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}
