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
            Master Craftsmen Since 2014
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

      {/* Right: Decorative Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="hidden lg:block absolute inset-y-0 right-0 w-1/2"
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.11 0.004 55) 0%, oklch(0.17 0.015 65) 50%, oklch(0.13 0.010 72) 100%)",
          }}
        />

        {/* SVG Decorative metalwork */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 600 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="oklch(0.76 0.13 82)"
                stopOpacity="0.4"
              />
              <stop
                offset="100%"
                stopColor="oklch(0.76 0.13 82)"
                stopOpacity="0"
              />
            </radialGradient>
            <radialGradient id="goldGlow2" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="oklch(0.73 0.11 78)"
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor="oklch(0.73 0.11 78)"
                stopOpacity="0"
              />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Central glow */}
          <ellipse cx="300" cy="400" rx="250" ry="300" fill="url(#goldGlow)" />
          <ellipse cx="300" cy="300" rx="180" ry="180" fill="url(#goldGlow2)" />

          {/* Large outer ring */}
          <circle
            cx="300"
            cy="400"
            r="220"
            fill="none"
            stroke="oklch(0.73 0.11 80)"
            strokeWidth="0.7"
            strokeOpacity="0.4"
            filter="url(#glow)"
          />
          <circle
            cx="300"
            cy="400"
            r="210"
            fill="none"
            stroke="oklch(0.73 0.11 80)"
            strokeWidth="0.3"
            strokeOpacity="0.2"
          />
          <circle
            cx="300"
            cy="400"
            r="200"
            fill="none"
            stroke="oklch(0.73 0.11 80)"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            strokeDasharray="8 4"
          />

          {/* Middle rings */}
          <circle
            cx="300"
            cy="400"
            r="150"
            fill="none"
            stroke="oklch(0.76 0.13 82)"
            strokeWidth="1"
            strokeOpacity="0.6"
            filter="url(#glow)"
          />
          <circle
            cx="300"
            cy="400"
            r="145"
            fill="none"
            stroke="oklch(0.76 0.13 82)"
            strokeWidth="0.4"
            strokeOpacity="0.3"
          />

          {/* Inner rings */}
          <circle
            cx="300"
            cy="400"
            r="90"
            fill="none"
            stroke="oklch(0.76 0.13 82)"
            strokeWidth="1.5"
            strokeOpacity="0.8"
            filter="url(#glow)"
          />
          <circle
            cx="300"
            cy="400"
            r="84"
            fill="none"
            stroke="oklch(0.73 0.11 80)"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
          <circle
            cx="300"
            cy="400"
            r="55"
            fill="none"
            stroke="oklch(0.70 0.09 78)"
            strokeWidth="0.7"
            strokeOpacity="0.6"
            strokeDasharray="4 3"
          />

          {/* Center diamond */}
          <polygon
            points="300,360 330,400 300,440 270,400"
            fill="none"
            stroke="oklch(0.76 0.13 82)"
            strokeWidth="1.5"
            strokeOpacity="0.9"
            filter="url(#glow)"
          />
          <polygon
            points="300,368 322,400 300,432 278,400"
            fill="oklch(0.76 0.13 82 / 0.05)"
            stroke="oklch(0.76 0.13 82)"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
          {/* Center dot */}
          <circle
            cx="300"
            cy="400"
            r="4"
            fill="oklch(0.76 0.13 82)"
            opacity="0.9"
            filter="url(#glow)"
          />

          {/* Cross lines */}
          <line
            x1="300"
            y1="180"
            x2="300"
            y2="620"
            stroke="oklch(0.73 0.11 80)"
            strokeWidth="0.4"
            strokeOpacity="0.25"
          />
          <line
            x1="80"
            y1="400"
            x2="520"
            y2="400"
            stroke="oklch(0.73 0.11 80)"
            strokeWidth="0.4"
            strokeOpacity="0.25"
          />

          {/* Diagonal lines */}
          <line
            x1="130"
            y1="200"
            x2="470"
            y2="600"
            stroke="oklch(0.73 0.11 80)"
            strokeWidth="0.3"
            strokeOpacity="0.15"
          />
          <line
            x1="470"
            y1="200"
            x2="130"
            y2="600"
            stroke="oklch(0.73 0.11 80)"
            strokeWidth="0.3"
            strokeOpacity="0.15"
          />

          {/* Corner ornaments */}
          {[
            { x: 300, y: 180, id: "top" },
            { x: 300, y: 620, id: "bottom" },
            { x: 80, y: 400, id: "left" },
            { x: 520, y: 400, id: "right" },
          ].map((pos) => (
            <g key={pos.id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="6"
                fill="none"
                stroke="oklch(0.76 0.13 82)"
                strokeWidth="1.5"
                strokeOpacity="0.8"
                filter="url(#glow)"
              />
              <circle
                cx={pos.x}
                cy={pos.y}
                r="2"
                fill="oklch(0.76 0.13 82)"
                opacity="0.9"
              />
            </g>
          ))}

          {/* Small diamonds at intersections */}
          {[
            { x: 300, y: 250, id: "d-top" },
            { x: 300, y: 550, id: "d-bottom" },
            { x: 150, y: 400, id: "d-left" },
            { x: 450, y: 400, id: "d-right" },
          ].map((pos) => (
            <polygon
              key={pos.id}
              points={`${pos.x},${pos.y - 8} ${pos.x + 8},${pos.y} ${pos.x},${pos.y + 8} ${pos.x - 8},${pos.y}`}
              fill="none"
              stroke="oklch(0.73 0.11 80)"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
          ))}

          {/* Outer corner arcs */}
          <path
            d="M 100 150 Q 300 100 500 150"
            fill="none"
            stroke="oklch(0.73 0.11 80)"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <path
            d="M 100 650 Q 300 700 500 650"
            fill="none"
            stroke="oklch(0.73 0.11 80)"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />

          {/* Scattered small dots */}
          {[
            { cx: 180, cy: 250 },
            { cx: 420, cy: 250 },
            { cx: 140, cy: 340 },
            { cx: 460, cy: 340 },
            { cx: 140, cy: 460 },
            { cx: 460, cy: 460 },
            { cx: 180, cy: 550 },
            { cx: 420, cy: 550 },
          ].map((pos) => (
            <circle
              key={`dot-${pos.cx}-${pos.cy}`}
              cx={pos.cx}
              cy={pos.cy}
              r="1.5"
              fill="oklch(0.73 0.11 80)"
              opacity="0.5"
            />
          ))}
        </svg>

        {/* Overlay gradient on left edge to blend with text column */}
        <div
          className="absolute inset-y-0 left-0 w-32"
          style={{
            background:
              "linear-gradient(to right, oklch(var(--bg-deep)), transparent)",
          }}
        />

        {/* Subtle top/bottom fades */}
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, oklch(var(--bg-deep) / 0.4), transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              "linear-gradient(to top, oklch(var(--bg-deep) / 0.4), transparent)",
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
