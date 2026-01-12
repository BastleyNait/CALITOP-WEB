import Link from "next/link";
import { getProducts } from "@/actions/products";
import { ProductsTable } from "@/components/admin/products-table";

export const metadata = {
    title: "Products Admin",
};

export default async function AdminProductsPage() {
    const result = await getProducts();
    const products = result.success ? result.data || [] : [];

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Products</h1>
                        <p className="text-slate-400 mt-1">
                            Manage your product catalog
                        </p>
                    </div>
                    <Link
                        href="/admin/products/new"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium hover:from-primary-500 hover:to-primary-400 transition-all shadow-lg shadow-primary-500/25"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product
                    </Link>
                </div>

                {/* Error State */}
                {!result.success && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 mb-8">
                        <p>Error loading products: {result.error}</p>
                    </div>
                )}

                {/* Products Table */}
                <ProductsTable products={products} />
            </div>
        </div>
    );
}
