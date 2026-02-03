/**
 * Collections Client Component
 *
 * Client-side component with Framer Motion animations for collections page.
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
			staggerChildren: 0.15,
			delayChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

interface Category {
	id: string;
	name: string;
	slug: string;
	description?: string;
	image?: string;
	productCount: number;
}

export function CollectionsClient({ categories }: { categories: Category[] }) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className="grid grid-cols-1 md:grid-cols-2 gap-8"
		>
			{categories.map((category) => (
				<motion.div key={category.id} variants={itemVariants}>
					<Link href={`/collections/${category.slug}`} className="group block">
						<motion.div
							className="card overflow-hidden"
							whileHover={{ y: -8 }}
							transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
						>
							<div className="aspect-[4/3] overflow-hidden">
								<Image
									src={category.image || "/images/placeholder.jpg"}
									alt={category.name}
									width={600}
									height={450}
									className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<div className="p-8">
								<h2 className="text-2xl mb-2 group-hover:text-coral transition-colors">
									{category.name}
								</h2>
								<p className="text-gray mb-4">{category.description}</p>
								<span className="text-sm text-charcoal">
									{category.productCount} pieces &rarr;
								</span>
							</div>
						</motion.div>
					</Link>
				</motion.div>
			))}
		</motion.div>
	);
}
