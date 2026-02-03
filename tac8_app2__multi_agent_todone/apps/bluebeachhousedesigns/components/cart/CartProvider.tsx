/**
 * Cart Provider Component
 *
 * Wraps the application with cart functionality.
 * Handles hydration of Zustand store for SSR compatibility.
 */
"use client";

import { useEffect, useState } from "react";
import { CartDrawer } from "./CartDrawer";

interface CartProviderProps {
	children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
	const [isHydrated, setIsHydrated] = useState(false);

	// Wait for hydration to complete before rendering cart
	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return (
		<>
			{children}
			{isHydrated && <CartDrawer />}
		</>
	);
}
