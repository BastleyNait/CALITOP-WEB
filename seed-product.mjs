import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    const { data, error } = await supabase
        .from('products')
        .insert([
            {
                name: 'Estación Total Leica FlexLine TS07',
                description: 'Estación total manual de alta precisión para tareas de topografía estándar. Ideal para levantamientos de alta exigencia.',
                category: 'VENTA',
                price: 8500.00,
                image_key: null,
                stock_status: 'IN_STOCK',
                show_price: true,
            }
        ])
        .select();

    if (error) {
        console.error('Error seeding product:', error);
    } else {
        console.log('Product seeded successfully:', data);
    }
}

seed();
