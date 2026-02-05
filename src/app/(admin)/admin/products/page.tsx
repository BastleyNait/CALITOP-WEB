import { getProducts } from "@/actions/products";
import { getPublicUrl } from "@/lib/storage-utils";
import { ProductsTable } from "@/components/admin/products-table";
import Link from "next/link";

export const metadata = {
    title: "Productos - Admin CALITOP",
    description: "Gestiona tu catálogo de productos topográficos",
};

export default async function AdminProductsPage() {
    const result = await getProducts();
    const products = result.success ? result.data || [] : [];

    // Map image keys to public URLs
    const publicUrls: Record<string, string> = {};
    products.forEach((p) => {
        if (p.image_key) {
            publicUrls[p.image_key] = getPublicUrl(p.image_key);
        }
    });

    // Calculate stats
    const totalValue = products.reduce((sum, p) => sum + (p.price || 0), 0);
    const inStock = products.filter(p => p.stock_status === 'IN_STOCK').length;
    const outOfStock = products.filter(p => p.stock_status === 'OUT_OF_STOCK').length;

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">\n            <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white mb-2">
                        <span className="text-[#F97316]">Catálogo</span> de Productos
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Gestiona y monitorea tus activos y conjuntos de datos topográficos.
                    </p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="px-6 py-3 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-black uppercase tracking-wider text-sm transition-all shadow-lg shadow-orange-500/20 hover:scale-105 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Añadir Producto
                </Link>
            </div>

            {/* Table */}
            <ProductsTable products={products} publicUrls={publicUrls} />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Value */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2. 67 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.67-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">
                                Valor Inventario
                            </div>
                            <div className="text-2xl font-black text-white">
                                ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* In Stock */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">
                                En Stock
                            </div>
                            <div className="text-2xl font-black text-white">
                                {inStock}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Out of Stock */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">
                                Sin Stock
                            </div>
                            <div className="text-2xl font-black text-white">
                                {outOfStock}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
