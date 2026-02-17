"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { Menu, X, ChevronRight } from "lucide-react";

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

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Check if we are in admin section
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return <AdminNavbar />;
    }

    return (
        <>
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
                    <div className="relative flex items-center justify-between h-20 lg:h-24">
                        {/* Logo - Calitop */}
                        <Link href="/" className="flex items-center gap-3 group z-10">
                            <motion.div
                                className="relative flex items-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="relative w-44 h-14 lg:w-52 lg:h-16">
                                    <Image
                                        src="/images/products/logo.png"
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

                        {/* Right Section - CTA + Logo */}
                        <div className="flex items-center gap-4 z-10">
                            {/* Logo Topservice - Desktop only */}
                            <div className="hidden xl:flex items-center gap-2">
                                <div className="w-px h-8 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
                                <div className="relative w-36 h-16">
                                    <Image
                                        src="/images/products/logo2.png"
                                        alt="Topservice Logo"
                                        fill
                                        className="object-contain brightness-110"
                                        priority
                                    />
                                </div>
                            </div>{/* CTA Button */}
                            <Link
                                href="https://wa.me/51933588122"
                                target="_blank"
                                className="group relative px-6 py-3 rounded-xl overflow-hidden"
                            >
                                {/* Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:from-orange-400 group-hover:to-orange-500" />

                                {/* Glow Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400 to-orange-500 blur-xl" />

                                {/* Content */}
                                <span className="relative z-10 flex items-center gap-2 text-white font-bold text-sm">
                                    Cotizar Ahora
                                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center">
                            <motion.button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="relative w-12 h-12 rounded-xl glass-card flex items-center justify-center text-white"
                                whileTap={{ scale: 0.9 }}
                            >
                                <AnimatePresence mode="wait">
                                    {mobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <X className="w-6 h-6" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Menu className="w-6 h-6" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu - Full Screen Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-full max-w-sm glass-heavy"
                        >
                            {/* Gradient accent line */}
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-orange-500/50 via-orange-500/20 to-transparent" />

                            <div className="flex flex-col h-full pt-24 pb-8 px-6">
                                {/* Navigation Links */}
                                <div className="flex-1 space-y-2">
                                    {navLinks.map((link, index) => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${isActive
                                                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                                                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                                                        }`}
                                                >
                                                    <span className="font-semibold text-lg">{link.label}</span>
                                                    <ChevronRight
                                                        className={`w-5 h-5 transition-transform ${isActive ? "text-white" : "text-slate-500 group-hover:text-orange-500 group-hover:translate-x-1"
                                                            }`}
                                                    />
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Bottom Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="space-y-6 pt-6 border-t border-white/10"
                                >
                                    {/* Logos */}
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="relative w-28 h-10">
                                            <Image
                                                src="/images/products/logo.png"
                                                alt="Calitop Logo"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="w-px h-8 bg-white/20" />
                                        <div className="relative w-32 h-12">
                                            <Image
                                                src="/images/products/logo2.png"
                                                alt="TOPSERVICE Logo"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        href="https://wa.me/51933588122"
                                        target="_blank"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-lg shadow-orange-500/30"
                                    >
                                        Cotizar Ahora
                                        <ChevronRight className="w-5 h-5" />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
