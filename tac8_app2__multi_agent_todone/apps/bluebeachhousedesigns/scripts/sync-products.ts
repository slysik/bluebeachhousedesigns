/**
 * Product Sync Script
 *
 * Syncs products from Stripe to local JSON files.
 * Run with: npm run sync-products
 *
 * This script:
 * 1. Fetches all active products from Stripe
 * 2. Fetches prices for each product
 * 3. Writes to data/products.json
 * 4. Updates data/categories.json
 */
import Stripe from "stripe";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// Initialize Stripe with API key from environment
if (!process.env.STRIPE_SECRET_KEY) {
	console.error("Error: STRIPE_SECRET_KEY environment variable is required");
	process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2025-02-24.acacia",
});

interface LocalProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	category: string;
	available: boolean;
	stripeProductId: string;
	stripePriceId: string;
}

interface Category {
	id: string;
	name: string;
	slug: string;
	description?: string;
	productCount: number;
}

async function syncProducts() {
	console.log("Starting product sync from Stripe...\n");

	try {
		// Fetch all active products from Stripe
		const products = await stripe.products.list({
			active: true,
			limit: 100, // Adjust if you have more products
			expand: ["data.default_price"],
		});

		console.log(`Found ${products.data.length} products in Stripe\n`);

		// Transform to local product format
		const localProducts: LocalProduct[] = [];
		const categoryMap = new Map<string, Category>();

		for (const product of products.data) {
			// Get the default price
			const defaultPrice = product.default_price as Stripe.Price | null;

			if (!defaultPrice || typeof defaultPrice.unit_amount !== "number") {
				console.warn(`Skipping ${product.name}: No valid price found`);
				continue;
			}

			// Extract category from metadata or default to 'uncategorized'
			const category = product.metadata?.category || "uncategorized";
			const categorySlug = category.toLowerCase().replace(/\s+/g, "-");

			// Build local product
			const localProduct: LocalProduct = {
				id: product.id.replace("prod_", ""), // Short ID for URLs
				name: product.name,
				description: product.description || "",
				price: defaultPrice.unit_amount / 100, // Convert cents to dollars
				images: product.images,
				category: categorySlug,
				available: product.active,
				stripeProductId: product.id,
				stripePriceId: defaultPrice.id,
			};

			localProducts.push(localProduct);

			// Track category
			if (!categoryMap.has(categorySlug)) {
				categoryMap.set(categorySlug, {
					id: categorySlug,
					name: category,
					slug: categorySlug,
					description: product.metadata?.categoryDescription,
					productCount: 0,
				});
			}
			const cat = categoryMap.get(categorySlug)!;
			cat.productCount++;
		}

		// Sort products by category then name
		localProducts.sort((a, b) => {
			if (a.category !== b.category) {
				return a.category.localeCompare(b.category);
			}
			return a.name.localeCompare(b.name);
		});

		// Prepare categories array
		const categories = Array.from(categoryMap.values()).sort((a, b) =>
			a.name.localeCompare(b.name),
		);

		// Ensure data directory exists
		const dataDir = join(process.cwd(), "data");
		mkdirSync(dataDir, { recursive: true });

		// Write products.json
		const productsPath = join(dataDir, "products.json");
		writeFileSync(productsPath, JSON.stringify(localProducts, null, 2));
		console.log(`Wrote ${localProducts.length} products to ${productsPath}`);

		// Write categories.json
		const categoriesPath = join(dataDir, "categories.json");
		writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
		console.log(`Wrote ${categories.length} categories to ${categoriesPath}`);

		// Summary
		console.log("\n--- Sync Complete ---");
		console.log(`Products: ${localProducts.length}`);
		console.log(`Categories: ${categories.length}`);
		categories.forEach((cat) => {
			console.log(`  - ${cat.name}: ${cat.productCount} products`);
		});
	} catch (error) {
		console.error("Error syncing products:", error);
		process.exit(1);
	}
}

// Run the sync
syncProducts();
