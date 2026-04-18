export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: "forest-deck-box",
    name: "Forest Deck Box",
    price: 450,
    image: "/Forest%20deck%20box.jpg",
    category: "TCG Accessories",
    badge: "New",
    description: "Nature-inspired texture, holds 120+ sleeved cards.",
  },
  {
    id: "deck-box",
    name: "Standard Deck Box",
    price: 380,
    image: "/Deck%20box.jpg",
    category: "TCG Accessories",
    description: "Clean profile, precision snap-fit lid.",
  },
  {
    id: "racket-holder",
    name: "Racket Holder",
    price: 550,
    image: "/Racket%20Holder.jpg",
    category: "Sports Gear",
    badge: "Popular",
    description: "Wall-mount holder for badminton & tennis rackets.",
  },
  {
    id: "custom-racket-holder",
    name: "Custom Racket Holder",
    price: 650,
    image: "/Custom%20Racket%20Holder.jpg",
    category: "Sports Gear",
    description: "Custom-fit dual-racket wall display.",
  },
];
