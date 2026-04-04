import { Crown } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Booking", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { icon: SiFacebook, href: "#", label: "Facebook" },
  { icon: SiInstagram, href: "#", label: "Instagram" },
  { icon: SiX, href: "#", label: "X / Twitter" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer
      style={{
        backgroundColor: "oklch(0.09 0.004 55)",
        borderTop: "1px solid oklch(var(--gold-dim) / 0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-12">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Crown
                className="w-5 h-5"
                style={{ color: "oklch(var(--gold-muted))" }}
                strokeWidth={1.5}
              />
              <span
                className="font-cinzel font-bold text-sm tracking-[0.2em] uppercase"
                style={{ color: "oklch(var(--gold-bright))" }}
              >
                Ask Gold Works
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-2 max-w-xs"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              Master craftsmen dedicated to creating timeless gold and metalwork
              pieces. Every creation tells a story of artistry and passion.
            </p>
            <p
              className="text-xs mb-6"
              style={{ color: "oklch(var(--gold-dim))" }}
            >
              Owners: Sachin &amp; Kumar
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200 hover:scale-110"
                  style={{
                    borderColor: "oklch(var(--gold-dim) / 0.4)",
                    color: "oklch(var(--text-secondary))",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              className="font-cinzel text-xs tracking-[0.2em] uppercase mb-6"
              style={{ color: "oklch(var(--gold-bright))" }}
            >
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-sm transition-colors w-fit"
                  style={{ color: "oklch(var(--text-secondary))" }}
                >
                  <span className="hover:text-gold-bright">{link.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4
              className="font-cinzel text-xs tracking-[0.2em] uppercase mb-6"
              style={{ color: "oklch(var(--gold-bright))" }}
            >
              Contact
            </h4>
            <div
              className="space-y-3 text-sm"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              <p>Ponniyakurissi, Perinthalmanna</p>
              <p>Malappuram, Kerala – 679322</p>
              <p className="pt-1">
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="hover:text-gold-bright transition-colors"
                  style={{ color: "oklch(var(--text-secondary))" }}
                >
                  +91 XXXXX XXXXX
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@askgoldworks.com"
                  className="hover:text-gold-bright transition-colors"
                  style={{ color: "oklch(var(--text-secondary))" }}
                >
                  info@askgoldworks.com
                </a>
              </p>
              <p className="pt-1">Mon–Sat 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderTop: "1px solid oklch(var(--border-subtle))",
            color: "oklch(var(--text-secondary) / 0.6)",
          }}
        >
          <p>© {currentYear} Ask Gold Works. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "oklch(var(--gold-dim))" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
