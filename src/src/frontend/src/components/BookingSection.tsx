import { CheckCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useSubmitBooking } from "../hooks/useQueries";

const SERVICES = [
  "Custom Jewelry Design",
  "Gold Restoration",
  "Metal Engraving",
  "Gold Plating",
  "Other",
];

const TIMES = [
  "Morning (9am–12pm)",
  "Afternoon (12pm–4pm)",
  "Evening (4pm–6pm)",
];

export default function BookingSection() {
  const { actor } = useActor();
  const submitBooking = useSubmitBooking();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    service: "",
    notes: "",
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
      const ok = await submitBooking.mutateAsync({
        actor,
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        service: form.service,
        notes: form.notes,
      });
      if (ok) {
        setSubmitted(true);
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="booking"
      className="py-24 lg:py-32 relative"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.14 0.018 60) 0%, oklch(0.12 0.010 55) 50%, oklch(0.16 0.022 68) 100%)",
      }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, oklch(0.76 0.13 82), oklch(0.76 0.13 82) 1px, transparent 1px, transparent 8px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-3xl md:text-4xl gold-underline">
            Schedule Your Consultation
          </h2>
          <p
            className="mt-8 text-sm font-cinzel tracking-wider uppercase"
            style={{ color: "oklch(var(--text-secondary))" }}
          >
            Reserve your appointment with our master craftsmen
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              data-ocid="booking.success_state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle
                className="w-16 h-16 mx-auto mb-6"
                style={{ color: "oklch(var(--gold-bright))" }}
              />
              <h3
                className="font-cinzel text-xl font-bold tracking-wider mb-4"
                style={{ color: "oklch(var(--gold-bright))" }}
              >
                Request Submitted
              </h3>
              <p
                className="max-w-md mx-auto text-sm leading-relaxed"
                style={{ color: "oklch(var(--text-secondary))" }}
              >
                Your appointment request has been submitted. We'll contact you
                shortly to confirm your consultation.
              </p>
              <button
                type="button"
                className="btn-gold-outline mt-8"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    preferredDate: "",
                    preferredTime: "",
                    service: "",
                    notes: "",
                  });
                }}
              >
                Make Another Request
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              data-ocid="booking.panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs font-cinzel tracking-wider uppercase mb-2"
                    style={{ color: "oklch(var(--gold-muted))" }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="booking-name"
                    data-ocid="booking.input"
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
                    htmlFor="booking-email"
                    className="block text-xs font-cinzel tracking-wider uppercase mb-2"
                    style={{ color: "oklch(var(--gold-muted))" }}
                  >
                    Email Address *
                  </label>
                  <input
                    id="booking-email"
                    data-ocid="booking.input"
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

              {/* Row 2: Phone + Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs font-cinzel tracking-wider uppercase mb-2"
                    style={{ color: "oklch(var(--gold-muted))" }}
                  >
                    Phone Number
                  </label>
                  <input
                    id="booking-phone"
                    data-ocid="booking.input"
                    type="tel"
                    className="input-gold"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label
                    htmlFor="booking-service"
                    className="block text-xs font-cinzel tracking-wider uppercase mb-2"
                    style={{ color: "oklch(var(--gold-muted))" }}
                  >
                    Service *
                  </label>
                  <select
                    id="booking-service"
                    data-ocid="booking.select"
                    className="input-gold"
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    required
                  >
                    <option
                      value=""
                      disabled
                      style={{ backgroundColor: "oklch(var(--bg-card))" }}
                    >
                      Select a service
                    </option>
                    {SERVICES.map((s) => (
                      <option
                        key={s}
                        value={s}
                        style={{ backgroundColor: "oklch(var(--bg-card))" }}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Date + Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-cinzel tracking-wider uppercase mb-2"
                    style={{ color: "oklch(var(--gold-muted))" }}
                  >
                    Preferred Date *
                  </label>
                  <input
                    id="booking-date"
                    data-ocid="booking.input"
                    type="date"
                    className="input-gold"
                    value={form.preferredDate}
                    onChange={(e) => update("preferredDate", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="booking-time"
                    className="block text-xs font-cinzel tracking-wider uppercase mb-2"
                    style={{ color: "oklch(var(--gold-muted))" }}
                  >
                    Preferred Time *
                  </label>
                  <select
                    id="booking-time"
                    data-ocid="booking.select"
                    className="input-gold"
                    value={form.preferredTime}
                    onChange={(e) => update("preferredTime", e.target.value)}
                    required
                  >
                    <option
                      value=""
                      disabled
                      style={{ backgroundColor: "oklch(var(--bg-card))" }}
                    >
                      Select a time
                    </option>
                    {TIMES.map((t) => (
                      <option
                        key={t}
                        value={t}
                        style={{ backgroundColor: "oklch(var(--bg-card))" }}
                      >
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-xs font-cinzel tracking-wider uppercase mb-2"
                  style={{ color: "oklch(var(--gold-muted))" }}
                >
                  Notes / Special Requests
                </label>
                <textarea
                  id="booking-notes"
                  data-ocid="booking.textarea"
                  className="input-gold resize-none"
                  rows={4}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Any special requirements, preferred designs, or additional information..."
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-4">
                <button
                  data-ocid="booking.submit_button"
                  type="submit"
                  disabled={submitBooking.isPending}
                  className="btn-gold flex items-center gap-2 disabled:opacity-50 px-10"
                >
                  {submitBooking.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
