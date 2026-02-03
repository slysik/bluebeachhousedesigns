/**
 * Cart Store
 *
 * Zustand store for managing shopping cart state.
 * Persists cart to localStorage for cross-session persistence.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

interface CartState {
	items: CartItem[];
	isOpen: boolean;

	// Actions
	addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
	removeItem: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearCart: () => void;
	openCart: () => void;
	closeCart: () => void;
	toggleCart: () => void;

	// Computed helpers
	getTotalItems: () => number;
	getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			isOpen: false,

			addItem: (item, quantity = 1) => {
				set((state) => {
					const existingItem = state.items.find((i) => i.id === item.id);

					if (existingItem) {
						// Update quantity if item exists (max 10)
						return {
							items: state.items.map((i) =>
								i.id === item.id
									? { ...i, quantity: Math.min(10, i.quantity + quantity) }
									: i,
							),
							isOpen: true, // Open cart when item added
						};
					}

					// Add new item
					return {
						items: [
							...state.items,
							{ ...item, quantity: Math.min(10, quantity) },
						],
						isOpen: true, // Open cart when item added
					};
				});
			},

			removeItem: (id) => {
				set((state) => ({
					items: state.items.filter((item) => item.id !== id),
				}));
			},

			updateQuantity: (id, quantity) => {
				if (quantity < 1) {
					get().removeItem(id);
					return;
				}

				set((state) => ({
					items: state.items.map((item) =>
						item.id === id
							? { ...item, quantity: Math.min(10, quantity) }
							: item,
					),
				}));
			},

			clearCart: () => {
				set({ items: [] });
			},

			openCart: () => {
				set({ isOpen: true });
			},

			closeCart: () => {
				set({ isOpen: false });
			},

			toggleCart: () => {
				set((state) => ({ isOpen: !state.isOpen }));
			},

			getTotalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0);
			},

			getSubtotal: () => {
				return get().items.reduce(
					(total, item) => total + item.price * item.quantity,
					0,
				);
			},
		}),
		{
			name: "bbhd-cart", // localStorage key
			partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen
		},
	),
);
