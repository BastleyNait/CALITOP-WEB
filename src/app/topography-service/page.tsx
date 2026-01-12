'use client';

import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
import Waves from "@/components/Waves";
import FadeContent from "@/components/FadeContent";
import ShinyText from "@/components/ShinyText";
import TiltedCard from "@/components/TiltedCard";

const services = [
    {
        number: "01",
        category: "Planimetría",
        title: "Levantamientos de Precisión",
        description: "Captura de datos geoespaciales con precisión milimétrica. Generamos nubes de puntos, modelos digitales de terreno (MDT) y cartografía detallada para cualquier escala de proyecto.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
        )
    },
    {
        number: "02",
        category: "Supervisión",
        title: "Replanteo y Control de Obra",
        description: "Traslado fiel de planos al terreno con tolerancias milimétricas. Supervisión continua de alineamientos, niveles y estructuras para asegurar ejecución perfecta.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        )
    },
    {
        number: "03",
        category: "Geodesia",
        title: "Georreferenciación GNSS",
        description: "Establecimiento de puntos de control geodésico enlazados a la red nacional. Tecnología multi-constelación GPS/GLONASS/Galileo para máxima precisión.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        number: "04",
        category: "Minería",
        title: "Topografía Industrial",
        description: "Control de tajos, cálculos volumétricos de stock, monitoreo de taludes y cubicación de movimientos de tierra. Soluciones para entornos exigentes.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        )
    }
];

const tools = [
    { name: "Estaciones Totales Robóticas", icon: "⚙️" },
    { name: "GNSS Diferencial RTK", icon: "📡" },
    { name: "Niveles Digitales", icon: "📐" },
    { name: "Drones con PPK/RTK", icon: "🚁" },
    { name: "Scanner Laser 3D", icon: "🔬" },
    { name: "Software CAD/GIS", icon: "💻" }
];

const projects = [
    { value: "150+", label: "Km de Carreteras" },
    { value: "50+", label: "Proyectos Mineros" },
    { value: "200+", label: "Edificaciones" },
    { value: "30+", label: "Represas/Túneles" }
];

export default function TopographyServicePage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-50">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-25">
                <Waves
                    lineColor="#2563EB"
                    backgroundColor="transparent"
                    waveSpeedX={0.012}
                    waveSpeedY={0.008}
                    waveAmpX={45}
                    waveAmpY={22}
                    friction={0.93}
                    tension={0.008}
                    maxCursorMove={90}
                    xGap={16}
                    yGap={42}
                />
            </div>

            <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <BlurText
                            text="Servicio Topográfico"
                            delay={80}
                            animateBy="words"
                            direction="top"
                            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight"
                        />
                        <FadeContent blur={true} duration={1000} delay={300} initialOpacity={0}>
                            <p className="text-slate-600 max-w-3xl mx-auto text-xl mt-8 leading-relaxed font-medium">
                                Ingeniería geoespacial de <ShinyText text="alta precisión" speed={3} shineColor="#F97316" color="#2563EB" />
                                {" "}para proyectos de infraestructura, construcción, minería y energía.
                            </p>
                        </FadeContent>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        {services.map((service, index) => (
                            <FadeContent key={service.number} blur={true} duration={800} delay={400 + index * 150} initialOpacity={0}>
                                <SpotlightCard
                                    className="p-8 md:p-10 border border-slate-100 bg-white shadow-xl h-full group hover:border-blue-200 transition-all duration-500"
                                    spotlightColor="rgba(37, 99, 235, 0.05)"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className="flex-shrink-0">
                                            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors duration-300 shadow-sm">
                                                {service.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[#F97316] font-mono text-xs tracking-widest uppercase mb-2 font-bold">
                                                {service.number} / {service.category}
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                            <p className="text-slate-600 text-lg leading-relaxed">{service.description}</p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </FadeContent>
                        ))}
                    </div>

                    {/* Featured Projects Section */}
                    <FadeContent blur={true} duration={1000} delay={800} initialOpacity={0}>
                        <div className="mb-24">
                            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
                                <ShinyText text="Proyectos Ejecutados" speed={4} shineColor="#F97316" color="#0F172A" />
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {projects.map((project, index) => (
                                    <div key={index} className="text-center p-8 rounded-3xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-300">
                                        <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                                            <ShinyText text={project.value} speed={5} shineColor="#F97316" color="#2563EB" />
                                        </div>
                                        <div className="text-slate-500 font-semibold">{project.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeContent>

                    {/* Gallery */}
                    <FadeContent blur={true} duration={1000} delay={1000} initialOpacity={0}>
                        <div className="mb-24">
                            <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Trabajos en Campo</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <TiltedCard
                                    imageSrc="/images/products/levantamiento-topografico.png"
                                    altText="Levantamiento Topográfico"
                                    captionText="Levantamiento en Obra"
                                    containerHeight="300px"
                                    imageHeight="300px"
                                    imageWidth="100%"
                                    rotateAmplitude={10}
                                    showMobileWarning={false}
                                />
                                <TiltedCard
                                    imageSrc="/images/products/inspeccion-drone.png"
                                    altText="Drone RTK"
                                    captionText="Fotogrametría Aérea"
                                    containerHeight="300px"
                                    imageHeight="300px"
                                    imageWidth="100%"
                                    rotateAmplitude={10}
                                    showMobileWarning={false}
                                />
                                <TiltedCard
                                    imageSrc="/images/products/geo-gnss.png"
                                    altText="GNSS Survey"
                                    captionText="Control Geodésico"
                                    containerHeight="300px"
                                    imageHeight="300px"
                                    imageWidth="100%"
                                    rotateAmplitude={10}
                                    showMobileWarning={false}
                                />
                            </div>
                        </div>
                    </FadeContent>

                    {/* Tools Section */}
                    <FadeContent blur={true} duration={1000} delay={1200} initialOpacity={0}>
                        <div className="text-center mb-16">
                            <h2 className="text-2xl font-bold text-slate-900 mb-10">Nuestras Herramientas</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {tools.map((tool) => (
                                    <div key={tool.name} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group shadow-sm">
                                        <div className="text-3xl mb-3">{tool.icon}</div>
                                        <div className="text-slate-600 text-sm font-semibold group-hover:text-blue-700 transition-colors">{tool.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeContent>

                    {/* CTA */}
                    <FadeContent blur={true} duration={1000} delay={1400} initialOpacity={0}>
                        <SpotlightCard
                            className="p-12 md:p-16 border border-slate-100 bg-gradient-to-br from-blue-50 to-orange-50 shadow-2xl text-center"
                            spotlightColor="rgba(37, 99, 235, 0.1)"
                        >
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                                ¿Tienes un proyecto en mente?
                            </h2>
                            <p className="text-slate-600 mb-10 max-w-2xl mx-auto text-lg font-medium">
                                Cuéntanos sobre tu proyecto y te proporcionaremos una cotización personalizada
                                con los mejores tiempos de entrega del mercado.
                            </p>
                            <button className="px-12 py-5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20 text-lg">
                                Solicitar Cotización
                            </button>
                        </SpotlightCard>
                    </FadeContent>
                </div>
            </div>
        </div>
    );
}
