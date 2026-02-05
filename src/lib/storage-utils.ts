/**
 * Constructs the public URL for an image stored in the S3 bucket.
 * This function is safe to use in both Client and Server components.
 * @param imageKey - The key/path of the image in the bucket
 * @returns The full public URL to access the image
 */
export function getPublicUrl(imageKey: string | null | undefined): string {
    if (!imageKey) return "";

    // If it's already a full URL (starts with http or https), return it as is
    if (imageKey.startsWith("http://") || imageKey.startsWith("https://")) {
        return imageKey;
    }

    const publicDomain = process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN || process.env.R2_PUBLIC_DOMAIN;

    if (!publicDomain) {
        // Only warn on server to avoid cluttering client console
        if (typeof window === 'undefined') {
            console.warn("R2_PUBLIC_DOMAIN is not configured");
        }
        return "";
    }

    // Ensure no double slashes
    const cleanKey = imageKey.startsWith("/") ? imageKey.slice(1) : imageKey;

    // For Backblaze B2, the domain might already include /file/BUCKET, so check for that
    const domainHasPath = publicDomain.includes('/file/');

    if (domainHasPath) {
        // Domain is like: f005.backblazeb2.com/file/CALITOP
        return `https://${publicDomain}/${cleanKey}`;
    } else {
        // Standard R2 or custom domain
        return `https://${publicDomain}/${cleanKey}`;
    }
}
