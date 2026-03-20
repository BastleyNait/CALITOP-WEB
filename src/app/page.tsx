'use client';

import React from "react";
import Link from "next/link";
import HeroMaquitop from "@/components/ui/hero-maquitop";
import { motion } from "framer-motion";
import {
    Settings,
    Package,
    Wrench,
    MapPin,
    ArrowRight,
    CheckCircle2,
    Phone,
    Award,
    Users,
    Clock
} from "lucide-react";

const services = [
    {
        icon: Settings,
        title: "Calibración de Equipos",
        description: "Laboratorio certificado para el ajuste preciso de estaciones totales, niveles ópticos y láseres. Garantizamos trazabilidad y cumplimiento de normativas internacionales.",
        link: "/technical-service",
        linkText: "Ver Certificaciones",
        accent: "from-orange-500 to-amber-500",
    },
    {
        icon: Package,
        title: "Venta de Instrumentos",
        description: "Distribuidores de las mejores marcas. Teodolitos, GPS diferenciales y drones para fotogrametría.",
        link: "/products",
        linkText: "Ver Catálogo",
        accent: "from-orange-600 to-orange-500",
    },
    {
        icon: Wrench,
        title: "Alquiler de Equipos",
        description: "Soluciones flexibles de renta diaria, semanal o mensual. Equipos calibrados y listos para operar en campo.",
        link: "/contact",
        linkText: "Cotizar Alquiler",
        accent: "from-amber-500 to-orange-500",
    },
    {
        icon: MapPin,
        title: "Levantamientos Topográficos",
        description: "Mapeo detallado, georreferenciación y control de obra. Utilizamos drones y escáneres láser para obtener nubes de puntos de alta precisión.",
        link: "/contact",
        linkText: "Solicitar Servicio",
        accent: "from-orange-500 to-red-500",
        featured: true,
    },
];

const benefits = [
    { icon: Award, label: "Certificación ISO 9001" },
    { icon: Users, label: "Equipo Especializado" },
    { icon: Clock, label: "Respuesta en 24h" },
];

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Hero Section */}
            <HeroMaquitop />
        </div>
    );
}
