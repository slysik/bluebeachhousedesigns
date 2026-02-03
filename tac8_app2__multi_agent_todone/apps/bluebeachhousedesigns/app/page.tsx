/**
 * Homepage for Blue Beach House Designs
 *
 * Features:
 * - Hero section with beach imagery and animations
 * - Category navigation with stagger animations
 * - Featured products grid with hover effects
 * - Newsletter signup
 */
import Link from "next/link";
import categories from "@/data/categories.json";
import products from "@/data/products.json";
import {
	AnimatedBeachHero,
	CategoryGrid,
	ProductGrid,
} from "@/components/home";

export default function HomePage() {
	// Get featured products (first 4 available)
	const featuredProducts = products.filter((p) => p.available).slice(0, 4);

	return (
		<main>
			{/* Animated Beach Hero with Wave Motion */}
			<AnimatedBeachHero />

			{/* Category Navigation with Stagger Animation */}
			<section className="py-20 px-4">
				<div className="container">
					<h2 className="text-center mb-12 text-balance">
						Explore Our Collections
					</h2>
					<CategoryGrid categories={categories} />
				</div>
			</section>

			{/* Featured Products with Stagger Animation */}
			<section className="py-20 px-4 bg-sand-light">
				<div className="container">
					<div className="flex justify-between items-center mb-12">
						<h2>Featured Pieces</h2>
						<Link href="/collections" className="btn btn-secondary text-sm">
							View All
						</Link>
					</div>
					<ProductGrid products={featuredProducts} />
				</div>
			</section>

			{/* About Preview */}
			<section className="py-20 px-4">
				<div className="container max-w-4xl text-center">
					<span className="accent-text text-xl mb-4 block">
						From the Artist
					</span>
					<h2 className="mb-8">Meet Terri Brown Lawrence</h2>
					<p className="text-lg text-gray mb-8 max-w-2xl mx-auto">
						Creating coastal-inspired art from my studio in Charleston, SC since
						2014. Each piece is handcrafted with locally sourced shells,
						bringing the beauty of our beaches into your home.
					</p>
					<Link href="/about" className="btn btn-secondary">
						Read My Story
					</Link>
				</div>
			</section>

			{/* Newsletter Signup */}
			<section className="py-20 px-4 bg-navy text-white">
				<div className="container max-w-xl text-center">
					<h2 className="text-white mb-4">Stay Connected</h2>
					<p className="opacity-80 mb-8">
						Be the first to know about new pieces and studio updates.
					</p>
					<form className="flex flex-col sm:flex-row gap-4">
						<input
							type="email"
							placeholder="Your email address"
							className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-seafoam"
							required
						/>
						<button type="submit" className="btn btn-primary whitespace-nowrap">
							Subscribe
						</button>
					</form>
				</div>
			</section>
		</main>
	);
}
