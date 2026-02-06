'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/actions/products";
import { getPublicUrl } from "@/lib/storage-utils";
import { Product } from "@/types/database";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, User, CreditCard, Check, Phone, Mail } from "lucide-react";

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dni: "",
        address: "",
        city: "",
        district: "",
        reference: "",
        notes: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (params.id) {
                const result = await getProductById(params.id as string);
                if (result.success && result.data) {
                    setProduct(result.data);
                    const url = result.data.image_key
                        ? getPublicUrl(result.data.image_key)
                        : "/images/placeholder.png";
                    setImageUrl(url);
                }
            }
            setLoading(false);
        };
        fetchProduct();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);

            const message = encodeURIComponent(
                `🛒 *NUEVO PEDIDO*\n\n` +
                `📦 *Producto:* ${product?.name}\n\n` +
                `👤 *Cliente:*\n` +
                `Nombre: ${formData.firstName} ${formData.lastName}\n` +
                `DNI/RUC: ${formData.dni}\n` +
                `Email: ${formData.email}\n` +
                `Teléfono: ${formData.phone}\n\n` +
                `📍 *Dirección de Envío:*\n` +
                `${formData.address}\n` +
                `${formData.district}, ${formData.city}\n` +
                `Referencia: ${formData.reference}\n\n` +
                `${formData.notes ? `💬 *Notas:* ${formData.notes}` : ''}`
            );
            window.open(`https://wa.me/51933588122?text=${message}`, '_blank');
        }, 1500);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Cargando...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-4">Producto no encontrado</h1>
                    <p className="text-slate-400 mb-8">El producto que buscas no existe o ha sido eliminado.</p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-400 hover:to-orange-500 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al Catálogo
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Hero Image Section - Full Width */}
            <section className="relative w-screen h-[30vh] md:h-[40vh] overflow-hidden bg-black">
                {/* Product Image */}
                <div className="absolute inset-0">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    {/* Dark Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />

                    {/* Mesh Pattern Overlay */}
                    <div className="absolute inset-0 mesh-gradient opacity-40" />
                </div>

                {/* Decorative Orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[150px] pointer-events-none" />

                {/* Overlay Content */}
                <div className="relative z-10 h-full flex items-end">
                    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 pb-12">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Volver a Productos
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-4">
                                <Package className="w-3 h-3 text-orange-500" />
                                <span className="text-orange-500 font-bold uppercase tracking-wider text-xs">Finalizar Compra</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 drop-shadow-2xl">
                                {product.name}
                            </h1>
                            <p className="text-slate-300 text-sm md:text-base max-w-2xl drop-shadow-lg">
                                Completa tus datos para coordinar el envío y método de pago
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="relative py-16 lg:py-24">
                <div className="absolute inset-0 mesh-gradient opacity-30" />

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="p-12 rounded-3xl glass-card border border-green-500/30 text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                                    <Check className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-3xl font-black text-white mb-4">¡Pedido Enviado!</h2>
                                <p className="text-slate-400 mb-8 text-lg">
                                    Hemos abierto WhatsApp con todos tus datos. Nuestro equipo te contactará pronto para coordinar el pago y envío.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/products"
                                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-400 hover:to-orange-500 transition-all shadow-lg"
                                    >
                                        Seguir Comprando
                                    </Link>
                                    <Link
                                        href="/"
                                        className="px-8 py-4 glass-card text-white font-bold rounded-xl hover:border-orange-500/50 transition-all"
                                    >
                                        Ir al Inicio
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* Order Summary - Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <div className="p-8 rounded-3xl glass-card border border-white/10">
                                        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                            <Package className="w-5 h-5 text-orange-500" />
                                            Resumen del Pedido
                                        </h3>

                                        <div className="space-y-6">
                                            {/* Product Image */}
                                            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                                                <Image
                                                    src={imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div>
                                                <h4 className="text-white font-bold text-lg mb-1">{product.name}</h4>
                                                <p className="text-slate-400 text-sm uppercase tracking-wide">{product.category}</p>
                                            </div>

                                            {/* Price */}
                                            <div className="pt-6 border-t border-white/10">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-400 font-medium">Total:</span>
                                                    <span className="text-2xl font-black text-white">
                                                        {product.show_price && product.price
                                                            ? `$${product.price.toLocaleString()}`
                                                            : <span className="text-orange-500">Cotizar</span>
                                                        }
                                                    </span>
                                                </div>
                                                {!product.show_price && (
                                                    <p className="text-xs text-slate-500 mt-2">
                                                        El precio se coordinará por WhatsApp
                                                    </p>
                                                )}
                                            </div>

                                            {/* Features */}
                                            <div className="pt-6 border-t border-white/10 space-y-3">
                                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    Garantía oficial
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    Envío coordinado
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                                    <Check className="w-4 h-4 text-green-500" />
                                                    Soporte técnico
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form */}
                            <div className="lg:col-span-2">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Personal Information */}
                                    <div className="p-8 rounded-3xl glass-card border border-white/10">
                                        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                            <User className="w-5 h-5 text-orange-500" />
                                            Información Personal
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                                    Nombres *
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                    placeholder="Juan Carlos"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-300">Apellidos *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                    placeholder="Pérez García"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                                    <Mail className="w-4 h-4" />
                                                    Email *
                                                </label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                    placeholder="correo@ejemplo.com"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                                    <Phone className="w-4 h-4" />
                                                    Teléfono *
                                                </label>
                                                <input
                                                    required
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                    placeholder="+51 999 999 999"
                                                />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4" />
                                                    DNI / RUC *
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.dni}
                                                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                    placeholder="12345678 o 20123456789"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="p-8 rounded-3xl glass-card border border-white/10">
                                        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-orange-500" />
                                            Dirección de Envío
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-bold text-slate-300">Dirección Completa *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                    placeholder="Av. Las Lilas 123, Dpto. 501"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-300">Distrito *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.district}
                                                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                    placeholder="Surco"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-300">Ciudad *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                    placeholder="Lima"
                                                />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-bold text-slate-300">Referencia</label>
                                                <input
                                                    type="text"
                                                    value={formData.reference}
                                                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                                    placeholder="Frente al parque, edificio azul"
                                                />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-sm font-bold text-slate-300">Notas adicionales (opcional)</label>
                                                <textarea
                                                    value={formData.notes}
                                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                                                    rows={3}
                                                    placeholder="Horario preferido de entrega, instrucciones especiales, etc."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="space-y-4">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className={`w-full py-5 rounded-2xl font-black text-white text-lg shadow-2xl transition-all flex items-center justify-center gap-3 ${submitting
                                                ? 'bg-slate-700 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 hover:scale-[1.02] shadow-orange-500/30'
                                                }`}
                                        >
                                            {submitting ? (
                                                <>
                                                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Procesando...
                                                </>
                                            ) : (
                                                <>
                                                    Continuar a WhatsApp
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                        <p className="text-center text-slate-500 text-sm">
                                            Al continuar, tus datos se enviarán por WhatsApp para coordinar el pago y envío
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
