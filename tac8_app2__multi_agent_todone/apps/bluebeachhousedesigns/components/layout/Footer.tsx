/**
 * Site Footer Component
 *
 * Features:
 * - Brand info
 * - Quick links
 * - Social media links
 * - Copyright and policies
 */
import Link from "next/link";

const footerLinks = {
	shop: [
		{ name: "All Collections", href: "/collections" },
		{ name: "Shell Panels", href: "/collections/shell-panels" },
		{ name: "Painted Shell Art", href: "/collections/painted-shell-art" },
		{ name: "Shell Study Art", href: "/collections/shell-study-art" },
		{ name: "Shell Boxes", href: "/collections/shell-boxes" },
	],
	info: [
		{ name: "About the Artist", href: "/about" },
		{ name: "Contact", href: "/contact" },
		{ name: "Shipping & Returns", href: "/policies/shipping" },
		{ name: "Privacy Policy", href: "/policies/privacy" },
		{ name: "Terms of Service", href: "/policies/terms" },
	],
};

const socialLinks = [
	{
		name: "Instagram",
		href: "https://instagram.com/bluebeachhousedesigns",
		icon: "instagram",
	},
	{
		name: "Pinterest",
		href: "https://pinterest.com/bluebeachhousedesigns",
		icon: "pinterest",
	},
];

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-navy text-white">
			<div className="container py-16">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12">
					{/* Brand */}
					<div className="md:col-span-2">
						<Link
							href="/"
							className="font-display text-2xl text-white mb-4 block"
						>
							Blue Beach House Designs
						</Link>
						<p className="text-white/70 max-w-md mb-6">
							Handcrafted coastal shell art from Charleston, SC. Each piece is
							made with love using locally sourced materials.
						</p>
						<p className="accent-text text-seafoam text-lg">
							— Terri Brown Lawrence
						</p>
					</div>

					{/* Shop Links */}
					<div>
						<h4 className="text-sm uppercase tracking-wide mb-4 text-white">
							Shop
						</h4>
						<ul className="space-y-2">
							{footerLinks.shop.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-white/70 hover:text-white transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Info Links */}
					<div>
						<h4 className="text-sm uppercase tracking-wide mb-4 text-white">
							Information
						</h4>
						<ul className="space-y-2">
							{footerLinks.info.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-white/70 hover:text-white transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-white/50 text-sm">
						&copy; {currentYear} Blue Beach House Designs. All rights reserved.
					</p>

					{/* Social Links */}
					<div className="flex gap-4">
						{socialLinks.map((social) => (
							<a
								key={social.name}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/70 hover:text-white transition-colors"
								aria-label={social.name}
							>
								{social.name}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
