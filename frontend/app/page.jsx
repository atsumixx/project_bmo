import AmbientBackground from "@/components/AmbientBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import KioskSpecs from "@/components/KioskSpecs";
import Approach from "@/components/Approach";
import HowItWorks from "@/components/HowItWorks";
import Pillars from "@/components/Pillars";
import ImpactStats from "@/components/ImpactStats";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <AmbientBackground />
      <Header />
      <main className="flex-grow relative z-10">
        <Hero />
        <KioskSpecs />
        <Approach />
        <HowItWorks />
        <Pillars />
        <ImpactStats />
      </main>
      <Footer />
    </>
  );
}
