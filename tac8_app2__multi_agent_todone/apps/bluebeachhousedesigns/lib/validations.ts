/**
 * Zod validation schemas for API routes
 * Used for runtime validation of incoming data
 */
import { z } from "zod";

/**
 * Contact form validation schema
 * - name: 2-100 chars, prevents empty or excessively long names
 * - email: Must be valid email format
 * - phone: Optional, for callback requests
 * - message: 10-2000 chars, ensures meaningful content
 * - honeypot: Must be empty (bot trap)
 */
export const contactSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(100, "Name must be less than 100 characters")
		.trim(),
	email: z
		.string()
		.email("Please enter a valid email address")
		.toLowerCase()
		.trim(),
	phone: z
		.string()
		.max(20, "Phone number is too long")
		.optional()
		.transform((val) => val?.trim() || undefined),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(2000, "Message must be less than 2000 characters")
		.trim(),
	// Honeypot field - should always be empty (bots fill this)
	honeypot: z.string().max(0, "Invalid submission").optional().default(""),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Single item checkout schema (legacy, for single product purchases)
 */
export const checkoutItemSchema = z.object({
	productId: z.string().min(1, "Product ID is required"),
	quantity: z
		.number()
		.int()
		.min(1, "Quantity must be at least 1")
		.max(10, "Maximum 10 items per product")
		.default(1),
});

/**
 * Checkout request validation schema
 * Supports both single item (legacy) and multi-item cart checkout
 */
export const checkoutSchema = z
	.object({
		// Single item checkout (legacy)
		productId: z.string().min(1).optional(),
		quantity: z.number().int().min(1).max(10).optional(),
		// Multi-item cart checkout
		items: z.array(checkoutItemSchema).optional(),
		// Common fields
		successUrl: z.string().url().optional(),
		cancelUrl: z.string().url().optional(),
	})
	.refine(
		(data) => {
			// Either single item OR items array must be provided
			const hasSingleItem = data.productId !== undefined;
			const hasItems = data.items !== undefined && data.items.length > 0;
			return hasSingleItem || hasItems;
		},
		{ message: "Either productId or items array is required" },
	);

export type CheckoutData = z.infer<typeof checkoutSchema>;
export type CheckoutItem = z.infer<typeof checkoutItemSchema>;

/**
 * Product type for internal use
 */
export const productSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	price: z.number().positive(),
	images: z.array(z.string().url()),
	category: z.string(),
	available: z.boolean(),
	stripeProductId: z.string().optional(),
	stripePriceId: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;

/**
 * Category type
 */
export const categorySchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	description: z.string().optional(),
	image: z.string().url().optional(),
	productCount: z.number().int().nonnegative(),
});

export type Category = z.infer<typeof categorySchema>;
