'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const categoriasPrincipales = [
    { label: "Venta de estaciones totales nuevas y semi nuevas", href: "/products" },
    { label: "Venta de GPS diferenciales nuevas y semi nuevas", href: "/products" },
    { label: "Venta de niveles", href: "/products" },
    { label: "Venta de accesorios de topografía", href: "/products" },
    { label: "Venta de baterías, cargadores", href: "/products" },
];

const sobreNosotros = [
    { label: "Nuestra Historia", href: "/about" },
    { label: "¿Quiénes Somos?", href: "/about" },
    { label: "Servicio Técnico", href: "/technical-service" },
    { label: "Contáctanos", href: "/contact" },
];

const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" }
];

export default function Footer() {
    return (
        <footer className="relative w-full glass-footer">
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

            {/* Main Footer Content */}
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                    {/* Column 1: Información de Contacto */}
                    <div className="lg:col-span-3 space-y-5">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                            Información de Contacto
                        </h3>

                        {/* Ubicación */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">
                                    Ubicación de nuestro local
                                </h4>
                                <div className="flex items-start gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
                                    <span className="text-sm">Arequipa</span>
                                </div>
                            </div>

                            {/* Correo */}
                            <div>
                                <h4 className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">
                                    Envíanos un correo
                                </h4>
                                <motion.a
                                    href="mailto:serviciotecnico@calitop-services.com"
                                    whileHover={{ x: 4 }}
                                    className="flex items-start gap-2 text-muted-foreground hover:text-orange-500 transition-colors duration-300"
                                >
                                    <Mail className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
                                    <span className="text-sm break-all">serviciotecnico@calitop-services.com</span>
                                    <span className="text-sm break-all">ventas@calitop-services.com</span>
                                </motion.a>
                            </div>

                            {/* Teléfono */}
                            <div>
                                <h4 className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">
                                    Número celular
                                </h4>
                                <motion.a
                                    href="tel:+51919615654"
                                    whileHover={{ x: 4 }}
                                    className="flex items-center gap-2 text-muted-foreground hover:text-orange-500 transition-colors duration-300"
                                >
                                    <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                    <span className="text-sm">+51 919 615 654</span>
                                </motion.a>
                                <motion.a
                                    href="https://wa.me/51919615654"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ x: 4 }}
                                    className="flex items-center gap-2 mt-1.5 text-muted-foreground hover:text-[#25D366] transition-colors duration-300"
                                >
                                    <svg className="w-4 h-4 text-[#25D366] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    <span className="text-sm">WhatsApp</span>
                                </motion.a>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Categorías Principales */}
                    <div className="lg:col-span-4">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-5">
                            Categorías Principales
                        </h3>
                        <ul className="space-y-3">
                            {categoriasPrincipales.map((cat) => (
                                <li key={cat.label}>
                                    <Link
                                        href={cat.href}
                                        className="group inline-flex items-start gap-2 text-muted-foreground hover:text-orange-500 transition-colors duration-300"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 group-hover:bg-orange-500 transition-colors mt-1.5 flex-shrink-0" />
                                        <span className="text-sm">{cat.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Sobre Nosotros */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-5">
                            Sobre Nosotros
                        </h3>
                        <ul className="space-y-3">
                            {sobreNosotros.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-muted-foreground hover:text-orange-500 transition-colors duration-300"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 group-hover:bg-orange-500 transition-colors" />
                                        <span className="text-sm">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Síguenos / Redes Sociales */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-5">
                            Síguenos en redes
                        </h3>

                        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                            Mantente al día con nuestras novedades en equipos topográficos y servicios técnicos.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-orange-500 hover:border-orange-500/50 transition-all duration-300"
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 pt-6 pb-28 md:pb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <p className="text-muted-foreground text-sm text-center md:text-left">
                            © {new Date().getFullYear()}{" "}
                            <span className="font-bold text-orange-500">Calitop Services</span>.
                            Todos los derechos reservados.
                        </p>

                        {/* Legal Links */}
                        <div className="flex items-center gap-6">
                            <Link
                                href="#"
                                className="text-xs text-muted-foreground hover:text-orange-500 transition-colors"
                            >
                                Política de Privacidad
                            </Link>
                            <Link
                                href="#"
                                className="text-xs text-muted-foreground hover:text-orange-500 transition-colors"
                            >
                                Términos y Condiciones
                            </Link>
                            <Link
                                href="https://github.com/BastleyNait"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-orange-500 transition-colors flex items-center gap-1"
                            >
                                Elaborado por <span className="font-bold">BastleyNait</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
