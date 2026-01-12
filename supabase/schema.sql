-- ================================================
-- Calitop Web Application - Database Schema
-- Run this in your Supabase SQL Editor
-- ================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom enums
CREATE TYPE product_category AS ENUM ('VENTA', 'ALQUILER', 'SERVICIO');
CREATE TYPE stock_status AS ENUM ('IN_STOCK', 'IMPORTATION', 'OUT_OF_STOCK');

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category product_category NOT NULL,
  price DECIMAL(10,2),
  image_key TEXT,
  stock_status stock_status NOT NULL DEFAULT 'IN_STOCK',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Attach trigger to products table
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for common queries
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_stock_status ON products(stock_status);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth requirements)
-- Public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);

-- Authenticated users can insert/update/delete
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- ================================================
-- Optional: Insert sample data
-- ================================================
/*
INSERT INTO products (name, description, category, price, stock_status) VALUES
  ('Estación Total Trimble S7', 'Estación total de alta precisión con tecnología Trimble Vision', 'ALQUILER', 150.00, 'IN_STOCK'),
  ('GPS GNSS Leica GS18 T', 'Receptor GNSS con compensación de inclinación', 'VENTA', 12500.00, 'IN_STOCK'),
  ('Nivel Automático Topcon AT-B4A', 'Nivel óptico automático de 24x aumentos', 'ALQUILER', 35.00, 'IN_STOCK'),
  ('Calibración de Estación Total', 'Servicio de calibración certificada', 'SERVICIO', 250.00, 'IN_STOCK'),
  ('Distanciómetro Laser Leica DISTO X4', 'Medidor láser de 150m de alcance', 'VENTA', 450.00, 'IMPORTATION');
*/
