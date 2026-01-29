"use client";

import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
import FadeContent from "@/components/FadeContent";
import Image from "next/image";
import Link from "next/link";
import { Aurora } from "@/components/Aurora";

const services = [
    {
        title: "Diagnóstico Especializado",
        description: "Evaluación integral de sistemas ópticos, mecánicos y electrónicos utilizando colimadores de alta precisión.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Calibración Certificada",
        description: "Ajuste preciso bajo estándares internacionales. Entregamos certificado de calibración vigente para tus proyectos.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        color: "from-[#F97316] to-orange-600",
    },
    {
        title: "Reparación y Repuestos",
        description: "Cambio de pantallas, teclados, distanciómetros y baterías. Uso exclusivo de repuestos originales Leica, Topcon y más.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011-1V4z" />
            </svg>
        ),
        color: "from-purple-500 to-indigo-600",
    },
];

const brands = ["Leica", "Topcon", "Trimble", "Sokkia", "South", "Hi-Target", "Kolida", "Nikon"];

export default function TechnicalServicePage() {
    const whatsappNumber = "51933588122";

    return (
        <div className="min-h-screen bg-[#050505]">
            {/* Hero Section with Aurora */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Aurora
                        colorStops={["#050505", "#F97316", "#050505"]}
                        speed={0.5}
                    />
                </div>
                {/* Overlay gradient for better text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-1" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                    <FadeContent blur={true} duration={1000} delay={200} initialOpacity={0}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F97316] text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            Laboratorio de Precisión
                        </div>
                        <BlurText
                            text="Servicio Técnico Elite"
                            delay={100}
                            animateBy="words"
                            direction="top"
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8"
                        />
                        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                            Especialistas en la salud de tus equipos. Garantizamos precisión milimétrica mediante tecnología de calibración de última generación.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, necesito servicio técnico para mi equipo topográfico")}`}
                                target="_blank"
                                className="w-full sm:w-auto px-10 py-5 bg-[#F97316] text-white font-black rounded-2xl hover:bg-orange-600 transition-all hover:scale-[1.05] shadow-2xl shadow-orange-500/20 flex items-center justify-center gap-3 group"
                            >
                                Agendar Diagnóstico
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                            <Link
                                href="#servicios"
                                className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-center"
                            >
                                Ver Servicios
                            </Link>
                        </div>
                    </FadeContent>
                </div>
            </section>

            {/* Featured Image Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <FadeContent blur={true} duration={800} delay={400} initialOpacity={0}>
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-orange-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                                    <Image
                                        src="/images/products/colimador.jpeg"
                                        alt="Laboratorio de Calibración Especializado"
                                        width={800}
                                        height={600}
                                        className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-[#F97316] flex items-center justify-center text-white shadow-xl">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-black text-lg">Certificación ISO</h4>
                                                <p className="text-slate-300 text-sm">Cumplimos con los estándares más rigurosos del mercado.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeContent>

                        <FadeContent blur={true} duration={800} delay={600} initialOpacity={0}>
                            <div className="space-y-8">
                                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                    Tu precisión es nuestra <span className="text-[#F97316]">prioridad</span> absoluta.
                                </h2>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    En CALITOP entendemos que un milímetro de error puede costar miles de dólares en obra. Por eso, hemos invertido en infraestructura de colimación de primer nivel y técnicos certificados por las principales marcas del mundo.
                                </p>
                                <div className="grid grid-cols-2 gap-8 pt-4">
                                    <div>
                                        <span className="block text-3xl font-black text-white mb-1">+10 años</span>
                                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Experiencia técnica</span>
                                    </div>
                                    <div>
                                        <span className="block text-3xl font-black text-[#F97316] mb-1">24 Horas</span>
                                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Diagnóstico rápido</span>
                                    </div>
                                </div>
                            </div>
                        </FadeContent>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="servicios" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <FadeContent blur={true} duration={800} delay={200} initialOpacity={0}>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Expertise en cada <span className="text-[#F97316]">componente</span></h2>
                            <p className="text-slate-500 max-w-2xl mx-auto">Soluciones integrales para Estaciones Totales, GPS GNSS, Niveles Láser y Drones.</p>
                        </FadeContent>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <FadeContent key={service.title} blur={true} duration={600} delay={300 + index * 100} initialOpacity={0}>
                                <SpotlightCard
                                    className="p-10 border border-white/5 bg-zinc-900/40 rounded-[2.5rem] group hover:border-orange-500/20 transition-all h-full"
                                    spotlightColor="rgba(249, 115, 22, 0.1)"
                                >
                                    <div className={`w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-2xl text-white transform group-hover:scale-110 transition-transform`}>
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-orange-500 transition-colors uppercase tracking-tight">{service.title}</h3>
                                    <p className="text-slate-400 leading-relaxed font-medium">{service.description}</p>
                                </SpotlightCard>
                            </FadeContent>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands Marquee style */}
            <section className="py-24 px-4 overflow-hidden border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mb-16">Especialización de Marca</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 px-4">
                        {brands.map((brand) => (
                            <div key={brand} className="py-4 px-6 rounded-2xl border border-white/5 bg-zinc-900/30 text-slate-400 font-black text-center text-sm hover:text-white hover:bg-[#F97316]/10 hover:border-[#F97316]/20 transition-all cursor-default">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-4">
                <FadeContent blur={true} duration={800} delay={200} initialOpacity={0}>
                    <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center">
                        {/* Background for CTA */}
                        <div className="absolute inset-0 bg-[#F97316] z-0" />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-1" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">¿Tu equipo requiere atención?</h2>
                            <p className="text-black/80 text-xl font-bold mb-12 max-w-xl mx-auto">Nuestro equipo técnico está listo para reactivar tu productividad hoy mismo.</p>
                            <Link
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, necesito servicio técnico")}`}
                                target="_blank"
                                className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white font-black rounded-2xl hover:bg-zinc-950 transition-all hover:scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group"
                            >
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Hablar con un Técnico
                            </Link>
                        </div>
                    </div>
                </FadeContent>
            </section>
        </div>
    );
}
