"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/database";
import { deleteProduct } from "@/actions/products";
import { getPublicUrl } from "@/lib/s3-client";

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
            <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-slate-500"
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
                <h3 className="text-xl font-semibold text-white mb-2">
                    No products yet
                </h3>
                <p className="text-slate-400 mb-6">
                    Get started by creating your first product.
                </p>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium hover:from-primary-500 hover:to-primary-400 transition-all shadow-lg shadow-primary-500/25"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Product
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-800/50">
                        <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">
                            Product
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-slate-400 hidden md:table-cell">
                            Category
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-slate-400 hidden lg:table-cell">
                            Price
                        </th>
                        <th className="text-left py-4 px-4 text-sm font-medium text-slate-400 hidden sm:table-cell">
                            Status
                        </th>
                        <th className="text-right py-4 px-4 text-sm font-medium text-slate-400">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                    {products.map((product) => {
                        const stockInfo = STOCK_LABELS[product.stock_status];
                        const isDeleting = deletingId === product.id;

                        return (
                            <tr
                                key={product.id}
                                className={`
                  transition-colors
                  ${isDeleting ? "opacity-50" : "hover:bg-slate-700/20"}
                `}
                            >
                                {/* Product Info */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-4">
                                        {/* Thumbnail */}
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700/50 flex-shrink-0">
                                            {product.image_key ? (
                                                <Image
                                                    src={getPublicUrl(product.image_key)}
                                                    alt={product.name}
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full object-cover"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <svg
                                                        className="w-6 h-6 text-slate-500"
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
                                        <div>
                                            <p className="font-medium text-white">{product.name}</p>
                                            <p className="text-sm text-slate-400 line-clamp-1 max-w-xs">
                                                {product.description || "No description"}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="py-4 px-4 hidden md:table-cell">
                                    <span className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-sm">
                                        {CATEGORY_LABELS[product.category]}
                                    </span>
                                </td>

                                {/* Price */}
                                <td className="py-4 px-4 hidden lg:table-cell">
                                    <span className="text-white font-medium">
                                        {product.price
                                            ? `$${product.price.toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                            })}`
                                            : "—"}
                                    </span>
                                </td>

                                {/* Stock Status */}
                                <td className="py-4 px-4 hidden sm:table-cell">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${stockInfo.color}`}
                                    >
                                        {stockInfo.label}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="py-4 px-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                                            title="Edit"
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
                                                    strokeWidth={1.5}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id, product.name)}
                                            disabled={isPending}
                                            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                            title="Delete"
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
                                                        strokeWidth={1.5}
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
