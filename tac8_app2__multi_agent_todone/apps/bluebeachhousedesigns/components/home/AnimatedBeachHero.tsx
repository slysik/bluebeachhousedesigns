/**
 * Animated Beach Hero Component
 *
 * Features:
 * - Sky gradient background
 * - Multiple layered SVG wave animations
 * - Logo centered above waves (using the exact PNG logo from the live site)
 * - Framer Motion animations for entrance
 */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

// Wave layer component with animation
interface WaveLayerProps {
	color: string;
	duration: number;
	delay?: number;
	className?: string;
	path?: string;
}

function WaveLayer({
	color,
	duration,
	delay = 0,
	className = "",
	path,
}: WaveLayerProps) {
	const defaultPath =
		"M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";

	return (
		<motion.svg
			viewBox="0 0 1440 320"
			className={`absolute left-0 w-[200%] ${className}`}
			style={{ fill: color }}
			animate={{ x: [0, "-50%"] }}
			transition={{
				duration,
				repeat: Infinity,
				ease: "linear",
				delay,
			}}
			preserveAspectRatio="none"
		>
			<path d={path || defaultPath} />
			<path d={path || defaultPath} transform="translate(1440, 0)" />
		</motion.svg>
	);
}

export function AnimatedBeachHero() {
	return (
		<section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
			{/* Sky Gradient Background */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(to bottom, #bae6fd 0%, #e0f2fe 40%, #f0f9ff 70%, #e0f2fe 100%)",
				}}
			/>

			{/* Optional: Subtle sun glow */}
			<div
				className="absolute top-10 right-1/4 w-32 h-32 rounded-full opacity-60"
				style={{
					background: "radial-gradient(circle, #fef3c7 0%, transparent 70%)",
				}}
			/>

			{/* Sea oats / grass silhouettes on sides */}
			<div className="absolute bottom-[35%] left-4 md:left-12 w-16 md:w-24 h-40 opacity-30">
				<svg viewBox="0 0 50 100" className="w-full h-full">
					<path
						d="M25 100 Q25 60 20 30 Q18 20 25 5"
						stroke="#92400e"
						strokeWidth="1.5"
						fill="none"
					/>
					<path
						d="M25 100 Q28 70 35 40 Q38 25 30 10"
						stroke="#92400e"
						strokeWidth="1.5"
						fill="none"
					/>
					<path
						d="M25 100 Q22 75 15 50 Q12 35 20 15"
						stroke="#92400e"
						strokeWidth="1.5"
						fill="none"
					/>
				</svg>
			</div>
			<div className="absolute bottom-[35%] right-4 md:right-12 w-16 md:w-24 h-40 opacity-30 scale-x-[-1]">
				<svg viewBox="0 0 50 100" className="w-full h-full">
					<path
						d="M25 100 Q25 60 20 30 Q18 20 25 5"
						stroke="#92400e"
						strokeWidth="1.5"
						fill="none"
					/>
					<path
						d="M25 100 Q28 70 35 40 Q38 25 30 10"
						stroke="#92400e"
						strokeWidth="1.5"
						fill="none"
					/>
					<path
						d="M25 100 Q22 75 15 50 Q12 35 20 15"
						stroke="#92400e"
						strokeWidth="1.5"
						fill="none"
					/>
				</svg>
			</div>

			{/* Animated Wave Layers */}
			<div className="absolute bottom-0 left-0 right-0 h-[35%] overflow-hidden">
				{/* Wave 1 - Back (slowest, deepest) */}
				<WaveLayer
					color="#1e3a5f"
					duration={12}
					className="bottom-0"
					path="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,320L0,320Z"
				/>
				{/* Wave 2 */}
				<WaveLayer
					color="#2563eb"
					duration={10}
					delay={0.5}
					className="bottom-[-10px]"
					path="M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,218.7C672,213,768,171,864,160C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,192L1440,192L1440,320L0,320Z"
				/>
				{/* Wave 3 */}
				<WaveLayer
					color="#3b82f6"
					duration={8}
					delay={1}
					className="bottom-[-20px]"
					path="M0,224L48,218.7C96,213,192,203,288,208C384,213,480,235,576,229.3C672,224,768,192,864,186.7C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L0,320Z"
				/>
				{/* Wave 4 - Front (fastest, foam) */}
				<WaveLayer
					color="#7dd3fc"
					duration={6}
					delay={1.5}
					className="bottom-[-30px]"
					path="M0,256L48,261.3C96,267,192,277,288,272C384,267,480,245,576,240C672,235,768,245,864,256C960,267,1056,277,1152,272C1248,267,1344,245,1392,234.7L1440,224L1440,320L0,320Z"
				/>
				{/* Wave 5 - Foam edge */}
				<WaveLayer
					color="#e0f2fe"
					duration={5}
					delay={2}
					className="bottom-[-35px]"
					path="M0,288L48,282.7C96,277,192,267,288,272C384,277,480,299,576,293.3C672,288,768,256,864,250.7C960,245,1056,267,1152,277.3C1248,288,1344,288,1392,288L1440,288L1440,320L0,320Z"
				/>
			</div>

			{/* Logo and Content */}
			<motion.div
				initial="hidden"
				animate="visible"
				variants={containerVariants}
				className="relative z-10 text-center px-4"
			>
				{/* Logo Badge - using SVG for clean rendering on animated background */}
				<motion.div variants={heroVariants} className="mb-6">
					<Image
						src="/images/logo-badge.svg"
						alt="Blue Beach House Designs - Bespoke Shell Art & Coastal Accessories"
						width={400}
						height={380}
						className="mx-auto drop-shadow-lg w-auto h-[200px] md:h-[250px] lg:h-[300px]"
						priority
					/>
				</motion.div>

				{/* Tagline */}
				<motion.p
					variants={heroVariants}
					className="text-lg md:text-xl max-w-xl mx-auto mb-8"
					style={{ color: "#1a365d" }}
				>
					Bespoke shell art & coastal accessories
				</motion.p>

				{/* CTA Button */}
				<motion.div variants={heroVariants}>
					<Link
						href="/collections"
						className="btn btn-primary inline-block px-8 py-4 text-lg"
					>
						Shop the Collection
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
}

export default AnimatedBeachHero;
