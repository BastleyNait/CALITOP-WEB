"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { getPresignedUploadUrl } from "@/actions/storage";
import { getPublicUrl } from "@/lib/storage-utils";

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
                // 1. Image Optimization (Client-Side)
                // This ensures fast performance and better SEO (WebP format)
                console.log(`[Optimization] Original: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);

                const options = {
                    maxSizeMB: 1,            // Max 1MB for optimal performance
                    maxWidthOrHeight: 1920, // Max Full HD resolution
                    useWebWorker: true,
                    fileType: 'image/webp' as const // Convert to WebP format for modern web
                };

                setUploadProgress(5); // Start progress
                const compressedBlob = await imageCompression(file, options);

                // Convert Blob back to File with .webp extension
                const optimizedFile = new File(
                    [compressedBlob],
                    file.name.replace(/\.[^/.]+$/, "") + ".webp",
                    { type: 'image/webp' }
                );

                console.log(`[Optimization] Optimized: ${optimizedFile.name} (${(optimizedFile.size / 1024).toFixed(2)} KB)`);
                setUploadProgress(15);

                // Validation
                if (optimizedFile.size > 10 * 1024 * 1024) {
                    throw new Error("El archivo optimizado sigue siendo mayor a 10MB");
                }

                // Create local preview
                const localPreview = URL.createObjectURL(optimizedFile);
                setPreviewUrl(localPreview);
                setUploadProgress(25);

                // 2. Get presigned URL from server
                const result = await getPresignedUploadUrl(optimizedFile.name, optimizedFile.type);
                if (!result.success || !result.uploadUrl || !result.imageKey) {
                    throw new Error(result.error || "Error al obtener la URL de subida");
                }

                console.log(`[Upload] Prepared URL: ${result.uploadUrl.split('?')[0]}...`);
                setUploadProgress(40);

                // 3. Upload file directly to Bucket
                const uploadResponse = await fetch(result.uploadUrl, {
                    method: "PUT",
                    body: optimizedFile,
                    headers: {
                        "Content-Type": optimizedFile.type,
                    },
                });

                if (!uploadResponse.ok) {
                    throw new Error("Error al subir el archivo al almacenamiento");
                }
                setUploadProgress(90);

                // Clean up local preview and use the actual URL
                URL.revokeObjectURL(localPreview);
                const finalUrl = result.publicUrl || "";

                // Connection Check Log
                console.log(`[Bucket Connection] Success! Image available at: ${finalUrl}`);

                setPreviewUrl(finalUrl);
                setUploadProgress(100);

                // Notify parent component
                onUploadComplete(finalUrl);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Error en la subida";
                console.error("[Upload Error Detail]", {
                    message: errorMessage,
                    error: err,
                    timestamp: new Date().toISOString(),
                    browser: navigator.userAgent
                });

                if (errorMessage === "Failed to fetch") {
                    setError("Error de conexión: Posible bloqueo por extensión (AdBlock) o configuración CORS en Backblaze.");
                } else {
                    setError(errorMessage);
                }

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
                Imagen del Producto
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
                                Cambiar
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="px-4 py-2 bg-red-500/80 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-red-500 transition-colors"
                            >
                                Eliminar
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
                            {isDragOver ? "Suelta la imagen aquí" : "Haz clic o arrastra una imagen para subir"}
                        </p>
                        <p className="text-slate-500 text-sm">
                            PNG, JPG, WebP hasta 10MB (Auto-optimización WebP)
                        </p>
                    </div>
                )}

                {/* Upload Progress Overlay */}
                {isUploading && (
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center">
                        <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
                            <div
                                className="h-full bg-gradient-to-r from-orange-500 to-orange-700 transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <p className="text-slate-300 text-sm">
                            Optimizando y subiendo... {uploadProgress}%
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
