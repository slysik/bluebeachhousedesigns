/**
 * Home Page Client Components
 *
 * Client-side components with Framer Motion animations for the homepage.
 */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

const heroVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

interface Category {
	id: string;
	name: string;
	slug: string;
	image?: string;
	productCount: number;
}

interface Product {
	id: string;
	name: string;
	price: number;
	images: string[];
	available: boolean;
}

// Hero Section with animations
export function HeroSection() {
	return (
		<section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
			{/* Video Background */}
			<div className="absolute inset-0">
				<video
					autoPlay
					muted
					loop
					playsInline
					className="absolute w-full h-full object-cover"
				>
					<source src="/videos/hero-beach.mp4" type="video/mp4" />
				</video>
				<div className="absolute inset-0 bg-black/30" />
			</div>

			{/* Animated Hero Content */}
			<motion.div
				initial="hidden"
				animate="visible"
				variants={containerVariants}
				className="relative z-10 text-center text-white px-4"
			>
				<motion.span
					variants={heroVariants}
					className="accent-text text-2xl mb-4 block opacity-90"
				>
					Handcrafted in Charleston
				</motion.span>
				<motion.h1
					variants={heroVariants}
					className="text-5xl md:text-7xl font-display mb-6 text-white"
				>
					Blue Beach House
					<br />
					Designs
				</motion.h1>
				<motion.p
					variants={heroVariants}
					className="text-lg md:text-xl max-w-xl mx-auto mb-8 opacity-90"
				>
					Bespoke shell art & coastal accessories
				</motion.p>
				<motion.div variants={heroVariants}>
					<Link href="/collections" className="btn btn-primary">
						Shop the Collection
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
}

// Category Grid with stagger animation
export function CategoryGrid({ categories }: { categories: Category[] }) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-100px" }}
			variants={containerVariants}
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
		>
			{categories.map((category) => (
				<motion.div key={category.id} variants={itemVariants}>
					<Link href={`/collections/${category.slug}`} className="group block">
						<motion.div
							className="card overflow-hidden"
							whileHover={{ y: -8 }}
							transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
						>
							<div className="product-image">
								<Image
									src={category.image || "/images/placeholder.jpg"}
									alt={category.name}
									width={400}
									height={500}
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<div className="p-6">
								<h3 className="text-xl mb-2 group-hover:text-coral transition-colors">
									{category.name}
								</h3>
								<p className="text-gray text-sm">
									{category.productCount} pieces
								</p>
							</div>
						</motion.div>
					</Link>
				</motion.div>
			))}
		</motion.div>
	);
}

// Product Grid with stagger animation
export function ProductGrid({ products }: { products: Product[] }) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-100px" }}
			variants={containerVariants}
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
		>
			{products.map((product) => (
				<motion.div key={product.id} variants={itemVariants}>
					<Link href={`/products/${product.id}`} className="group block">
						<motion.div
							className="card overflow-hidden"
							whileHover={{ y: -8 }}
							transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
						>
							<div className="product-image">
								<Image
									src={product.images[0] || "/images/placeholder.jpg"}
									alt={product.name}
									width={400}
									height={500}
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<div className="p-6">
								<h4 className="text-lg mb-2 group-hover:text-coral transition-colors">
									{product.name}
								</h4>
								<p className="price price-large">${product.price}</p>
							</div>
						</motion.div>
					</Link>
				</motion.div>
			))}
		</motion.div>
	);
}

// Export a re-usable wrapper for any page
export function PageTransitionWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
		>
			{children}
		</motion.div>
	);
}
