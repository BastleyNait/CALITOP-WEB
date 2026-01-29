"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/database";
import { deleteProduct } from "@/actions/products";
import { getPublicUrl } from "@/lib/storage-utils";

interface ProductsTableProps {
    products: Product[];
}

const CATEGORY_LABELS: Record<string, string> = {
    VENTA: "Venta",
    ALQUILER: "Alquiler",
    SERVICIO: "Servicio",
};

const STOCK_LABELS: Record<string, { label: string; color: string }> = {
    IN_STOCK: { label: "En Stock", color: "bg-emerald-500/20 text-emerald-400" },
    IMPORTATION: { label: "Importación", color: "bg-amber-500/20 text-amber-400" },
    OUT_OF_STOCK: { label: "Sin Stock", color: "bg-red-500/20 text-red-400" },
};


export function ProductsTable({ products }: ProductsTableProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            return;
        }

        setDeletingId(id);
        startTransition(async () => {
            const result = await deleteProduct(id);
            if (!result.success) {
                alert(result.error || "Failed to delete product");
            }
            setDeletingId(null);
        });
    };

    if (products.length === 0) {
        return (
            <div className="text-center py-24">
                <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <svg
                        className="w-12 h-12 text-[#F97316]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                    No hay productos aún
                </h3>
                <p className="text-slate-400 mb-10 max-w-sm mx-auto">
                    Comienza agregando tu primer equipo o servicio al catálogo digital.
                </p>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#F97316] text-white font-bold hover:bg-orange-600 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-orange-500/20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Crear Primer Producto
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-white/5 bg-white/[0.01]">
                        <th className="text-left py-6 px-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                            Producto
                        </th>
                        <th className="text-left py-6 px-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hidden md:table-cell">
                            Categoría
                        </th>
                        <th className="text-left py-6 px-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hidden lg:table-cell">
                            Precio / Visibilidad
                        </th>
                        <th className="text-left py-6 px-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hidden sm:table-cell">
                            Disponibilidad
                        </th>
                        <th className="text-right py-6 px-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {products.map((product) => {
                        const stockInfo = STOCK_LABELS[product.stock_status];
                        const isDeleting = deletingId === product.id;

                        return (
                            <tr
                                key={product.id}
                                className={`
                                    group transition-all duration-300
                                    ${isDeleting ? "opacity-50 grayscale" : "hover:bg-white/[0.03]"}
                                `}
                            >
                                {/* Product Info */}
                                <td className="py-6 px-8">
                                    <div className="flex items-center gap-5">
                                        {/* Thumbnail */}
                                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-800 border border-white/5 flex-shrink-0 group-hover:border-orange-500/30 transition-colors">
                                            {product.image_key ? (
                                                <Image
                                                    src={getPublicUrl(product.image_key)}
                                                    alt={product.name}
                                                    width={56}
                                                    height={56}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <svg
                                                        className="w-7 h-7 text-zinc-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        {/* Name */}
                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-white group-hover:text-[#F97316] transition-colors truncate">{product.name}</p>
                                            <p className="text-sm text-slate-500 truncate mt-0.5 font-medium">
                                                {product.description || "Sin descripción"}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="py-6 px-8 hidden md:table-cell">
                                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-zinc-800 border border-white/5 text-slate-300 text-xs font-bold uppercase tracking-wider">
                                        {CATEGORY_LABELS[product.category]}
                                    </span>
                                </td>

                                {/* Price */}
                                <td className="py-6 px-8 hidden lg:table-cell">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-black text-lg">
                                            {product.price
                                                ? `$${product.price.toLocaleString("en-US", {
                                                    minimumFractionDigits: 2,
                                                })}`
                                                : "P.O.R."}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${product.show_price ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-zinc-600'}`}></div>
                                            <span className={`text-[10px] uppercase font-black tracking-widest ${product.show_price ? 'text-orange-500' : 'text-slate-500'}`}>
                                                {product.show_price ? 'Visible' : 'Oculto'}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Stock Status */}
                                <td className="py-6 px-8 hidden sm:table-cell">
                                    <span
                                        className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ring-1 ring-inset ${stockInfo.color.replace('bg-', 'bg-').replace('text-', 'text-')} border border-white/5`}
                                    >
                                        {stockInfo.label}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="py-6 px-8 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#F97316] hover:border-[#F97316] transition-all shadow-lg"
                                            title="Editar"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id, product.name)}
                                            disabled={isPending}
                                            className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all shadow-lg disabled:opacity-50"
                                            title="Eliminar"
                                        >
                                            {isDeleting ? (
                                                <svg
                                                    className="w-5 h-5 animate-spin"
                                                    viewBox="0 0 24 24"
                                                >
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
                                            ) : (
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
