#!/usr/bin/env node
/**
 * 🚀 Script de Migración de Imágenes a Backblaze B2
 * 
 * Convierte todas las imágenes locales a WebP optimizado para SEO
 * y las sube a Backblaze B2 manteniendo la estructura de rutas.
 * 
 * Uso: 
 *   node scripts/migrate-images-to-b2.cjs                    # Usa public/images por defecto
 *   node scripts/migrate-images-to-b2.cjs ./img              # Carpeta específica
 *   node scripts/migrate-images-to-b2.cjs C:\ruta\imagenes   # Ruta absoluta
 */

const sharp = require('sharp');
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
require('dotenv').config({ path: '.env.local' });

// ==========================================
// CONFIGURACIÓN
// ==========================================

const s3Client = new S3Client({
    region: process.env.R2_REGION || 'us-east-005',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN;

// Obtener carpeta de imágenes (argumento o por defecto)
const args = process.argv.slice(2);
let LOCAL_IMAGES_DIR;
let CUSTOM_B2_PREFIX = '';

if (args[0] && args[0] !== '--help') {
    // Ruta proporcionada por el usuario
    LOCAL_IMAGES_DIR = path.isAbsolute(args[0])
        ? args[0]
        : path.join(process.cwd(), args[0]);
    // Usar nombre de la carpeta como prefijo en B2
    CUSTOM_B2_PREFIX = path.basename(LOCAL_IMAGES_DIR);
} else {
    LOCAL_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
    CUSTOM_B2_PREFIX = 'images';
}

// Configuración de optimización para SEO
const SEO_CONFIG = {
    // Calidad WebP (80-85 es óptimo para SEO: buena calidad, tamaño pequeño)
    quality: 82,

    // Formatos de salida
    formats: {
        webp: { quality: 82, effort: 6 },  // effort 6 = mejor compresión
    },

    // Tamaños responsivos para diferentes usos
    sizes: {
        original: null,      // Tamaño original (máx 1920px)
        large: 1200,         // Desktop grande
        medium: 800,         // Tablet/Desktop pequeño
        small: 400,          // Mobile
        thumb: 200,          // Miniaturas
    },

    // Ancho máximo para cualquier imagen
    maxWidth: 1920,

    // Metadatos SEO
    cacheControl: 'public, max-age=31536000, immutable',
};

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

/**
 * Genera un nombre de archivo SEO-friendly
 */
function seoFileName(originalName) {
    return originalName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^a-z0-9.-]/g, '-')     // Solo alfanuméricos
        .replace(/-+/g, '-')              // Sin guiones múltiples
        .replace(/^-|-$/g, '')            // Sin guiones al inicio/fin
        .replace(/\.(jpg|jpeg|png|gif|webp|avif)$/i, ''); // Sin extensión
}

/**
 * Verifica si un archivo ya existe en B2
 */
async function fileExistsInB2(key) {
    try {
        await s3Client.send(new HeadObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        }));
        return true;
    } catch {
        return false;
    }
}

/**
 * Obtiene metadatos de imagen para SEO
 */
async function getImageMetadata(imagePath) {
    const metadata = await sharp(imagePath).metadata();
    return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: (await fs.stat(imagePath)).size,
    };
}

/**
 * Optimiza y sube una imagen a B2
 */
async function optimizeAndUpload(localPath, b2Key, options = {}) {
    const { width, isLogo } = options;

    try {
        let sharpInstance = sharp(localPath);

        // Obtener metadata original
        const metadata = await sharpInstance.metadata();

        // Configurar resize
        const resizeOptions = {
            withoutEnlargement: true,
            fit: 'inside',
        };

        // Para logos, mantener transparencia si existe
        if (isLogo && metadata.hasAlpha) {
            sharpInstance = sharpInstance.png({ quality: 90 });
            // Subir como PNG para mantener transparencia
            const pngBuffer = await sharpInstance
                .resize(width || SEO_CONFIG.maxWidth, null, resizeOptions)
                .toBuffer();

            await s3Client.send(new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: b2Key.replace('.webp', '.png'),
                Body: pngBuffer,
                ContentType: 'image/png',
                CacheControl: SEO_CONFIG.cacheControl,
            }));

            return { format: 'png', size: pngBuffer.length };
        }

        // Para imágenes normales, convertir a WebP
        const webpBuffer = await sharpInstance
            .resize(width || SEO_CONFIG.maxWidth, null, resizeOptions)
            .webp(SEO_CONFIG.formats.webp)
            .toBuffer();

        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: b2Key,
            Body: webpBuffer,
            ContentType: 'image/webp',
            CacheControl: SEO_CONFIG.cacheControl,
        }));

        return { format: 'webp', size: webpBuffer.length };

    } catch (error) {
        throw new Error(`Error procesando ${localPath}: ${error.message}`);
    }
}

