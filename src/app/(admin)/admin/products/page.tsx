import Link from "next/link";
import { getProducts } from "@/actions/products";
import { ProductsTable } from "@/components/admin/products-table";
import Squares from "@/components/Squares";
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ShinyText";

export const metadata = {
    title: "Administración de Productos | Calitop",
};

export default async function AdminProductsPage() {
    const result = await getProducts();
    const products = result.success ? result.data || [] : [];

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background">

            <div className="relative z-10 py-12 px-4 md:px-12">
                <div className="max-w-none mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tight">
                                <ShinyText text="Productos" speed={3} shineColor="#F97316" color="#ffffff" />
                            </h1>
                            <p className="text-slate-400 mt-2 font-medium">
                                Gestiona tu catálogo de equipos y servicios
                            </p>
                        </div>
                        <Link
                            href="/admin/products/new"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#F97316] text-white font-bold hover:bg-orange-600 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-orange-500/20"
                        >
                            <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                            Agregar Producto
                        </Link>
                    </div>

                    {/* Error State */}
                    {!result.success && (
                        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-8 flex items-center gap-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="font-medium">Error al cargar productos: {result.error}</p>
                        </div>
                    )}

                    {/* Products Table Container */}
                    <SpotlightCard
                        className="p-1 border border-white/5 bg-zinc-900/50 shadow-2xl overflow-hidden"
                        spotlightColor="rgba(249, 115, 22, 0.05)"
                    >
                        <ProductsTable products={products} />
                    </SpotlightCard>
                </div>
            </div>
        </div>
    );
}
