/**
 * Product Detail Page
 *
 * Displays a single product with:
 * - Large product image gallery with hover animations
 * - Product name, price, description
 * - Add to cart functionality
 * - Related products with stagger animations
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import products from "@/data/products.json";
import { ProductPageClient } from "./ProductPageClient";

interface ProductPageProps {
	params: Promise<{ id: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
	return products.map((product) => ({
		id: product.id,
	}));
}

// Generate metadata for SEO
export async function generateMetadata({
	params,
}: ProductPageProps): Promise<Metadata> {
	const { id } = await params;
	const product = products.find((p) => p.id === id);

	if (!product) {
		return {
			title: "Product Not Found",
		};
	}

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: product.name,
			description: product.description,
			images: product.images[0] ? [product.images[0]] : [],
		},
	};
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;
	const product = products.find((p) => p.id === id);

	if (!product) {
		notFound();
	}

	// Get related products (same category, exclude current)
	const relatedProducts = products
		.filter((p) => p.category === product.category && p.id !== product.id)
		.slice(0, 4);

	return (
		<ProductPageClient product={product} relatedProducts={relatedProducts} />
	);
}
