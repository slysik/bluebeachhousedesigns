/**
 * Checkout API Route
 *
 * Creates a Stripe Checkout Session for the customer.
 * Uses Stripe's hosted checkout page (PCI compliant, no card handling required).
 * Supports both single-item (legacy) and multi-item cart checkout.
 */
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { checkoutSchema, type CheckoutItem } from "@/lib/validations";
import { getBaseUrl } from "@/lib/utils";
import products from "@/data/products.json";

// Build a lookup map for products
const productMap = new Map(products.map((p) => [p.id, p]));

export async function POST(request: NextRequest) {
	// Parse and validate request body
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json(
			{ error: "Invalid JSON in request body" },
			{ status: 400 },
		);
	}

	// Validate the input data
	const result = checkoutSchema.safeParse(body);
	if (!result.success) {
		return NextResponse.json(
			{ error: "Validation failed", details: result.error.flatten() },
			{ status: 400 },
		);
	}

	const { productId, quantity, items, successUrl, cancelUrl } = result.data;
	const baseUrl = getBaseUrl();

	// Build line items for Stripe
	let lineItems: Array<{
		price_data: {
			currency: string;
			product_data: {
				name: string;
				description?: string;
				images?: string[];
			};
			unit_amount: number;
		};
		quantity: number;
	}>;
	let metadata: Record<string, string>;

	// Handle multi-item cart checkout
	if (items && items.length > 0) {
		lineItems = items
			.map((item: CheckoutItem) => {
				const product = productMap.get(item.productId);
				if (!product) return null;

				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: product.name,
							description: product.description,
							images: product.images,
						},
						unit_amount: Math.round(product.price * 100), // Convert to cents
					},
					quantity: item.quantity,
				};
			})
			.filter(Boolean) as typeof lineItems;

		if (lineItems.length === 0) {
			return NextResponse.json(
				{ error: "No valid products found in cart" },
				{ status: 400 },
			);
		}

		metadata = {
			itemCount: items.length.toString(),
			items: JSON.stringify(
				items.map((i: CheckoutItem) => ({
					id: i.productId,
					qty: i.quantity,
				})),
			),
		};
	} else {
		// Legacy single-item checkout
		const product = productMap.get(productId!);
		if (!product) {
			return NextResponse.json({ error: "Product not found" }, { status: 404 });
		}

		lineItems = [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: product.name,
						description: product.description,
						images: product.images,
					},
					unit_amount: Math.round(product.price * 100),
				},
				quantity: quantity ?? 1,
			},
		];

		metadata = {
			productId: productId!,
			quantity: (quantity ?? 1).toString(),
		};
	}

	try {
		// Create Stripe Checkout Session
		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items: lineItems,
			// Collect shipping address for physical products
			shipping_address_collection: {
				allowed_countries: ["US"],
			},
			// Enable automatic tax calculation (requires Stripe Tax setup)
			// automatic_tax: { enabled: true },

			// Redirect URLs after payment
			success_url:
				successUrl ??
				`${baseUrl}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: cancelUrl ?? `${baseUrl}/cart`,

			// Collect customer email for order confirmation
			customer_creation: "always",

			// Metadata for tracking
			metadata,
		});

		// Return the checkout URL for client-side redirect
		return NextResponse.json({
			url: session.url,
			sessionId: session.id,
		});
	} catch (err) {
		console.error("Checkout error:", err);

		// Handle specific Stripe errors
		if (err instanceof Error) {
			return NextResponse.json({ error: err.message }, { status: 500 });
		}

		return NextResponse.json(
			{ error: "Failed to create checkout session" },
			{ status: 500 },
		);
	}
}
