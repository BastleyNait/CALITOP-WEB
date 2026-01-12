'use client';

import React from "react";
import Link from "next/link";
import { HeroParallax } from "@/components/ui/hero-parallax";
import BlurText from "@/components/BlurText";
import DecryptedText from "@/components/DecryptedText";
import SpotlightCard from "@/components/SpotlightCard";
import FadeContent from "@/components/FadeContent";
import Waves from "@/components/Waves";
import Squares from "@/components/Squares";
import ShinyText from "@/components/ShinyText";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-50 overflow-x-hidden">
            {/* Hero Parallax Section */}
            <HeroParallax products={products} />

            {/* Featured Services Section */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8">
                {/* Section Background */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <Waves
                        lineColor="#2563EB"
                        backgroundColor="transparent"
                        waveSpeedX={0.008}
                        waveSpeedY={0.008}
                        waveAmpX={35}
                        waveAmpY={18}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <BlurText
                            text="Liderazgo en Precisión"
                            delay={80}
                            animateBy="words"
                            direction="top"
                            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
                        />
                        <FadeContent blur={true} duration={1000} delay={400} initialOpacity={0}>
                            <p className="text-slate-600 max-w-3xl mx-auto text-xl mt-8 leading-relaxed font-medium">
                                Equipamiento de <ShinyText text="última generación" speed={3} shineColor="#F97316" color="#2563EB" />
                                {" "}y servicios profesionales para elevar la calidad de tus proyectos de ingeniería.
                            </p>
                        </FadeContent>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <FadeContent blur={true} duration={800} delay={500} initialOpacity={0}>
                            <SpotlightCard className="p-10 border border-slate-100 bg-white shadow-xl h-full group hover:border-blue-200 transition-all duration-500" spotlightColor="rgba(37, 99, 235, 0.05)">
                                <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <svg className="w-8 h-8 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">Venta de Equipos</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    Distribuidores autorizados de Leica, Topcon, Trimble y más.
                                    Tecnología que garantiza resultados exactos.
                                </p>
                                <Link href="/rentals" className="text-[#2563EB] font-bold hover:text-blue-700 transition-colors inline-flex items-center gap-2 group-hover:translate-x-1 duration-300">
                                    Ver catálogo
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </SpotlightCard>
                        </FadeContent>

                        <FadeContent blur={true} duration={800} delay={650} initialOpacity={0}>
                            <SpotlightCard className="p-10 border border-slate-100 bg-white shadow-xl h-full group hover:border-orange-200 transition-all duration-500" spotlightColor="rgba(249, 115, 22, 0.05)">
                                <div className="w-16 h-16 mb-6 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <svg className="w-8 h-8 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">Servicio Técnico</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    Laboratorio certificado para calibración, reparación y mantenimiento
                                    de todo tipo de instrumental topográfico.
                                </p>
                                <Link href="/technical-service" className="text-[#F97316] font-bold hover:text-orange-700 transition-colors inline-flex items-center gap-2 group-hover:translate-x-1 duration-300">
                                    Más información
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </SpotlightCard>
                        </FadeContent>

                        <FadeContent blur={true} duration={800} delay={800} initialOpacity={0}>
                            <SpotlightCard className="p-10 border border-slate-100 bg-white shadow-xl h-full group hover:border-blue-200 transition-all duration-500" spotlightColor="rgba(37, 99, 235, 0.05)">
                                <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <svg className="w-8 h-8 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">Topografía</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    Servicios profesionales de levantamiento, replanteo, control de obra
                                    y georreferenciación GNSS.
                                </p>
                                <Link href="/topography-service" className="text-[#2563EB] font-bold hover:text-blue-700 transition-colors inline-flex items-center gap-2 group-hover:translate-x-1 duration-300">
                                    Conocer servicios
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </SpotlightCard>
                        </FadeContent>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-24 px-4 bg-white/50">
                <div className="absolute inset-0 z-0 opacity-10">
                    <Squares
                        direction="diagonal"
                        speed={0.2}
                        squareSize={50}
                        borderColor="#F97316"
                        hoverFillColor="#FFEDD5"
                    />
                </div>
                <div className="relative z-10 max-w-6xl mx-auto">
                    <FadeContent blur={true} duration={1000} delay={200} initialOpacity={0}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { value: "15+", label: "Años de Experiencia", color: "blue" },
                                { value: "500+", label: "Proyectos Realizados", color: "orange" },
                                { value: "50+", label: "Equipos en Flota", color: "blue" },
                                { value: "24/7", label: "Soporte Técnico", color: "orange" },
                            ].map((stat, index) => (
                                <div key={index} className="text-center p-8 rounded-3xl border border-slate-100 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-4xl md:text-5xl font-black mb-3">
                                        <ShinyText text={stat.value} speed={4} shineColor={stat.color === "blue" ? "#60A5FA" : "#FDBA74"} color={stat.color === "blue" ? "#2563EB" : "#F97316"} />
                                    </div>
                                    <div className="text-slate-500 text-sm font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </FadeContent>
                </div>
            </section>

            {/* Brands Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <FadeContent blur={true} duration={1000} delay={300} initialOpacity={0}>
                        <h3 className="text-center text-slate-400 text-sm uppercase tracking-widest mb-10 font-bold">Marcas que representamos</h3>
                        <div className="flex flex-wrap justify-center gap-6 opacity-80">
                            {["Leica Geosystems", "Topcon", "Trimble", "Sokkia", "South", "Hi-Target", "CHC Navigation"].map((brand) => (
                                <div key={brand} className="px-8 py-4 rounded-xl border border-slate-200 bg-white text-slate-500 font-bold hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all cursor-default">
                                    {brand}
                                </div>
                            ))}
                        </div>
                    </FadeContent>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="relative py-32 px-4">
                <div className="max-w-4xl mx-auto">
                    <FadeContent blur={true} duration={1200} delay={400} initialOpacity={0}>
                        <SpotlightCard
                            className="p-12 md:p-20 border-slate-100 bg-gradient-to-br from-blue-50 to-orange-50 text-center shadow-2xl"
                            spotlightColor="rgba(37, 99, 235, 0.05)"
                        >
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                <DecryptedText
                                    text="¿Listo para tu próximo proyecto?"
                                    animateOn="view"
                                    className="text-slate-900"
                                    encryptedClassName="text-[#F97316]"
                                />
                            </h2>
                            <p className="text-slate-600 text-xl mb-10 max-w-2xl mx-auto font-medium">
                                Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar
                                la precisión que tu proyecto necesita.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href="/contact" className="px-10 py-5 bg-[#2563EB] text-white font-bold rounded-full hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20 text-lg">
                                    Contáctanos
                                </Link>
                                <Link href="/rentals" className="px-10 py-5 border-2 border-[#2563EB] text-[#2563EB] font-bold rounded-full hover:bg-blue-50 transition-all text-lg">
                                    Ver Catálogo
                                </Link>
                            </div>
                        </SpotlightCard>
                    </FadeContent>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-20 px-4 text-center">
                <FadeContent duration={1000} delay={200}>
                    <p className="text-2xl md:text-3xl font-serif text-slate-400 italic max-w-3xl mx-auto">
                        &ldquo;La precisión no es una opción, es nuestra promesa.&rdquo;
                    </p>
                    <p className="text-slate-900 font-bold mt-4">— Equipo Calitop</p>
                </FadeContent>
            </section>
        </div>
    );
}

const products = [
    {
        title: "Levantamiento de Alta Precisión",
        link: "/topography-service",
        thumbnail: "/images/products/levantamiento-topografico.png",
    },
    {
        title: "Georreferenciación Satelital",
        link: "/rentals",
        thumbnail: "/images/products/geo-gnss.png",
    },
    {
        title: "Fotogrametría Aérea 4K",
        link: "/topography-service",
        thumbnail: "/images/products/inspeccion-drone.png",
    },
    {
        title: "Nivelación Digital de Carreteras",
        link: "/rentals",
        thumbnail: "/images/products/nivelacion.png",
    },
    {
        title: "Escaneo Láser 3D Industrial",
        link: "/topography-service",
        thumbnail: "/images/products/escaneo.png",
    },
    {
        title: "Calibración Certificada ISO",
        link: "/technical-service",
        thumbnail: "/images/products/calibracion.png",
    },
    {
        title: "Servicio Técnico Especializado",
        link: "/technical-service",
        thumbnail: "/images/products/reparacion-estacion.png",
    },
    {
        title: "Mantenimiento de Drones RTK",
        link: "/technical-service",
        thumbnail: "/images/products/reparacion-drone.png",
    },
    {
        title: "Soporte Topográfico en Obra",
        link: "/topography-service",
        thumbnail: "/images/products/en-campo.png",
    },
    {
        title: "Control Geodésico Avanzado",
        link: "/rentals",
        thumbnail: "/images/products/gps.png",
    },
    {
        title: "Inspección de Infraestructura",
        link: "/topography-service",
        thumbnail: "/images/products/inspeccion-drone.png",
    },
    {
        title: "Replanteo de Obras Civiles",
        link: "/topography-service",
        thumbnail: "/images/products/levantamiento-topografico.png",
    },
    {
        title: "Ajuste de Equipos de Precisión",
        link: "/technical-service",
        thumbnail: "/images/products/calibracion.png",
    },
    {
        title: "Modelado BIM y Nubes de Puntos",
        link: "/topography-service",
        thumbnail: "/images/products/escaneo.png",
    },
    {
        title: "Redes Geodésicas de Control",
        link: "/rentals",
        thumbnail: "/images/products/geo-gnss.png",
    },
];
