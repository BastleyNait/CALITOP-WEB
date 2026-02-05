import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

/**
 * Creates an admin Supabase client with SERVICE_ROLE_KEY
 * This bypasses Row Level Security (RLS) and should only be used in server actions
 * DO NOT expose this client to the browser
 */
export function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        console.error("Missing Supabase credentials for admin client");
        throw new Error("Supabase admin client configuration is incomplete");
    }

    return createSupabaseClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}
