'use client';

import BlurText from "@/components/BlurText";
import SpotlightCard from "@/components/SpotlightCard";
import Squares from "@/components/Squares";
import FadeContent from "@/components/FadeContent";
import ShinyText from "@/components/ShinyText";

const contactInfo = [
    {
        title: "Central Telefónica",
        value: "+51 999 999 999",
        subtitle: "Lunes a Viernes: 8:00 AM - 6:00 PM",
        color: "blue",
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        )
    },
    {
        title: "Correo Electrónico",
        value: "ventas@calitop-services.com",
        subtitle: "Soporte técnico y ventas",
        color: "purple",
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "WhatsApp",
        value: "+51 999 999 999",
        subtitle: "Respuesta inmediata",
        color: "green",
        icon: (
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        )
    },
    {
        title: "Ubicación Principal",
        value: "Arequipa, Perú",
        subtitle: "",
        color: "orange",
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        )
    }
];

const colorClasses: Record<string, { bg: string; border: string; text: string; spotlight: string }> = {
    blue: { bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-500", spotlight: "rgba(59, 130, 246, 0.05)" },
    purple: { bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-500", spotlight: "rgba(147, 51, 234, 0.05)" },
    green: { bg: "bg-green-50", border: "border-green-100", text: "text-green-500", spotlight: "rgba(34, 197, 94, 0.05)" },
    orange: { bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-500", spotlight: "rgba(249, 115, 22, 0.05)" }
};

export default function ContactPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-50">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0 opacity-20">
                <Squares
                    direction="diagonal"
                    speed={0.25}
                    squareSize={55}
                    borderColor="#94a3b8"
                    hoverFillColor="#cbd5e1"
                />
            </div>

            <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <BlurText
                            text="Contáctenos"
                            delay={80}
                            animateBy="words"
                            direction="top"
                            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight"
                        />
                        <FadeContent blur={true} duration={1000} delay={300} initialOpacity={0}>
                            <p className="text-slate-600 max-w-2xl mx-auto text-xl mt-8 leading-relaxed font-medium">
                                Estamos listos para asesorarte en tu próximo proyecto.
                                <ShinyText text=" Escríbenos" speed={3} shineColor="#F97316" color="#2563EB" /> o visítanos.
                            </p>
                        </FadeContent>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Contact Info Cards */}
                        <div className="lg:col-span-5 space-y-6">
                            {contactInfo.map((info, index) => (
                                <FadeContent key={info.title} blur={true} duration={800} delay={400 + index * 100} initialOpacity={0}>
                                    <SpotlightCard
                                        className="p-6 md:p-8 border border-slate-100 bg-white shadow-lg group hover:border-blue-200 transition-all duration-300"
                                        spotlightColor={colorClasses[info.color].spotlight}
                                    >
                                        <div className="flex items-start gap-5">
                                            <div className={`w-14 h-14 rounded-2xl ${colorClasses[info.color].bg} border ${colorClasses[info.color].border} flex items-center justify-center flex-shrink-0 ${colorClasses[info.color].text} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                                {info.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-1">{info.title}</h3>
                                                <p className="text-slate-600 text-lg">{info.value}</p>
                                                <p className="text-slate-400 text-sm mt-1">{info.subtitle}</p>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </FadeContent>
                            ))}

                            {/* Social Links */}
                            <FadeContent blur={true} duration={800} delay={800} initialOpacity={0}>
                                <div className="pt-6">
                                    <p className="text-slate-500 text-sm mb-4 font-bold uppercase tracking-wider">Síguenos en redes</p>
                                    <div className="flex gap-4">
                                        {[
                                            { name: "Facebook", icon: "f" },
                                            { name: "Instagram", icon: "📷" },
                                            { name: "LinkedIn", icon: "in" },
                                            { name: "YouTube", icon: "▶" }
                                        ].map((social) => (
                                            <button key={social.name} className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-[#2563EB] hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm">
                                                <span className="text-sm font-bold">{social.icon}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </FadeContent>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <FadeContent blur={true} duration={1000} delay={600} initialOpacity={0}>
                                <SpotlightCard
                                    className="p-8 md:p-12 border border-slate-100 bg-white shadow-xl h-full"
                                    spotlightColor="rgba(37, 99, 235, 0.03)"
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
                                        <ShinyText text="Envíanos un mensaje" speed={4} shineColor="#F97316" color="#0F172A" />
                                    </h3>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                                                    Nombre completo
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                                    placeholder="Ej: Juan Pérez"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">
                                                    Teléfono
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                                    placeholder="+51 999 999 999"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                                                Correo electrónico
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                                placeholder="su@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2">
                                                ¿Cómo podemos ayudarte?
                                            </label>
                                            <select
                                                id="subject"
                                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="">Selecciona una opción</option>
                                                <option>Cotización de Equipos</option>
                                                <option>Servicio Técnico / Reparación</option>
                                                <option>Alquiler de Equipos</option>
                                                <option>Servicio Topográfico</option>
                                                <option>Soporte Técnico</option>
                                                <option>Otro</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">
                                                Mensaje
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={5}
                                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                                                placeholder="Cuéntanos sobre tu proyecto o requerimiento..."
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-5 rounded-2xl bg-[#2563EB] text-white font-bold hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-500/20 text-lg"
                                        >
                                            Enviar Mensaje
                                        </button>
                                        <p className="text-slate-500 text-sm text-center font-medium">
                                            Responderemos en menos de 24 horas
                                        </p>
                                    </form>
                                </SpotlightCard>
                            </FadeContent>
                        </div>
                    </div>

                    {/* Map placeholder */}
                    <FadeContent blur={true} duration={1000} delay={1000} initialOpacity={0}>
                        <div className="mt-20">
                            <SpotlightCard
                                className="p-2 border border-slate-200 bg-white shadow-lg overflow-hidden"
                                spotlightColor="rgba(59, 130, 246, 0.05)"
                            >
                                <div className="w-full h-64 md:h-80 rounded-2xl bg-slate-100 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-slate-900 font-bold">Mapa interactivo</p>
                                        <p className="text-slate-500 text-sm">Av. Principal 123, San Borja, Lima</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>
                    </FadeContent>
                </div>
            </div>
        </div>
    );
}
