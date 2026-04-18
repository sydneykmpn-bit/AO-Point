export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  description: string;
  details?: string[];
}

export const products: Product[] = [
  {
    id: "forest-deck-box",
    name: "Forest Deck Box",
    price: 450,
    image: "/Forest%20deck%20box.jpg",
    category: "TCG Accessories",
    badge: "New",
    description:
      "Precision 3D-printed from PLA+ with a nature-inspired organic texture. Holds 120+ double-sleeved cards with a snap-fit lid closure. Designed for serious TCG players who value both function and aesthetics.",
    details: [
      "Holds 120+ double-sleeved cards",
      "Precision snap-fit lid closure",
      "Nature-inspired organic texture",
      "Lightweight PLA+ — drop-tested",
    ],
  },
  {
    id: "deck-box",
    name: "Standard Deck Box",
    price: 380,
    image: "/Deck%20box.jpg",
    category: "TCG Accessories",
    description:
      "The go-to deck box for everyday play. Clean geometric profile, precision snap-fit lid, and durable PLA+ construction. Fits 60–80 single-sleeved or 60 double-sleeved cards.",
    details: [
      "Fits 60–80 single-sleeved cards",
      "Precision snap-fit lid",
      "Clean geometric profile",
      "Durable PLA+ construction",
    ],
  },
  {
    id: "racket-holder",
    name: "Racket Holder",
    price: 550,
    image: "/Racket%20Holder.jpg",
    category: "Sports Gear",
    badge: "Popular",
    description:
      "Wall-mount racket holder engineered for badminton and tennis rackets. Secure grip design with protective contact points. Mounts cleanly to any flat wall surface. Keeps your gear organized and display-ready.",
    details: [
      "Fits badminton & tennis rackets",
      "Secure wall-mount installation",
      "Protective grip contact points",
      "Sleek display-ready finish",
    ],
  },
  {
    id: "custom-racket-holder",
    name: "Custom Racket Holder",
    price: 650,
    image: "/Custom%20Racket%20Holder.jpg",
    category: "Sports Gear",
    description:
      "Dual-slot custom racket wall display built to order. Holds two rackets side by side with a premium finished surface. Great for players who want both storage and a showpiece.",
    details: [
      "Dual-slot — holds 2 rackets",
      "Built to order, custom fit",
      "Premium surface finish",
      "Ideal for display & storage",
    ],
  },
];
