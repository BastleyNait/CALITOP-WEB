"use server";

import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client, R2_BUCKET_NAME, getPublicUrl } from "@/lib/s3-client";
import { randomUUID } from "crypto";

export interface PresignedUrlResult {
    success: boolean;
    uploadUrl?: string;
    imageKey?: string;
    publicUrl?: string;
    error?: string;
}

export interface DeleteResult {
    success: boolean;
    error?: string;
}

/**
 * Generates a presigned URL for uploading a file to S3/R2
 * @param fileName - Original filename
 * @param fileType - MIME type of the file
 * @returns Object containing the upload URL and the image key
 */
export async function getPresignedUploadUrl(
    fileName: string,
    fileType: string
): Promise<PresignedUrlResult> {
    try {
        // Validate file type
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
        ];
        if (!allowedTypes.includes(fileType)) {
            return {
                success: false,
                error: `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
            };
        }

        // Generate unique key for the file
        const extension = fileName.split(".").pop() || "jpg";
        const uniqueId = randomUUID();
        const timestamp = Date.now();
        const imageKey = `products/${timestamp}-${uniqueId}.${extension}`;

        // Create the put command
        const command = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: imageKey,
            ContentType: fileType,
        });

        // Generate presigned URL (valid for 5 minutes)
        const uploadUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 300,
        });

        return {
            success: true,
            uploadUrl,
            imageKey,
            publicUrl: getPublicUrl(imageKey),
        };
    } catch (error) {
        console.error("Error generating presigned URL:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to generate upload URL",
        };
    }
}

/**
 * Deletes a file from S3/R2 storage
 * @param imageKey - The key of the file to delete
 */
export async function deleteFromStorage(imageKey: string): Promise<DeleteResult> {
    try {
        if (!imageKey) {
            return { success: true }; // Nothing to delete
        }

        let key = imageKey;
        // If it's a full URL, try to extract the key
        if (imageKey.startsWith("http")) {
            const publicDomain = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN || process.env.R2_PUBLIC_DOMAIN;
            if (publicDomain && imageKey.includes(publicDomain)) {
                key = imageKey.split(`${publicDomain}/`)[1];
            } else {
                // If it's a URL but not from our R2 domain, we can't reliably delete it via S3 API
                console.warn("Attempted to delete external URL from storage:", imageKey);
                return { success: true };
            }
        }

        const command = new DeleteObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
        });

        await s3Client.send(command).catch(err => {
            // Silently fail if object doesn't exist (already deleted)
            if (err.name === 'NoSuchKey') return;
            throw err;
        });

        return { success: true };
    } catch (error) {
        console.error("Error deleting from storage:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete file",
        };
    }
}

/**
 * Re-export the getPublicUrl for use in client components via server action
 */
export async function getImagePublicUrl(imageKey: string): Promise<string> {
    return getPublicUrl(imageKey);
}
