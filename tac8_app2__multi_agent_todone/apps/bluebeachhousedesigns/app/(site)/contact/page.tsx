/**
 * Contact Page
 *
 * Contact form with honeypot spam protection and Framer Motion animations.
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUpVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

export default function ContactPage() {
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus("loading");
		setErrorMessage("");

		const form = e.currentTarget;
		const formData = new FormData(form);

		const data = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			phone: (formData.get("phone") as string) || undefined,
			message: formData.get("message") as string,
			honeypot: (formData.get("website") as string) || "", // Honeypot field
		};

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const result = await response.json();
				throw new Error(result.error || "Failed to send message");
			}

			setStatus("success");
			form.reset();
		} catch (err) {
			setStatus("error");
			setErrorMessage(
				err instanceof Error ? err.message : "Something went wrong",
			);
		}
	}

	return (
		<motion.main
			initial="hidden"
			animate="visible"
			variants={staggerContainer}
			className="py-12 px-4"
		>
			<div className="container max-w-2xl">
				{/* Page Header */}
				<motion.div variants={fadeUpVariants} className="text-center mb-12">
					<h1 className="mb-4">Get in Touch</h1>
					<p className="text-gray">
						Have a question about a piece or interested in a custom order?
						I&apos;d love to hear from you.
					</p>
				</motion.div>

				{/* Contact Form */}
				<motion.div variants={fadeUpVariants} className="card p-8 md:p-12">
					{status === "success" ? (
						<div className="text-center py-8">
							<div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-success text-2xl">✓</span>
							</div>
							<h2 className="text-2xl mb-4">Message Sent!</h2>
							<p className="text-gray mb-8">
								Thank you for reaching out. I&apos;ll get back to you as soon as
								possible.
							</p>
							<button
								onClick={() => setStatus("idle")}
								className="btn btn-secondary"
							>
								Send Another Message
							</button>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Name */}
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium mb-2"
								>
									Name *
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									minLength={2}
									maxLength={100}
									className="w-full px-4 py-3 border border-sand-dark focus:border-seafoam focus:outline-none transition-colors"
									placeholder="Your name"
								/>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium mb-2"
								>
									Email *
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									className="w-full px-4 py-3 border border-sand-dark focus:border-seafoam focus:outline-none transition-colors"
									placeholder="your@email.com"
								/>
							</div>

							{/* Phone (Optional) */}
							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-medium mb-2"
								>
									Phone <span className="text-gray">(optional)</span>
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									maxLength={20}
									className="w-full px-4 py-3 border border-sand-dark focus:border-seafoam focus:outline-none transition-colors"
									placeholder="(555) 123-4567"
								/>
							</div>

							{/* Message */}
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium mb-2"
								>
									Message *
								</label>
								<textarea
									id="message"
									name="message"
									required
									minLength={10}
									maxLength={2000}
									rows={5}
									className="w-full px-4 py-3 border border-sand-dark focus:border-seafoam focus:outline-none transition-colors resize-y"
									placeholder="Tell me about your inquiry..."
								/>
							</div>

							{/* Honeypot - Hidden from humans, bots will fill it */}
							<div className="hidden" aria-hidden="true">
								<label htmlFor="website">Website</label>
								<input
									type="text"
									id="website"
									name="website"
									tabIndex={-1}
									autoComplete="off"
								/>
							</div>

							{/* Error Message */}
							{status === "error" && (
								<div className="p-4 bg-error/10 border border-error/20 text-error text-sm">
									{errorMessage || "Something went wrong. Please try again."}
								</div>
							)}

							{/* Submit Button */}
							<button
								type="submit"
								disabled={status === "loading"}
								className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{status === "loading" ? "Sending..." : "Send Message"}
							</button>
						</form>
					)}
				</motion.div>

				{/* Contact Info */}
				<motion.div
					variants={fadeUpVariants}
					className="mt-12 text-center text-gray"
				>
					<p className="mb-2">
						<strong>Email:</strong> bluebeachhousedesigns@gmail.com
					</p>
					<p>
						<strong>Location:</strong> Charleston, SC
					</p>
				</motion.div>
			</div>
		</motion.main>
	);
}
