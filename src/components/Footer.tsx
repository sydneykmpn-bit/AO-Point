import Link from "next/link";

const shopLinks = [
  "TCG Accessories",
  "Sports Gear",
  "Figures",
  "Tech Gear",
  "New Arrivals",
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10 lg:pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pb-12 border-b border-white/[0.07]">
          {/* Brand */}
          <div>
            <div className="text-lg font-bold tracking-[0.22em] uppercase mb-5">
              AO
              <span className="text-[#00b4d8] ml-1.5">Point</span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-[220px]">
              3D-printed gear for collectors and competitors. Precision-crafted
              in the Philippines.
            </p>
          </div>

          {/* Shop nav */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.35em] uppercase text-white/25 mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.35em] uppercase text-white/25 mb-5">
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="mailto:aori.brandph@gmail.com"
                  className="text-sm text-white/45 hover:text-white transition-colors duration-200 break-all"
                >
                  aori.brandph@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+639178906176"
                  className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                >
                  +63 917 890 6176
                </a>
              </li>
              <li className="pt-1">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">
                  Philippines
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20">
            © {new Date().getFullYear()} AO Point. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[11px] text-white/20 hover:text-white/50 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
