/** @type {import('next').NextConfig} */
const nextConfig = {
	// Security headers
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"font-src 'self' https://fonts.gstatic.com",
							"img-src 'self' data: https: blob:",
							"connect-src 'self' https://api.stripe.com https://*.upstash.io",
							"frame-src https://js.stripe.com https://hooks.stripe.com",
						].join("; "),
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
		];
	},
	// Image optimization
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "bluebeachhousedesigns.com",
			},
			{
				protocol: "https",
				hostname: "cdn.shopify.com",
			},
		],
		// Support HEIC images from Shopify CDN
		dangerouslyAllowSVG: true,
		contentDispositionType: "attachment",
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
};

module.exports = nextConfig;
