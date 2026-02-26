import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const currentDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(currentDir, '..');

// Read .env.local manually if run without --env-file flag
const envPath = join(rootDir, '.env.local');
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const match = line.match(/^([^#=]+)\s*=\s*(.*)$/);
        if (match) {
            process.env[match[1].trim()] = match[2].trim();
        }
    });
}

const s3 = new S3Client({
    endpoint: process.env.R2_ENDPOINT || process.env.B2_ENDPOINT,
    region: process.env.R2_REGION || process.env.B2_REGION,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || process.env.B2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || process.env.B2_SECRET_ACCESS_KEY,
    }
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || process.env.B2_BUCKET_NAME;

const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif'
};

async function uploadFolder(localFolderPath, s3Prefix) {
    if (!fs.existsSync(localFolderPath)) {
        console.log(`Directory ${localFolderPath} does not exist, skipping.`);
        return;
    }
    const files = readdirSync(localFolderPath);

    for (const file of files) {
        const filePath = join(localFolderPath, file);
        if (statSync(filePath).isDirectory()) {
            await uploadFolder(filePath, `${s3Prefix}${file}/`);
        } else {
            const ext = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
            const mimeType = mimeTypes[ext] || 'application/octet-stream';

            console.log(`Uploading ${filePath} to ${s3Prefix}${file} ...`);
            const fileContent = readFileSync(filePath);

            try {
                await s3.send(new PutObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: `${s3Prefix}${file}`,
                    Body: fileContent,
                    ContentType: mimeType
                }));
                console.log(`Successfully uploaded ${s3Prefix}${file}`);
            } catch (error) {
                console.error(`Failed to upload ${s3Prefix}${file}:`, error);
            }
        }
    }
}

async function run() {
    console.log("Starting upload...");

    // Upload public/images to images/ 
    const publicImagesPath = join(rootDir, 'public', 'images');
    await uploadFolder(publicImagesPath, 'images/');

    // Upload img/ to img/
    const imgPath = join(rootDir, 'img');
    await uploadFolder(imgPath, 'img/');

    console.log("Upload complete!");
}

run();
