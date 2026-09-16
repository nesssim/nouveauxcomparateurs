import { Hero } from "@/components/home/Hero";
import { PartnerCarousel } from "@/components/home/PartnerCarousel";
import { ValueProposition } from "@/components/home/ValueProposition";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { AdvisorSection } from "@/components/home/AdvisorSection";
import { TrustBanner } from "@/components/home/TrustBanner";
import { AvisSection } from "@/components/home/AvisSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <PartnerCarousel />
      <AdvisorSection />
      <TrustBanner />
      <ValueProposition />
      <AvisSection />
    </>
  );
}
