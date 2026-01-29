'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/actions/products";
import { Product } from "@/types/database";
import BlurText from "@/components/BlurText";
import FadeContent from "@/components/FadeContent";
import Link from "next/link";

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dni: "",
        location: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (params.id) {
                const result = await getProductById(params.id as string);
                if (result.success && result.data) {
                    setProduct(result.data);
                }
            }
            setLoading(false);
        };
        fetchProduct();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulating order creation for now
        // In the future, this would call a server action to insert into 'orders' table
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);

            // Generate WhatsApp message with order details
            const message = encodeURIComponent(
                `Hola, he realizado un pedido:\n\n` +
                `Producto: ${product?.name}\n` +
                `Nombre: ${formData.firstName} ${formData.lastName}\n` +
                `DNI: ${formData.dni}\n` +
                `Ubicación: ${formData.location}`
            );
            window.open(`https://wa.me/51933588122?text=${message}`, '_blank');
        }, 1500);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F97316]"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-white mb-4">Producto no encontrado</h1>
                <Link href="/products" className="text-[#F97316] hover:underline">Volver al catálogo</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-12">
                    <Link href="/products" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver a Productos
                    </Link>
                    <h1 className="text-4xl font-black text-white mb-2">Finalizar Compra</h1>
                    <p className="text-slate-400">Ingresa tus datos para coordinar el envío y pago.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <div className="p-6 rounded-2xl glass border border-border sticky top-24">
                            <h3 className="font-bold text-white mb-4">Resumen del Pedido</h3>
                            <div className="space-y-4">
                                <div className="aspect-square rounded-xl overflow-hidden bg-slate-800">
                                    {/* Product Image would go here */}
                                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                                        {product.name}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{product.name}</h4>
                                    <p className="text-slate-400 text-xs uppercase">{product.category}</p>
                                </div>
                                <div className="pt-4 border-t border-border flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Total:</span>
                                    <span className="text-white font-bold underline decoration-[#F97316]">
                                        {product.show_price && product.price ? `$${product.price.toLocaleString()}` : "Cotizar"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:col-span-2">
                        {success ? (
                            <div className="p-10 rounded-2xl glass border border-green-500/30 text-center">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">¡Datos Enviados!</h2>
                                <p className="text-slate-400 mb-8">
                                    Te hemos redirigido a WhatsApp para finalizar los detalles de tu compra.
                                </p>
                                <Link href="/products" className="px-8 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all font-bold">
                                    Seguir Comprando
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Nombres *</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-border text-white focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                                            placeholder="Juan"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Apellidos *</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-border text-white focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                                            placeholder="Pérez"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">DNI / RUC *</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.dni}
                                        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-border text-white focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                                        placeholder="12345678"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Ubicación Exacta *</label>
                                    <textarea
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-border text-white focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all resize-none"
                                        rows={3}
                                        placeholder="Av. Las Lilas 123, Surco, Lima"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`w-full py-4 rounded-xl font-black text-white text-lg shadow-xl transition-all flex items-center justify-center gap-3
                                        ${submitting ? 'bg-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-[#F97316] to-orange-600 hover:scale-[1.02] shadow-orange-600/20'}
                                    `}
                                >
                                    {submitting ? (
                                        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    ) : (
                                        <>
                                            Continuar a WhatsApp
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-slate-500 text-xs">
                                    Al hacer clic, tus datos se enviarán a nuestro equipo para procesar tu pedido.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
