"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span
            className={`text-lg font-bold tracking-[0.22em] uppercase transition-colors duration-300 ${
              scrolled ? "text-zinc-900" : "text-white"
            }`}
          >
            AO
            <span
              className={`ml-1.5 transition-colors duration-300 ${
                scrolled ? "text-[#004960]" : "text-[#00b4d8]"
              }`}
            >
              Point
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-[11px] font-bold tracking-[0.22em] uppercase transition-colors duration-300 ${
                scrolled
                  ? "text-zinc-500 hover:text-[#004960]"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#products"
            className="text-[11px] font-bold tracking-[0.22em] uppercase px-5 py-2.5 bg-[#004960] text-white hover:bg-[#003347] transition-colors duration-200"
          >
            Shop Now
          </Link>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className={`relative p-1.5 transition-colors duration-300 ${
              scrolled ? "text-zinc-900" : "text-white"
            }`}
          >
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
              <path
                d="M5 6h14l-1.4 8.4a1.5 1.5 0 01-1.48 1.25H7.88a1.5 1.5 0 01-1.48-1.25L5 6zm0 0L4.3 2.5H2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8.5" cy="19" r="1.2" fill="currentColor" />
              <circle cx="15.5" cy="19" r="1.2" fill="currentColor" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00b4d8] text-white text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* Mobile cart + burger */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className={`relative p-2 transition-colors ${
              scrolled ? "text-zinc-900" : "text-white"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 21 21" fill="none">
              <path
                d="M5 6h14l-1.4 8.4a1.5 1.5 0 01-1.48 1.25H7.88a1.5 1.5 0 01-1.48-1.25L5 6zm0 0L4.3 2.5H2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8.5" cy="19" r="1.2" fill="currentColor" />
              <circle cx="15.5" cy="19" r="1.2" fill="currentColor" />
            </svg>
            {count > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#00b4d8] text-white text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className={`p-2 transition-colors ${
              scrolled ? "text-zinc-900" : "text-white"
            }`}
          >
            <div className="w-5 flex flex-col gap-[5px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block h-[2px] bg-current transition-all duration-300 origin-center ${
                    mobileOpen
                      ? i === 0
                        ? "rotate-45 translate-y-[7px]"
                        : i === 1
                        ? "opacity-0 scale-x-0"
                        : "-rotate-45 -translate-y-[7px]"
                      : ""
                  }`}
                />
              ))}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden bg-white border-t border-zinc-100 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-5 flex flex-col">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-xs font-bold tracking-[0.22em] uppercase text-zinc-700 hover:text-[#004960] py-3.5 border-b border-zinc-100 last:border-0 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