/**
 * Genera todas las variantes de tamaño para una imagen
 */
async function generateResponsiveImages(localPath, baseKey, options = {}) {
    const results = [];
    const { isLogo } = options;

    // Para logos, solo subir en tamaño original
    if (isLogo) {
        const result = await optimizeAndUpload(localPath, baseKey, { isLogo: true });
        results.push({ size: 'original', ...result, key: baseKey.replace('.webp', '.png') });
        return results;
    }

    // Para otras imágenes, generar múltiples tamaños
    for (const [sizeName, width] of Object.entries(SEO_CONFIG.sizes)) {
        const sizeKey = sizeName === 'original'
            ? baseKey
            : baseKey.replace('.webp', `-${sizeName}.webp`);

        try {
            const result = await optimizeAndUpload(localPath, sizeKey, { width });
            results.push({ size: sizeName, ...result, key: sizeKey });
        } catch (error) {
            console.error(`  ⚠️  Error en tamaño ${sizeName}: ${error.message}`);
        }
    }

    return results;
}

// ==========================================
// FUNCIÓN PRINCIPAL
// ==========================================

async function migrateImages() {
    // Mostrar ayuda si se solicita
    if (args[0] === '--help' || args[0] === '-h') {
        console.log(`
🚀 Script de Migración de Imágenes a Backblaze B2

USO:
  node scripts/migrate-images-to-b2.cjs [carpeta]

EJEMPLOS:
  node scripts/migrate-images-to-b2.cjs                 # Usa public/images
  node scripts/migrate-images-to-b2.cjs ./img           # Carpeta ./img
  node scripts/migrate-images-to-b2.cjs C:\\fotos        # Ruta absoluta

Las imágenes se subirán a B2 en la carpeta con el nombre de la carpeta origen.
Por ejemplo, ./img se sube a B2 como /img/...
`);
        process.exit(0);
    }

    console.log('\n🚀 MIGRACIÓN DE IMÁGENES A BACKBLAZE B2');
    console.log('='.repeat(50));
    console.log(`📁 Directorio local: ${LOCAL_IMAGES_DIR}`);
    console.log(`📂 Prefijo en B2: ${CUSTOM_B2_PREFIX}/`);
    console.log(`☁️  Bucket: ${BUCKET_NAME}`);
    console.log(`🌐 Dominio: ${PUBLIC_DOMAIN}`);
    console.log('='.repeat(50));

    // Verificar configuración
    if (!process.env.R2_ACCESS_KEY_ID || !BUCKET_NAME) {
        console.error('\n❌ Error: Variables de entorno no configuradas');
        console.error('   Asegúrate de tener R2_ACCESS_KEY_ID, R2_BUCKET_NAME en .env.local');
        process.exit(1);
    }

    // Verificar directorio local
    if (!await fs.pathExists(LOCAL_IMAGES_DIR)) {
        console.error(`\n❌ Error: Directorio ${LOCAL_IMAGES_DIR} no existe`);
        process.exit(1);
    }

    // Obtener todas las imágenes
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const allFiles = [];

    async function scanDirectory(dir, relativePath = '') {
        const items = await fs.readdir(dir, { withFileTypes: true });

        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            const relPath = path.join(relativePath, item.name);

            if (item.isDirectory()) {
                await scanDirectory(fullPath, relPath);
            } else if (imageExtensions.includes(path.extname(item.name).toLowerCase())) {
                allFiles.push({
                    localPath: fullPath,
                    relativePath: relPath,
                    name: item.name,
                });
            }
        }
    }

    await scanDirectory(LOCAL_IMAGES_DIR);

    console.log(`\n📷 Encontradas ${allFiles.length} imágenes para procesar\n`);

    // Mapeo de URLs para actualizar código
    const urlMapping = {};
    let processed = 0;
    let errors = 0;
    let skipped = 0;

    for (const file of allFiles) {
        const isLogo = file.name.toLowerCase().includes('logo');
        const cleanName = seoFileName(file.name);
        const relativeDirPath = path.dirname(file.relativePath).replace(/\\/g, '/');

        // Construir key de B2 (manteniendo estructura de carpetas)
        const b2BasePath = relativeDirPath === '.' ? '' : `${relativeDirPath}/`;
        const b2Key = `${CUSTOM_B2_PREFIX}/${b2BasePath}${cleanName}.webp`;

        console.log(`\n📸 ${file.relativePath}`);

        // Verificar si ya existe
        const exists = await fileExistsInB2(b2Key);
        if (exists) {
            console.log(`  ⏭️  Ya existe en B2, saltando...`);
            skipped++;
            continue;
        }

        try {
            // Obtener info original
            const originalMeta = await getImageMetadata(file.localPath);
            console.log(`  📐 Original: ${originalMeta.width}x${originalMeta.height} (${(originalMeta.size / 1024).toFixed(1)}KB)`);

            // Generar y subir variantes
            const results = await generateResponsiveImages(file.localPath, b2Key, { isLogo });

            // Mostrar resultados
            for (const result of results) {
                const savings = originalMeta.size > 0
                    ? ((1 - result.size / originalMeta.size) * 100).toFixed(1)
                    : 0;
                console.log(`  ✅ ${result.size}: ${(result.size / 1024).toFixed(1)}KB (${result.format}) - ${savings}% más pequeño`);
            }

            // Guardar mapeo de URLs
            const oldUrl = `/${CUSTOM_B2_PREFIX}/${file.relativePath.replace(/\\/g, '/')}`;
            const newUrl = `https://${PUBLIC_DOMAIN}/${b2Key}`;
            urlMapping[oldUrl] = newUrl;

            processed++;

        } catch (error) {
            console.error(`  ❌ Error: ${error.message}`);
            errors++;
        }
    }

    // Resumen final
    console.log('\n' + '='.repeat(50));
    console.log('📊 RESUMEN DE MIGRACIÓN');
    console.log('='.repeat(50));
    console.log(`✅ Procesadas: ${processed}`);
    console.log(`⏭️  Saltadas (ya existían): ${skipped}`);
    console.log(`❌ Errores: ${errors}`);

    // Guardar mapeo de URLs
    if (Object.keys(urlMapping).length > 0) {
        const mappingFile = path.join(process.cwd(), 'scripts', 'url-mapping.json');
        await fs.writeJson(mappingFile, urlMapping, { spaces: 2 });
        console.log(`\n📝 Mapeo de URLs guardado en: ${mappingFile}`);

        // Mostrar ejemplo de uso
        console.log('\n💡 EJEMPLO DE USO EN CÓDIGO:');
        console.log('-'.repeat(50));
        const firstKey = Object.keys(urlMapping)[0];
        if (firstKey) {
            console.log(`\nAntes:  src="${firstKey}"`);
            console.log(`Ahora:  src="${urlMapping[firstKey]}"`);

            console.log('\n📋 Para imágenes responsivas:');
            const baseName = path.basename(urlMapping[firstKey], '.webp');
            console.log(`
<Image
  src="${urlMapping[firstKey]}"
  alt="Descripción para SEO"
  width={1200}
  height={800}
  priority={true}  // Para imágenes above-the-fold
/>
`);
        }
    }

    console.log('\n✨ Migración completada!\n');
}

// Ejecutar
migrateImages().catch((error) => {
    console.error('\n❌ Error fatal:', error);
    process.exit(1);
});
