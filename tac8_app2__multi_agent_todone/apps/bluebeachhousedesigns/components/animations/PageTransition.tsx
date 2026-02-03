/**
 * Page Transition Wrapper
 *
 * Wraps page content with Framer Motion fadeUp animation.
 * Use this to wrap the main content of each page for consistent transitions.
 */
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
	children: ReactNode;
	className?: string;
}

const pageVariants = {
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.4, 0, 0.2, 1], // ease-smooth
		},
	},
	exit: {
		opacity: 0,
		y: -10,
		transition: {
			duration: 0.3,
		},
	},
};

export function PageTransition({ children, className }: PageTransitionProps) {
	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageVariants}
			className={className}
		>
			{children}
		</motion.div>
	);
}
