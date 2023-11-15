/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	publicRuntimeConfig: {
		apiRoot: process.env.API_ROOT,
		frontendRoot: process.env.FRONTEND_ROOT,
		accessTokenMaxAge: process.env.ACCESS_TOKEN_MAX_AGE,
		refreshTokenMaxAge: process.env.REFRESH_TOKEN_MAX_AGE,
		timeZone: process.env.TIMEZONE,
	},
	images: {
		domains: ["rent.pe.ntu.edu.tw", "lh3.googleusercontent.com"],

	},
};

module.exports = nextConfig;

module.exports = nextConfig;
