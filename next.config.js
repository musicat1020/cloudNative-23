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
		defaultLang: process.env.LANG,
	}
}

module.exports = nextConfig