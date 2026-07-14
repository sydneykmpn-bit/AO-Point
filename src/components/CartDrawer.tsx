"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import CartCheckoutModal from "./CartCheckoutModal";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, total } =
    useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex justify-end" onClick={closeCart}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

        {/* Panel */}
        <div
          className="relative z-10 bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
            <h2 className="text-base font-bold tracking-[0.15em] uppercase text-zinc-900">
              Your Cart {items.length > 0 && `(${items.length})`}
            </h2>
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="w-9 h-9 flex items-center justify-center hover:bg-zinc-100 transition-colors"
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
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
              <p className="text-sm text-zinc-400 mb-1">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#004960] hover:underline mt-3"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <div className="relative w-20 h-20 bg-zinc-50 flex-shrink-0 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-zinc-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#004960] font-bold mt-0.5">
                      ₱{product.price.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-zinc-200">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-zinc-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="text-[11px] font-bold tracking-wide uppercase text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-zinc-100 px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-zinc-500 tracking-wide uppercase">
                  Total
                </span>
                <span className="text-xl font-bold text-[#004960]">
                  ₱{total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setCheckingOut(true)}
                className="w-full py-4 bg-[#004960] text-white font-bold text-[11px] tracking-[0.25em] uppercase hover:bg-[#003347] transition-colors duration-200"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {checkingOut && (
        <CartCheckoutModal
          onClose={() => setCheckingOut(false)}
          onSuccess={() => {
            setCheckingOut(false);
            closeCart();
          }}
        />
      )}
    </>
  );
}
