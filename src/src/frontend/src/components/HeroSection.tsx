import { motion } from "motion/react";

export default function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex overflow-hidden"
      style={{ backgroundColor: "oklch(var(--bg-deep))" }}
    >
      {/* Left: Text Content */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 px-8 sm:px-12 lg:px-16 xl:px-20 pt-24 pb-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div
            className="h-px w-10"
            style={{ backgroundColor: "oklch(var(--gold-muted))" }}
          />
          <span
            className="font-cinzel text-[0.65rem] tracking-[0.3em] uppercase"
            style={{ color: "oklch(var(--gold-muted))" }}
          >
            Master Craftsmen · 10+ Years
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6"
          style={{ color: "oklch(var(--gold-bright))" }}
        >
          Bespoke Gold
          <br />
          <span style={{ color: "oklch(var(--text-primary))" }}>&amp;</span>
          <br />
          Metal Craftsmanship
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-base sm:text-lg mb-10 max-w-md leading-relaxed"
          style={{ color: "oklch(var(--text-secondary))" }}
        >
          Transforming precious metals into timeless works of art. Each piece is
          crafted with uncompromising precision and devotion to excellence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            type="button"
            data-ocid="home.primary_button"
            onClick={() => scrollTo("#products")}
            className="btn-gold"
          >
            Explore Our Work
          </button>
          <button
            type="button"
            data-ocid="home.secondary_button"
            onClick={() => scrollTo("#booking")}
            className="btn-gold-outline"
          >
            Book a Consultation
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-10 mt-12 pt-8"
          style={{ borderTop: "1px solid oklch(var(--border-subtle))" }}
        >
          {[
            { value: "10+", label: "Years Experience" },
            { value: "5K+", label: "Pieces Crafted" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-cinzel text-2xl font-bold"
                style={{ color: "oklch(var(--gold-bright))" }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs tracking-widest uppercase mt-1"
                style={{ color: "oklch(var(--text-secondary))" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right: Image Placeholder Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="hidden lg:flex absolute inset-y-0 right-0 w-1/2 items-center justify-center"
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.11 0.004 55) 0%, oklch(0.14 0.010 65) 50%, oklch(0.12 0.007 72) 100%)",
          }}
        />

        {/* Placeholder area for future image */}
        <div
          className="relative z-10 flex flex-col items-center justify-center w-72 h-80 rounded-sm"
          style={{
            border: "1px dashed oklch(var(--gold-dim) / 0.3)",
          }}
        >
          <div
            className="w-10 h-10 mb-4 opacity-30"
            style={{ color: "oklch(var(--gold-muted))" }}
          >
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="4"
                width="32"
                height="32"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <circle
                cx="14"
                cy="15"
                r="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M4 26 L13 18 L20 24 L27 17 L36 26"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="font-cinzel text-[0.6rem] tracking-[0.2em] uppercase opacity-40"
            style={{ color: "oklch(var(--gold-muted))" }}
          >
            Image Coming Soon
          </span>
        </div>

        {/* Overlay gradient on left edge to blend with text column */}
        <div
          className="absolute inset-y-0 left-0 w-32"
          style={{
            background:
              "linear-gradient(to right, oklch(var(--bg-deep)), transparent)",
          }}
        />
      </motion.div>

      {/* Mobile background overlay */}
      <div
        className="lg:hidden absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, oklch(0.17 0.015 65 / 0.3), transparent 70%)",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="font-cinzel text-[0.6rem] tracking-[0.3em] uppercase"
          style={{ color: "oklch(var(--text-secondary) / 0.5)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="w-px h-8"
          style={{ backgroundColor: "oklch(var(--gold-dim) / 0.5)" }}
        />
      </motion.div>
    </section>
  );
}
