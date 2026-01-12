export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type ProductCategory = "VENTA" | "ALQUILER" | "SERVICIO";
export type StockStatus = "IN_STOCK" | "IMPORTATION" | "OUT_OF_STOCK";

export interface Product {
    id: string;
    name: string;
    description: string | null;
    category: ProductCategory;
    price: number | null;
    image_key: string | null;
    stock_status: StockStatus;
    created_at: string;
    updated_at: string;
}

export interface Database {
    public: {
        Tables: {
            products: {
                Row: Product;
                Insert: Omit<Product, "id" | "created_at" | "updated_at">;
                Update: Partial<Omit<Product, "id" | "created_at" | "updated_at">>;
            };
        };
        Enums: {
            product_category: ProductCategory;
            stock_status: StockStatus;
        };
    };
}
