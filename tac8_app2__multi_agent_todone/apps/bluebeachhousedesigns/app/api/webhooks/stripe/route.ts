/**
 * Stripe Webhook Handler
 *
 * SECURITY CRITICAL: This endpoint receives payment events from Stripe.
 * We MUST verify the webhook signature to prevent payment fraud.
 *
 * Webhook events include:
 * - checkout.session.completed: Customer completed payment
 * - checkout.session.expired: Session expired without payment
 * - payment_intent.succeeded: Payment was successful
 * - payment_intent.payment_failed: Payment failed
 */
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe, getWebhookSecret } from "@/lib/stripe";

export async function POST(request: Request) {
	// Get the raw body for signature verification
	const body = await request.text();

	// Get the Stripe signature from headers
	const headersList = await headers();
	const signature = headersList.get("stripe-signature");

	if (!signature) {
		console.error("Webhook Error: Missing stripe-signature header");
		return NextResponse.json({ error: "Missing signature" }, { status: 400 });
	}

	let event: Stripe.Event;

	try {
		// CRITICAL: Verify the webhook signature
		// This ensures the request actually came from Stripe
		event = stripe.webhooks.constructEvent(body, signature, getWebhookSecret());
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		console.error(`Webhook signature verification failed: ${message}`);
		return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
	}

	// Handle the verified event
	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object as Stripe.Checkout.Session;
				await handleCheckoutComplete(session);
				break;
			}

			case "checkout.session.expired": {
				const session = event.data.object as Stripe.Checkout.Session;
				console.log(`Checkout session expired: ${session.id}`);
				// Could send abandoned cart email here
				break;
			}

			case "payment_intent.succeeded": {
				const paymentIntent = event.data.object as Stripe.PaymentIntent;
				console.log(`Payment succeeded: ${paymentIntent.id}`);
				break;
			}

			case "payment_intent.payment_failed": {
				const paymentIntent = event.data.object as Stripe.PaymentIntent;
				console.error(`Payment failed: ${paymentIntent.id}`);
				// Could notify customer or admin here
				break;
			}

			default:
				console.log(`Unhandled event type: ${event.type}`);
		}

		// Return 200 to acknowledge receipt
		return NextResponse.json({ received: true }, { status: 200 });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		console.error(`Error processing webhook: ${message}`);
		// Return 500 so Stripe will retry
		return NextResponse.json({ error: "Processing error" }, { status: 500 });
	}
}

/**
 * Handle successful checkout completion
 * This is where you'd:
 * - Send order confirmation email
 * - Update inventory
 * - Create order record
 */
async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
	console.log("Checkout completed:", {
		sessionId: session.id,
		customerEmail: session.customer_email,
		amountTotal: session.amount_total,
		paymentStatus: session.payment_status,
	});

	// TODO: Send confirmation email via Resend
	// TODO: Log order for analytics
	// For now, just log the successful order
}

// Disable body parsing - we need raw body for signature verification
export const runtime = "edge";
