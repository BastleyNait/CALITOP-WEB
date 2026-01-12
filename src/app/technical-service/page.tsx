'use client';

import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
import Squares from "@/components/Squares";
import FadeContent from "@/components/FadeContent";
import ShinyText from "@/components/ShinyText";
import DecryptedText from "@/components/DecryptedText";

const services = [
    {
        title: "Reparación",
        description: "Diagnóstico electrónico y mecánico avanzado. Reparamos fallos en sensores, óptica y sistemas de comunicación de equipos Leica, Topcon, Trimble y más.",
        color: "orange",
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        spotlight: "rgba(249, 115, 22, 0.12)"
    },
    {
        title: "Calibración",
        description: "Colimadores de alta precisión para certificar tus equipos bajo estándares internacionales ISO 17123, garantizando lecturas impecables.",
        color: "blue",
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        spotlight: "rgba(59, 130, 246, 0.12)"
    },
    {
        title: "Mantenimiento",
        description: "Limpieza integral, ajuste de ejes, lubricación y actualización de firmware para prolongar la vida útil de tus instrumentos.",
        color: "green",
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
        spotlight: "rgba(34, 197, 94, 0.12)"
    },
    {
        title: "Repuestos",
        description: "Stock permanente de componentes originales: baterías, pantallas, teclados, cargadores y cables para todas las marcas líderes.",
        color: "yellow",
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
        spotlight: "rgba(234, 179, 8, 0.12)"
    }
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    orange: { bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-500" },
    blue: { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-500" },
    green: { bg: "bg-green-50", border: "border-green-100", text: "text-green-500" },
    yellow: { bg: "bg-yellow-50", border: "border-yellow-100", text: "text-yellow-500" }
};

const brandLogos = ["Leica", "Topcon", "Trimble", "Sokkia", "South", "Hi-Target"];

export default function TechnicalServicePage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-50">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-25">
                <Squares
                    direction="diagonal"
                    speed={0.3}
                    squareSize={55}
                    borderColor="#94a3b8"
                    hoverFillColor="#cbd5e1"
                />
            </div>

            <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <BlurText
                            text="Servicio Técnico"
                            delay={80}
                            animateBy="words"
                            direction="top"
                            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight"
                        />
                        <FadeContent blur={true} duration={1000} delay={300} initialOpacity={0}>
                            <p className="text-slate-600 max-w-3xl mx-auto text-xl mt-8 leading-relaxed font-medium">
                                Laboratorio especializado con <ShinyText text="certificación internacional" speed={3} shineColor="#f97316" color="#2563EB" />
                                {" "}para el mantenimiento y reparación de todo tipo de instrumental topográfico.
                            </p>
                        </FadeContent>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {services.map((service, index) => (
                            <FadeContent key={service.title} blur={true} duration={800} delay={400 + index * 150} initialOpacity={0}>
                                <SpotlightCard
                                    className="p-8 md:p-10 border border-slate-100 bg-white shadow-xl h-full group hover:border-blue-200 transition-all duration-300"
                                    spotlightColor={service.spotlight}
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={`w-14 h-14 rounded-2xl ${colorClasses[service.color].bg} border ${colorClasses[service.color].border} flex items-center justify-center flex-shrink-0 ${colorClasses[service.color].text} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                            {service.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                            <p className="text-slate-600 text-lg leading-relaxed">{service.description}</p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </FadeContent>
                        ))}
                    </div>

                    {/* Brands Section */}
                    <FadeContent blur={true} duration={1000} delay={800} initialOpacity={0}>
                        <div className="text-center mb-20">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">Marcas que Atendemos</h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                {brandLogos.map((brand) => (
                                    <div key={brand} className="px-8 py-4 rounded-2xl border border-slate-200 bg-white text-slate-500 font-bold hover:border-orange-300 hover:text-orange-500 transition-all cursor-default shadow-sm">
                                        {brand}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeContent>

                    {/* Process Section */}
                    <FadeContent blur={true} duration={1000} delay={1000} initialOpacity={0}>
                        <SpotlightCard
                            className="p-10 md:p-14 border border-orange-100 bg-gradient-to-br from-orange-50 to-white shadow-2xl"
                            spotlightColor="rgba(249, 115, 22, 0.15)"
                        >
                            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">
                                <DecryptedText
                                    text="Protocolo de Atención"
                                    animateOn="view"
                                    className="text-slate-900"
                                    encryptedClassName="text-orange-500"
                                />
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { step: "01", title: "Recepción", desc: "Diagnóstico preliminar gratuito y registro del equipo en nuestro sistema." },
                                    { step: "02", title: "Presupuesto", desc: "Informe técnico detallado con costos y tiempos de entrega en 24 horas." },
                                    { step: "03", title: "Ejecución", desc: "Servicio realizado por técnicos certificados con garantía por escrito." }
                                ].map((item, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#F97316] to-orange-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-orange-500/20">
                                            {item.step}
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                        <p className="text-slate-600">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </SpotlightCard>
                    </FadeContent>

                    {/* CTA */}
                    <FadeContent blur={true} duration={1000} delay={1200} initialOpacity={0}>
                        <div className="mt-16 text-center">
                            <button className="px-12 py-5 bg-[#F97316] hover:bg-orange-600 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/20 text-lg">
                                Solicitar Diagnóstico Gratuito
                            </button>
                        </div>
                    </FadeContent>
                </div>
            </div>
        </div>
    );
}
