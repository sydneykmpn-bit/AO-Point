"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL: Message = {
  role: "assistant",
  content: "hi! welcome to AO Point 👋 how can i help?",
};

function basicFallback(msg: string): string {
  const t = msg.toLowerCase();
  if (/(product|shop|buy|order|browse)/.test(t))
    return "We carry TCG accessories, sports gear, figures & tech gear! Scroll down to browse our full product line. 👇";
  if (/(price|cost|how much|magkano)/.test(t))
    return "Prices range from ₱380–₱650. Forest Deck Box ₱450, Standard Deck Box ₱380, Racket Holder ₱550, Custom Racket Holder ₱650. Free shipping on orders over ₱1,000!";
  if (/(deliver|ship|shipping|logistics)/.test(t))
    return "We ship nationwide across the Philippines 📦 — 3–5 business days for Luzon, 5–7 for Visayas/Mindanao. Free shipping on orders over ₱1,000!";
  if (/(contact|email|phone|reach|message)/.test(t))
    return "Reach us at aori.brandph@gmail.com or +63 917 890 6176. We usually reply within 24 hours!";
  if (/(hello|hi|hey|kumusta)/.test(t))
    return "Hey! 👋 Looking for TCG accessories, sports gear, or something custom? I'm happy to help!";
  return "Thanks for reaching out! For order inquiries, email us at aori.brandph@gmail.com or call +63 917 890 6176. 😊";
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
      if (!res.ok) throw new Error("api-error");
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
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[375px] bg-white shadow-2xl flex flex-col overflow-hidden border border-zinc-100 transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ maxHeight: "520px" }}
      >
        {/* Header */}
        <div className="bg-[#004960] px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide">
              AO Point Support
            </h3>
            <p className="text-white/50 text-[11px] mt-0.5">
              Usually replies instantly
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors rounded-full"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 1L11 11M11 1L1 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[84%] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#004960] text-white rounded-2xl rounded-br-sm"
                    : "bg-zinc-100 text-zinc-800 rounded-2xl rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center">
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
        <div className="p-3 border-t border-zinc-100 flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              disabled={loading}
              className="flex-1 text-sm px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-full outline-none focus:border-[#004960] transition-colors text-zinc-900 placeholder-zinc-400 disabled:opacity-60"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="w-10 h-10 flex items-center justify-center bg-[#004960] text-white rounded-full hover:bg-[#003347] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
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
        aria-label="Open AO Point chat support"
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-[#004960] text-white rounded-full shadow-lg hover:bg-[#003347] hover:shadow-xl hover:shadow-[#004960]/30 transition-all duration-200 flex items-center justify-center"
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
      </button>
    </>
  );
}
