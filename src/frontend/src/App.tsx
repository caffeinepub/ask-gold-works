import { Toaster } from "@/components/ui/sonner";
import AdminBookingsPanel from "./components/AdminBookingsPanel";
import BookingSection from "./components/BookingSection";
import ChainsSection from "./components/ChainsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProductsSection from "./components/ProductsSection";
import ServicesSection from "./components/ServicesSection";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(var(--bg-deep))" }}
    >
      <Navbar />

      <main>
        <HeroSection />
        <ServicesSection />
        <ChainsSection />
        <ProductsSection />
        <BookingSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Admin bookings panel (floating login + slide-out panel) */}
      <AdminBookingsPanel />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            backgroundColor: "oklch(var(--bg-section))",
            border: "1px solid oklch(var(--border-subtle))",
            color: "oklch(var(--text-primary))",
          },
        }}
      />
    </div>
  );
}
