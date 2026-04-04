import { Eye, EyeOff, KeyRound, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getAdminPassword, setAdminPassword } from "./AdminLoginModal";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setSuccess(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (currentPassword !== getAdminPassword()) {
      setError("Current password is incorrect.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setAdminPassword(newPassword);
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    setError("");
    setSuccess(false);
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
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-4"
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
              <button
                type="button"
                onClick={handleClose}
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
                  <KeyRound
                    className="w-5 h-5"
                    style={{ color: "oklch(var(--gold-bright))" }}
                  />
                </div>
              </div>

              <h2
                className="text-center font-cinzel font-bold tracking-widest uppercase text-sm mb-1"
                style={{ color: "oklch(var(--gold-bright))" }}
              >
                Change Password
              </h2>
              <p
                className="text-center text-xs font-cinzel tracking-wider mb-6"
                style={{ color: "oklch(var(--text-secondary))" }}
              >
                Update your admin password
              </p>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <p
                    className="font-cinzel tracking-wider text-sm"
                    style={{ color: "oklch(0.75 0.18 145)" }}
                  >
                    Password changed successfully!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Current password */}
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Current Password"
                      className="w-full px-4 py-3 pr-10 rounded-sm border text-sm font-cinzel tracking-wider outline-none transition-all"
                      style={{
                        backgroundColor: "oklch(var(--bg-card))",
                        borderColor: "oklch(var(--border-subtle))",
                        color: "oklch(var(--text-primary))",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 opacity-50 hover:opacity-100"
                      style={{ color: "oklch(var(--text-secondary))" }}
                      tabIndex={-1}
                    >
                      {showCurrent ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* New password */}
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="New Password"
                      className="w-full px-4 py-3 pr-10 rounded-sm border text-sm font-cinzel tracking-wider outline-none transition-all"
                      style={{
                        backgroundColor: "oklch(var(--bg-card))",
                        borderColor: "oklch(var(--border-subtle))",
                        color: "oklch(var(--text-primary))",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 opacity-50 hover:opacity-100"
                      style={{ color: "oklch(var(--text-secondary))" }}
                      tabIndex={-1}
                    >
                      {showNew ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Confirm new password */}
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-3 pr-10 rounded-sm border text-sm font-cinzel tracking-wider outline-none transition-all"
                      style={{
                        backgroundColor: "oklch(var(--bg-card))",
                        borderColor: "oklch(var(--border-subtle))",
                        color: "oklch(var(--text-primary))",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 opacity-50 hover:opacity-100"
                      style={{ color: "oklch(var(--text-secondary))" }}
                      tabIndex={-1}
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

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
                    disabled={
                      !currentPassword || !newPassword || !confirmPassword
                    }
                    className="btn-gold w-full disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Update Password
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
