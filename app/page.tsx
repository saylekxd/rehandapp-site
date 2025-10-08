import HeroSection from '@/components/sections/hero-section';
import FeaturesSection from '@/components/sections/features-section';
import HowItWorksSection from '@/components/sections/how-it-works-section';
import PricingSection from '@/components/sections/pricing-section';
import CTASection from '@/components/sections/cta-section';
import PartnersSection from '@/components/sections/partners-section';
import { Features } from "@/components/sections/features-8"
import { Testimonials } from "@/components/sections/testimonials-section"
import ExercisesSection from '@/components/sections/exercises-section';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero and Partners wrapper with responsive height distribution */}
      <div className="w-full min-h-screen lg:h-screen relative flex flex-col">
        {/* Hero takes most of the space but leaves room for partners */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <HeroSection />
        </div>
        {/* Partners section at bottom with fixed space */}
        <div className="flex-shrink-0">
          <PartnersSection />
        </div>
      </div>
      <FeaturesSection />
      <HowItWorksSection />
      <Features />
      <ExercisesSection />
      <PricingSection />
      <Testimonials />
      <CTASection />
    </div>
  );
}