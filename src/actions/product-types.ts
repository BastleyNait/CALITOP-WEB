"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ProductType } from "@/types/database";

export interface ProductTypeFormData {
    name: string;
    slug: string;
    icon?: string | null;
    color?: string | null;
    sortOrder?: number;
    isActive?: boolean;
}

export interface ActionResult<T = void> {
    success: boolean;
    data?: T;
    error?: string;
}

/**
 * Get all active product types
 */
export async function getProductTypes(): Promise<ActionResult<ProductType[]>> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("product_types")
            .select("*")
            .eq("is_active", true)
            .order("sort_order", { ascending: true });

        if (error) {
            throw error;
        }

        return { success: true, data: data || [] };
    } catch (error: unknown) {
        console.error("Error fetching product types:", error);
        const message = error instanceof Error ? error.message : "Failed to fetch product types";
        return { success: false, error: message };
    }
}

/**
 * Get all product types (including inactive) for admin
 */
export async function getAllProductTypes(): Promise<ActionResult<ProductType[]>> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("product_types")
            .select("*")
            .order("sort_order", { ascending: true });

        if (error) {
            throw error;
        }

        return { success: true, data: data || [] };
    } catch (error: unknown) {
        console.error("Error fetching all product types:", error);
        const message = error instanceof Error ? error.message : "Failed to fetch product types";
        return { success: false, error: message };
    }
}

/**
 * Create a new product type
 */
export async function createProductType(
    formData: ProductTypeFormData
): Promise<ActionResult<ProductType>> {
    try {
        const { createAdminClient } = await import("@/lib/supabase/admin");
        const supabase = createAdminClient();

        // Generate slug if not provided
        const slug = formData.slug || formData.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        const { data, error } = await (supabase
            .from("product_types") as any)
            .insert({
                name: formData.name,
                slug: slug,
                icon: formData.icon || null,
                color: formData.color || "#F97316",
                sort_order: formData.sortOrder || 0,
                is_active: formData.isActive !== false,
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        revalidatePath("/admin/categories");
        revalidatePath("/admin/products");
        return { success: true, data };
    } catch (error: unknown) {
        console.error("Error creating product type:", error);
        const message = error instanceof Error ? error.message : "Failed to create product type";
        return { success: false, error: message };
    }
}

/**
 * Update a product type
 */
export async function updateProductType(
    id: string,
    formData: Partial<ProductTypeFormData>
): Promise<ActionResult<ProductType>> {
    try {
        const { createAdminClient } = await import("@/lib/supabase/admin");
        const supabase = createAdminClient();

        const updateData: Record<string, unknown> = {};
        if (formData.name !== undefined) updateData.name = formData.name;
        if (formData.slug !== undefined) updateData.slug = formData.slug;
        if (formData.icon !== undefined) updateData.icon = formData.icon;
        if (formData.color !== undefined) updateData.color = formData.color;
        if (formData.sortOrder !== undefined) updateData.sort_order = formData.sortOrder;
        if (formData.isActive !== undefined) updateData.is_active = formData.isActive;

        const { data, error } = await (supabase
            .from("product_types") as any)
            .update(updateData)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        revalidatePath("/admin/categories");
        revalidatePath("/admin/products");
        return { success: true, data };
    } catch (error: unknown) {
        console.error("Error updating product type:", error);
        const message = error instanceof Error ? error.message : "Failed to update product type";
        return { success: false, error: message };
    }
}

/**
 * Delete a product type (soft delete - sets is_active to false)
 */
export async function deleteProductType(id: string): Promise<ActionResult> {
    try {
        const { createAdminClient } = await import("@/lib/supabase/admin");
        const supabase = createAdminClient();

        // Soft delete - just mark as inactive
        const { error } = await (supabase
            .from("product_types") as any)
            .update({ is_active: false })
            .eq("id", id);

        if (error) {
            throw error;
        }

        revalidatePath("/admin/categories");
        revalidatePath("/admin/products");
        return { success: true };
    } catch (error: unknown) {
        console.error("Error deleting product type:", error);
        const message = error instanceof Error ? error.message : "Failed to delete product type";
        return { success: false, error: message };
    }
}
