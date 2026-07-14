/**
 * Groq-powered chat API route
 *
 * Deploy to Vercel:
 *   1. Push code to GitHub and import in Vercel dashboard
 *   2. Settings → Environment Variables → add GROQ_API_KEY
 *   3. Get a free key at https://console.groq.com
 *   4. Redeploy — the chatbot will automatically switch to AI mode
 */

import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";

const PRODUCT_LINES = products
  .map(
    (p) =>
      `- ${p.name} (${p.category}): ₱${p.price}${p.badge ? ` [${p.badge}]` : ""} — ${p.description}`
  )
  .join("\n");

const SYSTEM_PROMPT = `You are a friendly, knowledgeable customer support assistant for AO Point, a Philippines-based e-commerce store selling 3D-printed TCG accessories and sports gear.

Products & prices:
${PRODUCT_LINES}

How customers order:
- Click a product card to see full details.
- "Add to Cart" adds the item and keeps the cart open for browsing more products; the cart icon in the top navigation shows the running total and opens checkout.
- "Buy Now" is a shortcut for a quick single-item purchase.
- Accepted payment methods: GCash, Bank Transfer, Cash on Delivery (COD).

Shipping: nationwide PH delivery, 3–7 business days (Luzon 3–5 days, Visayas/Mindanao 5–7 days). Free shipping on orders ₱1,000+.
Contact: aori.brandph@gmail.com | +63 917 123 456

Only answer using the information above. If asked something you don't know or that's unrelated to AO Point, say so honestly and suggest contacting support. Keep replies concise (under 120 words), friendly, and use emojis sparingly.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function basicFallback(message: string): string {
  const t = message.toLowerCase();
  if (/(cart|checkout)/.test(t))
    return "Add items with the \"Add to Cart\" button on any product, then tap the cart icon in the top nav to review and check out. 🛒";
  if (/(product|shop|buy|order)/.test(t))
    return "We carry TCG accessories and sports gear! Scroll down to browse our products. 👇";
  if (/(price|cost|how much|magkano)/.test(t))
    return "Prices start at ₱380. Forest Deck Box ₱450, Standard Deck Box ₱380, Racket Holder ₱550, Custom Racket Holder ₱650. Free shipping on orders over ₱1,000!";
  if (/(deliver|ship)/.test(t))
    return "We ship nationwide across the Philippines 📦 — 3–5 days Luzon, 5–7 days Visayas/Mindanao. Free shipping over ₱1,000!";
  if (/(payment|gcash|bank|cod|cash on delivery)/.test(t))
    return "We accept GCash, Bank Transfer, and Cash on Delivery (COD). 💳";
  if (/(contact|email|phone)/.test(t))
    return "Reach us at aori.brandph@gmail.com or +63 917 123 456. We reply within 24 hours!";
  if (/(thanks|thank you|salamat)/.test(t))
    return "You're welcome! Let us know if you need anything else. 😊";
  if (/(hello|hi|hey|kumusta)/.test(t))
    return "Hey! 👋 I can help with products, pricing, cart, or shipping. What would you like to know?";
  return "Thanks for your message! For order inquiries email aori.brandph@gmail.com or call +63 917 123 456. 😊";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message: string = body?.message;
    const history: ChatMessage[] = Array.isArray(body?.history)
      ? body.history.filter(
          (m: unknown): m is ChatMessage =>
            !!m &&
            typeof m === "object" &&
            ((m as ChatMessage).role === "user" ||
              (m as ChatMessage).role === "assistant") &&
            typeof (m as ChatMessage).content === "string"
        )
      : [];

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      // No API key configured — use local fallback responses
      return NextResponse.json({ response: basicFallback(message) });
    }

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            // Keep a short rolling window of prior turns so follow-up
            // questions ("how much is that one?") resolve correctly.
            ...history.slice(-8),
            { role: "user", content: message.trim() },
          ],
          max_tokens: 300,
          temperature: 0.6,
        }),
      }
    );

    if (!groqRes.ok) {
      console.error("Groq API error:", groqRes.status, await groqRes.text());
      return NextResponse.json({ response: basicFallback(message) });
    }

    const data = await groqRes.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ response: basicFallback(message) });
    }

    return NextResponse.json({ response: reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
