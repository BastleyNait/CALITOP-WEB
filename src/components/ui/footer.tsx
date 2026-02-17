'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';

const contactInfo = [
    {
        title: "Central Telefónica",
        value: "+51 933 588 122",
        subtitle: "Lunes a Viernes: 8:00 AM - 6:00 PM",
        icon: Phone,
        href: "tel:+51933588122"
    },
    {
        title: "Correo Electrónico",
        value: "ventas@calitop-services.com",
        subtitle: "Soporte técnico y ventas",
        icon: Mail,
        href: "mailto:ventas@calitop-services.com"
    },
    {
        title: "WhatsApp",
        value: "+51 933 588 122",
        subtitle: "Respuesta inmediata",
        icon: Phone,
        href: "https://wa.me/51933588122",
        isWhatsApp: true
    },
    {
        title: "Ubicación Principal",
        value: "Arequipa, Perú",
        subtitle: "Atención presencial con cita",
        icon: MapPin,
        href: "#"
    }
];

const quickLinks = [
    { label: "Inicio", href: "/" },
    { label: "Nosotros", href: "/about" },
    { label: "Servicio Técnico", href: "/technical-service" },
    { label: "Productos", href: "/products" },
    { label: "Contacto", href: "/contact" },
];

const services = [
    { label: "Calibración de Equipos", href: "/technical-service" },
    { label: "Venta de Instrumentos", href: "/products" },
    { label: "Alquiler de Equipos", href: "/contact" },
    { label: "Levantamientos Topográficos", href: "/contact" },
];

const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" }
];

export default function Footer() {
    return (
        <footer className="relative w-full glass-footer mt-20">
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

            {/* Main Footer Content */}
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Company Info - Takes more space */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Logos */}
                        <div className="flex flex-col gap-4">
                            <Link href="/" className="inline-block">
                                <div className="relative w-48 h-14">
                                    <Image
                                        src="/images/products/logo.png"
                                        alt="Calitop Logo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </Link>
                            <div className="relative w-40 h-24">
                                <Image
                                    src="/images/products/logo2.png"
                                    alt="Topservice Logo"
                                    fill
                                    className="object-contain brightness-110"
                                    priority
                                />
                            </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            Soluciones topográficas profesionales. Alquiler de equipos,
                            servicio técnico especializado y calibración certificada para
                            proyectos de ingeniería y construcción.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 pt-4">
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

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">
                            Navegación
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
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

                    {/* Services */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">
                            Servicios
                        </h3>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service.label}>
                                    <Link
                                        href={service.href}
                                        className="group inline-flex items-center gap-2 text-muted-foreground hover:text-orange-500 transition-colors duration-300"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 group-hover:bg-orange-500 transition-colors" />
                                        <span className="text-sm">{service.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Cards */}
                    <div className="lg:col-span-4">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">
                            Contacto
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={info.title}
                                    href={info.href}
                                    target={info.href.startsWith('http') ? '_blank' : undefined}
                                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -2 }}
                                    className="group flex items-start gap-4 p-4 rounded-2xl glass-light hover:glass-card transition-all duration-300"
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${info.isWhatsApp
                                            ? 'bg-[#25D366]/20 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white'
                                            : 'bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'
                                        }`}>
                                        <info.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                                            {info.title}
                                        </h4>
                                        <p className="text-sm font-medium text-foreground group-hover:text-orange-500 transition-colors truncate">
                                            {info.value}
                                        </p>
                                        {info.subtitle && (
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {info.subtitle}
                                            </p>
                                        )}
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-orange-500 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-6">
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
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
