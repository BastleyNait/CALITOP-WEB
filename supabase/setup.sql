-- Create Enums if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_category') THEN
        CREATE TYPE product_category AS ENUM ('VENTA', 'ALQUILER', 'SERVICIO');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'stock_status') THEN
        CREATE TYPE stock_status AS ENUM ('IN_STOCK', 'IMPORTATION', 'OUT_OF_STOCK');
    END IF;
END$$;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category product_category NOT NULL DEFAULT 'VENTA',
    price DECIMAL(10, 2),
    image_key TEXT,
    stock_status stock_status NOT NULL DEFAULT 'IN_STOCK',
    show_price BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Orders Table (Future proofing)
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    dni TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies for products
DROP POLICY IF EXISTS "Public read access for products" ON products;
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access for products" ON products;
CREATE POLICY "Admin full access for products" ON products FOR ALL USING (auth.role() = 'authenticated');

-- Policies for orders
DROP POLICY IF EXISTS "Public can create orders" ON orders;
CREATE POLICY "Public can create orders" ON orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin read access for orders" ON orders;
CREATE POLICY "Admin read access for orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');
