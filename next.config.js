const withPWA = require("next-pwa")({
	dest: "public",
	//disable: process.env.NODE_ENV === "development",
	register: true,
	skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		LANDING_URL: process.env.LANDING_URL,
		APP_URL: process.env.APP_URL,
		API_URL: process.env.API_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	},
	images: {
		domains: ['api.promall.org'],
	},
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = withPWA(nextConfig);
