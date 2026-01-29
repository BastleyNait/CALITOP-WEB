'use client';

import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
import FadeContent from "@/components/FadeContent";
import TiltedCard from "@/components/TiltedCard";
import Link from "next/link";
import { Product } from "@/types/database";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { useState } from "react";

interface ProductsClientProps {
    initialProducts: Product[];
    publicUrls: Record<string, string>;
}

const categories = [
    {
        title: "Estaciones Totales",
        description: "Equipos Leica, Topcon, Trimble para levantamientos de alta precisión.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
        ),
        gradient: "from-[#F97316] to-orange-600",
        spotlight: "rgba(249, 115, 22, 0.15)",
    },
    {
        title: "Niveles Automáticos",
        description: "Niveles digitales y ópticos para control de cotas.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
            </svg>
        ),
        gradient: "from-[#38BDF8] to-cyan-600",
        spotlight: "rgba(56, 189, 248, 0.15)",
    },
    {
        title: "GPS Diferenciales",
        description: "Receptores GNSS con tecnología RTK para georreferenciación.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        gradient: "from-purple-500 to-purple-700",
        spotlight: "rgba(147, 51, 234, 0.15)",
    },
    {
        title: "Accesorios",
        description: "Trípodes, prismas, bastones, miras, cargadores y baterías.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        gradient: "from-emerald-500 to-emerald-700",
        spotlight: "rgba(16, 185, 129, 0.15)",
    },
];

export default function ProductsClient({ initialProducts, publicUrls }: ProductsClientProps) {
    const whatsappNumber = "51933588122";

    const handleQuote = (productName: string) => {
        const message = encodeURIComponent(`Hola, deseo información sobre: ${productName}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <BlurText
                            text="Productos"
                            delay={80}
                            animateBy="words"
                            direction="top"
                            className="text-5xl md:text-6xl font-black text-foreground tracking-tight"
                        />
                        <FadeContent blur={true} duration={800} delay={300} initialOpacity={0}>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mt-6">
                                Equipos topográficos nuevos y de segundo uso. Importación directa de las mejores marcas.
                            </p>
                        </FadeContent>
                    </div>

                    {/* Categories */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                        {categories.map((cat, index) => (
                            <FadeContent key={cat.title} blur={true} duration={600} delay={200 + index * 100} initialOpacity={0}>
                                <SpotlightCard
                                    className="p-6 border border-border bg-card h-full group hover:border-[#F97316]/30 transition-all duration-300 text-center"
                                    spotlightColor={cat.spotlight}
                                >
                                    <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg`}>
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">{cat.title}</h3>
                                    <p className="text-muted-foreground text-sm">{cat.description}</p>
                                </SpotlightCard>
                            </FadeContent>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <FadeContent blur={true} duration={800} delay={600} initialOpacity={0}>
                        <h2 className="text-3xl font-black text-foreground text-center mb-12">
                            <span className="text-[#F97316]">Catálogo</span> de Equipos
                        </h2>
                        {initialProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {initialProducts.map((p) => {
                                    const imageUrl = p.image_key ? publicUrls[p.image_key] : "/images/placeholder.png";
                                    return (
                                        <div key={p.id} className="flex flex-col group">
                                            <div className="aspect-square relative overflow-hidden rounded-3xl">
                                                <TiltedCard
                                                    imageSrc={imageUrl || "/images/placeholder.png"}
                                                    altText={p.name}
                                                    captionText={p.name}
                                                    containerHeight="100%"
                                                    containerWidth="100%"
                                                    imageHeight="100%"
                                                    imageWidth="100%"
                                                    rotateAmplitude={10}
                                                    scaleOnHover={1.1}
                                                    showMobileWarning={false}
                                                    showTooltip={false}
                                                    displayOverlayContent={true}
                                                    overlayContent={
                                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                                                            <div className="flex flex-col gap-2 w-full max-w-[140px] px-4">
                                                                <button
                                                                    onClick={() => handleQuote(p.name)}
                                                                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/20 border border-white/20 transition-all text-xs"
                                                                >
                                                                    Cotizar
                                                                </button>
                                                                <Link
                                                                    href={`/products/${p.id}`}
                                                                    className="w-full px-4 py-2 bg-[#F97316] text-white font-black rounded-xl hover:bg-orange-600 transition-all text-xs shadow-lg shadow-orange-500/20 text-center"
                                                                >
                                                                    Ver Detalles
                                                                </Link>
                                                                <Link
                                                                    href={`/checkout/${p.id}`}
                                                                    className="w-full px-4 py-2 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all text-xs text-center border border-white/5"
                                                                >
                                                                    Comprar
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                            </div>
                                            <Link href={`/products/${p.id}`} className="mt-4 text-center group/info">
                                                <span className="text-[10px] text-[#38BDF8] font-black uppercase tracking-widest">{p.category}</span>
                                                <h3 className="text-sm font-bold text-white line-clamp-1 mt-1 group-hover/info:text-[#F97316] transition-colors">{p.name}</h3>
                                                {p.show_price && p.price ? (
                                                    <p className="text-[#F97316] font-black text-base mt-1">
                                                        ${p.price.toLocaleString()}
                                                    </p>
                                                ) : (
                                                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">
                                                        Precio a Consultar
                                                    </p>
                                                )}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                                <p className="text-muted-foreground">No hay productos disponibles en este momento.</p>
                            </div>
                        )}
                    </FadeContent>


                    {/* CTA */}
                    <FadeContent blur={true} duration={800} delay={800} initialOpacity={0}>
                        <div className="mt-20 text-center p-10 rounded-2xl bg-gradient-to-r from-[#F97316]/10 to-[#38BDF8]/10 border border-border">
                            <h3 className="text-2xl font-black text-foreground mb-4">
                                ¿No encuentras lo que buscas?
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Contamos con más equipos disponibles. Escríbenos para asesoría personalizada.
                            </p>
                            <Link
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, busco información sobre equipos topográficos")}`}
                                target="_blank"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-lg hover:bg-green-600 transition-all hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Consultar Disponibilidad
                            </Link>
                        </div>
                    </FadeContent>
                </div>
            </div>
        </div>
    );
}
