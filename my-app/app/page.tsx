import HeroSection from "@/components/home/hero-section";
import BgGradient from "@/components/common/bg-gradient";
import DemoSection from "@/components/home/demo-section";
import Demo from "@/components/home/demo";

export default function Home() {
  return (
      <div className="relative w-full">
        <BgGradient />
        <div className="flex flex-col">
          <HeroSection />
          <DemoSection />
          <Demo />

        </div>
        {/* <DemoSection />
        <PricingSection />
        <CTASection/> */}
      </div>
  );
}
