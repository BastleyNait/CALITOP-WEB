'use client';

import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
import Waves from "@/components/Waves";
import FadeContent from "@/components/FadeContent";
import ShinyText from "@/components/ShinyText";
import TiltedCard from "@/components/TiltedCard";

const equipmentData = [
    {
        title: "Estaciones Totales",
        description: "Equipos Leica y Topcon de alta precisión para levantamientos detallados y replanteos de obra.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
        ),
        gradient: "from-blue-500 to-blue-700",
        shadow: "shadow-blue-500/30",
        spotlight: "rgba(59, 130, 246, 0.15)",
        price: "Desde S/. 150/día"
    },
    {
        title: "Sistemas GNSS",
        description: "Receptores base y móvil con tecnología RTK para georreferenciación precisa en tiempo real.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        gradient: "from-purple-500 to-purple-700",
        shadow: "shadow-purple-500/30",
        spotlight: "rgba(147, 51, 234, 0.15)",
        price: "Desde S/. 200/día"
    },
    {
        title: "Niveles de Precisión",
        description: "Niveles digitales y automáticos para control de cotas y nivelaciones de alta sensibilidad.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
        ),
        gradient: "from-emerald-500 to-emerald-700",
        shadow: "shadow-emerald-500/30",
        spotlight: "rgba(16, 185, 129, 0.15)",
        price: "Desde S/. 80/día"
    },
    {
        title: "Drones RTK",
        description: "DJI Phantom y Matrice con control RTK para fotogrametría y mapeo aéreo de alta resolución.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
        gradient: "from-orange-500 to-orange-700",
        shadow: "shadow-orange-500/30",
        spotlight: "rgba(249, 115, 22, 0.15)",
        price: "Desde S/. 350/día"
    },
    {
        title: "Scanner 3D",
        description: "Leica RTC360 para captura de nube de puntos masiva y modelado BIM de alta fidelidad.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
        ),
        gradient: "from-cyan-500 to-cyan-700",
        shadow: "shadow-cyan-500/30",
        spotlight: "rgba(6, 182, 212, 0.15)",
        price: "Desde S/. 500/día"
    },
    {
        title: "Accesorios",
        description: "Trípodes, prismas, baterías extras, bastones y todo lo necesario para tu trabajo en campo.",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        gradient: "from-slate-500 to-slate-700",
        shadow: "shadow-slate-500/30",
        spotlight: "rgba(100, 116, 139, 0.15)",
        price: "Consultar"
    }
];

