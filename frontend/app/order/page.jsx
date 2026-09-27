import AuthHeader from "@/components/AuthHeader";
import PreOrder from "@/components/PreOrder";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pilot Demonstration — Project BMO",
  description:
    "Request a pilot demonstration for Project BMO, a BSIT capstone research prototype for Filipino Sign Language accessibility in public-service settings.",
};

export default function OrderPage() {
  return (
    <>
      <AuthHeader />
      <main className="flex-grow relative z-10">
        <PreOrder />
      </main>
      <Footer />
    </>
  );
}
