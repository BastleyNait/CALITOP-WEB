import { getAllProductTypes } from "@/actions/product-types";
import { CategoriesManager } from "@/components/admin/categories-manager";
import { AdminNavbar } from "@/components/admin/admin-navbar";

export const metadata = {
    title: "Categorías - Admin CALITOP",
    description: "Gestiona las categorías y tipos de productos topográficos",
};

export default async function AdminCategoriesPage() {
    const result = await getAllProductTypes();
    const categories = result.success ? result.data ?? [] : [];

    const totalActive = categories.filter((c) => c.is_active).length;
    const totalInactive = categories.filter((c) => !c.is_active).length;

    return (
        <div className="min-h-screen bg-background">
            <AdminNavbar />
            <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-black text-white mb-2">
                                <span className="text-[#F97316]">Categorías</span> de Productos
                            </h1>
                            <p className="text-slate-500 font-medium">
                                Gestiona los tipos de equipos disponibles en el catálogo.
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                            <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">
                                Total
                            </div>
                            <div className="text-3xl font-black text-white">{categories.length}</div>
                        </div>

                        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
                            <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">
                                Activas
                            </div>
                            <div className="text-3xl font-black text-white">{totalActive}</div>
                        </div>

                        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-500/10 to-transparent border border-white/5">
                            <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">
                                Inactivas
                            </div>
                            <div className="text-3xl font-black text-white">{totalInactive}</div>
                        </div>
                    </div>

                    {/* Manager */}
                    <CategoriesManager initialCategories={categories} />
                </div>
            </div>
        </div>
    );
}
