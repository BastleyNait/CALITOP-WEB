import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/actions/products";
import { ProductForm } from "@/components/admin/product-form";

export const metadata = {
    title: "Edit Product",
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
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin/products"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Products
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Edit Product</h1>
                    <p className="text-slate-400 mt-1">
                        Update &quot;{product.name}&quot;
                    </p>
                </div>

                {/* Form Card */}
                <div className="p-6 sm:p-8 rounded-2xl glass">
                    <ProductForm mode="edit" product={product} />
                </div>
            </div>
        </div>
    );
}
