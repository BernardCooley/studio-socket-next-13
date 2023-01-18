/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: [
            "firebasestorage.googleapis.com",
            "picsum.photos",
            "s.gravatar.com",
        ],
    },
};

module.exports = nextConfig;
