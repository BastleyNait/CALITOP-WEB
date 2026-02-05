'use client';

import React from "react";
import Link from "next/link";
import HeroMaquitop from "@/components/ui/hero-maquitop";
import { motion } from "framer-motion";
import {
    Settings,
    Package,
    Wrench,
    MapPin,
    ArrowRight,
    CheckCircle2,
    Phone,
    Award,
    Users,
    Clock
} from "lucide-react";

const services = [
    {
        icon: Settings,
        title: "Calibración de Equipos",
        description: "Laboratorio certificado para el ajuste preciso de estaciones totales, niveles ópticos y láseres. Garantizamos trazabilidad y cumplimiento de normativas internacionales.",
        link: "/technical-service",
        linkText: "Ver Certificaciones",
        accent: "from-orange-500 to-amber-500",
    },
    {
        icon: Package,
        title: "Venta de Instrumentos",
        description: "Distribuidores autorizados de las mejores marcas. Teodolitos, GPS diferenciales y drones para fotogrametría.",
        link: "/products",
        linkText: "Ver Catálogo",
        accent: "from-orange-600 to-orange-500",
    },
    {
        icon: Wrench,
        title: "Alquiler de Equipos",
        description: "Soluciones flexibles de renta diaria, semanal o mensual. Equipos calibrados y listos para operar en campo.",
        link: "/contact",
        linkText: "Cotizar Alquiler",
        accent: "from-amber-500 to-orange-500",
    },
    {
        icon: MapPin,
        title: "Levantamientos Topográficos",
        description: "Mapeo detallado, georreferenciación y control de obra. Utilizamos drones y escáneres láser para obtener nubes de puntos de alta precisión.",
        link: "/contact",
        linkText: "Solicitar Servicio",
        accent: "from-orange-500 to-red-500",
        featured: true,
    },
];

const benefits = [
    { icon: Award, label: "Certificación ISO 9001" },
    { icon: Users, label: "Equipo Especializado" },
    { icon: Clock, label: "Respuesta en 24h" },
];

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Hero Section */}
            <HeroMaquitop />

            {/* Services Section */}
            <section className="relative py-24 lg:py-32">
                {/* Background Effects */}
                <div className="absolute inset-0 mesh-gradient opacity-50" />

                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                            <div>
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-block text-sm font-bold text-orange-500 uppercase tracking-widest mb-4"
                                >
                                    Nuestras Soluciones
                                </motion.span>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
                                    Servicios Integrales para la{" "}
                                    <span className="text-gradient-orange">Industria Moderna</span>
                                </h2>
                            </div>
                            <p className="text-muted-foreground text-lg max-w-xl lg:text-right">
                                Optimizamos sus procesos constructivos y de medición con tecnología
                                de punta y un equipo humano altamente calificado.
                            </p>
                        </div>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`group relative ${service.featured ? 'md:col-span-2 xl:col-span-1' : ''}`}
                            >
                                <div className={`h-full service-card rounded-3xl p-8 ${service.featured ? 'bg-gradient-to-br from-orange-500/10 to-transparent' : ''}`}>
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow duration-300`}>
                                        <service.icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-orange-500 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Link */}
                                    <Link
                                        href={service.link}
                                        className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm group/link"
                                    >
                                        <span>{service.linkText}</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                    </Link>

                                    {/* Featured Badge */}
                                    {service.featured && (
                                        <div className="absolute top-6 right-6">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                                ALTA DEMANDA
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange-500/5 blur-[150px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div>
                                <span className="inline-block text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">
                                    Sobre Nosotros
                                </span>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-6">
                                    ¿Quiénes{" "}
                                    <span className="text-gradient-orange">Somos</span>?
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Somos una empresa dedicada al servicio técnico especializado y venta de equipos topográficos.
                                    Ofrecemos calibración certificada, reparación profesional y comercialización de instrumentos de precisión
                                    para ingeniería, construcción y minería.
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="flex flex-wrap gap-4">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={benefit.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl glass-card"
                                    >
                                        <benefit.icon className="w-5 h-5 text-orange-500" />
                                        <span className="text-sm font-medium text-foreground">{benefit.label}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    href="/about"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:from-orange-400 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                                >
                                    Conocer Más
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-foreground font-bold hover:border-orange-500/50 transition-all duration-300"
                                >
                                    Contáctanos
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right: Service Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        >
                            {/* Service Card 1 */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="service-card rounded-3xl p-6"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                                    <Settings className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">Servicio Técnico</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Mantenimiento, reparación y calibración certificada de estaciones totales, niveles y GPS.
                                </p>
                                <Link href="/technical-service" className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm">
                                    Ver más <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>

                            {/* Service Card 2 */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="service-card rounded-3xl p-6"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">Venta de Equipos</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Estaciones totales, niveles automáticos, GPS diferenciales, accesorios y equipos de segundo uso.
                                </p>
                                <Link href="/products" className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm">
                                    Ver catálogo <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-600/5 to-transparent" />
                    <div className="absolute inset-0 mesh-gradient opacity-30" />
                </div>

                {/* Decorative Orb */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

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
                                    ¿Necesitas asesoría técnica?
                                </h2>
                                <p className="text-muted-foreground text-lg">
                                    Contáctanos por WhatsApp y te ayudamos con tu proyecto.
                                    Respuesta inmediata de nuestro equipo especializado.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="https://wa.me/51933588122"
                                    target="_blank"
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl overflow-hidden"
                                >
                                    {/* WhatsApp Green Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] transition-all duration-300 group-hover:from-[#2BE374] group-hover:to-[#25D366]" />

                                    {/* Glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#25D366]/30 blur-2xl -z-10" />

                                    {/* WhatsApp Icon */}
                                    <svg className="relative z-10 w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>

                                    <span className="relative z-10 text-white font-bold text-base">
                                        Escribir por WhatsApp
                                    </span>
                                </Link>

                                <Link
                                    href="tel:+51933588122"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass-card font-bold text-foreground hover:border-orange-500/50 transition-all duration-300"
                                >
                                    <Phone className="w-5 h-5 text-orange-500" />
                                    +51 933 588 122
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
