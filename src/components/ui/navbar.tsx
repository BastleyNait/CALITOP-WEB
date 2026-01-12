"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Nosotros" },
    { href: "/rentals", label: "Venta y Alquiler" },
    { href: "/technical-service", label: "Servicio Técnico" },
    { href: "/topography-service", label: "Topografía" },
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

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm"
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
                        <div className="flex items-center bg-slate-100/50 rounded-full p-1.5 border border-slate-200/50">
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
                                                    ? "bg-white shadow-sm ring-1 ring-slate-200"
                                                    : "bg-slate-200/50"
                                                    }`}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                            />
                                        )}

                                        {/* Text */}
                                        <span className={`relative z-10 transition-colors duration-200 ${isActive
                                            ? "text-[#2563EB]"
                                            : isHovered
                                                ? "text-slate-900"
                                                : "text-slate-500"
                                            }`}>
                                            {link.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/admin/products"
                            className="group relative px-6 py-2.5 rounded-full text-sm font-bold overflow-hidden shadow-md hover:shadow-lg transition-all"
                        >
                            {/* Animated gradient background - Orange to Red/Orange */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316] bg-[length:200%_100%] animate-gradient-x" />

                            <span className="relative z-10 text-white flex items-center gap-2">
                                Admin
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden relative w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800"
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className="w-5 h-4 flex flex-col justify-between">
                            <motion.span
                                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-slate-800 rounded-full origin-left"
                            />
                            <motion.span
                                animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                                className="w-full h-0.5 bg-slate-800 rounded-full"
                            />
                            <motion.span
                                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-slate-800 rounded-full origin-left"
                            />
                        </div>
                    </motion.button>
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
                        className="lg:hidden overflow-hidden bg-white/98 backdrop-blur-2xl border-t border-slate-100 shadow-xl"
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
                                                ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-[#2563EB]"
                                                }`}
                                        >
                                            <span className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : "bg-slate-300"
                                                }`} />
                                            <span className="font-bold">{link.label}</span>
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            <motion.div
                                className="pt-4 mt-4 border-t border-slate-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link
                                    href="/admin/products"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold shadow-lg shadow-orange-500/20"
                                >
                                    Admin Panel
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
