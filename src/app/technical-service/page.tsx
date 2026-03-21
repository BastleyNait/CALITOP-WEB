"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Shield, Puzzle, Wrench, CheckCircle2, Clock, Award } from "lucide-react";
import { useState, useEffect } from "react";

const services = [
    {
        icon: Search,
        title: "Diagnóstico Especializado",
        description: "Evaluación integral de sistemas ópticos, mecánicos y electrónicos utilizando colimadores de alta precisión.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: Shield,
        title: "Calibración Certificada",
        description: "Ajuste preciso bajo estándares internacionales. Entregamos certificado de calibración vigente para tus proyectos.",
        color: "from-orange-500 to-orange-600",
    },
    {
        icon: Puzzle,
        title: "Reparación y Repuestos",
        description: "Cambio de pantallas, teclados, distanciómetros y baterías. Uso exclusivo de repuestos originales.",
        color: "from-purple-500 to-indigo-600",
    },
];

const brands = ["Leica", "Topcon", "Trimble", "Sokkia", "South", "Hi-Target", "Kolida", "Nikon"];

const features = [
    { icon: CheckCircle2, text: "Certificación ISO" },
    { icon: Clock, text: "Diagnóstico en 24h" },
    { icon: Award, text: "Garantía Oficial" },
    { icon: Wrench, text: "Repuestos Originales" },
];

export default function TechnicalServicePage() {
    const whatsappNumber = "51919615654";
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const backgroundImages = [
        "https://f005.backblazeb2.com/file/CALITOP/images/products/geo-gnss.png",
        "https://f005.backblazeb2.com/file/CALITOP/images/products/colimador.jpeg",
        "https://f005.backblazeb2.com/file/CALITOP/images/products/en-campo.png",
        "https://f005.backblazeb2.com/file/CALITOP/images/products/inspeccion-drone.png",
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [backgroundImages.length]);

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    {/* Image Slideshow */}
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.4 }}
                        animate={{ opacity: 0.7, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
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

                    {/* Mesh Gradient Overlay */}
                    <div className="absolute inset-0 mesh-gradient opacity-60" />

                    {/* Radial Gradient for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

                    {/* Side Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
                    <motion.div
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/3 right-1/3 w-[600px] h-[600px] rounded-full bg-orange-500/15 blur-[150px]"
                    />
                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]"
                    />
                </div>

                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-32">
                    <div className="text-center max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                <span className="text-orange-500 font-black uppercase tracking-widest text-xs">Laboratorio de Precisión</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight mb-8"
                        >
                            Servicio {" "}
                            <span className="text-gradient-orange">Técnico</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Especialistas en la salud de tus equipos. Garantizamos precisión milimétrica
                            mediante tecnología de calibración de última generación.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <Link
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, necesito servicio técnico para mi equipo topográfico")}`}
                                target="_blank"
                                className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black rounded-2xl hover:from-orange-400 hover:to-orange-500 transition-all hover:scale-[1.02] shadow-2xl shadow-orange-500/30 flex items-center justify-center gap-3"
                            >
                                Agendar Diagnóstico
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#servicios"
                                className="w-full sm:w-auto px-10 py-5 glass-card text-foreground font-bold rounded-2xl hover:border-orange-500/50 transition-all text-center"
                            >
                                Ver Servicios
                            </Link>
                        </motion.div>

                        {/* Features Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap justify-center gap-4 pt-12"
                        >
                            {features.map((feature, index) => (
                                <div
                                    key={feature.text}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full glass-card"
                                >
                                    <feature.icon className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm font-medium text-foreground">{feature.text}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Explorar</span>
                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </motion.div>
            </section>

            {/* Featured Image Section */}
            <section className="relative py-24 lg:py-32">
                <div className="absolute inset-0 mesh-gradient opacity-30" />

                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-orange-500/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <Image
                                    src="https://f005.backblazeb2.com/file/CALITOP/images/products/reparacion.jpg"
                                    alt="Laboratorio de Calibración"
                                    width={800}
                                    height={600}
                                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="flex items-center gap-4 p-4 rounded-2xl glass-card">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">Certificación ISO</h4>
                                            <p className="text-slate-400 text-sm">Cumplimos con los estándares más rigurosos.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div>
                                <span className="inline-block text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">
                                    Nuestra Prioridad
                                </span>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-6">
                                    Tu precisión es nuestra{" "}
                                    <span className="text-gradient-orange">prioridad</span>
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Un milímetro de error puede costar miles de dólares en obra. Por eso,
                                    hemos invertido en infraestructura de colimación de primer nivel y
                                    técnicos certificados por las principales marcas del mundo.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <span className="block text-4xl font-black text-foreground mb-2">Garantizado</span>
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Experiencia técnica</span>
                                </div>
                                <div>
                                    <span className="block text-4xl font-black text-gradient-orange mb-2">24 Horas</span>
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Diagnóstico rápido</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="servicios" className="relative py-24 lg:py-32">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">
                            Nuestros Servicios
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
                            Expertise en cada{" "}
                            <span className="text-gradient-orange">componente</span>
                        </h2>
                        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                            Soluciones integrales para Estaciones Totales, GPS GNSS, Niveles Láser y Drones.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group"
                            >
                                <div className="h-full service-card rounded-3xl p-10">
                                    <div className={`w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-2xl text-white group-hover:scale-110 transition-transform`}>
                                        <service.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-orange-500 transition-colors uppercase tracking-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
