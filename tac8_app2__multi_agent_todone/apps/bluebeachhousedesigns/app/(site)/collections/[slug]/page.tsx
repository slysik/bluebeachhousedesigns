/**
 * Collection Detail Page
 *
 * Displays products filtered by category slug.
 * Uses Framer Motion for stagger and hover animations.
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import products from "@/data/products.json";
import categories from "@/data/categories.json";
import { CollectionProductsClient } from "./CollectionProductsClient";

interface CollectionPageProps {
	params: Promise<{ slug: string }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
	return categories.map((category) => ({
		slug: category.slug,
	}));
}

// Generate metadata for SEO
export async function generateMetadata({
	params,
}: CollectionPageProps): Promise<Metadata> {
	const { slug } = await params;
	const category = categories.find((c) => c.slug === slug);

	if (!category) {
		return {
			title: "Collection Not Found",
		};
	}

	return {
		title: `${category.name} | Blue Beach House Designs`,
		description: category.description,
	};
}

export default async function CollectionPage({ params }: CollectionPageProps) {
	const { slug } = await params;
	const category = categories.find((c) => c.slug === slug);

	if (!category) {
		notFound();
	}

	// Filter products by category
	const categoryProducts = products.filter((p) => p.category === slug);

	return (
		<main className="py-12 px-4">
			<div className="container">
				{/* Breadcrumb */}
				<nav className="mb-8 text-sm">
					<Link href="/" className="text-gray hover:text-navy">
						Home
					</Link>
					<span className="mx-2 text-gray-light">/</span>
					<Link href="/collections" className="text-gray hover:text-navy">
						Collections
					</Link>
					<span className="mx-2 text-gray-light">/</span>
					<span className="text-navy">{category.name}</span>
				</nav>

				{/* Page Header */}
				<div className="text-center mb-12">
					<h1 className="mb-4">{category.name}</h1>
					{category.description && (
						<p className="text-gray max-w-xl mx-auto">{category.description}</p>
					)}
					<p className="text-sm text-gray-light mt-4">
						{categoryProducts.length} piece
						{categoryProducts.length !== 1 ? "s" : ""}
					</p>
				</div>

				{/* Products Grid with Animations */}
				<CollectionProductsClient products={categoryProducts} />

				{/* Back to Collections */}
				<div className="mt-12 text-center">
					<Link href="/collections" className="btn btn-secondary">
						View All Collections
					</Link>
				</div>
			</div>
		</main>
	);
}
