"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { getPresignedUploadUrl } from "@/actions/storage";
import { getPublicUrl } from "@/lib/s3-client";

interface ImageUploadProps {
    currentImageKey?: string | null;
    onUploadComplete: (imageKey: string) => void;
    onUploadError?: (error: string) => void;
}

export function ImageUpload({
    currentImageKey,
    onUploadComplete,
    onUploadError,
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        currentImageKey ? getPublicUrl(currentImageKey) : null
    );
    const [error, setError] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = useCallback(
        async (file: File) => {
            setError(null);
            setIsUploading(true);
            setUploadProgress(0);

            try {
                // Validate file size (max 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    throw new Error("File size must be less than 10MB");
                }

                // Create local preview
                const localPreview = URL.createObjectURL(file);
                setPreviewUrl(localPreview);
                setUploadProgress(10);

                // Get presigned URL from server
                const result = await getPresignedUploadUrl(file.name, file.type);
                if (!result.success || !result.uploadUrl || !result.imageKey) {
                    throw new Error(result.error || "Failed to get upload URL");
                }
                setUploadProgress(30);

                // Upload file directly to S3/R2
                const uploadResponse = await fetch(result.uploadUrl, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type,
                    },
                });

                if (!uploadResponse.ok) {
                    throw new Error("Failed to upload file to storage");
                }
                setUploadProgress(90);

                // Clean up local preview and use the actual URL
                URL.revokeObjectURL(localPreview);
                setPreviewUrl(result.publicUrl || null);
                setUploadProgress(100);

                // Notify parent component
                onUploadComplete(result.imageKey);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Upload failed";
                setError(errorMessage);
                onUploadError?.(errorMessage);
                setPreviewUrl(currentImageKey ? getPublicUrl(currentImageKey) : null);
            } finally {
                setIsUploading(false);
                setUploadProgress(0);
            }
        },
        [currentImageKey, onUploadComplete, onUploadError]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith("image/")) {
                handleUpload(file);
            } else {
                setError("Please drop an image file");
            }
        },
        [handleUpload]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleFileSelect = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                handleUpload(file);
            }
        },
        [handleUpload]
    );

    const handleRemove = useCallback(() => {
        setPreviewUrl(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        onUploadComplete("");
    }, [onUploadComplete]);

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">
                Product Image
            </label>

            {/* Upload Area */}
            <div
                className={`
          relative border-2 border-dashed rounded-xl transition-all duration-200 overflow-hidden
          ${isDragOver
                        ? "border-primary-500 bg-primary-500/10"
                        : error
                            ? "border-red-500/50 bg-red-500/5"
                            : "border-slate-600 hover:border-slate-500 bg-slate-800/50"
                    }
        `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {previewUrl ? (
                    /* Image Preview */
                    <div className="relative aspect-video">
                        <Image
                            src={previewUrl}
                            alt="Product preview"
                            fill
                            className="object-cover"
                            unoptimized // For external URLs
                        />
                        {/* Overlay with remove button */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors"
                            >
                                Change
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="px-4 py-2 bg-red-500/80 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-red-500 transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Upload Prompt */
                    <div
                        className="p-8 text-center cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-slate-700/50 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <p className="text-slate-300 font-medium mb-1">
                            {isDragOver ? "Drop image here" : "Click or drag image to upload"}
                        </p>
                        <p className="text-slate-500 text-sm">
                            PNG, JPG, WebP up to 10MB
                        </p>
                    </div>
                )}

                {/* Upload Progress Overlay */}
                {isUploading && (
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center">
                        <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
                            <div
                                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <p className="text-slate-300 text-sm">
                            Uploading... {uploadProgress}%
                        </p>
                    </div>
                )}
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* Error Message */}
            {error && (
                <p className="text-red-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}
