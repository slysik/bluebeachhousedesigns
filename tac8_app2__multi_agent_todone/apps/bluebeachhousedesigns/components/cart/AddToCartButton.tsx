/**
 * Add to Cart Button Component
 *
 * Handles adding products to cart with quantity selection.
 * Opens the cart drawer after adding items.
 */
"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

interface AddToCartButtonProps {
	productId: string;
	productName: string;
	price: number;
	image: string;
}

export function AddToCartButton({
	productId,
	productName,
	price,
	image,
}: AddToCartButtonProps) {
	const [quantity, setQuantity] = useState(1);
	const [added, setAdded] = useState(false);
	const addItem = useCartStore((state) => state.addItem);

	const handleAddToCart = () => {
		addItem(
			{
				id: productId,
				name: productName,
				price,
				image,
			},
			quantity,
		);

		// Show success feedback
		setAdded(true);
		setTimeout(() => setAdded(false), 2000);

		// Reset quantity after adding
		setQuantity(1);
	};

	return (
		<div className="space-y-4">
			{/* Quantity Selector */}
			<div className="flex items-center gap-4">
				<label htmlFor="quantity" className="text-sm font-medium">
					Quantity
				</label>
				<div className="flex items-center border border-sand">
					<button
						type="button"
						onClick={() => setQuantity((q) => Math.max(1, q - 1))}
						className="px-4 py-2 hover:bg-sand-light transition-colors"
						disabled={quantity <= 1}
					>
						-
					</button>
					<span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
					<button
						type="button"
						onClick={() => setQuantity((q) => Math.min(10, q + 1))}
						className="px-4 py-2 hover:bg-sand-light transition-colors"
						disabled={quantity >= 10}
					>
						+
					</button>
				</div>
			</div>

			{/* Price Display */}
			<div className="text-sm text-gray">
				Total:{" "}
				<span className="font-medium text-navy">
					{formatPrice(price * quantity)}
				</span>
			</div>

			{/* Add to Cart Button */}
			<button
				type="button"
				onClick={handleAddToCart}
				className="w-full btn btn-primary py-4 text-lg flex items-center justify-center gap-2"
			>
				{added ? (
					<>
						<Check className="w-5 h-5" />
						Added to Cart!
					</>
				) : (
					<>
						<ShoppingBag className="w-5 h-5" />
						Add to Cart
					</>
				)}
			</button>

			{/* Security Note */}
			<p className="text-xs text-gray text-center">
				Secure checkout powered by Stripe
			</p>
		</div>
	);
}
