import { Instagram, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY_IG = "ask_gold_instagram_id";
const STORAGE_KEY_FB = "ask_gold_facebook_id";

export function getInstagramId(): string {
  return localStorage.getItem(STORAGE_KEY_IG) ?? "";
}

export function getFacebookId(): string {
  return localStorage.getItem(STORAGE_KEY_FB) ?? "";
}

interface SocialLinksModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SocialLinksModal({
  open,
  onClose,
}: SocialLinksModalProps) {
  const [instagramId, setInstagramId] = useState("");
  const [facebookId, setFacebookId] = useState("");

  useEffect(() => {
    if (open) {
      setInstagramId(getInstagramId());
      setFacebookId(getFacebookId());
    }
  }, [open]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY_IG, instagramId.trim());
    localStorage.setItem(STORAGE_KEY_FB, facebookId.trim());
    toast.success("Social links updated");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70]"
            style={{ backgroundColor: "oklch(0.06 0.005 60 / 0.85)" }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-4"
          >
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: modal content stop-propagation */}
            <div
              className="w-full max-w-sm rounded-sm border p-8 relative"
              style={{
                backgroundColor: "oklch(var(--bg-section))",
                borderColor: "oklch(var(--border-gold) / 0.4)",
                boxShadow: "0 20px 60px oklch(0 0 0 / 0.6)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-sm transition-opacity opacity-60 hover:opacity-100"
                style={{ color: "oklch(var(--text-secondary))" }}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex justify-center mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center border"
                  style={{
                    borderColor: "oklch(var(--border-gold) / 0.5)",
                    backgroundColor: "oklch(var(--gold-bright) / 0.08)",
                  }}
                >
                  <Instagram
                    className="w-5 h-5"
                    style={{ color: "oklch(var(--gold-bright))" }}
                  />
                </div>
              </div>

              <h2
                className="text-center font-cinzel font-bold tracking-widest uppercase text-sm mb-1"
                style={{ color: "oklch(var(--gold-bright))" }}
              >
                Social Media Links
              </h2>
              <p
                className="text-center text-xs font-cinzel tracking-wider mb-6"
                style={{ color: "oklch(var(--text-secondary))" }}
              >
                Enter your Instagram and Facebook usernames
              </p>

              <form onSubmit={handleSave} className="space-y-4">
                {/* Instagram */}
                <div>
                  <label
                    htmlFor="instagram-id"
                    className="block text-xs font-cinzel tracking-widest uppercase mb-1.5"
                    style={{ color: "oklch(var(--gold-muted))" }}
                  >
                    Instagram Username
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-cinzel"
                      style={{ color: "oklch(var(--text-secondary))" }}
                    >
                      @
                    </span>
                    <input
                      id="instagram-id"
                      type="text"
                      value={instagramId}
                      onChange={(e) => setInstagramId(e.target.value)}
                      placeholder="yourusername"
                      className="w-full pl-7 pr-4 py-3 rounded-sm border text-sm font-cinzel tracking-wider outline-none transition-all"
                      style={{
                        backgroundColor: "oklch(var(--bg-card))",
                        borderColor: "oklch(var(--border-subtle))",
                        color: "oklch(var(--text-primary))",
                      }}
                    />
                  </div>
                </div>

                {/* Facebook */}
                <div>
                  <label
                    htmlFor="facebook-id"
                    className="block text-xs font-cinzel tracking-widest uppercase mb-1.5"
                    style={{ color: "oklch(var(--gold-muted))" }}
                  >
                    Facebook Username / Page ID
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-cinzel"
                      style={{ color: "oklch(var(--text-secondary))" }}
                    >
                      fb/
                    </span>
                    <input
                      id="facebook-id"
                      type="text"
                      value={facebookId}
                      onChange={(e) => setFacebookId(e.target.value)}
                      placeholder="yourpagename"
                      className="w-full pl-9 pr-4 py-3 rounded-sm border text-sm font-cinzel tracking-wider outline-none transition-all"
                      style={{
                        backgroundColor: "oklch(var(--bg-card))",
                        borderColor: "oklch(var(--border-subtle))",
                        color: "oklch(var(--text-primary))",
                      }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-gold w-full">
                  Save Links
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
