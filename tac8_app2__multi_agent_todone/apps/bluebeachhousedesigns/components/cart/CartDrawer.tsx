/**
 * Cart Drawer Component
 *
 * Slide-out drawer displaying cart contents.
 * Features Framer Motion animations for smooth transitions.
 */
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
	const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } =
		useCartStore();

	// Lock body scroll when drawer is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	// Handle escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				closeCart();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen, closeCart]);

	const handleCheckout = async () => {
		if (items.length === 0) return;

		try {
			const response = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					items: items.map((item) => ({
						productId: item.id,
						quantity: item.quantity,
					})),
				}),
			});

			const data = await response.json();

			if (data.url) {
				window.location.href = data.url;
			} else {
				console.error("Checkout error:", data.error);
				alert("Failed to start checkout. Please try again.");
			}
		} catch (error) {
			console.error("Checkout error:", error);
			alert("Failed to start checkout. Please try again.");
		}
	};

	const subtotal = getSubtotal();

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black/40 z-50"
						onClick={closeCart}
						aria-hidden="true"
					/>

					{/* Drawer */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 shadow-2xl flex flex-col"
						role="dialog"
						aria-modal="true"
						aria-label="Shopping cart"
					>
						{/* Header */}
						<div className="flex items-center justify-between p-4 border-b border-sand">
							<div className="flex items-center gap-3">
								<ShoppingBag className="w-5 h-5 text-navy" />
								<h2 className="font-display text-xl text-navy">Your Cart</h2>
							</div>
							<button
								type="button"
								onClick={closeCart}
								className="p-2 text-charcoal hover:text-navy transition-colors rounded-full hover:bg-sand-light"
								aria-label="Close cart"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Cart Content */}
						<div className="flex-1 overflow-y-auto">
							{items.length === 0 ? (
								<div className="flex flex-col items-center justify-center h-full text-center px-6">
									<ShoppingBag className="w-16 h-16 text-sand mb-4" />
									<p className="text-charcoal font-medium mb-2">
										Your cart is empty
									</p>
									<p className="text-gray text-sm mb-6">
										Add some beautiful shell art to get started!
									</p>
									<button
										type="button"
										onClick={closeCart}
										className="btn btn-secondary"
									>
										Continue Shopping
									</button>
								</div>
							) : (
								<ul className="divide-y divide-sand">
									{items.map((item) => (
										<motion.li
											key={item.id}
											layout
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, x: -20 }}
											className="p-4"
										>
											<div className="flex gap-4">
												{/* Product Image */}
												<div className="relative w-20 h-20 bg-sand rounded-lg overflow-hidden flex-shrink-0">
													<Image
														src={item.image}
														alt={item.name}
														fill
														className="object-cover"
														sizes="80px"
													/>
												</div>

												{/* Product Details */}
												<div className="flex-1 min-w-0">
													<h3 className="text-sm font-medium text-navy truncate">
														{item.name}
													</h3>
													<p className="text-coral font-medium mt-1">
														{formatPrice(item.price)}
													</p>

													{/* Quantity Controls */}
													<div className="flex items-center gap-2 mt-2">
														<button
															type="button"
															onClick={() =>
																updateQuantity(item.id, item.quantity - 1)
															}
															className="w-7 h-7 flex items-center justify-center border border-sand rounded hover:bg-sand-light transition-colors"
															aria-label="Decrease quantity"
														>
															<Minus className="w-3 h-3" />
														</button>
														<span className="w-8 text-center text-sm">
															{item.quantity}
														</span>
														<button
															type="button"
															onClick={() =>
																updateQuantity(item.id, item.quantity + 1)
															}
															disabled={item.quantity >= 10}
															className="w-7 h-7 flex items-center justify-center border border-sand rounded hover:bg-sand-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
															aria-label="Increase quantity"
														>
															<Plus className="w-3 h-3" />
														</button>
													</div>
												</div>

												{/* Remove Button */}
												<button
													type="button"
													onClick={() => removeItem(item.id)}
													className="p-2 text-gray hover:text-coral transition-colors self-start"
													aria-label={`Remove ${item.name} from cart`}
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>

											{/* Item Total */}
											<div className="mt-2 text-right text-sm text-gray">
												Total: {formatPrice(item.price * item.quantity)}
											</div>
										</motion.li>
									))}
								</ul>
							)}
						</div>

						{/* Footer with Subtotal & Checkout */}
						{items.length > 0 && (
							<div className="border-t border-sand p-4 bg-white">
								<div className="flex items-center justify-between mb-4">
									<span className="text-charcoal font-medium">Subtotal</span>
									<span className="text-navy font-display text-xl">
										{formatPrice(subtotal)}
									</span>
								</div>
								<p className="text-xs text-gray mb-4">
									Shipping & taxes calculated at checkout
								</p>
								<button
									type="button"
									onClick={handleCheckout}
									className="w-full btn btn-primary py-3"
								>
									Checkout
								</button>
								<button
									type="button"
									onClick={closeCart}
									className="w-full mt-2 text-sm text-charcoal hover:text-navy transition-colors py-2"
								>
									Continue Shopping
								</button>
							</div>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
