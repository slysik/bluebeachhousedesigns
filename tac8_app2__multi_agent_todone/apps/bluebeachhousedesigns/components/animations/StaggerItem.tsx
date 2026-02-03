/**
 * Stagger Item
 *
 * Individual item within a StaggerContainer.
 * Animates with fadeUp effect when parent triggers animation.
 */
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerItemProps {
	children: ReactNode;
	className?: string;
}

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

export function StaggerItem({ children, className }: StaggerItemProps) {
	return (
		<motion.div variants={itemVariants} className={className}>
			{children}
		</motion.div>
	);
}
