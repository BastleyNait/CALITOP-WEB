#!/usr/bin/env node
/**
 * 🖼️ Script Rápido de Subida de Imagen
 * 
 * Sube una imagen individual a Backblaze B2 optimizada para SEO
 * 
 * Uso: node scripts/upload-single-image.cjs <ruta-imagen> <categoria>
 * Ejemplo: node scripts/upload-single-image.cjs C:\fotos\hero.jpg hero
 */

const sharp = require('sharp');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

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

// Nombre SEO-friendly
function seoName(name) {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9.-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
}

async function uploadImage(imagePath, category) {
    const fileName = path.basename(imagePath);
    const cleanName = seoName(fileName);
    const b2Key = `images/${category}/${cleanName}.webp`;

    console.log(`\n📸 Procesando: ${fileName}`);
    console.log(`📁 Categoría: ${category}`);

    // Obtener info original
    const originalStats = await fs.stat(imagePath);
    const metadata = await sharp(imagePath).metadata();
    console.log(`📐 Original: ${metadata.width}x${metadata.height} (${(originalStats.size / 1024).toFixed(1)}KB)`);

    // Optimizar a WebP
    const webpBuffer = await sharp(imagePath)
        .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 82, effort: 6 })
        .toBuffer();

    const savings = ((1 - webpBuffer.length / originalStats.size) * 100).toFixed(1);
    console.log(`✨ Optimizado: ${(webpBuffer.length / 1024).toFixed(1)}KB (${savings}% más pequeño)`);

    // Subir
    await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: b2Key,
        Body: webpBuffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable',
    }));

    const publicUrl = `https://${PUBLIC_DOMAIN}/${b2Key}`;

    console.log(`\n✅ Subida exitosa!`);
    console.log(`🌐 URL: ${publicUrl}`);
    console.log(`\n📋 Código para usar:`);
    console.log(`<Image src="${publicUrl}" alt="..." width={${metadata.width}} height={${metadata.height}} />`);

    return publicUrl;
}

// Main
const args = process.argv.slice(2);

if (args.length < 2) {
    console.log(`
🖼️  Script de Subida Rápida a Backblaze B2

Uso: node scripts/upload-single-image.cjs <ruta-imagen> <categoria>

Categorías disponibles:
  - hero        (imágenes del hero)
  - services    (servicios)
  - about       (nosotros)
  - logos       (logos)
  - gallery     (galería)
  - backgrounds (fondos)

Ejemplo:
  node scripts/upload-single-image.cjs "C:\\fotos\\mi-imagen.jpg" hero
`);
    process.exit(0);
}

const [imagePath, category] = args;

if (!fs.existsSync(imagePath)) {
    console.error(`❌ Archivo no encontrado: ${imagePath}`);
    process.exit(1);
}

uploadImage(imagePath, category).catch((err) => {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
});
