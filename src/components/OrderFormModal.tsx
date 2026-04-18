"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/products";

interface OrderForm {
  name: string;
  contact: string;
  email: string;
  product: string;
  quantity: number;
  address: string;
  paymentMethod: string;
}

type FormErrors = Partial<Record<keyof OrderForm, string>>;

const PAYMENT_METHODS = [
  { value: "gcash", label: "GCash" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cod", label: "Cash on Delivery" },
];

interface Props {
  product: Product;
  onClose: () => void;
}

export default function OrderFormModal({ product, onClose }: Props) {
  const [form, setForm] = useState<OrderForm>({
    name: "",
    contact: "",
    email: "",
    product: product.name,
    quantity: 1,
    address: "",
    paymentMethod: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function setField<K extends keyof OrderForm>(key: K, value: OrderForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.contact.trim()) e.contact = "Contact number is required";
    if (!form.address.trim()) e.address = "Delivery address is required";
    if (!form.paymentMethod) e.paymentMethod = "Please select a payment method";
    if (form.quantity < 1) e.quantity = "Must be at least 1";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: product.price,
          total: product.price * form.quantity,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = (field: keyof OrderForm) =>
    `w-full px-4 py-3 text-sm bg-zinc-50 border outline-none transition-colors placeholder-zinc-400 text-zinc-900 ${
      errors[field]
        ? "border-red-400 focus:border-red-500 bg-red-50/30"
        : "border-zinc-200 focus:border-[#004960]"
    }`;

  /* ── Success state ── */
  if (status === "success") {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
        <div
          className="relative z-10 bg-white p-10 sm:p-12 text-center max-w-sm w-full shadow-2xl animate-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-14 h-14 bg-[#004960] rounded-full flex items-center justify-center mx-auto mb-5">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M4 11L9 16L18 6"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">Order Received!</h3>
          <p className="text-sm text-zinc-500 leading-relaxed mb-7">
            Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}! We&apos;ll
            contact you at <strong>{form.contact}</strong> shortly to confirm your
            order.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-[#004960] text-white font-bold text-[11px] tracking-[0.25em] uppercase hover:bg-[#003347] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      <div
        className="relative z-10 bg-white w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="sticky top-0 bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#004960]">
              Place Order
            </p>
            <h2 className="text-base font-bold text-zinc-900 mt-0.5">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
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

        {/* Product summary strip */}
        <div className="bg-zinc-50 mx-6 mt-5 px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-zinc-600">{product.name}</span>
          <span className="font-bold text-[#004960]">
            ₱{(product.price * form.quantity).toLocaleString()}
          </span>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} noValidate className="px-6 pb-6 pt-4 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Juan dela Cruz"
              className={inputCls("name")}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-1.5">
              Contact Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={form.contact}
              onChange={(e) => setField("contact", e.target.value)}
              placeholder="+63 917 000 0000"
              className={inputCls("contact")}
            />
            {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-1.5">
              Email{" "}
              <span className="font-normal normal-case text-zinc-400">(optional)</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder="juan@email.com"
              className={inputCls("email")}
            />
          </div>

          {/* Product + Quantity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-1.5">
                Product
              </label>
              <input
                type="text"
                value={form.product}
                readOnly
                className="w-full px-4 py-3 text-sm bg-zinc-100 border border-zinc-200 text-zinc-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-1.5">
                Qty <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                min={1}
                max={99}
                value={form.quantity}
                onChange={(e) =>
                  setField("quantity", Math.max(1, parseInt(e.target.value) || 1))
                }
                className={inputCls("quantity")}
              />
              {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-1.5">
              Delivery Address <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
              placeholder="Street, Barangay, City, Province"
              rows={2}
              className={`${inputCls("address")} resize-none`}
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2.5">
              Payment Method <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.value}
                  type="button"
                  onClick={() => setField("paymentMethod", pm.value)}
                  className={`py-3 text-[11px] font-bold tracking-wide border transition-colors duration-150 ${
                    form.paymentMethod === pm.value
                      ? "bg-[#004960] border-[#004960] text-white"
                      : "bg-white border-zinc-200 text-zinc-600 hover:border-[#004960] hover:text-[#004960]"
                  }`}
                >
                  {pm.label}
                </button>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="text-xs text-red-500 mt-1.5">{errors.paymentMethod}</p>
            )}
          </div>

          {/* Error banner */}
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              Something went wrong. Please try again or contact us directly.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#004960] text-white font-bold text-[11px] tracking-[0.25em] uppercase hover:bg-[#003347] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 mt-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting…
              </>
            ) : (
              "Confirm Order"
            )}
          </button>

          <p className="text-center text-xs text-zinc-400 pb-2">
            We&apos;ll contact you within 24 hours to confirm your order.
          </p>
        </form>
      </div>
    </div>
  );
}
