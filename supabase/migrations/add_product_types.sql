-- ================================================
-- Calitop - Migración: Sistema de Categorías de Productos
-- Ejecutar en Supabase SQL Editor
-- ================================================

-- 1. Crear tabla de tipos de productos
CREATE TABLE IF NOT EXISTS product_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  color TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insertar categorías iniciales (solo Estaciones y Niveles por ahora)
INSERT INTO product_types (name, slug, color, sort_order) VALUES
  ('Estaciones Totales', 'estaciones-totales', '#F97316', 1),
  ('Niveles Automáticos', 'niveles', '#38BDF8', 2)
ON CONFLICT (slug) DO NOTHING;

-- 3. Agregar columna product_type_id a productos
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS product_type_id UUID REFERENCES product_types(id);

-- 4. Crear índice para mejor performance en filtros
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type_id);

-- 5. Habilitar RLS en product_types
ALTER TABLE product_types ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de acceso para product_types
-- Lectura pública
CREATE POLICY "Allow public read product_types" ON product_types
  FOR SELECT
  USING (true);

-- CRUD para usuarios autenticados
CREATE POLICY "Allow authenticated insert product_types" ON product_types
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update product_types" ON product_types
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete product_types" ON product_types
  FOR DELETE
  TO authenticated
  USING (true);

-- ================================================
-- Verificación: Ejecutar después de la migración
-- ================================================
-- SELECT * FROM product_types;
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'products';
