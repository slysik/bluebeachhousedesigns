/**
 * About Page Client Component
 *
 * Client-side component with Framer Motion animations.
 */
"use client";

import { motion } from "framer-motion";

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
			staggerChildren: 0.15,
			delayChildren: 0.1,
		},
	},
};

export function AboutClient() {
	return (
		<motion.main
			initial="hidden"
			animate="visible"
			variants={staggerContainer}
			className="py-12 px-4"
		>
			<div className="container max-w-4xl">
				{/* Page Header */}
				<motion.div variants={fadeUpVariants} className="text-center mb-12">
					<span className="accent-text text-xl mb-4 block">
						From Charleston, with love
					</span>
					<h1>About the Artist</h1>
				</motion.div>

				{/* Artist Bio Section */}
				<motion.div
					variants={fadeUpVariants}
					className="grid md:grid-cols-2 gap-12 items-center mb-16"
				>
					<motion.div
						className="aspect-square relative flex items-center justify-center"
						style={{
							background: "linear-gradient(135deg, #8cb4c4 0%, #d4b896 100%)",
						}}
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.3 }}
					>
						{/* Decorative placeholder with initials */}
						<div className="text-white text-center">
							<div className="text-8xl font-display opacity-30 mb-4">TBL</div>
							<p className="text-sm opacity-60">Artist at work</p>
						</div>
					</motion.div>
					<div>
						<h2 className="text-2xl mb-6">Meet Terri Brown Lawrence</h2>
						<p className="text-gray mb-4">
							I&apos;ve been creating coastal-inspired art from my studio in
							Charleston, SC since 2014. What started as a passion for
							beachcombing has evolved into a full-time pursuit of capturing the
							beauty of our Carolina coast.
						</p>
						<p className="text-gray mb-4">
							Each piece in my collection is handcrafted using shells I&apos;ve
							personally collected from local beaches. I spend hours selecting
							just the right shells, cleaning and preparing them, and arranging
							them into compositions that celebrate the natural beauty of these
							coastal treasures.
						</p>
						<p className="accent-text text-lg mt-8">
							&quot;Every shell has a story, and I love helping them find their
							forever home.&quot;
						</p>
					</div>
				</motion.div>

				{/* Studio Section */}
				<motion.div
					variants={fadeUpVariants}
					className="bg-sand-light p-8 md:p-12 mb-16"
				>
					<h2 className="text-2xl mb-6 text-center">The Studio</h2>
					<p className="text-gray text-center max-w-2xl mx-auto">
						Located just minutes from the beach, my studio is filled with the
						treasures I&apos;ve collected over the years. The natural light and
						coastal breeze inspire every piece I create. I invite you to explore
						my collection and bring a piece of the Carolina coast into your
						home.
					</p>
				</motion.div>

				{/* Values */}
				<motion.div
					variants={staggerContainer}
					className="grid md:grid-cols-3 gap-8 text-center"
				>
					<motion.div
						variants={fadeUpVariants}
						whileHover={{ y: -8 }}
						transition={{ duration: 0.3 }}
					>
						<h3 className="text-xl mb-4">Handcrafted</h3>
						<p className="text-gray text-sm">
							Every piece is made by hand in my Charleston studio, ensuring the
							highest quality and attention to detail.
						</p>
					</motion.div>
					<motion.div
						variants={fadeUpVariants}
						whileHover={{ y: -8 }}
						transition={{ duration: 0.3 }}
					>
						<h3 className="text-xl mb-4">Locally Sourced</h3>
						<p className="text-gray text-sm">
							Shells are collected from Carolina beaches, supporting sustainable
							beachcombing practices.
						</p>
					</motion.div>
					<motion.div
						variants={fadeUpVariants}
						whileHover={{ y: -8 }}
						transition={{ duration: 0.3 }}
					>
						<h3 className="text-xl mb-4">One of a Kind</h3>
						<p className="text-gray text-sm">
							Due to the nature of natural materials, no two pieces are ever
							exactly alike.
						</p>
					</motion.div>
				</motion.div>
			</div>
		</motion.main>
	);
}
