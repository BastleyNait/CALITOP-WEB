import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/actions/products";
import { ProductForm } from "@/components/admin/product-form";
import Squares from "@/components/Squares";
import SpotlightCard from "@/components/SpotlightCard";
import ShinyText from "@/components/ShinyText";

export const metadata = {
    title: "Editar Producto | Administración",
};

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params;
    const result = await getProductById(id);

    if (!result.success || !result.data) {
        notFound();
    }

    const product = result.data;

    return (
        <div className="mt-4 relative min-h-screen w-full overflow-hidden bg-background">

            <div className="relative z-10 py-12 px-4 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <Link
                            href="/admin/products"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#F97316] transition-colors mb-6 group"
                        >
                            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-bold uppercase tracking-wider text-xs">Volver a Productos</span>
                        </Link>
                        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                            <ShinyText text="Editar Producto" speed={3} shineColor="#F97316" color="#ffffff" />
                        </h1>
                        <p className="text-slate-400 font-medium text-lg">
                            Actualizando &quot;{product.name}&quot;
                        </p>
                    </div>

                    {/* Form Container */}
                    <SpotlightCard
                        className="p-8 md:p-12 border border-white/5 bg-zinc-900/50 shadow-2xl"
                        spotlightColor="rgba(249, 115, 22, 0.05)"
                    >
                        <ProductForm mode="edit" product={product} />
                    </SpotlightCard>
                </div>
            </div>
        </div>
    );
}
