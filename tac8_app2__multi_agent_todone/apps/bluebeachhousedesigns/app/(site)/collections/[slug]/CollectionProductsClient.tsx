/**
 * Collection Products Client Component
 *
 * Client-side product grid with Framer Motion stagger and hover animations.
 */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
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

interface Product {
	id: string;
	name: string;
	price: number;
	images: string[];
	available: boolean;
}

export function CollectionProductsClient({
	products,
}: {
	products: Product[];
}) {
	if (products.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center py-12"
			>
				<p className="text-gray">
					No products currently available in this collection.
				</p>
				<Link href="/collections" className="btn btn-secondary mt-4">
					View All Collections
				</Link>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
		>
			{products.map((product) => (
				<motion.div key={product.id} variants={itemVariants}>
					<Link href={`/products/${product.id}`} className="group block">
						<motion.div
							className="card overflow-hidden"
							whileHover={{ y: -8 }}
							transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
						>
							<div className="aspect-[4/5] relative overflow-hidden">
								<Image
									src={product.images[0] || "/images/placeholder.jpg"}
									alt={product.name}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
								/>
								{!product.available && (
									<div className="absolute top-4 left-4 bg-charcoal text-white px-3 py-1 text-sm">
										Sold Out
									</div>
								)}
							</div>
							<div className="p-6">
								<h3 className="text-lg mb-2 group-hover:text-coral transition-colors line-clamp-2">
									{product.name}
								</h3>
								<p className="price price-large">${product.price}</p>
							</div>
						</motion.div>
					</Link>
				</motion.div>
			))}
		</motion.div>
	);
}
