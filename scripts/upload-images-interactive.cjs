#!/usr/bin/env node

const sharp = require('sharp');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
require('dotenv').config({ path: '.env.local' });

// Configurar cliente S3 para Backblaze B2
const s3Client = new S3Client({
  region: process.env.R2_REGION || 'us-east-005',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // IMPORTANTE para Backblaze B2
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN;

// Configurar readline para preguntas interactivas
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Archivo para guardar categorías personalizadas
const CUSTOM_CATEGORIES_FILE = path.join(__dirname, 'custom-categories.json');

// Cargar categorías personalizadas
function loadCustomCategories() {
  try {
    if (fs.existsSync(CUSTOM_CATEGORIES_FILE)) {
      return JSON.parse(fs.readFileSync(CUSTOM_CATEGORIES_FILE, 'utf8'));
    }
  } catch (error) {
    console.warn('⚠️  Error cargando categorías personalizadas:', error.message);
  }
  return {};
}

// Guardar categorías personalizadas
function saveCustomCategories(customCategories) {
  try {
    fs.writeFileSync(CUSTOM_CATEGORIES_FILE, JSON.stringify(customCategories, null, 2));
  } catch (error) {
    console.error('❌ Error guardando categorías personalizadas:', error.message);
  }
}

// Categorías para la página general (no productos)
const baseCategoryOptions = {
  '1': 'hero',           // Imágenes del hero
  '2': 'services',       // Imágenes de servicios
  '3': 'about',          // Imágenes de la sección "nosotros"
  '4': 'team',           // Fotos del equipo
  '5': 'gallery',        // Galería general
  '6': 'logos',          // Logos (Calitop, Topservice, etc.)
  '7': 'icons',          // Iconos y elementos gráficos
  '8': 'backgrounds',    // Fondos y texturas
  '9': 'certificates',   // Certificados y documentos
  '10': 'projects'       // Proyectos realizados
};

// Función para obtener todas las categorías (base + personalizadas)
function getAllCategories() {
  const customCategories = loadCustomCategories();
  return { ...baseCategoryOptions, ...customCategories };
}

// Función para crear una nueva categoría
async function createNewCategory() {
  console.log('\\n📁 Crear Nueva Categoría');

  const categoryName = await question('📝 Ingresa el nombre de la nueva categoría (ej: nueva-categoria): ');

  // Validar nombre de categoría
  if (!categoryName || !/^[a-z0-9-]+$/.test(categoryName)) {
    console.error('❌ Nombre inválido. Usa solo letras minúsculas, números y guiones.');
    return null;
  }

  const displayName = await question('📝 Ingresa el nombre para mostrar (ej: Nueva Categoría): ');

  if (!displayName) {
    console.error('❌ Nombre para mostrar requerido.');
    return null;
  }

  // Cargar categorías existentes
  const customCategories = loadCustomCategories();
  const allCategories = getAllCategories();

  // Verificar si ya existe
  if (Object.values(allCategories).includes(categoryName)) {
    console.error('❌ Esta categoría ya existe.');
    return null;
  }

  // Encontrar el siguiente número disponible
  const existingNumbers = Object.keys(allCategories).map(Number).filter(n => !isNaN(n));
  const nextNumber = Math.max(...existingNumbers) + 1;

  // Agregar nueva categoría
  customCategories[nextNumber.toString()] = categoryName;

  // Guardar
  saveCustomCategories(customCategories);

  console.log(`✅ Categoría "${displayName}" creada exitosamente como "${categoryName}"`);
  console.log(`🔢 Número asignado: ${nextNumber}`);

  return { number: nextNumber.toString(), category: categoryName, display: displayName };
}

// Función para limpiar nombres de archivo
function cleanFileName(fileName) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/\\.(jpg|jpeg|png|webp|avif)$/i, '');
}

