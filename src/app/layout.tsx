import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AO Point — Engineered for Play",
  description:
    "3D-printed gear for collectors and competitors. TCG accessories, sports gear, figures & tech from the Philippines.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased bg-white text-zinc-900">{children}</body>
    </html>
  );
}
