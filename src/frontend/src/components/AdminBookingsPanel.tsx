import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Instagram,
  KeyRound,
  Loader2,
  LogIn,
  LogOut,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Booking } from "../backend";
import { useAdminContext } from "../context/AdminContext";
import { useActor } from "../hooks/useActor";
import AdminLoginModal from "./AdminLoginModal";
import ChangePasswordModal from "./ChangePasswordModal";
import SocialLinksModal from "./SocialLinksModal";

function useListBookings() {
  const { actor, isFetching } = useActor();
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

function useDeleteBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteBooking(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

function formatDate(ns: bigint) {
  try {
    const ms = Number(ns / BigInt(1_000_000));
    return new Date(ms).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

function BookingRow({
  booking,
  index,
  onDelete,
}: {
  booking: Booking;
  index: number;
  onDelete: (id: string) => void;
}) {
  const data = booking.pending;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-sm border p-4"
      style={{
        borderColor: "oklch(var(--border-subtle))",
        backgroundColor: "oklch(var(--bg-card))",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {/* Top row: name + chain type */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
            <span
              className="font-cinzel font-semibold text-sm tracking-wide"
              style={{ color: "oklch(var(--gold-bright))" }}
            >
              {data.name}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full border font-cinzel"
              style={{
                borderColor: "oklch(var(--border-gold) / 0.5)",
                color: "oklch(var(--gold-muted))",
                backgroundColor: "oklch(var(--bg-section))",
              }}
            >
              {data.service}
            </span>
          </div>

          {/* Contact info */}
          <div
            className="flex flex-wrap gap-x-4 gap-y-1 text-xs mb-2"
            style={{ color: "oklch(var(--text-secondary))" }}
          >
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>📞 {data.phone}</span>}
          </div>

          {/* Specs from notes */}
          {data.notes && (
            <p
              className="text-xs leading-relaxed whitespace-pre-line mb-2"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              {data.notes}
            </p>
          )}

          {/* Date + time */}
          <div
            className="flex flex-wrap gap-x-4 gap-y-1 text-xs"
            style={{ color: "oklch(var(--gold-muted) / 0.7)" }}
          >
            {data.preferredDate && (
              <span>
                Preferred: {data.preferredDate}{" "}
                {data.preferredTime && `· ${data.preferredTime}`}
              </span>
            )}
            <span>Submitted: {formatDate(data.createdAt)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onDelete(data.id)}
          className="flex-shrink-0 p-1.5 rounded-sm transition-colors"
          style={{ color: "oklch(0.577 0.245 27.325)" }}
          aria-label="Delete booking"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default function AdminBookingsPanel() {
  const { data: bookings = [], isLoading: isBookingsLoading } =
    useListBookings();
  const deleteBooking = useDeleteBooking();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { isPasswordVerified, setIsPasswordVerified } = useAdminContext();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking.mutateAsync(id);
      toast.success("Booking deleted");
    } catch {
      toast.error("Failed to delete booking");
    } finally {
      setDeleteId(null);
    }
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    setIsPasswordVerified(true);
  };

  const handleLogout = () => {
    setIsPasswordVerified(false);
    setOpen(false);
  };

  return (
    <>
      {/* Password gate modal */}
      <AdminLoginModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordSuccess}
      />

      {/* Change password modal */}
      <ChangePasswordModal
        open={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />

      {/* Social links modal */}
      <SocialLinksModal
        open={showSocialLinks}
        onClose={() => setShowSocialLinks(false)}
      />

      {/* Admin floating button */}
      <div className="fixed top-4 right-4 z-50">
        {!isPasswordVerified ? (
          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-2 px-3 py-2 text-xs font-cinzel tracking-wider uppercase border rounded-sm transition-colors"
            style={{
              borderColor: "oklch(var(--border-gold) / 0.5)",
              backgroundColor: "oklch(var(--bg-card) / 0.95)",
              color: "oklch(var(--gold-muted))",
            }}
          >
            <LogIn className="w-3 h-3" />
            Admin Login
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-cinzel tracking-wider uppercase border rounded-sm transition-colors"
              style={{
                borderColor: "oklch(var(--border-gold) / 0.6)",
                backgroundColor: "oklch(var(--bg-card) / 0.95)",
                color: "oklch(var(--gold-bright))",
              }}
            >
              View Bookings
              {bookings.length > 0 && (
                <span
                  className="ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: "oklch(var(--gold-bright))",
                    color: "oklch(0.12 0.01 55)",
                  }}
                >
                  {bookings.length}
                </span>
              )}
            </button>
            {/* Social media links button */}
            <button
              type="button"
              onClick={() => setShowSocialLinks(true)}
              className="flex items-center gap-1 px-3 py-2 text-xs font-cinzel tracking-wider uppercase border rounded-sm transition-colors"
              style={{
                borderColor: "oklch(var(--border-gold) / 0.4)",
                backgroundColor: "oklch(var(--bg-card) / 0.95)",
                color: "oklch(var(--gold-muted))",
              }}
              title="Update Social Media Links"
            >
              <Instagram className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => setShowChangePassword(true)}
              className="flex items-center gap-1 px-3 py-2 text-xs font-cinzel tracking-wider uppercase border rounded-sm transition-colors"
              style={{
                borderColor: "oklch(var(--border-gold) / 0.4)",
                backgroundColor: "oklch(var(--bg-card) / 0.95)",
                color: "oklch(var(--gold-muted))",
              }}
              title="Change Password"
            >
              <KeyRound className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-2 text-xs font-cinzel tracking-wider uppercase border rounded-sm transition-colors"
              style={{
                borderColor: "oklch(var(--border-subtle))",
                backgroundColor: "oklch(var(--bg-card) / 0.95)",
                color: "oklch(var(--text-secondary))",
              }}
            >
              <LogOut className="w-3 h-3" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Bookings drawer/panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ backgroundColor: "oklch(0.08 0.005 60 / 0.7)" }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full z-50 w-full max-w-md overflow-y-auto"
              style={{
                backgroundColor: "oklch(var(--bg-section))",
                borderLeft: "1px solid oklch(var(--border-gold) / 0.3)",
              }}
            >
              {/* Panel header */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b"
                style={{
                  borderColor: "oklch(var(--border-subtle))",
                  backgroundColor: "oklch(var(--bg-section))",
                }}
              >
                <h2
                  className="font-cinzel font-bold tracking-wider uppercase text-sm"
                  style={{ color: "oklch(var(--gold-bright))" }}
                >
                  Chain Order Bookings
                  {bookings.length > 0 && (
                    <span
                      className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "oklch(var(--gold-bright))",
                        color: "oklch(0.12 0.01 55)",
                      }}
                    >
                      {bookings.length}
                    </span>
                  )}
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-sm"
                  style={{ color: "oklch(var(--text-secondary))" }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bookings list */}
              <div className="p-6 space-y-3">
                {isBookingsLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2
                      className="w-8 h-8 animate-spin"
                      style={{ color: "oklch(var(--gold-muted))" }}
                    />
                  </div>
                ) : bookings.length === 0 ? (
                  <p
                    className="text-center py-16 text-sm font-cinzel tracking-wide"
                    style={{ color: "oklch(var(--text-secondary))" }}
                  >
                    No orders submitted yet.
                  </p>
                ) : (
                  bookings.map((booking, i) => (
                    <BookingRow
                      key={booking.pending.id}
                      booking={booking}
                      index={i}
                      onDelete={(id) => setDeleteId(id)}
                    />
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent
          style={{
            backgroundColor: "oklch(var(--bg-section))",
            border: "1px solid oklch(var(--border-subtle))",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className="font-cinzel tracking-wider"
              style={{ color: "oklch(var(--gold-bright))" }}
            >
              Delete Booking
            </AlertDialogTitle>
            <AlertDialogDescription
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              Are you sure you want to delete this booking? This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="btn-gold-outline border-none"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
