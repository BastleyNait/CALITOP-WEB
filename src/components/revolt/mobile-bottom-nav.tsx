"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Users, Wrench, ShoppingBag, MessageCircle } from "lucide-react";

interface NavItem {
    href: string;
    label: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/about", label: "Nosotros", icon: Users },
    { href: "/technical-service", label: "Servicio", icon: Wrench },
    { href: "/products", label: "Productos", icon: ShoppingBag },
    { href: "/contact", label: "Contacto", icon: MessageCircle },
];

export function MobileBottomNav() {
    const pathname = usePathname();

    // Don't render on admin routes
    if (pathname?.startsWith("/admin")) return null;

    return (
        <nav
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden"
            aria-label="Navegación móvil"
        >
            <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    delay: 0.5,
                }}
                className="flex items-center gap-1 px-3 py-2.5 rounded-2xl
                           bg-black/60 backdrop-blur-xl border border-white/10
                           shadow-[0_8px_32px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)]"
            >
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname?.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-colors"
                            aria-current={isActive ? "page" : undefined}
                        >
                            {/* Active indicator pill behind icon */}
                            {isActive && (
                                <motion.div
                                    layoutId="mobile-nav-pill"
                                    className="absolute inset-0 rounded-xl bg-orange-500/15 border border-orange-500/25"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 30,
                                    }}
                                />
                            )}

                            <Icon
                                className={`relative z-10 w-5 h-5 transition-colors ${
                                    isActive
                                        ? "text-orange-400"
                                        : "text-slate-400"
                                }`}
                                strokeWidth={isActive ? 2.2 : 1.8}
                            />
                            <span
                                className={`relative z-10 text-[10px] mt-0.5 font-medium transition-colors ${
                                    isActive
                                        ? "text-orange-400"
                                        : "text-slate-500"
                                }`}
                            >
                                {item.label}
                            </span>

                            {/* Active dot under label */}
                            {isActive && (
                                <motion.div
                                    layoutId="mobile-nav-dot"
                                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-orange-500"
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </Link>
                    );
                })}
            </motion.div>
        </nav>
    );
}

export default MobileBottomNav;
