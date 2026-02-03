/**
 * Product Page Client Component
 *
 * Client-side wrapper with Framer Motion animations.
 */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

const fadeUpVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	category: string;
	available: boolean;
}

interface ProductPageClientProps {
	product: Product;
	relatedProducts: Product[];
}

export function ProductPageClient({
	product,
	relatedProducts,
}: ProductPageClientProps) {
	return (
		<motion.main
			initial="hidden"
			animate="visible"
			variants={staggerContainer}
			className="py-12 px-4"
		>
			<div className="container">
				{/* Breadcrumb */}
				<motion.nav variants={fadeUpVariants} className="mb-8 text-sm">
					<Link href="/" className="text-gray hover:text-navy">
						Home
					</Link>
					<span className="mx-2 text-gray-light">/</span>
					<Link href="/collections" className="text-gray hover:text-navy">
						Collections
					</Link>
					<span className="mx-2 text-gray-light">/</span>
					<Link
						href={`/collections/${product.category}`}
						className="text-gray hover:text-navy capitalize"
					>
						{product.category.replace(/-/g, " ")}
					</Link>
					<span className="mx-2 text-gray-light">/</span>
					<span className="text-navy">{product.name}</span>
				</motion.nav>

				{/* Product Content */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Image Gallery */}
					<motion.div variants={fadeUpVariants} className="space-y-4">
						<motion.div
							className="aspect-[4/5] relative overflow-hidden bg-sand-light"
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.3 }}
						>
							<Image
								src={product.images[0] || "/images/placeholder.jpg"}
								alt={product.name}
								fill
								className="object-cover"
								priority
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
							{!product.available && (
								<div className="absolute top-4 left-4 bg-charcoal text-white px-3 py-1 text-sm">
									Sold Out
								</div>
							)}
						</motion.div>

						{/* Thumbnail gallery if multiple images */}
						{product.images.length > 1 && (
							<div className="grid grid-cols-4 gap-2">
								{product.images.map((image, index) => (
									<motion.div
										key={index}
										className="aspect-square relative overflow-hidden bg-sand-light cursor-pointer"
										whileHover={{ scale: 1.05 }}
										transition={{ duration: 0.2 }}
									>
										<Image
											src={image}
											alt={`${product.name} - Image ${index + 1}`}
											fill
											className="object-cover"
											sizes="(max-width: 1024px) 25vw, 12vw"
										/>
									</motion.div>
								))}
							</div>
						)}
					</motion.div>

					{/* Product Info */}
					<motion.div
						variants={fadeUpVariants}
						className="lg:sticky lg:top-24 lg:self-start"
					>
						<span className="text-sm text-gray uppercase tracking-wider">
							{product.category.replace(/-/g, " ")}
						</span>

						<h1 className="text-3xl md:text-4xl mt-2 mb-4">{product.name}</h1>

						<p className="price price-large mb-6">${product.price}</p>

						<div className="mb-8">
							<p className="text-gray leading-relaxed">{product.description}</p>
						</div>

						{/* Add to Cart */}
						{product.available ? (
							<AddToCartButton
								productId={product.id}
								productName={product.name}
								price={product.price}
								image={product.images[0] || "/images/placeholder.jpg"}
							/>
						) : (
							<button
								disabled
								className="w-full py-4 px-8 bg-gray-light text-white cursor-not-allowed"
							>
								Sold Out
							</button>
						)}

						{/* Shipping Info */}
						<div className="mt-8 pt-8 border-t border-sand">
							<h3 className="text-sm font-medium mb-2">Shipping</h3>
							<p className="text-sm text-gray">
								Free shipping on orders over $200. Standard delivery within 5-7
								business days.
							</p>
						</div>

						{/* Returns */}
						<div className="mt-4">
							<h3 className="text-sm font-medium mb-2">Returns</h3>
							<p className="text-sm text-gray">
								All art sales are final. Please contact us with any questions
								before purchasing.
							</p>
						</div>
					</motion.div>
				</div>

				{/* Related Products */}
				{relatedProducts.length > 0 && (
					<motion.section
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
						className="mt-20 pt-12 border-t border-sand"
					>
						<motion.h2 variants={fadeUpVariants} className="text-2xl mb-8">
							You May Also Like
						</motion.h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{relatedProducts.map((related) => (
								<motion.div key={related.id} variants={fadeUpVariants}>
									<Link
										href={`/products/${related.id}`}
										className="group block"
									>
										<motion.div
											className="card overflow-hidden"
											whileHover={{ y: -8 }}
											transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
										>
											<div className="aspect-[4/5] relative overflow-hidden">
												<Image
													src={related.images[0] || "/images/placeholder.jpg"}
													alt={related.name}
													fill
													className="object-cover transition-transform duration-500 group-hover:scale-105"
													sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
												/>
											</div>
											<div className="p-4">
												<h3 className="text-sm mb-1 group-hover:text-coral transition-colors line-clamp-2">
													{related.name}
												</h3>
												<p className="price">${related.price}</p>
											</div>
										</motion.div>
									</Link>
								</motion.div>
							))}
						</div>
					</motion.section>
				)}
			</div>
		</motion.main>
	);
}
