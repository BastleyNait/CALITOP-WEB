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
    show_price: boolean;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: string;
    product_id: string | null;
    first_name: string;
    last_name: string;
    dni: string;
    location: string;
    status: string;
    created_at: string;
}

export interface Database {
    public: {
        Tables: {
            products: {
                Row: Product;
                Insert: Omit<Product, "id" | "created_at" | "updated_at">;
                Update: Partial<Omit<Product, "id" | "created_at" | "updated_at">>;
            };
            orders: {
                Row: Order;
                Insert: Omit<Order, "id" | "created_at">;
                Update: Partial<Omit<Order, "id" | "created_at">>;
            };
        };
        Enums: {
            product_category: ProductCategory;
            stock_status: StockStatus;
        };
    };
}
