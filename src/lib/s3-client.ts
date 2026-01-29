import { S3Client } from "@aws-sdk/client-s3";

// Helper to get server env vars safely
const getEnv = (key: string) => {
    const value = process.env[key];
    if (typeof window === "undefined" && !value) {
        console.warn(`Server-side environment variable ${key} is missing`);
    }
    return value || "";
};

export const s3Client = new S3Client({
    region: getEnv("R2_REGION") || "auto",
    endpoint: getEnv("R2_ENDPOINT"),
    forcePathStyle: true, // Crucial para Backblaze B2
    credentials: {
        accessKeyId: getEnv("R2_ACCESS_KEY_ID"),
        secretAccessKey: getEnv("R2_SECRET_ACCESS_KEY"),
    },
});

export const R2_BUCKET_NAME = getEnv("R2_BUCKET_NAME") || "calitop-images";

// Re-export getPublicUrl from the safe utility for convenience in server-side code
export { getPublicUrl } from "./storage-utils";
