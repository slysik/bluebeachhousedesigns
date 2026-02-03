/**
 * Site Header Component
 *
 * Features:
 * - Logo/brand name
 * - Main navigation
 * - Cart icon with item count (from Zustand store)
 * - Mobile-responsive hamburger menu
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";

const navigation = [
	{ name: "Shop", href: "/collections" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
];

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const { getTotalItems, openCart } = useCartStore();

	// Handle hydration mismatch for cart count
	useEffect(() => {
		setMounted(true);
	}, []);

	const cartItemCount = mounted ? getTotalItems() : 0;

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand">
			<div className="container">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* Logo */}
					<Link
						href="/"
						className="font-display text-xl md:text-2xl text-navy hover:text-navy-light transition-colors"
					>
						Blue Beach House
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="text-charcoal hover:text-navy transition-colors text-sm uppercase tracking-wide"
							>
								{item.name}
							</Link>
						))}
					</nav>

					{/* Cart & Mobile Menu */}
					<div className="flex items-center gap-4">
						{/* Cart */}
						<button
							type="button"
							onClick={openCart}
							className="relative p-2 text-charcoal hover:text-navy transition-colors"
							aria-label={`Cart (${cartItemCount} items)`}
						>
							<ShoppingBag className="w-5 h-5" />
							{cartItemCount > 0 && (
								<span className="absolute -top-1 -right-1 w-5 h-5 bg-coral text-white text-xs flex items-center justify-center rounded-full">
									{cartItemCount}
								</span>
							)}
						</button>

						{/* Mobile Menu Button */}
						<button
							type="button"
							className="md:hidden p-2 text-charcoal"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label="Toggle menu"
						>
							{mobileMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={cn(
					"md:hidden overflow-hidden transition-all duration-300",
					mobileMenuOpen ? "max-h-64" : "max-h-0",
				)}
			>
				<nav className="container py-4 border-t border-sand">
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="block py-3 text-charcoal hover:text-navy transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							{item.name}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}
