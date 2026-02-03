/**
 * Cart Page
 *
 * Displays cart contents and checkout button.
 * Cart state would typically be managed by a cart context/provider.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";

// Placeholder cart item type
interface CartItem {
	id: string;
	name: string;
	price: number;
	image: string;
	quantity: number;
	stripePriceId: string;
}

export default function CartPage() {
	// In a real app, this would come from cart context/state
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	const removeItem = (id: string) => {
		setCartItems((items) => items.filter((item) => item.id !== id));
	};

	const handleCheckout = async () => {
		if (cartItems.length === 0) return;

		setIsLoading(true);

		try {
			// For now, checkout with first item
			// In production, you'd handle multi-item checkout
			const response = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					productId: cartItems[0].stripePriceId,
					quantity: cartItems[0].quantity,
				}),
			});

			const data = await response.json();

			if (data.url) {
				window.location.href = data.url;
			}
		} catch (error) {
			console.error("Checkout error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (cartItems.length === 0) {
		return (
			<main className="py-12 px-4">
				<div className="container max-w-2xl text-center">
					<h1 className="mb-8">Your Cart</h1>
					<div className="card p-12">
						<p className="text-gray mb-8">Your cart is currently empty.</p>
						<Link href="/collections" className="btn btn-primary">
							Continue Shopping
						</Link>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="py-12 px-4">
			<div className="container max-w-4xl">
				<h1 className="mb-8">Your Cart</h1>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2 space-y-4">
						{cartItems.map((item) => (
							<div key={item.id} className="card p-4 flex gap-4">
								<div className="w-24 h-24 relative flex-shrink-0">
									<Image
										src={item.image}
										alt={item.name}
										fill
										className="object-cover"
									/>
								</div>
								<div className="flex-1">
									<h3 className="text-lg mb-1">{item.name}</h3>
									<p className="text-gray text-sm">Qty: {item.quantity}</p>
								</div>
								<div className="text-right">
									<p className="price price-large mb-2">${item.price}</p>
									<button
										onClick={() => removeItem(item.id)}
										className="text-gray hover:text-error transition-colors"
										aria-label="Remove item"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="card p-6">
							<h2 className="text-xl mb-6">Order Summary</h2>

							<div className="space-y-3 mb-6">
								<div className="flex justify-between text-gray">
									<span>Subtotal</span>
									<span>${subtotal}</span>
								</div>
								<div className="flex justify-between text-gray">
									<span>Shipping</span>
									<span>Calculated at checkout</span>
								</div>
							</div>

							<div className="border-t border-sand pt-4 mb-6">
								<div className="flex justify-between text-lg font-medium">
									<span>Total</span>
									<span>${subtotal}</span>
								</div>
							</div>

							<button
								onClick={handleCheckout}
								disabled={isLoading}
								className="btn btn-primary w-full disabled:opacity-50"
							>
								{isLoading ? "Loading..." : "Proceed to Checkout"}
							</button>

							<p className="text-xs text-gray text-center mt-4">
								Taxes and shipping calculated at checkout
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
