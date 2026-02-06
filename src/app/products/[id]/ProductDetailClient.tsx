"use client";

import { Product } from "@/types/database";
import Link from "next/link";
import FadeContent from "@/components/FadeContent";
import { motion } from "framer-motion";
import Image from "next/image";
import "@/components/admin/editor.css";

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
        <div className="mt-4 min-h-screen pt-20 pb-12 relative overflow-hidden">
            {/* Mesh Gradient Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-950/20 via-slate-950 to-black" />
                <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] animate-pulse-slow [animation-delay:1s]" />
            </div>

            {/* Content Container */}
            <div className="w-full px-4 sm:px-6 lg:px-10">
                {/* Back Button */}
                <FadeContent blur={true} duration={600} delay={0} initialOpacity={0}>
                    <div className="max-w-[1400px] mx-auto mb-6">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                        >
                            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-bold uppercase tracking-wider text-[10px]">Volver al Catálogo</span>
                        </Link>
                    </div>
                </FadeContent>

                {/* Main Product Grid */}
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        {/* Left: Image */}
                        <FadeContent blur={true} duration={800} delay={200} initialOpacity={0}>
                            <motion.div
                                className="relative rounded-2xl overflow-hidden glass-card p-6 lg:p-8 group flex items-center justify-center"
                                style={{ minHeight: '400px' }}
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-cyan-500/5 opacity-50" />
                                <div className="relative w-full max-w-[400px] h-[300px]">
                                    <Image
                                        src={imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-contain group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="absolute top-6 right-6 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl" />
                                <div className="absolute bottom-6 left-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
                            </motion.div>
                        </FadeContent>

                        {/* Right: Info */}
                        <FadeContent blur={true} duration={800} delay={400} initialOpacity={0}>
                            <div className="space-y-4">
                                {/* Badge & Title */}
                                <div className="space-y-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full glass-card text-orange-400 text-[10px] font-black uppercase tracking-widest">
                                        {product.category}
                                    </span>
                                    <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                                        {product.name}
                                    </h1>
                                </div>

                                {/* Price Section */}
                                {product.show_price && product.price ? (
                                    <div className="glass-card p-5 rounded-2xl relative overflow-hidden group">
                                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                                        <span className="block text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-1">Inversión Estimada</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                                                ${product.price.toLocaleString()}
                                            </span>
                                            <span className="text-slate-400 font-bold text-xs uppercase">USD</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="glass-card p-5 rounded-2xl border-orange-500/20">
                                        <span className="text-orange-400 font-black uppercase tracking-wider text-xs block mb-1">Precio a Consultar</span>
                                        <p className="text-slate-400 text-xs">Personalizamos la oferta según tus requerimientos.</p>
                                    </div>
                                )}

                                {/* CTAs */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleQuote}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-sm rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 group"
                                    >
                                        <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Cotizar por WhatsApp
                                    </button>
                                    <Link
                                        href={`/checkout/${product.id}`}
                                        className="flex-1 px-6 py-3 glass-card text-white font-bold text-sm rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center shadow-lg"
                                    >
                                        Iniciar Compra
                                    </Link>
                                </div>

                                {/* Trust Icons */}
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-orange-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white uppercase">Garantía</p>
                                            <p className="text-[10px] text-slate-400">Oficial</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-cyan-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white uppercase">Soporte</p>
                                            <p className="text-[10px] text-slate-400">Técnico</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeContent>
                    </div>

                    {/* Description */}
                    <div className="mt-10">
                        <FadeContent blur={true} duration={800} delay={600} initialOpacity={0}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                                    <h3 className="text-lg lg:text-xl font-black text-white uppercase tracking-wider">Especificaciones</h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                                </div>

                                <div className="glass-card p-6 lg:p-8 rounded-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-2xl" />
                                    <div className="relative prose prose-sm prose-invert prose-orange max-w-none ProseMirror">
                                        {product.description ? (
                                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                        ) : (
                                            <p className="italic text-slate-500 text-sm">No hay información técnica disponible.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </FadeContent>
                    </div>
                </div>
            </div>
        </div>
    );
}
