/**
 * Contact Form API Route
 *
 * Handles contact form submissions:
 * - Validates input with Zod
 * - Checks honeypot for bot detection
 * - Sends email via Resend
 */
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";

// Lazy initialization to allow builds without env vars
let _resend: Resend | null = null;

function getResend(): Resend {
	if (!_resend) {
		const apiKey = process.env.RESEND_API_KEY;
		if (!apiKey) {
			throw new Error("RESEND_API_KEY is not defined in environment variables");
		}
		_resend = new Resend(apiKey);
	}
	return _resend;
}

// Destination email for contact form submissions
const CONTACT_EMAIL =
	process.env.CONTACT_EMAIL ?? "bluebeachhousedesigns@gmail.com";

export async function POST(request: NextRequest) {
	// Parse request body
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json(
			{ error: "Invalid JSON in request body" },
			{ status: 400 },
		);
	}

	// Validate the input data
	const result = contactSchema.safeParse(body);
	if (!result.success) {
		return NextResponse.json(
			{ error: "Validation failed", details: result.error.flatten() },
			{ status: 400 },
		);
	}

	const { name, email, phone, message, honeypot } = result.data;

	// Honeypot check - if filled, it's likely a bot
	// Return success to avoid revealing the trap
	if (honeypot) {
		console.log("Honeypot triggered - likely bot submission");
		return NextResponse.json({ success: true });
	}

	try {
		// Send email via Resend
		await getResend().emails.send({
			from: "Blue Beach House Designs <noreply@bluebeachhousedesigns.com>",
			to: CONTACT_EMAIL,
			replyTo: email,
			subject: `New Contact Form Submission from ${name}`,
			html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        <hr>
        <h3>Message:</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
			text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}

Message:
${message}
      `,
		});

		return NextResponse.json({
			success: true,
			message: "Thank you for your message. We will get back to you soon!",
		});
	} catch (err) {
		console.error("Failed to send contact email:", err);

		return NextResponse.json(
			{ error: "Failed to send message. Please try again later." },
			{ status: 500 },
		);
	}
}

/**
 * Escape HTML to prevent XSS in email content
 */
function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#039;",
	};
	return text.replace(/[&<>"']/g, (char) => map[char]);
}
