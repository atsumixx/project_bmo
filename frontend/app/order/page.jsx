import AmbientBackground from "@/components/AmbientBackground";
import AuthHeader from "@/components/AuthHeader";
import PreOrder from "@/components/PreOrder";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Order & Deploy — Project BMO",
  description:
    "Request Project BMO kiosk units for your civic counter, hospital, or campus — pricing, delivery details, and a formal requisition in one place.",
};

export default function OrderPage() {
  return (
    <>
      <AmbientBackground />
      <AuthHeader />
      <main className="flex-grow relative z-10">
        <PreOrder />
      </main>
      <Footer />
    </>
  );
}
