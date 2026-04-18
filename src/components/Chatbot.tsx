"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  quickReplies?: QuickReply[];
}

interface QuickReply {
  label: string;
  action: string;
}

const ALL_QUICK_REPLIES: QuickReply[] = [
  { label: "View Products", action: "products" },
  { label: "Pricing", action: "pricing" },
  { label: "Delivery Options", action: "delivery" },
  { label: "Custom Orders", action: "custom" },
];

const INITIAL: Message = {
  role: "assistant",
  content: "Hi! Welcome to AO Point 👋 How can I help you today?",
  quickReplies: ALL_QUICK_REPLIES,
};

function getActionResponse(action: string): {
  content: string;
  quickReplies?: QuickReply[];
} {
  switch (action) {
    case "products":
      return {
        content:
          "Scrolling to our products now! 👇 Click any card to see details and place an order.",
      };
    case "pricing":
      return {
        content:
          "Here's our current pricing:\n\n• Forest Deck Box — ₱450\n• Standard Deck Box — ₱380\n• Racket Holder — ₱550\n• Custom Racket Holder — ₱650\n\nFree shipping on orders over ₱1,000! 🎉",
        quickReplies: [{ label: "How to Order?", action: "order" }],
      };
    case "delivery":
      return {
        content:
          "We ship nationwide across the Philippines 📦\n\n• Luzon: 3–5 business days\n• Visayas/Mindanao: 5–7 business days\n• Free shipping on orders ₱1,000+",
        quickReplies: [{ label: "View Products", action: "products" }],
      };
    case "custom":
      return {
        content:
          "We love custom orders! 🎨 Send us a message and we'll work out the details with you.\n\n📧 aori.brandph@gmail.com\n📱 +63 917 890 6176",
        quickReplies: [{ label: "Pricing", action: "pricing" }],
      };
    case "order":
      return {
        content:
          "Easy! Just click any product card on the page, then hit Buy Now. Fill in the form and we'll confirm your order within 24 hours. 🛒",
        quickReplies: [{ label: "View Products", action: "products" }],
      };
    default:
      return {
        content:
          "I'm here to help! Ask me anything about our products, pricing, or shipping.",
        quickReplies: ALL_QUICK_REPLIES,
      };
  }
}

function basicFallback(msg: string): string {
  const t = msg.toLowerCase();
  if (/(product|shop|buy|browse|order)/.test(t))
    return "Click any product card on the page to view details and place an order. 🛒";
  if (/(price|cost|how much|magkano)/.test(t))
    return "Forest Deck Box ₱450, Standard Deck Box ₱380, Racket Holder ₱550, Custom Racket Holder ₱650. Free shipping over ₱1,000!";
  if (/(deliver|ship)/.test(t))
    return "Nationwide PH shipping 📦 — Luzon 3–5 days, Visayas/Mindanao 5–7 days. Free on orders over ₱1,000!";
  if (/(contact|email|phone)/.test(t))
    return "📧 aori.brandph@gmail.com\n📱 +63 917 890 6176\nWe reply within 24 hours!";
  if (/(hello|hi|hey|kumusta)/.test(t))
    return "Hey! 👋 I can help with products, pricing, or shipping. What would you like to know?";
  return "Thanks for reaching out! Email us at aori.brandph@gmail.com or call +63 917 890 6176. 😊";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function handleQuickReply(action: string, label: string) {
    setMessages((prev) => [...prev, { role: "user", content: label }]);

    if (action === "products") {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }

    const { content, quickReplies } = getActionResponse(action);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content, quickReplies },
      ]);
    }, 550);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: basicFallback(text) },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[380px] bg-white shadow-2xl flex flex-col overflow-hidden rounded-2xl border border-zinc-100 transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
        style={{ maxHeight: "560px" }}
      >
        {/* Header */}
        <div className="bg-[#004960] px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 bg-[#003347] rounded-full flex items-center justify-center">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path
                  d="M8.5 1C4.91 1 2 3.56 2 6.7C2 8.4 2.77 9.94 4.03 11.04L2.7 14.5L6.9 12.87C7.69 13.1 8.08 13.2 8.5 13.2C12.09 13.2 15 10.64 15 7.5C15 4.36 12.09 1 8.5 1Z"
                  fill="white"
                  fillOpacity="0.7"
                />
              </svg>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#004960]" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-tight">AO Point AI</p>
            <p className="text-emerald-300 text-[10px] font-semibold mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
              Online
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors rounded-full flex-shrink-0"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1 1L9 9M9 1L1 9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5 min-h-[200px]">
          {messages.map((msg, i) => (
            <div key={i}>
              <div
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[#004960] text-white rounded-2xl rounded-br-sm"
                      : "bg-zinc-100 text-zinc-800 rounded-2xl rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>

              {/* Quick replies — only on last assistant message */}
              {msg.role === "assistant" &&
                msg.quickReplies &&
                i === messages.length - 1 && (
                  <div className="flex flex-wrap gap-2 mt-2 pl-0.5">
                    {msg.quickReplies.map((qr) => (
                      <button
                        key={qr.action}
                        onClick={() => handleQuickReply(qr.action, qr.label)}
                        className="text-[11px] font-semibold px-3.5 py-1.5 rounded-full border border-[#004960]/25 text-[#004960] bg-white hover:bg-[#004960] hover:text-white hover:border-[#004960] transition-all duration-150 shadow-sm"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-zinc-100 flex-shrink-0 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask anything…"
              disabled={loading}
              className="flex-1 text-sm px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-full outline-none focus:border-[#004960] transition-colors text-zinc-900 placeholder-zinc-400 disabled:opacity-60"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="w-10 h-10 flex items-center justify-center bg-[#004960] text-white rounded-full hover:bg-[#003347] transition-colors disabled:opacity-40 flex-shrink-0"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M12 6.5L1 1L4 6.5L1 12L12 6.5Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Chat with AO Point AI"
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-[#004960] text-white rounded-full shadow-lg shadow-[#004960]/20 hover:bg-[#003347] hover:shadow-xl hover:shadow-[#004960]/35 transition-all duration-200 flex items-center justify-center"
      >
        <span
          className={`transition-all duration-200 ${open ? "scale-100" : "scale-100"}`}
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M11 2.5C6.31 2.5 2.5 5.91 2.5 10.1C2.5 12.1 3.39 13.93 4.85 15.28L3.5 19.5L8.28 17.87C9.13 18.1 10.05 18.22 11 18.22C15.69 18.22 19.5 14.81 19.5 10.61C19.5 6.41 15.69 2.5 11 2.5Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
              <circle cx="11" cy="10.5" r="1" fill="currentColor" />
              <circle cx="14.5" cy="10.5" r="1" fill="currentColor" />
            </svg>
          )}
        </span>
      </button>
    </>
  );
}
