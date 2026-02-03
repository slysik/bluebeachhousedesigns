/**
 * Checkout Success Page
 *
 * Displayed after successful Stripe checkout.
 * Shows order confirmation and next steps.
 */
import Link from "next/link";

export const metadata = {
	title: "Order Confirmed",
	description: "Thank you for your purchase from Blue Beach House Designs.",
};

export default function CheckoutSuccessPage() {
	return (
		<main className="py-12 px-4">
			<div className="container max-w-xl text-center">
				<div className="card p-12">
					{/* Success Icon */}
					<div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
						<span className="text-success text-4xl">✓</span>
					</div>

					<h1 className="text-3xl mb-4">Thank You!</h1>

					<p className="text-gray mb-8">
						Your order has been confirmed and you&apos;ll receive a confirmation
						email shortly. I can&apos;t wait to send your new piece of coastal
						art!
					</p>

					<div className="bg-sand-light p-6 mb-8 text-left">
						<h2 className="text-lg mb-4">What&apos;s Next?</h2>
						<ul className="space-y-2 text-gray text-sm">
							<li>• You&apos;ll receive an order confirmation email</li>
							<li>• Your piece will be carefully packaged</li>
							<li>• Shipping confirmation with tracking will follow</li>
							<li>• Expected delivery: 5-7 business days</li>
						</ul>
					</div>

					<p className="accent-text text-lg text-seafoam-dark mb-8">
						Thank you for supporting handmade art!
					</p>

					<Link href="/collections" className="btn btn-primary">
						Continue Shopping
					</Link>
				</div>

				<p className="text-gray text-sm mt-8">
					Questions about your order?{" "}
					<Link href="/contact" className="text-navy hover:text-coral">
						Contact us
					</Link>
				</p>
			</div>
		</main>
	);
}