// Función para optimizar y subir imagen
async function optimizeAndUpload(inputPath, category, fileName) {
  const cleanName = cleanFileName(fileName);

  try {
    console.log(`🔄 Procesando: ${fileName}`);

    // Generar múltiples formatos y tamaños
    const variants = [
      { suffix: '', width: 1920, format: 'webp', quality: 85 },      // Full HD
      { suffix: '_medium', width: 1200, format: 'webp', quality: 80 }, // Medium
      { suffix: '_thumb', width: 600, format: 'webp', quality: 75 },   // Thumbnail
      { suffix: '_avif', width: 1920, format: 'avif', quality: 75 },   // AVIF Full
      { suffix: '_medium_avif', width: 1200, format: 'avif', quality: 70 } // AVIF Medium
    ];

    const uploadedUrls = [];

    for (const variant of variants) {
      const outputKey = `${category}/${cleanName}${variant.suffix}.${variant.format}`;

      const optimizedBuffer = await sharp(inputPath)
        .resize(variant.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFormat(variant.format, { quality: variant.quality })
        .toBuffer();

      await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: outputKey,
        Body: optimizedBuffer,
        ContentType: `image/${variant.format}`,
        CacheControl: 'public, max-age=31536000',
        Metadata: {
          'original-name': fileName,
          'category': category,
          'optimized-date': new Date().toISOString()
        }
      }));

      const publicUrl = `https://${PUBLIC_DOMAIN}/${outputKey}`;
      uploadedUrls.push({ variant: variant.suffix || 'original', url: publicUrl });
      console.log(`  ✅ ${outputKey}`);
    }

    // Mostrar URL principal
    console.log(`  🌐 URL: https://${PUBLIC_DOMAIN}/${category}/${cleanName}.webp`);

    return { success: true, urls: uploadedUrls };
  } catch (error) {
    console.error(`  ❌ Error procesando ${fileName}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Función principal interactiva
async function uploadImagesInteractive() {
  console.log('🚀 Script de Subida de Imágenes a Backblaze B2\\n');
  console.log('📌 NOTA: Este script es para imágenes generales de la página, NO para productos.\\n');

  // Verificar configuración
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_BUCKET_NAME) {
    console.error('❌ Error: Variables de entorno no configuradas.');
    console.error('   Asegúrate de tener R2_ACCESS_KEY_ID y R2_BUCKET_NAME en .env.local');
    rl.close();
    return;
  }

  console.log(`✅ Bucket: ${BUCKET_NAME}`);
  console.log(`✅ Dominio público: ${PUBLIC_DOMAIN}\\n`);

  // Solicitar ruta de las imágenes
  const imagePath = await question('📁 Ingresa la ruta completa de la carpeta con imágenes: ');

  // Verificar que el directorio existe
  if (!await fs.pathExists(imagePath)) {
    console.error(`❌ El directorio ${imagePath} no existe`);
    rl.close();
    return;
  }

  // Obtener todas las categorías disponibles
  const allCategories = getAllCategories();

  // Mostrar opciones de categorías
  console.log('\\n📋 Selecciona la categoría de destino:');

  // Nombres para mostrar
  const categoryDisplayNames = {
    'hero': '🎯 Hero - Imágenes principales',
    'services': '⚙️  Services - Servicios',
    'about': 'ℹ️  About - Nosotros',
    'team': '👥 Team - Equipo',
    'gallery': '🖼️  Gallery - Galería',
    'logos': '🏷️  Logos - Logotipos',
    'icons': '🎨 Icons - Iconos',
    'backgrounds': '🌄 Backgrounds - Fondos',
    'certificates': '📜 Certificates - Certificados',
    'projects': '🏗️  Projects - Proyectos'
  };

  // Mostrar todas las categorías disponibles
  const sortedNumbers = Object.keys(allCategories).map(Number).sort((a, b) => a - b);

  for (const num of sortedNumbers) {
    const categoryKey = allCategories[num.toString()];
    const displayName = categoryDisplayNames[categoryKey] || categoryKey.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase());
    console.log(`${num.toString().padStart(2, ' ')}. ${displayName}`);
  }

  // Agregar opción para crear nueva categoría
  const createNewOption = Math.max(...sortedNumbers) + 1;
  console.log(`${createNewOption.toString().padStart(2, ' ')}. 📁 Crear Nueva Categoría`);

  const categoryNumber = await question(`\\n🔢 Ingresa el número de categoría (1-${createNewOption}): `);

  let selectedCategory;

  // Verificar si quiere crear una nueva categoría
  if (categoryNumber === createNewOption.toString()) {
    const newCategory = await createNewCategory();
    if (!newCategory) {
      console.log('❌ Operación cancelada');
      rl.close();
      return;
    }
    selectedCategory = newCategory.category;
    console.log(`\\n✅ Usando nueva categoría: ${selectedCategory}`);
  } else {
    selectedCategory = allCategories[categoryNumber];
    if (!selectedCategory) {
      console.error('❌ Número de categoría inválido');
      rl.close();
      return;
    }
  }

  console.log(`\\n✅ Categoría seleccionada: ${selectedCategory}`);
  console.log(`📁 Procesando imágenes desde: ${imagePath}`);

  // Confirmar antes de proceder
  const confirm = await question('\\n¿Continuar con el procesamiento? (y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ Operación cancelada');
    rl.close();
    return;
  }

  // Procesar imágenes
  const files = await fs.readdir(imagePath);
  let totalProcessed = 0;
  let totalErrors = 0;
  const uploadedImages = [];

  console.log('\\n🔄 Iniciando procesamiento...');

  for (const file of files) {
    if (/\\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
      const filePath = path.join(imagePath, file);

      const result = await optimizeAndUpload(filePath, selectedCategory, file);

      if (result.success) {
        totalProcessed++;
        uploadedImages.push({
          original: file,
          clean: cleanFileName(file),
          urls: result.urls
        });
      } else {
        totalErrors++;
      }
    }
  }

  console.log('\\n🎉 Procesamiento completado:');
  console.log(`✅ Imágenes procesadas: ${totalProcessed}`);
  console.log(`❌ Errores: ${totalErrors}`);

  if (totalProcessed > 0) {
    console.log('\\n💡 Ejemplos de uso en código:');
    console.log('\\n--- Next.js Image Component ---');
    console.log(`<Image`);
    console.log(`  src="https://${PUBLIC_DOMAIN}/${selectedCategory}/${uploadedImages[0]?.clean || 'nombre-imagen'}.webp"`);
    console.log(`  alt="Descripción de la imagen"`);
    console.log(`  width={1200}`);
    console.log(`  height={800}`);
    console.log(`  className="..."`);
    console.log(`/>`);

    console.log('\\n--- Background CSS ---');
    console.log(`background-image: url('https://${PUBLIC_DOMAIN}/${selectedCategory}/${uploadedImages[0]?.clean || 'nombre-imagen'}.webp');`);

    console.log('\\n--- HTML <picture> para AVIF/WebP ---');
    console.log(`<picture>`);
    console.log(`  <source srcSet="https://${PUBLIC_DOMAIN}/${selectedCategory}/${uploadedImages[0]?.clean || 'nombre-imagen'}_avif.avif" type="image/avif" />`);
    console.log(`  <source srcSet="https://${PUBLIC_DOMAIN}/${selectedCategory}/${uploadedImages[0]?.clean || 'nombre-imagen'}.webp" type="image/webp" />`);
    console.log(`  <img src="https://${PUBLIC_DOMAIN}/${selectedCategory}/${uploadedImages[0]?.clean || 'nombre-imagen'}.webp" alt="..." />`);
    console.log(`</picture>`);

    console.log('\\n📋 URLs de las imágenes subidas:');
    uploadedImages.forEach(img => {
      console.log(`\\n📸 ${img.original}:`);
      console.log(`   https://${PUBLIC_DOMAIN}/${selectedCategory}/${img.clean}.webp`);
    });
  }

  rl.close();
}

// Ejecutar script
if (require.main === module) {
  uploadImagesInteractive().catch((error) => {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    rl.close();
  });
}

module.exports = { uploadImagesInteractive, optimizeAndUpload };