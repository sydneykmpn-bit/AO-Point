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

const SYSTEM_PROMPT = `You are a friendly customer support assistant for AO Point, a Philippines-based online store.

Products & prices:
- Forest Deck Box: ₱450 (holds 120+ sleeved TCG cards, nature-inspired 3D print)
- Standard Deck Box: ₱380 (clean profile, snap-fit lid)
- Racket Holder: ₱550 (wall-mount for badminton/tennis rackets)
- Custom Racket Holder: ₱650 (dual-racket wall display)

Shipping: nationwide PH delivery, 3–7 business days. Free shipping on orders over ₱1,000.
Contact: aori.brandph@gmail.com | +63 917 890 6176

Keep replies friendly, helpful, and under 120 words. Use emojis sparingly.`;

function basicFallback(message: string): string {
  const t = message.toLowerCase();
  if (/(product|shop|buy|order)/.test(t))
    return "We carry TCG accessories, sports gear, figures & tech gear! Scroll down to browse our products. 👇";
  if (/(price|cost|how much)/.test(t))
    return "Prices start at ₱380. Forest Deck Box ₱450, Racket Holder ₱550, Custom Racket Holder ₱650. Free shipping on orders over ₱1,000!";
  if (/(deliver|ship)/.test(t))
    return "We ship nationwide across the Philippines 📦 — 3–5 days Luzon, 5–7 days Visayas/Mindanao. Free shipping over ₱1,000!";
  if (/(contact|email|phone)/.test(t))
    return "Reach us at aori.brandph@gmail.com or +63 917 890 6176. We reply within 24 hours!";
  return "Thanks for your message! For order inquiries email aori.brandph@gmail.com or call +63 917 890 6176. 😊";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message: string = body?.message;

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
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message.trim() },
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      }
    );

    if (!groqRes.ok) {
      console.error("Groq API error:", groqRes.status);
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
