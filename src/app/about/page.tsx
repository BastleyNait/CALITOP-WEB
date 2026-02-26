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

            {/* Stats Section */}
            <section className="relative py-24 lg:py-32 border-t border-white/5">
                <div className="absolute inset-0 mesh-gradient opacity-30" />

                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="relative py-24 lg:py-32">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">
                            ¿Por Qué Elegirnos?
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
                            Compromiso con la{" "}
                            <span className="text-gradient-orange">Excelencia</span>
                        </h2>
                    </motion.div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {highlights.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group"
                            >
                                <div className="h-full service-card rounded-3xl p-8">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow duration-300">
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-orange-500 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Gallery Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Images Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="space-y-4">
                                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                                    <Image
                                        src="https://f005.backblazeb2.com/file/CALITOP/images/products/en-campo.png"
                                        alt="Trabajo en campo"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                                    <Image
                                        src="https://f005.backblazeb2.com/file/CALITOP/images/products/geo-gnss.png"
                                        alt="Equipos GNSS"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                                    <Image
                                        src="https://f005.backblazeb2.com/file/CALITOP/images/products/inspeccion-drone.png"
                                        alt="Inspección con drone"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                                    <Image
                                        src="https://f005.backblazeb2.com/file/CALITOP/images/products/colimador.jpeg"
                                        alt="Laboratorio"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div>
                                <span className="inline-block text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">
                                    Nuestra Especialización
                                </span>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-6">
                                    Tecnología de{" "}
                                    <span className="text-gradient-orange">Precisión</span>
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Contamos con infraestructura de colimación de primer nivel para garantizar
                                    la máxima precisión en cada calibración. Trabajamos exclusivamente con
                                    repuestos originales de las marcas líderes del mercado.
                                </p>
                            </div>

                            {/* Brands */}
                            <div>
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4">
                                    Marcas que trabajamos
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {brands.map((brand) => (
                                        <span
                                            key={brand}
                                            className="px-4 py-2 rounded-xl bg-zinc-900/50 border border-white/5 text-slate-400 font-bold text-sm hover:text-orange-400 hover:border-orange-500/20 transition-all"
                                        >
                                            {brand}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, me gustaría más información sobre sus servicios")}`}
                                target="_blank"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold hover:from-[#2BE374] hover:to-[#25D366] transition-all duration-300 shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Contáctanos
                            </Link>
                        </motion.div>
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
                        className="glass-card rounded-3xl p-8 lg:p-12 xl:p-16"
                    >
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="text-center lg:text-left max-w-2xl">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-4">
                                    ¿Listo para trabajar con precisión?
                                </h2>
                                <p className="text-muted-foreground text-lg">
                                    Contáctanos y descubre cómo podemos ayudarte con tu próximo proyecto.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:from-orange-400 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-orange-500/30"
                                >
                                    Solicitar Cotización
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
