/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        LANDING_URL: process.env.LANDING_URL,
        APP_URL: process.env.APP_URL,
        API_URL: process.env.API_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
    },
    images: {
        domains: ['api.promall.org'],
    },
};

export default nextConfig;