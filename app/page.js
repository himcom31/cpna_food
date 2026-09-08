import HeroBanner from "@/components/Herobanner";
import CategoriesSection from "@/components/CategoriesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <CategoriesSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}