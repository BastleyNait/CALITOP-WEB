"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { deleteFromStorage } from "./storage";
import { Product, ProductCategory, StockStatus } from "@/types/database";

export interface ProductFormData {
    name: string;
    description: string;
    category: ProductCategory;
    price: number | null;
    imageKey: string | null;
    stockStatus: StockStatus;
    showPrice: boolean;
}

export interface ActionResult<T = void> {
    success: boolean;
    data?: T;
    error?: string;
}

/**
 * Get all products from the database
 */
export async function getProducts(): Promise<ActionResult<Product[]>> {
    try {
        const supabase = await createClient();
        const { data, error } = await (supabase.from("products") as any)
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        return { success: true, data: data || [] };
    } catch (error: any) {
        console.error("Error fetching products details:", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
        });
        return {
            success: false,
            error: error.message || "Failed to fetch products",
        };
    }
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string): Promise<ActionResult<Product>> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error("Error fetching product:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch product",
        };
    }
}

/**
 * Create a new product
 */
export async function createProduct(
    formData: ProductFormData
): Promise<ActionResult<Product>> {
    try {
        const supabase = await createClient();

        const { data, error } = await (supabase.from("products") as any)
            .insert({
                name: formData.name,
                description: formData.description || null,
                category: formData.category,
                price: formData.price,
                image_key: formData.imageKey,
                stock_status: formData.stockStatus,
                show_price: formData.showPrice,
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        revalidatePath("/admin/products");
        return { success: true, data };
    } catch (error) {
        console.error("Error creating product:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create product",
        };
    }
}

/**
 * Update an existing product
 */
export async function updateProduct(
    id: string,
    formData: ProductFormData,
    oldImageKey?: string
): Promise<ActionResult<Product>> {
    try {
        const supabase = await createClient();

        const { data, error } = await (supabase.from("products") as any)
            .update({
                name: formData.name,
                description: formData.description || null,
                category: formData.category,
                price: formData.price,
                image_key: formData.imageKey,
                stock_status: formData.stockStatus,
                show_price: formData.showPrice,
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        // If image was changed, delete the old one from storage
        if (oldImageKey && oldImageKey !== formData.imageKey) {
            await deleteFromStorage(oldImageKey);
        }

        revalidatePath("/admin/products");
        revalidatePath(`/admin/products/${id}`);
        return { success: true, data };
    } catch (error) {
        console.error("Error updating product:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update product",
        };
    }
}

/**
 * Delete a product and its associated image
 */
export async function deleteProduct(id: string): Promise<ActionResult> {
    try {
        const supabase = await createClient();

        // First, get the product to retrieve the image key
        const { data: product, error: fetchError } = await (supabase.from("products") as any)
            .select("image_key")
            .eq("id", id)
            .single();

        if (fetchError) {
            throw fetchError;
        }

        // Delete the product from the database
        const { error: deleteError } = await (supabase.from("products") as any)
            .delete()
            .eq("id", id);

        if (deleteError) {
            throw deleteError;
        }

        // Delete the image from storage if it exists
        if (product?.image_key) {
            const storageResult = await deleteFromStorage(product.image_key);
            if (!storageResult.success) {
                console.warn("Failed to delete image from storage:", storageResult.error);
                // We don't throw here - the product was deleted, just log the storage issue
            }
        }

        revalidatePath("/admin/products");
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete product",
        };
    }
}
