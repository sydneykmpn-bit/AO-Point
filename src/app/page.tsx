import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProduct from "@/components/FeaturedProduct";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedProduct />
      <CategorySection />
      <ProductGrid />
      <AboutSection />
      <Footer />
      <Chatbot />
    </main>
  );
}