export default function RentalsPage() {
    const whatsappNumber = "51999999999"; // Replace with real number

    const products = [
        {
            name: "Estación Total Trimble S7",
            image: "/images/products/en-campo.png",
            category: "ALQUILER"
        },
        {
            name: "Drone DJI Matrice 300 RTK",
            image: "/images/products/inspeccion-drone.png",
            category: "VENTA"
        },
        {
            name: "Receptor GNSS Geo-Max",
            image: "/images/products/geo-gnss.png",
            category: "VENTA"
        },
        {
            name: "Nivel Automático Leica NA720",
            image: "/images/products/calibracion.png",
            category: "VENTA"
        },
        {
            name: "Escaner Laser RTC360",
            image: "/images/products/escaneo.png",
            category: "ALQUILER"
        },
        {
            name: "GPS Diferencial Hi-Target",
            image: "/images/products/gps.png",
            category: "VENTA"
        },
        {
            name: "Teodolito Electrónico DT-400",
            image: "/images/products/levantamiento-topografico.png",
            category: "ALQUILER"
        },
        {
            name: "Nivel Digital Orion+",
            image: "/images/products/nivelacion.png",
            category: "VENTA"
        }
    ];

    const handleQuote = (productName: string) => {
        const message = encodeURIComponent(`Hola Calitop, deseo solicitar una cotización para el producto: ${productName}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-50">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-15">
                <Waves
                    lineColor="#F97316"
                    backgroundColor="transparent"
                    waveSpeedX={0.008}
                    waveSpeedY={0.008}
                    waveAmpX={35}
                    waveAmpY={18}
                    friction={0.92}
                    tension={0.008}
                    maxCursorMove={100}
                    xGap={14}
                    yGap={40}
                />
            </div>

            <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <BlurText
                            text="Venta y Alquiler"
                            delay={80}
                            animateBy="words"
                            direction="top"
                            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight"
                        />
                        <FadeContent blur={true} duration={1000} delay={300} initialOpacity={0}>
                            <p className="text-slate-600 max-w-3xl mx-auto text-xl mt-8 leading-relaxed font-medium">
                                Los mejores equipos topográficos de <ShinyText text="última generación" speed={3} shineColor="#F97316" color="#2563EB" />
                                {" "}para tus proyectos más exigentes, disponibles para compra directa o alquiler flexible.
                            </p>
                        </FadeContent>
                    </div>

                    {/* Equipment Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                        {equipmentData.map((item, index) => (
                            <FadeContent key={item.title} blur={true} duration={800} delay={400 + index * 100} initialOpacity={0}>
                                <SpotlightCard
                                    className="p-8 border border-slate-100 bg-white shadow-xl h-full group hover:border-blue-200 transition-all duration-300"
                                    spotlightColor={item.spotlight}
                                >
                                    <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-600 mb-4 leading-relaxed">{item.description}</p>
                                    <div className="pt-4 border-t border-slate-100">
                                        <span className="text-blue-600 font-bold text-sm">{item.price}</span>
                                    </div>
                                </SpotlightCard>
                            </FadeContent>
                        ))}
                    </div>

                    {/* Featured Products with TiltedCard */}
                    <FadeContent blur={true} duration={1000} delay={800} initialOpacity={0}>
                        <div className="mb-20">
                            <h2 className="text-4xl font-black text-slate-900 text-center mb-16 uppercase tracking-tighter">
                                <span className="text-[#F97316]">Catálogo</span> <span className="text-[#2563EB]">de Equipos</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {products.map((p) => (
                                    <div key={p.name} className="flex flex-col items-center">
                                        <div className="w-full aspect-[4/5] relative">
                                            <TiltedCard
                                                imageSrc={p.image}
                                                altText={p.name}
                                                captionText={p.name}
                                                containerHeight="100%"
                                                containerWidth="100%"
                                                imageHeight="100%"
                                                imageWidth="100%"
                                                rotateAmplitude={12}
                                                scaleOnHover={1.15}
                                                showMobileWarning={false}
                                                showTooltip={false}
                                                displayOverlayContent={true}
                                                overlayContent={
                                                    <div className="w-full h-full flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button
                                                            onClick={() => handleQuote(p.name)}
                                                            className="px-4 py-2 bg-[#F97316] text-white font-black rounded-full hover:bg-orange-600 transition-all hover:scale-110 active:scale-95 shadow-xl shadow-orange-500/50 text-[10px] uppercase tracking-wider whitespace-nowrap"
                                                        >
                                                            Solicitar Cotización
                                                        </button>
                                                    </div>
                                                }
                                            />
                                        </div>
                                        <div className="mt-4 text-center">
                                            
                                            <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{p.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeContent>

                    {/* CTA Section */}
                    <FadeContent blur={true} duration={1000} delay={1000} initialOpacity={0}>
                        <SpotlightCard
                            className="p-12 md:p-16 border border-slate-100 bg-gradient-to-br from-blue-50 to-orange-50 text-center shadow-2xl"
                            spotlightColor="rgba(59, 130, 246, 0.1)"
                        >
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
                                ¿Buscas un equipo específico?
                            </h2>
                            <p className="text-slate-600 mb-10 max-w-2xl mx-auto text-lg font-medium">
                                Contamos con la red más amplia comercialización de equipos topográficos.
                                Cotiza hoy mismo y recibe asesoría técnica especializada.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => handleQuote("Consulta General")}
                                    className="px-10 py-4 bg-[#2563EB] text-white font-bold rounded-full hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
                                >
                                    Conversar con un Asesor
                                </button>
                                <button className="px-10 py-4 border-2 border-[#2563EB] text-[#2563EB] font-bold rounded-full hover:bg-blue-50 transition-all">
                                    Ver Catálogo PDF
                                </button>
                            </div>
                        </SpotlightCard>
                    </FadeContent>
                </div>
            </div>
        </div>
    );
}
