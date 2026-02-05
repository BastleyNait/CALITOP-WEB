"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product, ProductType } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { deleteProduct } from "@/actions/products";

interface ProductsTableProps {
    products: Product[];
    publicUrls: Record<string, string>;
}

export function ProductsTable({ products, publicUrls }: ProductsTableProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [deleting, setDeleting] = useState<string | null>(null);
    const itemsPerPage = 10;

    // Filter products by search
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`¿Estás seguro de eliminar "${name}"?`)) return;

        setDeleting(id);
        const result = await deleteProduct(id);
        if (result.success) {
            router.refresh();
        } else {
            alert(result.error || "Error al eliminar");
            setDeleting(null);
        }
    };

    const getStockBadgeVariant = (status: string) => {
        switch (status) {
            case 'IN_STOCK': return 'success';
            case 'IMPORTATION': return 'warning';
            case 'OUT_OF_STOCK': return 'danger';
            default: return 'default';
        }
    };

    const getStockLabel = (status: string) => {
        switch (status) {
            case 'IN_STOCK': return 'Disponible';
            case 'IMPORTATION': return 'En Importación';
            case 'OUT_OF_STOCK': return 'Sin Stock';
            default: return status;
        }
    };

    const getCategoryBadgeVariant = (category: string) => {
        switch (category) {
            case 'VENTA': return 'info';
            case 'ALQUILER': return 'warning';
            case 'SERVICIO': return 'default';
            default: return 'default';
        }
    };

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Buscar productos, SKUs o etiquetas..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-zinc-900 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                />
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    Producto
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    Categoría
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    Tipo
                                </th>
                                <th className="text-right py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    Precio
                                </th>
                                <th className="text-left py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    Estado
                                </th>
                                <th className="text-right py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-widest">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                                                {product.image_key ? (
                                                    <img
                                                        src={publicUrls[product.image_key] || '/images/placeholder.png'}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover rounded-xl"
                                                    />
                                                ) : (
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white mb-1">{product.name}</div>
                                                <div className="text-xs text-slate-500">ID: {product.id.slice(0, 8)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <Badge variant={getCategoryBadgeVariant(product.category)}>
                                            {product.category}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-6">
                                        {product.product_type ? (
                                            <span className="text-sm text-slate-400">
                                                {product.product_type.name}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-600 italic">Sin tipo</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        {product.price ? (
                                            <div className="font-bold text-white">
                                                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-600">Consultar</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <Badge variant={getStockBadgeVariant(product.stock_status)}>
                                            {getStockLabel(product.stock_status)}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-orange-500"
                                                title="Editar"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id, product.name)}
                                                disabled={deleting === product.id}
                                                className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-slate-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Eliminar"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedProducts.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-500">
                                        {searchTerm ? 'No se encontraron productos' : 'No hay productos aún'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`
                                min-w-[2.5rem] h-10 rounded-lg font-bold text-sm transition-all
                                ${currentPage === page
                                    ? 'bg-[#F97316] text-white shadow-lg shadow-orange-500/20'
                                    : 'hover:bg-white/5 text-slate-400 hover:text-white'
                                }
                            `}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
