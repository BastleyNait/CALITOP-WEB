"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AdminNavbar } from "@/components/admin/admin-navbar";

const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Nosotros" },
    { href: "/technical-service", label: "Servicio Técnico" },
    { href: "/products", label: "Productos" },
    { href: "/contact", label: "Contacto" },
];

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Check if we are in admin section
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return <AdminNavbar />;
    }

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "bg-white/90 dark:bg-[#08090a]/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/10 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            className="relative flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Full Logo PNG */}
                            <div className="relative w-48 h-16">
                                <Image
                                    src="/images/products/logo.png"
                                    alt="Calitop Logo"
                                    fill
                                    className="object-contain drop-shadow-md"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center">
                        <div className="flex items-center bg-zinc-100/50 dark:bg-black/40 backdrop-blur-md rounded-full p-1.5 border border-slate-200/50 dark:border-white/10">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                const isHovered = hoveredLink === link.href;

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onMouseEnter={() => setHoveredLink(link.href)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                        className="relative px-5 py-2 rounded-full text-sm font-bold transition-colors duration-200"
                                    >
                                        {/* Background pill */}
                                        {(isActive || isHovered) && (
                                            <motion.div
                                                layoutId="navPill"
                                                className={`absolute inset-0 rounded-full ${isActive
                                                    ? "bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-slate-200 dark:ring-white/10"
                                                    : "bg-slate-200/50 dark:bg-white/5"
                                                    }`}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                            />
                                        )}

                                        {/* Text */}
                                        <span className={`relative z-10 transition-colors duration-200 ${isActive
                                            ? "text-[#F97316]"
                                            : isHovered
                                                ? "text-slate-900 dark:text-white"
                                                : "text-slate-500 dark:text-slate-400"
                                            }`}>
                                            {link.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Desktop Actions - TOPSERVICE Logo */}
                    <div className="hidden lg:flex items-center">
                        <div className="relative w-40 h-20">
                            <Image
                                src="/images/products/logo2.png"
                                alt="TOPSERVICE Logo"
                                fill
                                className="object-contain brightness-110"
                                priority
                            />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-4">
                        <motion.button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200"
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="w-5 h-4 flex flex-col justify-between">
                                <motion.span
                                    animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                    className="w-full h-0.5 bg-slate-800 dark:bg-slate-200 rounded-full origin-left"
                                />
                                <motion.span
                                    animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                                    className="w-full h-0.5 bg-slate-800 dark:bg-slate-200 rounded-full"
                                />
                                <motion.span
                                    animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                    className="w-full h-0.5 bg-slate-800 dark:bg-slate-200 rounded-full origin-left"
                                />
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden overflow-hidden bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl border-t border-slate-100 dark:border-slate-800 shadow-xl"
                    >
                        <div className="px-4 py-6 space-y-2">
                            {navLinks.map((link, index) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 ${isActive
                                                ? "bg-[#F97316] text-white shadow-md shadow-orange-500/20"
                                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-[#F97316] dark:hover:text-[#F97316]"
                                                }`}
                                        >
                                            <span className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : "bg-slate-300 dark:bg-slate-600"
                                                }`} />
                                            <span className="font-bold">{link.label}</span>
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            {/* Removed Admin link from mobile menu */}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
