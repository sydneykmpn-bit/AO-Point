import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] max-h-[1080px] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/Carbonn%20Card%20Frame.jpg"
        alt="Carbonn Card Frame — AO Point hero product"
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />

      {/* Multi-layer cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-16">
        <div className="max-w-[600px]">
          {/* Eyebrow */}
          <p
            className="text-[11px] font-bold tracking-[0.45em] uppercase text-[#00b4d8] mb-7 animate-fade-in"
            style={{ animationDelay: "0.05s" }}
          >
            AO Point — Philippines
          </p>

          {/* Heading */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-bold text-white leading-[1.03] tracking-tight mb-6 animate-slide-in"
            style={{ animationDelay: "0.2s" }}
          >
            Engineered
            <br />
            <span className="text-[#00b4d8]">for Play.</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg lg:text-xl text-white/60 font-light leading-relaxed mb-10 max-w-[420px] animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            3D-printed gear for collectors and competitors.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Link
              href="#products"
              className="inline-flex items-center justify-center px-9 py-4 bg-[#004960] text-white font-bold text-[11px] tracking-[0.25em] uppercase hover:bg-[#003347] transition-all duration-200 hover:shadow-xl hover:shadow-[#004960]/40"
            >
              Shop Now
            </Link>
            <Link
              href="#collections"
              className="inline-flex items-center justify-center px-9 py-4 border border-white/35 text-white font-bold text-[11px] tracking-[0.25em] uppercase backdrop-blur-sm hover:bg-white/10 hover:border-white/65 transition-all duration-200"
            >
              Explore Terrain Series
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
        style={{ animationDelay: "1.4s" }}
      >
        <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-white/35">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
      </div>
    </section>
  );
}
