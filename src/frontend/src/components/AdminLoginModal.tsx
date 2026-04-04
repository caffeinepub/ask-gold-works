import { Eye, EyeOff, Lock, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_PASSWORD = "atharvsachinnikam";
const STORAGE_KEY = "ask_gold_admin_password";

export function getAdminPassword(): string {
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_PASSWORD;
}

export function setAdminPassword(newPassword: string): void {
  localStorage.setItem(STORAGE_KEY, newPassword);
}

interface AdminLoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({
  open,
  onClose,
  onSuccess,
}: AdminLoginModalProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === getAdminPassword()) {
      setPassword("");
      setError("");
      onSuccess();
    } else {
      setError("Incorrect password. Please try again.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setPassword("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  const borderColor = error
    ? "oklch(0.577 0.245 27.325 / 0.7)"
    : focused
      ? "oklch(var(--gold-dim))"
      : "oklch(var(--border-subtle))";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: "oklch(0.06 0.005 60 / 0.85)" }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <motion.div
              animate={shaking ? { x: [0, -8, 8, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm rounded-sm border p-8 relative"
              style={{
                backgroundColor: "oklch(var(--bg-section))",
                borderColor: "oklch(var(--border-gold) / 0.4)",
                boxShadow: "0 20px 60px oklch(0 0 0 / 0.6)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-sm transition-opacity opacity-60 hover:opacity-100"
                style={{ color: "oklch(var(--text-secondary))" }}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Lock icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center border"
                  style={{
                    borderColor: "oklch(var(--border-gold) / 0.5)",
                    backgroundColor: "oklch(var(--gold-bright) / 0.08)",
                  }}
                >
                  <Lock
                    className="w-5 h-5"
                    style={{ color: "oklch(var(--gold-bright))" }}
                  />
                </div>
              </div>

              {/* Title */}
              <h2
                className="text-center font-cinzel font-bold tracking-widest uppercase text-sm mb-1"
                style={{ color: "oklch(var(--gold-bright))" }}
              >
                Admin Access
              </h2>
              <p
                className="text-center text-xs font-cinzel tracking-wider mb-6"
                style={{ color: "oklch(var(--text-secondary))" }}
              >
                Enter your admin password to continue
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Password"
                    className="w-full px-4 py-3 pr-10 rounded-sm border text-sm font-cinzel tracking-wider outline-none transition-all"
                    style={{
                      backgroundColor: "oklch(var(--bg-card))",
                      borderColor: borderColor,
                      color: "oklch(var(--text-primary))",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 transition-opacity opacity-50 hover:opacity-100"
                    style={{ color: "oklch(var(--text-secondary))" }}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs font-cinzel tracking-wide text-center"
                      style={{ color: "oklch(0.65 0.2 27)" }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={!password}
                  className="btn-gold w-full disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Unlock Admin Panel
                </button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
