/**
 * Stagger Container
 *
 * Container that staggers the animation of its children.
 * Useful for product grids and lists.
 */
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerContainerProps {
	children: ReactNode;
	className?: string;
	/** Delay between each child animation in seconds */
	staggerDelay?: number;
	/** Delay before first animation starts in seconds */
	delayStart?: number;
}

const containerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: (custom: { staggerDelay: number; delayStart: number }) => ({
		opacity: 1,
		transition: {
			delayChildren: custom.delayStart,
			staggerChildren: custom.staggerDelay,
		},
	}),
};

export function StaggerContainer({
	children,
	className,
	staggerDelay = 0.1,
	delayStart = 0,
}: StaggerContainerProps) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			custom={{ staggerDelay, delayStart }}
			variants={containerVariants}
			className={className}
		>
			{children}
		</motion.div>
	);
}
