/**
 * Order submission API
 *
 * Receives order data and forwards it to your n8n webhook.
 *
 * Setup:
 *   1. Deploy the n8n-workflow.json to your n8n instance
 *   2. Copy the Webhook URL from the n8n Webhook node
 *   3. Add to Vercel: Settings → Environment Variables
 *        N8N_WEBHOOK_URL = https://your-n8n-instance.com/webhook/order
 *   4. For local dev: add to .env.local
 *        N8N_WEBHOOK_URL=...
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      // No webhook configured — log and return success so UX isn't broken
      console.log("[AO Point] Order received (n8n not configured):", data);
      return NextResponse.json({ success: true });
    }

    // Forward to n8n — fire and forget; don't let n8n latency block the response
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch((err) => console.error("[AO Point] n8n webhook error:", err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[AO Point] Order API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
