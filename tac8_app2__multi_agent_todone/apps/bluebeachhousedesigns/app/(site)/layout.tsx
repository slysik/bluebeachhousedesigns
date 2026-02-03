/**
 * Site Layout
 *
 * Wraps all site pages with Header, Footer, and Cart functionality.
 * Adds padding for fixed header.
 */
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<CartProvider>
			<Header />
			<div className="pt-16 md:pt-20">{children}</div>
			<Footer />
		</CartProvider>
	);
}
