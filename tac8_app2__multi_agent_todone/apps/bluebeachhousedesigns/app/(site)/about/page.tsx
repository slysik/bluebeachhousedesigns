/**
 * About Page
 *
 * Artist bio and studio story with Framer Motion animations.
 */
import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
	title: "About the Artist",
	description:
		"Meet Terri Brown Lawrence, the artist behind Blue Beach House Designs. Creating coastal shell art in Charleston, SC since 2014.",
};

export default function AboutPage() {
	return <AboutClient />;
}
