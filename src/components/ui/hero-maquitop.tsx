"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

const backgroundImages = [
    "https://f005.backblazeb2.com/file/CALITOP/images/products/en-campo.png",
    "https://f005.backblazeb2.com/file/CALITOP/images/products/colimador-estacion.jpeg",
    "https://f005.backblazeb2.com/file/CALITOP/images/products/colimador.jpeg",
    "https://f005.backblazeb2.com/file/CALITOP/images/products/geo-gnss.png",
    "https://f005.backblazeb2.com/file/CALITOP/images/products/inspeccion-drone.png",
];

// Imágenes del carrusel principal (Backblaze B2)
const heroCarouselImages = [
    {
        src: "https://f005.backblazeb2.com/file/CALITOP/img/hero_leica.png",
        alt: "Estaciones totales de alta precisión leica - CALITOP"
    },
    {
        src: "https://f005.backblazeb2.com/file/CALITOP/img/hero_topcon.png",
        alt: "Estaciones totales de alta precisión topcon - CALITOP"
    },
    {
        src: "https://f005.backblazeb2.com/file/CALITOP/img/niveles-hero.webp",
        alt: "Niveles topográficos certificados - CALITOP"
    }
];

const features = [
    "Calibración Certificada",
    "Servicio Técnico Especializado",
    "Venta y Alquiler de Equipos",
];

export const HeroMaquitop = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const carouselIndex = currentImageIndex % heroCarouselImages.length;

    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                {/* Image Slideshow */}
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={backgroundImages[currentImageIndex]}
                            alt="Background Slideshow"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Mesh Gradient Overlay */}
                <div className="absolute inset-0 mesh-gradient opacity-90" />

                {/* Radial Gradient for Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

                {/* Side Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {/* Floating Orb — visible on all screens */}
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.25, 0.45, 0.25],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] xl:w-[500px] xl:h-[500px] rounded-full bg-orange-500/10 blur-[80px] sm:blur-[120px]"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.18, 0.35, 0.18],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/3 left-1/4 w-[180px] h-[180px] sm:w-[350px] sm:h-[350px] xl:w-[400px] xl:h-[400px] rounded-full bg-orange-600/8 blur-[60px] sm:blur-[100px]"
                />

                {/* Decorative Arc — desktop only */}
                <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px]">
                    <svg viewBox="0 0 700 700" fill="none" className="w-full h-full">
                        <defs>
                            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#F97316" stopOpacity="0.6" />
                                <stop offset="50%" stopColor="#FB923C" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#F97316" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>
                        <motion.circle
                            cx="350" cy="350" r="300"
                            stroke="url(#arcGradient)" strokeWidth="2"
                            strokeLinecap="round" strokeDasharray="500 1200" fill="none"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: "center" }}
                        />
                        <motion.circle
                            cx="350" cy="350" r="250"
                            stroke="url(#arcGradient)" strokeWidth="1"
                            strokeLinecap="round" strokeDasharray="300 800" fill="none"
                            initial={{ rotate: 180 }}
                            animate={{ rotate: -180 }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: "center" }}
                        />
                    </svg>
                </div>
            </div>

            {/* ── MAIN CONTENT ─────────────────────────────────────── */}
            <div className="relative z-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-0 lg:gap-12 xl:gap-20 items-center w-full pt-24 pb-8 lg:py-32">

                    {/* ── LEFT: Text Content ───────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 lg:space-y-8"
                    >
                        {/* ── Badge pill (NEW mobile-first) */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{
                                background: "rgba(249,115,22,0.1)",
                                border: "1px solid rgba(249,115,22,0.35)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                            }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.25, 1], opacity: [1, 0.6, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Zap className="w-3.5 h-3.5 text-orange-400" fill="currentColor" />
                            </motion.div>
                            <span className="text-xs font-semibold tracking-wide text-orange-300 uppercase">
                                Especialistas en Topografía
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight"
                        >
                            Precisión que{" "}
                            <span className="block">
                                <span className="text-gradient-orange">Construye</span>{" "}
                                <span className="text-white">Confianza</span>
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-base lg:text-xl text-slate-400 max-w-xl leading-relaxed"
                        >
                            Experiencia y dedicación en servicios de topografía, calibración de equipos y venta de instrumental técnico garantizado.
                        </motion.p>

                        {/* ── Features ───────── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className="flex flex-wrap gap-4">
                                {features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-orange-500" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* ── CTA Buttons ───────── mobile: full-width col / desktop: flex row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 lg:pt-4"
                        >
                            {/* Primary CTA */}
                            <Link
                                href="/products"
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl overflow-hidden w-full sm:w-auto"
                                style={{
                                    boxShadow: "0 0 28px rgba(249,115,22,0.35), 0 0 60px rgba(249,115,22,0.12)",
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:from-orange-400 group-hover:to-orange-500" />
                                <div className="absolute inset-0 shimmer" />
                                <span className="relative z-10 text-white font-bold text-base">
                                    Explorar Calitop
                                </span>
                                <ArrowRight className="relative z-10 w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
                            </Link>

                            {/* Secondary CTA */}
                            <Link
                                href="/technical-service"
                                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass-card card-glow w-full sm:w-auto"
                            >
                                <span className="text-white font-bold text-base">
                                    Explorar Topservice
                                </span>
                                <ArrowRight className="w-5 h-5 text-slate-400 transition-all group-hover:text-orange-500 group-hover:translate-x-1" />
                            </Link>
                        </motion.div>

                        {/* ── MOBILE: Equipment Carousel (inline) ─── */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.95 }}
                            className="lg:hidden relative flex items-center justify-center w-full h-[250px] sm:h-[300px] pt-8"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={carouselIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 1.0, ease: "easeInOut" }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <Image
                                        src={heroCarouselImages[carouselIndex].src}
                                        alt={heroCarouselImages[carouselIndex].alt}
                                        width={380}
                                        height={280}
                                        className="object-contain max-h-full drop-shadow-2xl"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT: Equipment Carousel — desktop only ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative hidden lg:block"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="relative flex items-center justify-center w-full h-[400px] xl:h-[450px]"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={carouselIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <Image
                                        src={heroCarouselImages[carouselIndex].src}
                                        alt={heroCarouselImages[carouselIndex].alt}
                                        width={600}
                                        height={400}
                                        className="object-contain max-h-full drop-shadow-2xl"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            {/* Scroll Indicator — desktop only */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">
                        Descubre más
                    </span>
                    <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1.5">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-3 bg-orange-500 rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroMaquitop;
