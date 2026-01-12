"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./image-upload";
import { createProduct, updateProduct, ProductFormData } from "@/actions/products";
import { Product, ProductCategory, StockStatus } from "@/types/database";

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

    // Form state
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [category, setCategory] = useState<ProductCategory>(
        product?.category || "VENTA"
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
            price: price ? parseFloat(price) : null,
            imageKey,
            stockStatus,
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
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Error Alert */}
            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Image Upload */}
                <div className="lg:order-2">
                    <ImageUpload
                        currentImageKey={imageKey}
                        onUploadComplete={(key) => setImageKey(key || null)}
                        onUploadError={(err) => setError(err)}
                    />
                </div>

                {/* Right Column - Form Fields */}
                <div className="space-y-6 lg:order-1">
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-slate-300 mb-2"
                        >
                            Product Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product name"
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-slate-300 mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the product..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    {/* Category and Price Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-slate-300 mb-2"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price */}
                        <div>
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-slate-300 mb-2"
                            >
                                Price (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
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
                                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            Stock Status
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {STOCK_STATUSES.map((status) => (
                                <button
                                    key={status.value}
                                    type="button"
                                    onClick={() => setStockStatus(status.value)}
                                    className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${stockStatus === status.value
                                            ? "bg-slate-700 ring-2 ring-primary-500 text-white"
                                            : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50"
                                        }
                  `}
                                >
                                    <span className="flex items-center gap-2">
                                        <span
                                            className={`w-2 h-2 rounded-full ${status.color}`}
                                        />
                                        {status.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-700">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className={`
            px-8 py-3 rounded-xl font-medium text-white transition-all duration-200
            ${isPending
                            ? "bg-slate-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-lg shadow-primary-500/25"
                        }
          `}
                >
                    {isPending ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
                            {mode === "create" ? "Creating..." : "Updating..."}
                        </span>
                    ) : mode === "create" ? (
                        "Create Product"
                    ) : (
                        "Update Product"
                    )}
                </button>
            </div>
        </form>
    );
}
