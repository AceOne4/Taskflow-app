import AboutUsSection from "@/components/homeComp/Aboutus";
import FeaturesSection from "@/components/homeComp/Features";
import HeroSection from "@/components/homeComp/HeroSection";
import TestimonialsSection from "@/components/homeComp/TestimonialsSection";

export const metadata = {
  title: "Task Flow",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AboutUsSection />
    </main>
  );
}
