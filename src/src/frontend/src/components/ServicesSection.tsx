import { Flame, Link, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const SERVICES = [
  {
    icon: Flame,
    title: "Gold Melting",
    description:
      "Professional gold melting services with precision temperature control, ensuring purity and quality for all your gold processing needs.",
  },
  {
    icon: Link,
    title: "Chain Making",
    description:
      "Expert chain crafting using advanced techniques, producing durable and beautifully finished gold chains of every style.",
  },
  {
    icon: Sparkles,
    title: "Polishing Gold Chain",
    description:
      "Professional polishing service that restores the brilliant shine and lustre of gold chains, making them look brand new.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "oklch(var(--bg-section))" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-3xl md:text-4xl gold-underline mb-8">
            Services
          </h2>
          <p
            className="text-sm tracking-wider uppercase mt-6 font-cinzel"
            style={{ color: "oklch(var(--text-secondary))" }}
          >
            Crafted with precision and passion
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="flex flex-col items-center text-center group"
                data-ocid={`services.item.${i + 1}`}
              >
                {/* Icon container */}
                <div className="relative mb-6">
                  <div
                    className="w-16 h-16 flex items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: "oklch(var(--gold-dim) / 0.5)",
                      backgroundColor: "oklch(var(--gold-bright) / 0.05)",
                    }}
                  >
                    <Icon
                      className="w-7 h-7 transition-colors duration-300"
                      style={{ color: "oklch(var(--gold-muted))" }}
                      strokeWidth={1.3}
                    />
                  </div>
                  <div
                    className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundColor: "oklch(var(--gold-bright) / 0.15)",
                    }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-cinzel font-semibold text-sm tracking-[0.1em] uppercase mb-4"
                  style={{ color: "oklch(var(--gold-bright))" }}
                >
                  {service.title}
                </h3>

                {/* Divider */}
                <div
                  className="w-8 h-px mb-4 transition-all duration-300 group-hover:w-12"
                  style={{ backgroundColor: "oklch(var(--gold-dim) / 0.6)" }}
                />

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(var(--text-secondary))" }}
                >
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
