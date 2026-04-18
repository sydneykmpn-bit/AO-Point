import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./FadeIn";

const features = [
  "Holds 120+ double-sleeved cards",
  "Precision snap-fit lid closure",
  "Nature-inspired organic texture",
  "Lightweight PLA+ — drop-tested",
];

export default function FeaturedProduct() {
  return (
    <section id="featured" className="py-24 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Image */}
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50 group">
              <Image
                src="/Forest%20deck%20box.jpg"
                alt="Forest Deck Box by AO Point"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute top-5 left-5 bg-[#004960] text-white text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1.5">
                New Arrival
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn delay={160}>
            <div className="space-y-7 lg:pl-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#004960] mb-3">
                  Featured — TCG Accessories
                </p>
                <h2 className="text-4xl lg:text-5xl xl:text-[56px] font-bold text-zinc-900 leading-[1.05] tracking-tight">
                  Forest
                  <br />
                  Deck Box
                </h2>
              </div>

              <div className="w-10 h-[3px] bg-[#004960]" />

              <p className="text-lg text-zinc-400 leading-relaxed font-light max-w-md">
                Precision 3D-printed from PLA+ with a nature-inspired texture.
                Built for serious competitors who care as much about aesthetics
                as they do about the game.
              </p>

              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-zinc-600">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#004960] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-zinc-900">₱450</span>
                <span className="text-xs text-zinc-400 tracking-wide">
                  Free shipping on orders over ₱1,000
                </span>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#004960] text-white font-bold text-[11px] tracking-[0.22em] uppercase hover:bg-[#003347] transition-colors duration-200"
                >
                  Add to Cart
                </Link>
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-zinc-200 text-zinc-600 font-bold text-[11px] tracking-[0.22em] uppercase hover:border-[#004960] hover:text-[#004960] transition-colors duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
