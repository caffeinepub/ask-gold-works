import { CheckCircle, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useSubmitContact } from "../hooks/useQueries";

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    value: "Ponniyakurissi, Perinthalmanna\nMalappuram, Kerala – 679322",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 99474 52377",
  },
  {
    icon: Mail,
    label: "Email",
    value: "askgoldworks@gmail.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat 9:00 AM – 6:00 PM",
  },
];

export default function ContactSection() {
  const { actor } = useActor();
  const submitContact = useSubmitContact();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Service not available. Please try again.");
      return;
    }
    try {
      const ok = await submitContact.mutateAsync({
        actor,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });
      if (ok) {
        setSubmitted(true);
      } else {
        toast.error("Message failed to send. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "oklch(var(--bg-deep))" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-3xl md:text-4xl gold-underline">
            Get in Touch
          </h2>
          <p
            className="mt-8 text-sm font-cinzel tracking-wider uppercase"
            style={{ color: "oklch(var(--text-secondary))" }}
          >
            We're here to bring your vision to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <h3
              className="font-cinzel font-semibold text-lg tracking-wider uppercase mb-2"
              style={{ color: "oklch(var(--gold-bright))" }}
            >
              Visit Our Studio
            </h3>
            <p
              className="text-sm mb-8"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              Owners:{" "}
              <span style={{ color: "oklch(var(--gold-muted))" }}>
                Sachin &amp; Kumar
              </span>
            </p>
            <div className="space-y-6">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border"
                      style={{
                        borderColor: "oklch(var(--gold-dim) / 0.4)",
                        backgroundColor: "oklch(var(--gold-bright) / 0.06)",
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: "oklch(var(--gold-muted))" }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <p
                        className="text-xs font-cinzel tracking-widest uppercase mb-1"
                        style={{ color: "oklch(var(--gold-dim))" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-sm leading-relaxed whitespace-pre-line"
                        style={{ color: "oklch(var(--text-secondary))" }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Decorative divider */}
            <div
              className="mt-10 h-px"
              style={{
                background:
                  "linear-gradient(to right, oklch(var(--gold-dim) / 0.5), transparent)",
              }}
            />
            <p
              className="mt-6 text-sm leading-relaxed"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              Every consultation begins with listening — tell us your vision and
              let our craftsmen create something extraordinary for you.
            </p>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  data-ocid="contact.success_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-16"
                >
                  <CheckCircle
                    className="w-12 h-12 mb-4"
                    style={{ color: "oklch(var(--gold-bright))" }}
                  />
                  <h3
                    className="font-cinzel text-lg font-bold tracking-wider mb-3"
                    style={{ color: "oklch(var(--gold-bright))" }}
                  >
                    Message Sent
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-xs"
                    style={{ color: "oklch(var(--text-secondary))" }}
                  >
                    Thank you for reaching out. We'll be in touch within 24
                    hours.
                  </p>
                  <button
                    type="button"
                    className="btn-gold-outline mt-6"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", message: "" });
                    }}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  data-ocid="contact.panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-cinzel tracking-wider uppercase mb-2"
                        style={{ color: "oklch(var(--gold-muted))" }}
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        data-ocid="contact.input"
                        className="input-gold"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Your full name"
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-cinzel tracking-wider uppercase mb-2"
                        style={{ color: "oklch(var(--gold-muted))" }}
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        data-ocid="contact.input"
                        type="email"
                        className="input-gold"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-cinzel tracking-wider uppercase mb-2"
                      style={{ color: "oklch(var(--gold-muted))" }}
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      data-ocid="contact.input"
                      type="tel"
                      className="input-gold"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-cinzel tracking-wider uppercase mb-2"
                      style={{ color: "oklch(var(--gold-muted))" }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      data-ocid="contact.textarea"
                      className="input-gold resize-none"
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  <button
                    data-ocid="contact.submit_button"
                    type="submit"
                    disabled={submitContact.isPending}
                    className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitContact.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
