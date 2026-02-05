import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, R2_BUCKET_NAME, getPublicUrl } from "@/lib/s3-client";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid file type: ${file.type}. Allowed: ${allowedTypes.join(", ")}`,
                },
                { status: 400 }
            );
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                {
                    success: false,
                    error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Max: 10MB`,
                },
                { status: 400 }
            );
        }

        // Generate unique key for the file
        const extension = file.name.split(".").pop() || "jpg";
        const uniqueId = randomUUID();
        const timestamp = Date.now();
        const imageKey = `products/${timestamp}-${uniqueId}.${extension}`;

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log(`[Server Upload] Starting upload: ${imageKey} (${(file.size / 1024).toFixed(2)} KB)`);

        // Upload to S3/B2
        const command = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: imageKey,
            Body: buffer,
            ContentType: file.type,
            // Add metadata for better tracking
            Metadata: {
                originalName: file.name,
                uploadedAt: new Date().toISOString(),
            },
        });

        await s3Client.send(command);

        const publicUrl = getPublicUrl(imageKey);

        console.log(`[Server Upload] Success: ${publicUrl}`);

        return NextResponse.json({
            success: true,
            imageKey,
            publicUrl,
        });
    } catch (error) {
        console.error("[Server Upload Error]", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Upload failed",
            },
            { status: 500 }
        );
    }
}
