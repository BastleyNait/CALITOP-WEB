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
    const whatsappNumber = "51933588122";
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const backgroundImages = [
        "/images/products/geo-gnss.png",
        "/images/products/colimador.jpeg",
        "/images/products/en-campo.png",
        "/images/products/inspeccion-drone.png",
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
                                    src="/images/products/reparacion.jpg"
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

            {/* Image Gallery */}
            <section className="relative py-24 lg:py-32 border-t border-white/5">
                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">
                            Infraestructura
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
                            Nuestro{" "}
                            <span className="text-gradient-orange">Laboratorio</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { src: "/images/products/colimador.jpeg", alt: "Colimador de precisión" },
                            { src: "/images/products/en-campo.png", alt: "Trabajo en campo" },
                            { src: "/images/products/geo-gnss.png", alt: "Equipos GNSS" },
                            { src: "/images/products/inspeccion-drone.png", alt: "Inspección con drone" },
                        ].map((image, index) => (
                            <motion.div
                                key={image.src}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group"
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands */}
            <section className="relative py-24 lg:py-32 border-t border-white/5">
                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    <h3 className="text-center text-slate-500 text-xs font-black uppercase tracking-[0.4em] mb-12">
                        Especialización de Marca
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {brands.map((brand) => (
                            <div
                                key={brand}
                                className="py-4 px-6 rounded-2xl border border-white/5 bg-zinc-900/30 text-slate-400 font-black text-center text-sm hover:text-orange-400 hover:bg-orange-500/5 hover:border-orange-500/20 transition-all cursor-default"
                            >
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-600/5 to-transparent" />
                    <div className="absolute inset-0 mesh-gradient opacity-30" />
                </div>

                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 z-0" />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-1" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                                ¿Tu equipo requiere atención?
                            </h2>
                            <p className="text-white/80 text-lg font-medium mb-10 max-w-xl mx-auto">
                                Nuestro servicio técnico está listo para reactivar tu productividad hoy mismo.
                            </p>
                            <Link
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, necesito servicio técnico")}`}
                                target="_blank"
                                className="inline-flex items-center gap-4 px-10 py-5 bg-black text-white font-black rounded-2xl hover:bg-zinc-900 transition-all hover:scale-105 shadow-2xl"
                            >
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Hablar con un Técnico
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
