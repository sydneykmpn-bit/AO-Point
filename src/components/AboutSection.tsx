import { FadeIn } from "./FadeIn";

const stats = [
  { value: "100+", label: "Products Sold" },
  { value: "3D", label: "Precision Printed" },
  { value: "PH", label: "Based & Shipped" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-44 bg-[#004960] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        {/* Eyebrow */}
        <FadeIn>
          <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#00b4d8] mb-10">
            About AO Point
          </p>
        </FadeIn>

        {/* Main quote */}
        <FadeIn delay={120}>
          <blockquote className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold text-white leading-[1.15] tracking-tight mb-8">
            &ldquo;AO Point creates tools for focus, play, and performance.&rdquo;
          </blockquote>
        </FadeIn>

        {/* Supporting text */}
        <FadeIn delay={250}>
          <p className="text-lg text-white/45 font-light leading-relaxed max-w-xl mx-auto">
            Combining precision 3D printing with intentional design — built in
            the Philippines, engineered for the world.
          </p>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={380}>
          <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-3 gap-8 max-w-sm mx-auto">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-white mb-1.5">{s.value}</div>
                <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/35">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
