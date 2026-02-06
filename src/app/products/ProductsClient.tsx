'use client';

import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
import FadeContent from "@/components/FadeContent";
import TiltedCard from "@/components/TiltedCard";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductType } from "@/types/database";
import { MarkdownContent } from "@/components/ui/markdown-content";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductsClientProps {
    initialProducts: Product[];
    publicUrls: Record<string, string>;
    productTypes: ProductType[];  // Categories from DB
}



export default function ProductsClient({ initialProducts, publicUrls, productTypes }: ProductsClientProps) {
    const whatsappNumber = "51933588122";
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Filter products by selected type AND search term
    const filteredProducts = initialProducts.filter(p => {
        const matchesType = selectedType ? p.product_type_id === selectedType : true;
        const matchesSearch = searchTerm
            ? p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        return matchesType && matchesSearch;
    });

    const handleQuote = (productName: string) => {
        const message = encodeURIComponent(`Hola, deseo información sobre: ${productName}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const backgroundImages = [
        "/images/products/en-campo.png",
        "/images/products/colimador.jpeg",
        "/images/products/geo-gnss.png",
        "/images/products/inspeccion-drone.png",
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Full Viewport Header with Carousel */}
            <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Background Layers */}
                <div className="absolute inset-0 z-0">
                    {/* Image Slideshow */}
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.25, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeOut" }}
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
                    <div className="absolute inset-0 mesh-gradient opacity-80" />

                    {/* Radial Gradient for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

                    {/* Side Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    {/* Floating Orbs */}
                    <motion.div
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px]"
                    />
                </div>

                <div className="relative z-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-32">
                    <div className="text-center max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                <span className="text-orange-500 font-black uppercase tracking-widest text-xs">Catálogo Profesional</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight mb-8"
                        >
                            Catálogo de{" "}
                            <span className="text-gradient-orange">Equipos</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Equipos topográficos <span className="text-orange-400 font-bold">nuevos y de segundo uso</span>.
                            Importación directa de las mejores marcas del mercado.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex items-center justify-center gap-12"
                        >
                            <div className="text-center">
                                <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                                    100%
                                </div>
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-2">Garantía Oficial</div>
                            </div>
                            <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                            <div className="text-center">
                                <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                                    24/7
                                </div>
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-2">Soporte Técnico</div>
                            </div>
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

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Filter and Search Controls */}
                    <div className="mb-16">
                        <div className="flex items-start gap-4 max-w-7xl">

                            {/* Modern Filter Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full group"
                                >
                                    <div className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-black/60 border border-white/10 
                                                  hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm
                                                  hover:bg-black/80">
                                        {/* Icon */}
                                        <div className="flex flex-col gap-1">
                                            <div className="w-6 h-0.5 bg-orange-500 rounded-full"></div>
                                            <div className="w-6 h-0.5 bg-orange-500 rounded-full"></div>
                                            <div className="w-6 h-0.5 bg-orange-500 rounded-full"></div>
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 text-left">
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">
                                                Filtrar por Categoría
                                            </div>
                                            <div className="text-white font-bold text-lg">
                                                {selectedType
                                                    ? productTypes.find(t => t.id === selectedType)?.name
                                                    : 'Todas las Categorías'
                                                }
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <svg
                                            className={`w-5 h-5 text-orange-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 py-2 rounded-2xl bg-black/95 border border-white/10 
                                                  backdrop-blur-md shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <button
                                            onClick={() => {
                                                setSelectedType(null);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full px-6 py-3 text-left transition-all duration-200 ${!selectedType
                                                ? 'text-orange-500 font-bold bg-orange-500/10'
                                                : 'text-white hover:bg-orange-500/5 hover:text-orange-400 hover:pl-8'
                                                }`}
                                        >
                                            Todas las Categorías
                                        </button>
                                        {productTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => {
                                                    setSelectedType(type.id);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full px-6 py-3 text-left transition-all duration-200 ${selectedType === type.id
                                                    ? 'text-orange-500 font-bold bg-orange-500/10'
                                                    : 'text-white hover:bg-orange-500/5 hover:text-orange-400 hover:pl-8'
                                                    }`}
                                            >
                                                {type.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Active Filter Badge */}
                            {selectedType && (
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30">
                                        <span className="text-orange-500 font-bold text-sm">
                                            {productTypes.find(t => t.id === selectedType)?.name}
                                        </span>
                                        <button
                                            onClick={() => setSelectedType(null)}
                                            className="text-orange-500 hover:text-orange-400 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Search Component */}
                            <div className="flex-1 flex justify-end">
                                <AnimatePresence mode="wait">
                                    {!isSearchOpen ? (
                                        <motion.button
                                            key="search-button"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={() => setIsSearchOpen(true)}
                                            className="group flex items-center justify-center w-16 h-16 rounded-2xl bg-black/60 border border-white/10 
                                                     hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-black/80"
                                            title="Buscar productos"
                                        >
                                            <svg
                                                className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </motion.button>
                                    ) : (
                                        <motion.div
                                            key="search-input"
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "100%" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative w-full max-w-2xl"
                                        >
                                            <svg
                                                className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <input
                                                type="text"
                                                placeholder="Buscar productos..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                autoFocus
                                                className="w-full pl-14 pr-14 py-5 rounded-2xl bg-black/60 border border-white/10 
                                                         text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 
                                                         focus:border-orange-500 transition-all backdrop-blur-sm font-medium"
                                            />
                                            <button
                                                onClick={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchTerm("");
                                                }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                                                title="Cerrar búsqueda"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <FadeContent blur={true} duration={800} delay={600} initialOpacity={0}>
                        <div className="flex items-center justify-between mb-12">

                            {selectedType && (
                                <button
                                    onClick={() => setSelectedType(null)}
                                    className="text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Limpiar filtro
                                </button>
                            )}
                        </div>
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts.map((p) => {
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
        </div >
    );
}
