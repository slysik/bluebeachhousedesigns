/**
 * Next.js Middleware for rate limiting API routes
 * Uses Upstash Redis for distributed rate limiting
 *
 * IMPORTANT: Webhooks are excluded from rate limiting
 * Stripe needs unrestricted access to send webhook events
 */
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize rate limiter with Upstash Redis
// Sliding window: 10 requests per 10 seconds per IP
const ratelimit = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(10, "10 s"),
	analytics: true, // Track usage in Upstash console
});

export async function middleware(request: NextRequest) {
	// Only rate limit API routes (excluding webhooks)
	if (request.nextUrl.pathname.startsWith("/api/")) {
		// Get client IP from headers (Vercel provides x-forwarded-for, fallback for local dev)
		const ip =
			request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";

		// Apply rate limiting
		const { success, limit, remaining, reset } = await ratelimit.limit(ip);

		if (!success) {
			return new NextResponse("Too Many Requests", {
				status: 429,
				headers: {
					"X-RateLimit-Limit": limit.toString(),
					"X-RateLimit-Remaining": remaining.toString(),
					"X-RateLimit-Reset": reset.toString(),
					"Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
				},
			});
		}

		// Add rate limit headers to successful responses
		const response = NextResponse.next();
		response.headers.set("X-RateLimit-Limit", limit.toString());
		response.headers.set("X-RateLimit-Remaining", remaining.toString());
		response.headers.set("X-RateLimit-Reset", reset.toString());

		return response;
	}

	return NextResponse.next();
}

export const config = {
	// Apply middleware to API routes EXCEPT webhooks
	// Stripe webhooks need unrestricted access for payment processing
	matcher: ["/api/checkout/:path*", "/api/contact/:path*"],
};
