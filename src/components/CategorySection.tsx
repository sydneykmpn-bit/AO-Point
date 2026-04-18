import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./FadeIn";

const categories = [
  {
    name: "TCG Accessories",
    tag: "Collector Series",
    description: "Deck boxes, card frames & holders",
    image: "/Deck%20box.jpg",
    href: "#products",
  },
  {
    name: "Sports Gear",
    tag: "Performance Line",
    description: "Racket holders & wall mounts",
    image: "/Racket%20Holder%202.jpg",
    href: "#products",
  },
];

export default function CategorySection() {
  return (
    <section id="collections" className="py-24 lg:py-40 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-[0.45em] uppercase text-[#004960] mb-4">
              Collections
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
              Shop by Category
            </h2>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {categories.map((cat, i) => (
            <FadeIn key={cat.name} delay={i * 120}>
              <Link
                href={cat.href}
                className="group block relative overflow-hidden aspect-[4/3] bg-zinc-900"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] opacity-90"
                />

                {/* Base overlay */}
                <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/60" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                  <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#00b4d8] mb-2.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                    {cat.tag}
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/60 font-light translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-75 ease-out">
                    {cat.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-100 ease-out">
                    <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white">
                      Shop Now
                    </span>
                    <span className="text-white text-base leading-none">→</span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
