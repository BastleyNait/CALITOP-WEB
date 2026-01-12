import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.R2_ACCESS_KEY_ID) {
    throw new Error("R2_ACCESS_KEY_ID is not defined");
}
if (!process.env.R2_SECRET_ACCESS_KEY) {
    throw new Error("R2_SECRET_ACCESS_KEY is not defined");
}
if (!process.env.R2_ENDPOINT) {
    throw new Error("R2_ENDPOINT is not defined");
}

export const s3Client = new S3Client({
    region: process.env.R2_REGION || "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "calitop-images";
export const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || "";

/**
 * Constructs the public URL for an image stored in the S3 bucket
 * @param imageKey - The key/path of the image in the bucket
 * @returns The full public URL to access the image
 */
export function getPublicUrl(imageKey: string): string {
    if (!imageKey) return "";
    if (!R2_PUBLIC_DOMAIN) {
        console.warn("R2_PUBLIC_DOMAIN is not configured");
        return "";
    }
    // Ensure no double slashes
    const cleanKey = imageKey.startsWith("/") ? imageKey.slice(1) : imageKey;
    return `https://${R2_PUBLIC_DOMAIN}/${cleanKey}`;
}
