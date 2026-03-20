'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Shield, Clock, Wrench, CheckCircle2 } from "lucide-react";

const highlights = [
    {
        icon: Award,
        title: "Certificación Oficial",
        description: "Calibración bajo estándares internacionales con trazabilidad documentada."
    },
    {
        icon: Shield,
        title: "Garantía Extendida",
        description: "Respaldo total en cada equipo vendido y servicio realizado."
    },
    {
        icon: Clock,
        title: "Respuesta Rápida",
        description: "Diagnóstico en 24 horas y soluciones ágiles para tu proyecto."
    },
    {
        icon: Wrench,
        title: "Servicio Integral",
        description: "Desde venta hasta mantenimiento preventivo y correctivo."
    },
];

const stats = [
    { value: "Amplia", label: "Experiencia" },
    { value: "+100", label: "Equipos Calibrados" },
    { value: "100%", label: "Satisfacción" },
    { value: "24h", label: "Tiempo de Respuesta" },
];

const brands = ["Leica", "Topcon", "Trimble", "Sokkia", "South", "Hi-Target", "Kolida", "Nikon"];

export default function AboutPage() {
    const whatsappNumber = "51933588122";

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 mesh-gradient opacity-50" />
                    <motion.div
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[150px]"
                    />
                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-600/10 blur-[120px]"
                    />
                </div>

                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                <span className="text-orange-500 font-black uppercase tracking-widest text-xs">Nosotros</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                                Precisión que{" "}
                                <span className="text-gradient-orange">Impulsa Proyectos</span>
                            </h1>

                            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl">
                                CALITOP es referente en <span className="text-orange-400 font-bold">equipos topográficos y servicio técnico especializado</span>.
                                Ofrecemos calibración certificada, venta de instrumentos de precisión y soporte continuo
                                para la industria de la construcción, minería e ingeniería.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:from-orange-400 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                                >
                                    Ver Catálogo
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/technical-service"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-foreground font-bold hover:border-orange-500/50 transition-all duration-300"
                                >
                                    Servicio Técnico
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
                                <Image
                                    src="https://f005.backblazeb2.com/file/CALITOP/images/products/colimador.jpeg"
                                    alt="Laboratorio de Calibración CALITOP"
                                    fill
                                    className="object-cover"
                                />
                                {/*hola*/}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Overlay Badge */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-4 p-4 rounded-2xl glass-card">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">Nuestro Laboratorio</h4>
                                            <p className="text-slate-400 text-sm">Precisión que impulsa proyectos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Orb */}
                            <div className="absolute -top-8 -right-8 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
