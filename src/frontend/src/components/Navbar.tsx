import { useQueryClient } from "@tanstack/react-query";
import { Crown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Chains", href: "#chains" },
  { label: "Products", href: "#products" },
  { label: "Booking", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: isAdmin } = useIsAdmin();
  const isAuthenticated = !!identity;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error?.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[oklch(0.10_0.005_60/0.97)] backdrop-blur-md shadow-[0_2px_20px_oklch(0_0_0/0.5)]"
            : "bg-[oklch(0.10_0.005_60/0.9)] backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              type="button"
              data-ocid="nav.link"
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <Crown
                  className="w-5 h-5 text-gold-bright transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
              </div>
              <span
                className="font-cinzel font-bold text-xs md:text-sm tracking-[0.2em] uppercase"
                style={{ color: "oklch(var(--gold-bright))" }}
              >
                Ask Gold Works
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link.href)}
                  className="nav-link"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <span
                      className="text-[0.65rem] font-cinzel tracking-widest px-2 py-1 border rounded-sm"
                      style={{
                        color: "oklch(var(--gold-bright))",
                        borderColor: "oklch(var(--gold-dim))",
                        backgroundColor: "oklch(var(--gold-bright) / 0.08)",
                      }}
                    >
                      ADMIN
                    </span>
                  )}
                  <button
                    type="button"
                    data-ocid="nav.link"
                    onClick={handleAuth}
                    className="text-[0.7rem] font-cinzel tracking-widest uppercase transition-colors"
                    style={{ color: "oklch(var(--text-secondary))" }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  data-ocid="nav.link"
                  onClick={handleAuth}
                  disabled={isLoggingIn}
                  className="text-[0.65rem] font-cinzel tracking-widest uppercase transition-colors disabled:opacity-50"
                  style={{ color: "oklch(var(--text-secondary))" }}
                >
                  {isLoggingIn ? "Logging in..." : "Admin Login"}
                </button>
              )}
              <button
                type="button"
                data-ocid="nav.primary_button"
                onClick={() => scrollTo("#booking")}
                className="btn-gold"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              data-ocid="nav.toggle"
              className="lg:hidden p-2"
              style={{ color: "oklch(var(--gold-bright))" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ backgroundColor: "oklch(var(--bg-deep) / 0.98)" }}
          >
            <div className="flex flex-col h-full pt-24 px-8 pb-8">
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    data-ocid="nav.link"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(link.href)}
                    className="text-left font-cinzel font-medium tracking-[0.2em] uppercase text-lg transition-colors"
                    style={{ color: "oklch(var(--text-secondary))" }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <button
                  type="button"
                  data-ocid="nav.primary_button"
                  onClick={() => scrollTo("#booking")}
                  className="btn-gold w-full text-center"
                >
                  Book Appointment
                </button>
                {isAuthenticated ? (
                  <button
                    type="button"
                    data-ocid="nav.link"
                    onClick={handleAuth}
                    className="text-sm font-cinzel tracking-widest uppercase text-center transition-colors"
                    style={{ color: "oklch(var(--text-secondary))" }}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    type="button"
                    data-ocid="nav.link"
                    onClick={handleAuth}
                    disabled={isLoggingIn}
                    className="text-sm font-cinzel tracking-widest uppercase text-center transition-colors disabled:opacity-50"
                    style={{ color: "oklch(var(--text-secondary))" }}
                  >
                    {isLoggingIn ? "Logging in..." : "Admin Login"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
