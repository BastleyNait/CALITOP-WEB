import { getProducts } from "@/actions/products";
import { getPublicUrl } from "@/lib/storage-utils";
import ProductsClient from "./ProductsClient";

export const metadata = {
    title: "Catálogo de Equipos - CALITOP",
    description: "Venta y alquiler de equipos topográficos de alta precisión. Estaciones totales, GPS diferenciales y más.",
};

export default async function ProductsPage() {
    const result = await getProducts();
    const products = result.success ? result.data || [] : [];

    // Map image keys to public URLs
    const publicUrls: Record<string, string> = {};
    products.forEach((p) => {
        if (p.image_key) {
            publicUrls[p.image_key] = getPublicUrl(p.image_key);
        }
    });

    return (
        <ProductsClient
            initialProducts={products}
            publicUrls={publicUrls}
        />
    );
}
