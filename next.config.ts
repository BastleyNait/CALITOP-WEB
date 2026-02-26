import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: process.env.R2_PUBLIC_DOMAIN?.split('/')[0] || "**.r2.dev",
            },
            {
                protocol: "https",
                hostname: "f005.backblazeb2.com",
            },
            {
                protocol: "https",
                hostname: "aceternity.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "assets.aceternity.com",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
