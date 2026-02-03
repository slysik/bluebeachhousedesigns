/**
 * Collections Page
 *
 * Lists all product categories with images and product counts.
 * Features staggered animations using Framer Motion.
 */
import type { Metadata } from "next";
import categories from "@/data/categories.json";
import { CollectionsClient } from "./CollectionsClient";

export const metadata: Metadata = {
	title: "Collections",
	description: "Browse our handcrafted coastal shell art collections.",
};

export default function CollectionsPage() {
	return (
		<main className="py-12 px-4">
			<div className="container">
				{/* Page Header */}
				<div className="text-center mb-12">
					<h1 className="mb-4">Our Collections</h1>
					<p className="text-gray max-w-xl mx-auto">
						Explore our handcrafted coastal pieces, each made with locally
						sourced shells from the Carolina coast.
					</p>
				</div>

				{/* Animated Categories Grid */}
				<CollectionsClient categories={categories} />
			</div>
		</main>
	);
}
