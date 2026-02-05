import { getProducts } from "@/actions/products";
import { getProductTypes } from "@/actions/product-types";
import { getPublicUrl } from "@/lib/storage-utils";
import ProductsClient from "./ProductsClient";

export const metadata = {
    title: "Catálogo de Equipos - CALITOP",
    description: "Venta y alquiler de equipos topográficos de alta precisión. Estaciones totales, GPS diferenciales y más.",
};

export default async function ProductsPage() {
    const [productsResult, typesResult] = await Promise.all([
        getProducts(),
        getProductTypes()
    ]);

    const products = productsResult.success ? productsResult.data || [] : [];
    const productTypes = typesResult.success ? typesResult.data || [] : [];

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
            productTypes={productTypes}
        />
    );
}
