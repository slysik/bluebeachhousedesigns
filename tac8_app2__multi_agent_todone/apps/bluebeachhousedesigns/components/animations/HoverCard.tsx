/**
 * Hover Card
 *
 * Card component with smooth hover animations using Framer Motion.
 * Provides lift and shadow effects on hover.
 */
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HoverCardProps {
	children: ReactNode;
	className?: string;
}

export function HoverCard({ children, className }: HoverCardProps) {
	return (
		<motion.div
			className={className}
			whileHover={{
				y: -8,
				transition: {
					duration: 0.3,
					ease: [0.4, 0, 0.2, 1],
				},
			}}
			whileTap={{
				scale: 0.98,
			}}
		>
			{children}
		</motion.div>
	);
}
