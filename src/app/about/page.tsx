'use client';

import BlurText from "@/components/BlurText";
import FadeContent from "@/components/FadeContent";
import SpotlightCard from "@/components/SpotlightCard";
import Squares from "@/components/Squares";
import ShinyText from "@/components/ShinyText";

export default function AboutPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-50">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-20">
                <Squares
                    direction="diagonal"
                    speed={0.4}
                    squareSize={45}
                    borderColor="#94a3b8"
                    hoverFillColor="#cbd5e1"
                />
            </div>

            <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Title with BlurText */}
                    <div className="text-center mb-16">
                        <BlurText
                            text="¿Quiénes Somos?"
                            delay={100}
                            animateBy="words"
                            direction="top"
                            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight"
                        />
                        <FadeContent blur={true} duration={1200} delay={400} initialOpacity={0}>
                            <p className="text-slate-600 text-xl mt-8 max-w-2xl mx-auto leading-relaxed font-medium">
                                Somos líderes en soluciones topográficas, comprometidos con la precisión
                                y la excelencia técnica en cada proyecto.
                            </p>
                        </FadeContent>
                    </div>

                    {/* Main Mission Card */}
                    <FadeContent blur={true} duration={1000} delay={600} initialOpacity={0}>
                        <SpotlightCard
                            className="p-10 md:p-14 border border-slate-100 bg-white shadow-xl mb-12"
                            spotlightColor="rgba(37, 99, 235, 0.05)"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-10 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full"></div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                                    <ShinyText text="Nuestra Misión" speed={3} shineColor="#F97316" color="#2563EB" />
                                </h2>
                            </div>
                            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                                Proveer equipos topográficos de última generación y servicios profesionales
                                especializados que superen las expectativas de nuestros clientes,
                                contribuyendo al éxito de la industria de la construcción, minería e ingeniería
                                con datos precisos y confiables.
                            </p>
                        </SpotlightCard>
                    </FadeContent>

                    {/* Vision & Values Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FadeContent blur={true} duration={1000} delay={800} initialOpacity={0}>
                            <SpotlightCard
                                className="p-8 md:p-10 border border-slate-100 bg-white shadow-lg h-full"
                                spotlightColor="rgba(249, 115, 22, 0.05)"
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shadow-sm">
                                        <svg className="w-6 h-6 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Visión</h3>
                                </div>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Ser la empresa referente a nivel nacional e internacional en tecnología topográfica,
                                    reconocida por nuestra innovación constante y calidad humana excepcional.
                                </p>
                            </SpotlightCard>
                        </FadeContent>

                        <FadeContent blur={true} duration={1000} delay={1000} initialOpacity={0}>
                            <SpotlightCard
                                className="p-8 md:p-10 border border-slate-100 bg-white shadow-lg h-full"
                                spotlightColor="rgba(37, 99, 235, 0.05)"
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm">
                                        <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Valores</h3>
                                </div>
                                <ul className="text-slate-600 text-lg space-y-3">
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                                        Precisión Milimétrica
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                                        Compromiso Ético
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                                        Innovación Tecnológica
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                                        Excelencia en Servicio
                                    </li>
                                </ul>
                            </SpotlightCard>
                        </FadeContent>
                    </div>

                    {/* Stats Section */}
                    <FadeContent blur={true} duration={1000} delay={1200} initialOpacity={0}>
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { value: "15+", label: "Años de Experiencia" },
                                { value: "500+", label: "Proyectos Realizados" },
                                { value: "50+", label: "Equipos en Flota" },
                                { value: "100%", label: "Satisfacción Cliente" },
                            ].map((stat, index) => (
                                <div key={index} className="text-center p-6 rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-300">
                                    <div className="text-3xl md:text-4xl font-black mb-2">
                                        <ShinyText text={stat.value} speed={4} shineColor="#FDBA74" color="#F97316" />
                                    </div>
                                    <div className="text-slate-500 text-sm font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </FadeContent>
                </div>
            </div>
        </div>
    );
}
