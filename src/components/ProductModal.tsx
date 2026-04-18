"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Product } from "@/lib/products";

interface Props {
  product: Product;
  onClose: () => void;
  onBuyNow: () => void;
}

export default function ProductModal({ product, onClose, onBuyNow }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Panel */}
      <div
        className="relative z-10 bg-white w-full max-w-[540px] max-h-[92vh] overflow-y-auto shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/95 backdrop-blur-sm flex items-center justify-center hover:bg-zinc-100 transition-colors shadow-sm"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M1 1L10 10M10 1L1 10"
              stroke="#18181b"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="relative aspect-[4/3] bg-zinc-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-[#004960] text-white text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1.5">
              {product.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#004960] mb-2">
            {product.category}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-1">
            {product.name}
          </h2>
          <p className="text-[26px] font-bold text-[#004960] mb-5">
            ₱{product.price.toLocaleString()}
          </p>

          <div className="w-8 h-[2px] bg-[#004960] mb-5" />

          <p className="text-sm text-zinc-500 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Detail bullets */}
          {product.details && (
            <ul className="space-y-2 mb-8">
              {product.details.map((d) => (
                <li key={d} className="flex items-center gap-3 text-sm text-zinc-600">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#004960] flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          )}

          {/* CTAs */}
          <div className="flex gap-3">
            <button
              onClick={onBuyNow}
              className="flex-1 py-4 bg-[#004960] text-white font-bold text-[11px] tracking-[0.25em] uppercase hover:bg-[#003347] transition-colors duration-200"
            >
              Buy Now
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-4 border border-zinc-200 text-zinc-600 font-bold text-[11px] tracking-[0.25em] uppercase hover:border-zinc-400 transition-colors duration-200"
            >
              Keep Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
