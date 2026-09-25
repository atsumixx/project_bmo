import AmbientBackground from "@/components/AmbientBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import KioskSpecs from "@/components/KioskSpecs";
import Approach from "@/components/Approach";
import HowItWorks from "@/components/HowItWorks";
import InteractiveDemo from "@/components/InteractiveDemo";
import Pillars from "@/components/Pillars";
import TechSystem from "@/components/TechSystem";
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
        <InteractiveDemo />
        <Pillars />
        <TechSystem />
        <ImpactStats />
      </main>
      <Footer />
    </>
  );
}
