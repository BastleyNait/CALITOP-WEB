"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./image-upload";
import { createProduct, updateProduct, ProductFormData } from "@/actions/products";
import { getProductTypes } from "@/actions/product-types";
import { Product, ProductCategory, StockStatus, ProductType } from "@/types/database";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

interface ProductFormProps {
    product?: Product;
    mode: "create" | "edit";
}

const CATEGORIES: { value: ProductCategory; label: string }[] = [
    { value: "VENTA", label: "Venta" },
    { value: "ALQUILER", label: "Alquiler" },
    { value: "SERVICIO", label: "Servicio" },
];

const STOCK_STATUSES: { value: StockStatus; label: string; color: string }[] = [
    { value: "IN_STOCK", label: "En Stock", color: "bg-emerald-500" },
    { value: "IMPORTATION", label: "En Importación", color: "bg-amber-500" },
    { value: "OUT_OF_STOCK", label: "Sin Stock", color: "bg-red-500" },
];

export function ProductForm({ product, mode }: ProductFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    // Product types from database
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [loadingTypes, setLoadingTypes] = useState(true);

    // Fetch product types on mount
    useEffect(() => {
        async function fetchTypes() {
            const result = await getProductTypes();
            if (result.success && result.data) {
                setProductTypes(result.data);
            }
            setLoadingTypes(false);
        }
        fetchTypes();
    }, []);

    // Form state
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [category, setCategory] = useState<ProductCategory>(
        product?.category || "VENTA"
    );
    const [productTypeId, setProductTypeId] = useState<string | null>(
        product?.product_type_id || null
    );
    const [price, setPrice] = useState<string>(
        product?.price?.toString() || ""
    );
    const [stockStatus, setStockStatus] = useState<StockStatus>(
        product?.stock_status || "IN_STOCK"
    );
    const [imageKey, setImageKey] = useState<string | null>(
        product?.image_key || null
    );
    const [showPrice, setShowPrice] = useState<boolean>(
        product?.show_price ?? true
    );


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!name.trim()) {
            setError("Product name is required");
            return;
        }

        const formData: ProductFormData = {
            name: name.trim(),
            description: description.trim(),
            category,
            productTypeId,
            price: price ? parseFloat(price) : null,
            imageKey,
            stockStatus,
            showPrice,
        };

        startTransition(async () => {
            try {
                let result;
                if (mode === "create") {
                    result = await createProduct(formData);
                } else {
                    result = await updateProduct(
                        product!.id,
                        formData,
                        product?.image_key || undefined
                    );
                }

                if (result.success) {
                    router.push("/admin/products");
                    router.refresh();
                } else {
                    setError(result.error || "An error occurred");
                }
            } catch {
                setError("An unexpected error occurred");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10">
            {/* Error Alert */}
            {error && (
                <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="font-bold">{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Details */}
                <div className="space-y-10">
                    {/* Section: Product Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-[#F97316] uppercase tracking-wider">
                                Detalles del Producto
                            </h3>
                        </div>

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-4"
                            >
                                Nombre del Equipo *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ej: Estación Total Leica TS16"
                                className="w-full px-6 py-4 rounded-2xl bg-zinc-900 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-4"
                            >
                                Descripción del Producto
                            </label>

                            <RichTextEditor
                                content={description}
                                onChange={(html) => setDescription(html)}
                                placeholder="Describe detalladamente las características y especificaciones técnicas del equipo... Usa el editor para agregar formato, tablas, listas, etc."
                            />
                            <p className="mt-2 text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                                ✨ Editor profesional: negritas, listas, tablas, alineación, etc.
                            </p>
                        </div>

                        {/* Product Type */}
                        <div>
                            <label
                                htmlFor="productType"
                                className="block text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-4"
                            >
                                Tipo de Equipo
                            </label>
                            <div className="relative">
                                <select
                                    id="productType"
                                    value={productTypeId || ""}
                                    onChange={(e) => setProductTypeId(e.target.value || null)}
                                    disabled={loadingTypes}
                                    className="w-full px-6 py-4 rounded-2xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all appearance-none cursor-pointer font-bold disabled:opacity-50"
                                >
                                    <option value="">Sin tipo específico</option>
                                    {productTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <p className="mt-2 text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                                Categoría del equipo: Estaciones Totales, Niveles, etc.
                            </p>
                        </div>

                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-4"
                            >
                                Modalidad
                            </label>
                            <div className="relative">
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                                    className="w-full px-6 py-4 rounded-2xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all appearance-none cursor-pointer font-bold"
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Section: Stock Status */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-emerald-500 uppercase tracking-wider">
                                Estado de Stock
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {STOCK_STATUSES.map((status) => (
                                <button
                                    key={status.value}
                                    type="button"
                                    onClick={() => setStockStatus(status.value)}
                                    className={`
                                        px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border-2
                                        ${stockStatus === status.value
                                            ? "bg-zinc-800 border-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.15)] scale-105"
                                            : "bg-zinc-900 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10"
                                        }
                                    `}
                                >
                                    <span className="flex items-center gap-3">
                                        <span
                                            className={`w-2.5 h-2.5 rounded-full shadow-sm ${status.color}`}
                                        />
                                        {status.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Pricing & Gallery */}
                <div className="space-y-10">
                    {/* Section: Pricing */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.67 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.67-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-cyan-500 uppercase tracking-wider">
                                Precio y Disponibilidad
                            </h3>
                        </div>

                        {/* Price */}
                        <div>
                            <label
                                htmlFor="price"
                                className="block text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-4"
                            >
                                Precio (USD)
                            </label>
                            <div className="relative group">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500 font-bold text-lg">
                                    $
                                </span>
                                <input
                                    type="number"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-zinc-900 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-black text-lg"
                                />
                            </div>
                        </div>

                        {/* Show Price Toggle */}
                        <label className="inline-flex items-center cursor-pointer group select-none">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={showPrice}
                                    onChange={(e) => setShowPrice(e.target.checked)}
                                />
                                <div className={`w-14 h-7 rounded-full transition-all duration-300 ease-in-out ${showPrice ? 'bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.4)]' : 'bg-zinc-800'}`}></div>
                                <div className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ease-in-out ${showPrice ? 'translate-x-7' : 'translate-x-0'}`}></div>
                            </div>
                            <span className="ml-4 text-sm font-bold text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">
                                Mostrar en catálogo
                            </span>
                        </label>
                    </div>

                    {/* Section: Gallery */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-purple-500 uppercase tracking-wider">
                                Galería del Equipo
                            </h3>
                        </div>

                        <ImageUpload
                            currentImageKey={imageKey}
                            onUploadComplete={(key) => setImageKey(key || null)}
                            onUploadError={(err) => setError(err)}
                        />
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-6 pt-12 border-t border-white/5">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-4 rounded-2xl text-slate-500 font-bold uppercase tracking-widest text-xs hover:text-white hover:bg-white/5 transition-all"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className={`
                        min-w-[200px] px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm text-white transition-all duration-300
                        ${isPending
                            ? "bg-zinc-800 text-slate-500 cursor-not-allowed"
                            : "bg-[#F97316] hover:bg-orange-600 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-orange-500/20"
                        }
                    `}
                >
                    {isPending ? (
                        <span className="flex items-center justify-center gap-3">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            {mode === "create" ? "Creando..." : "Guardando..."}
                        </span>
                    ) : mode === "create" ? (
                        "Crear Producto"
                    ) : (
                        "Guardar Cambios"
                    )}
                </button>
            </div>
        </form>
    );
}
