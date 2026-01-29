'use client';

import React from "react";
import Link from "next/link";
import HeroMaquitop from "@/components/ui/hero-maquitop";
import SpotlightCard from "@/components/SpotlightCard";
import FadeContent from "@/components/FadeContent";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Hero Section - Maquitop Style */}
            <HeroMaquitop />

            {/* About Section - Brief */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
                <div className="max-w-5xl mx-auto">
                    <FadeContent blur={true} duration={800} delay={200} initialOpacity={0}>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                                ¿Quiénes <span className="text-[#F97316]">Somos</span>?
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                                Somos una empresa dedicada al servicio técnico especializado y venta de equipos topográficos.
                                Ofrecemos calibración certificada, reparación profesional y comercialización de instrumentos de precisión
                                para ingeniería, construcción y minería.
                            </p>
                        </div>
                    </FadeContent>

                    {/* Services Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FadeContent blur={true} duration={800} delay={400} initialOpacity={0}>
                            <SpotlightCard
                                className="p-8 border border-border bg-card h-full group hover:border-[#F97316]/50 transition-all duration-300"
                                spotlightColor="rgba(249, 115, 22, 0.1)"
                            >
                                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-[#F97316] to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">Servicio Técnico</h3>
                                <p className="text-muted-foreground mb-4">
                                    Mantenimiento, reparación y calibración certificada de estaciones totales, niveles y GPS.
                                </p>
                                <Link href="/technical-service" className="text-[#F97316] font-bold hover:text-orange-400 transition-colors inline-flex items-center gap-2">
                                    Ver más
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </SpotlightCard>
                        </FadeContent>

                        <FadeContent blur={true} duration={800} delay={500} initialOpacity={0}>
                            <SpotlightCard
                                className="p-8 border border-border bg-card h-full group hover:border-[#F97316]/50 transition-all duration-300"
                                spotlightColor="rgba(249, 115, 22, 0.1)"
                            >
                                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-[#F97316] to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">Venta de Equipos</h3>
                                <p className="text-muted-foreground mb-4">
                                    Estaciones totales, niveles automáticos, GPS diferenciales, accesorios y equipos de segundo uso.
                                </p>
                                <Link href="/products" className="text-[#F97316] font-bold hover:text-orange-400 transition-colors inline-flex items-center gap-2">
                                    Ver catálogo
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </SpotlightCard>
                        </FadeContent>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-[#F97316]/10 to-transparent">
                <FadeContent blur={true} duration={800} delay={300} initialOpacity={0}>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                            ¿Necesitas asesoría técnica?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            Contáctanos por WhatsApp y te ayudamos con tu proyecto.
                        </p>
                        <Link
                            href="https://wa.me/51933588122"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-lg hover:bg-green-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/30"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Escribir por WhatsApp
                        </Link>
                    </div>
                </FadeContent>
            </section>
        </div>
    );
}
