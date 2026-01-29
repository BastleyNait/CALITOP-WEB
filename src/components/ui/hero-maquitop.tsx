"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import FadeContent from "@/components/FadeContent";

const backgroundImages = [
    "/images/products/en-campo.png",
    "/images/products/colimador-estacion.jpeg",
    "/images/products/colimador.jpeg",
    "/images/products/geo-gnss.png",
    "/images/products/inspeccion-drone.png",
];

export const HeroMaquitop = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
            {/* Background Image Slideshow */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.25 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "linear" }}
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            </div>

            {/* Decorative Arc (like Maquitop) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-10 hidden lg:block">
                <svg viewBox="0 0 600 600" fill="none" className="w-full h-full">
                    <circle
                        cx="300"
                        cy="300"
                        r="280"
                        stroke="url(#arcGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="400 1000"
                        transform="rotate(-30 300 300)"
                    />
                    <defs>
                        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F97316" />
                            <stop offset="100%" stopColor="#FB923C" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-24">
                    {/* Left: Text Content */}
                    <FadeContent blur={true} duration={800} delay={200} initialOpacity={0}>
                        <div className="space-y-8">
                            {/* Dual Logos */}
                            <div className="flex items-center gap-4 mb-6">
                                <Image
                                    src="/images/products/logo.png"
                                    alt="CALITOP Logo"
                                    width={140}
                                    height={45}
                                    className="h-10 w-auto object-contain brightness-110"
                                    priority
                                />
                                <div className="w-px h-8 bg-slate-500" />
                                <Image
                                    src="/images/products/logo2.png"
                                    alt="TOPSERVICE Logo"
                                    width={220}
                                    height={70}
                                    className="h-16 w-auto object-contain brightness-110"
                                    priority
                                />
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                                Soluciones para tus{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
                                    Proyectos
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                                Empresa dedicada al servicio técnico y venta de equipos topográficos.
                                Calibración, reparación, mantenimiento y comercialización de instrumentos de precisión.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="https://wa.me/51933588122"
                                    target="_blank"
                                    className="px-8 py-4 bg-[#F97316] text-white font-bold rounded-lg hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/30 flex items-center gap-2"
                                >
                                    Contáctanos
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/products"
                                    className="px-8 py-4 border-2 border-white/10 text-white font-bold rounded-lg hover:bg-white/5 transition-all"
                                >
                                    Ver Productos
                                </Link>
                            </div>
                        </div>
                    </FadeContent>

                    {/* Right: Equipment Images */}
                    <FadeContent blur={true} duration={800} delay={400} initialOpacity={0}>
                        <div className="relative hidden lg:block">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="relative z-10"
                            >
                                <Image
                                    src="/images/products/calibracion.png"
                                    alt="Equipos Topográficos"
                                    width={600}
                                    height={500}
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </FadeContent>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="flex flex-col items-center gap-2 text-slate-400">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-slate-500 flex items-start justify-center p-2"
                    >
                        <div className="w-1 h-2 bg-slate-400 rounded-full" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroMaquitop;
