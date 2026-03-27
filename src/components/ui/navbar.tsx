"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "glass-nav shadow-2xl shadow-black/40"
                : "bg-transparent"
                }`}
        >
            {/* Gradient line at top when scrolled */}
            {scrolled && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
                />
            )}

            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                <div className="relative flex items-center justify-between h-16 lg:h-24">
                    {/* Logo - Calitop */}
                    <Link href="/" className="flex items-center gap-3 group z-10">
                        <motion.div
                            className="relative flex items-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="relative w-40 h-11 lg:w-52 lg:h-16">
                                <Image
                                    src="https://f005.backblazeb2.com/file/CALITOP/images/products/logo.png"
                                    alt="Calitop Logo"
                                    fill
                                    className="object-contain drop-shadow-lg"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation - Absolutely Centered */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex items-center glass-card rounded-full p-1.5">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="relative px-6 py-2.5"
                                        onMouseEnter={() => setHoveredLink(link.href)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        {/* Animated background pill */}
                                        <AnimatePresence>
                                            {(isActive || hoveredLink === link.href) && (
                                                <motion.div
                                                    layoutId="navbar-pill"
                                                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/30"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                                />
                                            )}
                                        </AnimatePresence>

                                        {/* Link text */}
                                        <span
                                            className={`relative z-10 text-sm font-bold transition-colors ${isActive || hoveredLink === link.href
                                                ? "text-white"
                                                : "text-slate-300 hover:text-white"
                                                }`}
                                        >
                                            {link.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Section — Topservice logo (all screens) */}
                    <div className="flex items-center z-10">
                        <div className="relative w-44 h-14 lg:w-52 lg:h-16 xl:w-64 xl:h-20">
                            <Image
                                src="https://f005.backblazeb2.com/file/CALITOP/images/products/logo_topservice.png"
                                alt="Topservice Logo"
                                fill
                                className="object-contain brightness-110"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
