/**
 * Root Layout for Blue Beach House Designs
 *
 * Sets up global fonts, metadata, and providers.
 * Uses Next.js 15 App Router patterns.
 */
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Caveat } from "next/font/google";
import "@/styles/globals.css";

// Display font - elegant serif for headings
const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-cormorant",
	display: "swap",
});

// Body font - clean geometric sans
const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-dm-sans",
	display: "swap",
});

// Accent font - handwritten for personal touches
const caveat = Caveat({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-caveat",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://bluebeachhousedesigns.com"),
	title: {
		default: "Blue Beach House Designs | Handcrafted Coastal Shell Art",
		template: "%s | Blue Beach House Designs",
	},
	description:
		"Bespoke shell art and coastal accessories handcrafted in Charleston, SC by artist Terri Brown Lawrence. Unique shell panels, painted shell art, and decorative boxes.",
	keywords: [
		"shell art",
		"coastal decor",
		"Charleston artist",
		"handmade",
		"beach house decor",
		"oyster shell art",
		"shell panels",
		"coastal home",
	],
	authors: [{ name: "Terri Brown Lawrence" }],
	creator: "Blue Beach House Designs",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://bluebeachhousedesigns.com",
		siteName: "Blue Beach House Designs",
		title: "Blue Beach House Designs | Handcrafted Coastal Shell Art",
		description:
			"Bespoke shell art and coastal accessories handcrafted in Charleston, SC.",
		images: [
			{
				url: "/images/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Blue Beach House Designs - Coastal Shell Art",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Blue Beach House Designs",
		description: "Handcrafted coastal shell art from Charleston, SC.",
		images: ["/images/og-image.jpg"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable}`}
		>
			<body className="min-h-screen bg-cream antialiased">{children}</body>
		</html>
	);
}
