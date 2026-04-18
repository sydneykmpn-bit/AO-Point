"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "./FadeIn";
import { products, Product } from "@/lib/products";
import ProductModal from "./ProductModal";
import OrderFormModal from "./OrderFormModal";

export default function ProductGrid() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [ordering, setOrdering] = useState<Product | null>(null);

  return (
    <>
      <section id="products" className="py-24 lg:py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <FadeIn>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-[10px] font-bold tracking-[0.45em] uppercase text-[#004960] mb-3">
                  Products
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
                  Our Products
                </h2>
              </div>
              {/* "View All" scrolls to section top */}
              <button
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="hidden sm:flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-[#004960] transition-colors duration-200"
              >
                View All <span className="text-base leading-none">→</span>
              </button>
            </div>
          </FadeIn>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, i) => (
              <FadeIn key={product.id} delay={i * 90}>
                <button
                  onClick={() => setSelected(product)}
                  className="group block w-full text-left"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-square bg-zinc-50 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-[#004960] text-white text-[10px] font-bold tracking-[0.25em] uppercase px-2.5 py-1">
                        {product.badge}
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    {/* View Details CTA */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                      <span className="bg-white text-zinc-900 text-[10px] font-bold tracking-[0.22em] uppercase px-5 py-2.5 shadow-lg">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-400 mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-sm font-bold text-zinc-900 tracking-tight mb-1 group-hover:text-[#004960] transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-base font-bold text-[#004960]">
                      ₱{product.price.toLocaleString()}
                    </p>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Product detail modal */}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onBuyNow={() => {
            setOrdering(selected);
            setSelected(null);
          }}
        />
      )}

      {/* Order form modal */}
      {ordering && (
        <OrderFormModal
          product={ordering}
          onClose={() => setOrdering(null)}
        />
      )}
    </>
  );
}
