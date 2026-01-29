"use client";

import { Product } from "@/types/database";
import { MarkdownContent } from "@/components/ui/markdown-content";
import Link from "next/link";
import FadeContent from "@/components/FadeContent";
import BlurText from "@/components/BlurText";
import { motion } from "framer-motion";

interface ProductDetailClientProps {
    product: Product;
    imageUrl: string;
}

export default function ProductDetailClient({ product, imageUrl }: ProductDetailClientProps) {
    const whatsappNumber = "51933588122";

    const handleQuote = () => {
        const message = encodeURIComponent(`Hola, deseo información sobre: ${product.name}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <FadeContent blur={true} duration={600} delay={0} initialOpacity={0}>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group"
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-bold uppercase tracking-widest text-xs">Volver al Catálogo</span>
                    </Link>
                </FadeContent>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left Column: Image Area */}
                    <div className="lg:col-span-7 space-y-8">
                        <FadeContent blur={true} duration={800} delay={200} initialOpacity={0}>
                            <motion.div
                                className="relative aspect-square sm:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-zinc-950 border border-white/5 shadow-2xl group"
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Ambient Light Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-tr from-orange-500/10 via-transparent to-cyan-500/5 opacity-50 pointer-events-none" />
                            </motion.div>
                        </FadeContent>
                    </div>

                    {/* Right Column: Info Area */}
                    <div className="lg:col-span-12 xl:col-span-5 lg:sticky lg:top-32">
                        <FadeContent blur={true} duration={800} delay={400} initialOpacity={0}>
                            <div className="space-y-8">
                                {/* Badge & Title */}
                                <div className="space-y-4">
                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F97316] text-[10px] font-black uppercase tracking-[0.2em]">
                                        {product.category}
                                    </span>
                                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                        {product.name}
                                    </h1>
                                </div>

                                {/* Price Section */}
                                {product.show_price && product.price ? (
                                    <div className="p-8 rounded-[2rem] bg-zinc-900/50 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                                            </svg>
                                        </div>
                                        <span className="block text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2 text-center sm:text-left">Inversión Estimada</span>
                                        <div className="flex items-baseline justify-center sm:justify-start gap-2">
                                            <span className="text-5xl font-black text-[#F97316] group-hover:scale-105 transition-transform inline-block">
                                                ${product.price.toLocaleString()}
                                            </span>
                                            <span className="text-slate-400 font-bold text-sm uppercase tracking-tighter">USD</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-8 rounded-[2rem] bg-orange-500/5 border border-orange-500/10 text-center sm:text-left">
                                        <span className="text-[#F97316] font-black uppercase tracking-widest text-sm">Precio a Consultar</span>
                                        <p className="text-slate-400 text-xs mt-2">Personalizamos la oferta según tus requerimientos técnicos.</p>
                                    </div>
                                )}

                                {/* CTAs */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={handleQuote}
                                        className="flex-1 px-10 py-5 bg-[#25D366] text-white font-black rounded-2xl hover:bg-green-600 transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-xl shadow-green-900/20 group"
                                    >
                                        <svg className="w-6 h-6 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Cotizar por WhatsApp
                                    </button>
                                    <Link
                                        href={`/checkout/${product.id}`}
                                        className="flex-1 px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all hover:scale-[1.02] flex items-center justify-center shadow-xl shadow-white/5"
                                    >
                                        Iniciar Compra
                                    </Link>
                                </div>

                                {/* Trust Icons */}
                                <div className="grid grid-cols-2 gap-4 py-8 border-t border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-[#F97316]">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Garantía<br />Oficial</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-[#38BDF8]">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Soporte<br />Técnico</span>
                                    </div>
                                </div>
                            </div>
                        </FadeContent>
                    </div>
                </div>

                {/* Description Full Width Section */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <FadeContent blur={true} duration={800} delay={600} initialOpacity={0}>
                        <div className="space-y-8">
                            <div className="inline-flex items-baseline gap-2 pb-2 border-b-2 border-orange-500">
                                <h3 className="text-2xl font-black text-white uppercase tracking-wider">Especificaciones</h3>
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                            </div>

                            <div className="p-10 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none text-900 font-black">
                                    INFO
                                </div>
                                <div className="relative text-slate-300">
                                    {product.description ? (
                                        <MarkdownContent content={product.description} />
                                    ) : (
                                        <p className="italic text-slate-500 text-lg">No hay información técnica detallada disponible para este equipo actualmente.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </FadeContent>
                </div>
            </div>
        </div>
    );
}
