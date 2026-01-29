import { getProductById } from "@/actions/products";
import { getPublicUrl } from "@/lib/storage-utils";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { id } = await params;
    const result = await getProductById(id);

    if (!result.success || !result.data) {
        return {
            title: "Producto no encontrado - CALITOP",
        };
    }

    const product = result.data;
    return {
        title: `${product.name} - CALITOP`,
        description: product.description?.substring(0, 160) || "Detalles del equipo topográfico en CALITOP.",
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const result = await getProductById(id);

    if (!result.success || !result.data) {
        notFound();
    }

    const product = result.data;
    const imageUrl = product.image_key ? getPublicUrl(product.image_key) : "/images/placeholder.png";

    return (
        <ProductDetailClient
            product={product}
            imageUrl={imageUrl}
        />
    );
}
