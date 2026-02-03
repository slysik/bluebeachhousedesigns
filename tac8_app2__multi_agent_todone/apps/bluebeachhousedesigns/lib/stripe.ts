/**
 * Stripe client configuration
 * Pinned API version for stability and predictable behavior
 * Uses lazy initialization to allow builds without env vars
 */
import Stripe from "stripe";

let _stripe: Stripe | null = null;

/**
 * Get the Stripe client (lazy initialization)
 * Throws if STRIPE_SECRET_KEY is not defined
 */
export function getStripe(): Stripe {
	if (!_stripe) {
		const secretKey = process.env.STRIPE_SECRET_KEY;
		if (!secretKey) {
			throw new Error(
				"STRIPE_SECRET_KEY is not defined in environment variables",
			);
		}
		_stripe = new Stripe(secretKey, {
			// Pin API version for stability - update this intentionally
			apiVersion: "2025-02-24.acacia",
			typescript: true,
		});
	}
	return _stripe;
}

/**
 * Alias for backward compatibility
 * @deprecated Use getStripe() instead
 */
export const stripe = {
	get checkout() {
		return getStripe().checkout;
	},
	get products() {
		return getStripe().products;
	},
	get prices() {
		return getStripe().prices;
	},
	get customers() {
		return getStripe().customers;
	},
	get webhooks() {
		return getStripe().webhooks;
	},
};

/**
 * Get the webhook secret for signature verification
 */
export function getWebhookSecret(): string {
	const secret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!secret) {
		throw new Error(
			"STRIPE_WEBHOOK_SECRET is not defined in environment variables",
		);
	}
	return secret;
}
