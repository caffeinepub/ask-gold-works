import { Camera, Loader2, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { useAdminContext } from "../context/AdminContext";
import {
  useDeleteChainImage,
  useListChainImages,
  useSetChainImage,
} from "../hooks/useQueries";

const MACHINE_CHAINS = [
  {
    name: "Urvashi",
    description:
      "A beautifully crafted machine chain with an elegant, fluid pattern perfect for daily wear.",
    imageKey: "urvashi",
  },
  {
    name: "Gold Finger",
    description:
      "Bold and distinctive links that make a strong style statement in pure gold.",
    imageKey: "goldfinger",
  },
  {
    name: "LR Sundari",
    description:
      "Delicate and refined design with a classic charm, crafted for lasting beauty.",
    imageKey: "lrsundari",
  },
  {
    name: "UR Sundari",
    description:
      "Elegant twisted links with a graceful finish, ideal for all occasions.",
    imageKey: "ursundari",
  },
  {
    name: "Butterfly",
    description:
      "Light and intricate chain design inspired by the delicate wings of a butterfly.",
    imageKey: "butterfly",
  },
  {
    name: "Aarnyal",
    description:
      "A unique pattern chain with artisan craftsmanship and a radiant gold finish.",
    imageKey: "aarnyal",
  },
  {
    name: "Mogyambo",
    description:
      "Strong interlocking links with a rich texture and premium gold luster.",
    imageKey: "mogyambo",
  },
  {
    name: "Maynar",
    description:
      "Sleek and smooth links crafted for a sophisticated, modern look.",
    imageKey: "maynar",
  },
  {
    name: "Parinda",
    description:
      "Free-flowing chain design with a light feel and an eye-catching golden shine.",
    imageKey: "parinda",
  },
];

const SACHIN_CHAINS = [
  {
    name: "Don",
    description:
      "A commanding chain design with bold presence and premium gold craftsmanship.",
    imageKey: "don",
  },
  {
    name: "New Don",
    description:
      "A modern evolution of the classic Don design with refined golden links.",
    imageKey: "newdon",
  },
  {
    name: "Double Karabara",
    subtitle: "Karabara / Rettai Vadam",
    description:
      "Double-layered Karabara pattern, also known as Rettai Vadam, for a rich and striking look.",
    imageKey: "doublekarabara",
  },
  {
    name: "Double Sachin",
    description:
      "A doubled signature Sachin chain crafted with intricate detail and lasting brilliance.",
    imageKey: "doublesachin",
  },
  {
    name: "Single Sachin",
    description:
      "The original single Sachin chain — elegant, timeless, and expertly crafted in gold.",
    imageKey: "singlesachin",
  },
  {
    name: "Single Karabara",
    description:
      "A classic single Karabara chain with fine links and a distinctive golden finish.",
    imageKey: "singlekarabara",
  },
];

function ChainPlaceholder() {
  return (
    <div className="relative flex flex-col items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((col) => (
            <div
              key={col}
              className="transition-all duration-500"
              style={{
                width: "22px",
                height: "10px",
                borderRadius: "50px",
                border: "2px solid",
                borderColor: `oklch(var(--gold-${(row + col) % 2 === 0 ? "bright" : "muted"}) / ${0.6 + (row + col) * 0.05})`,
                backgroundColor: "oklch(var(--gold-bright) / 0.06)",
                boxShadow: "0 0 6px oklch(var(--gold-bright) / 0.2)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function ChainCard({
  chain,
  index,
  imageUrl,
  isAdmin,
  onUpload,
  onDelete,
  isUploading,
}: {
  chain: {
    name: string;
    subtitle?: string;
    description: string;
    imageKey: string;
  };
  index: number;
  imageUrl: string | null;
  isAdmin: boolean;
  onUpload: (chainKey: string, file: File) => void;
  onDelete: (chainKey: string) => void;
  isUploading: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload(chain.imageKey, file);
    // Reset input so same file can be re-uploaded if needed
    e.target.value = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group"
      data-ocid={`chains.item.${index + 1}`}
    >
      <div
        className="rounded-sm border overflow-hidden transition-all duration-300 group-hover:border-[oklch(var(--gold-dim))]"
        style={{
          borderColor: "oklch(var(--border-subtle))",
          backgroundColor: "oklch(var(--bg-card))",
        }}
      >
        {/* Image / Placeholder area */}
        <div
          className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(var(--bg-section)) 0%, oklch(var(--bg-deep)) 100%)",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={chain.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ChainPlaceholder />
          )}

          {/* Hover gradient overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, oklch(var(--gold-bright) / 0.08) 0%, transparent 70%)",
            }}
          />

          {/* Admin controls overlay */}
          {isAdmin && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
              {/* Delete button — only when image exists */}
              {imageUrl && !isUploading && (
                <button
                  type="button"
                  data-ocid={`chains.delete_button.${index + 1}`}
                  onClick={() => onDelete(chain.imageKey)}
                  aria-label="Remove chain photo"
                  className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 shadow-lg"
                  style={{
                    backgroundColor: "oklch(0.35 0.18 27)",
                    color: "white",
                    border: "1px solid oklch(0.55 0.22 27 / 0.5)",
                  }}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Upload / spinner button */}
              {isUploading ? (
                <div
                  className="flex items-center justify-center w-7 h-7 rounded-full shadow-lg"
                  style={{
                    backgroundColor: "oklch(var(--bg-deep) / 0.85)",
                    border: "1px solid oklch(var(--gold-dim) / 0.4)",
                  }}
                >
                  <Loader2
                    className="w-3.5 h-3.5 animate-spin"
                    style={{ color: "oklch(var(--gold-bright))" }}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  data-ocid={`chains.upload_button.${index + 1}`}
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload chain photo"
                  className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 shadow-lg hover:scale-105"
                  style={{
                    backgroundColor: "oklch(var(--bg-deep) / 0.85)",
                    border: "1px solid oklch(var(--gold-dim) / 0.5)",
                    color: "oklch(var(--gold-bright))",
                  }}
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}

          {/* Admin hint label when no image */}
          {isAdmin && !imageUrl && !isUploading && (
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ pointerEvents: "none" }}
            >
              <span
                className="font-cinzel text-[10px] tracking-widest uppercase px-3 py-1 rounded-sm"
                style={{
                  backgroundColor: "oklch(var(--bg-deep) / 0.8)",
                  color: "oklch(var(--gold-muted))",
                  border: "1px solid oklch(var(--gold-dim) / 0.3)",
                }}
              >
                Click camera to add photo
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className="font-cinzel font-semibold text-sm tracking-[0.1em] uppercase mb-1"
            style={{ color: "oklch(var(--gold-bright))" }}
          >
            {chain.name}
          </h3>
          {chain.subtitle && (
            <p
              className="font-cinzel text-xs tracking-wider mb-1"
              style={{ color: "oklch(var(--gold-muted))" }}
            >
              {chain.subtitle}
            </p>
          )}
          <div
            className="w-8 h-px mb-3 transition-all duration-300 group-hover:w-14"
            style={{ backgroundColor: "oklch(var(--gold-dim) / 0.5)" }}
          />
          <p
            className="text-xs leading-relaxed"
            style={{ color: "oklch(var(--text-secondary))" }}
          >
            {chain.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ChainsSection() {
  const { data: chainImages = [] } = useListChainImages();
  const { isPasswordVerified } = useAdminContext();
  const setChainImage = useSetChainImage();
  const deleteChainImage = useDeleteChainImage();

  // Track which chain keys are currently uploading
  const [uploadingKeys, setUploadingKeys] = useState<Set<string>>(new Set());

  // Build map: chainKey -> URL
  const imageMap: Record<string, string> = {};
  for (const [key, blob] of chainImages) {
    imageMap[key] = blob.getDirectURL();
  }

  const handleUpload = async (chainKey: string, file: File) => {
    setUploadingKeys((prev) => new Set(prev).add(chainKey));
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      await setChainImage.mutateAsync({ chainKey, imageId: blob });
      toast.success("Photo uploaded successfully");
    } catch {
      toast.error("Failed to upload photo. Please try again.");
    } finally {
      setUploadingKeys((prev) => {
        const next = new Set(prev);
        next.delete(chainKey);
        return next;
      });
    }
  };

  const handleDelete = async (chainKey: string) => {
    try {
      await deleteChainImage.mutateAsync(chainKey);
      toast.success("Photo removed");
    } catch {
      toast.error("Failed to remove photo. Please try again.");
    }
  };

  return (
    <section
      id="chains"
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
            Gold Chains
          </h2>
          <p
            className="text-sm tracking-wider uppercase mt-6 font-cinzel"
            style={{ color: "oklch(var(--text-secondary))" }}
          >
            Premium gold chains in every style
          </p>
        </motion.div>

        {/* ── Machine Chain Group ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-8">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "oklch(var(--gold-dim) / 0.3)" }}
            />
            <span
              className="font-cinzel text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm border"
              style={{
                color: "oklch(var(--gold-bright))",
                borderColor: "oklch(var(--gold-dim) / 0.4)",
                backgroundColor: "oklch(var(--bg-deep))",
              }}
            >
              Machine Chain
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "oklch(var(--gold-dim) / 0.3)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {MACHINE_CHAINS.map((chain, i) => (
              <ChainCard
                key={chain.name}
                chain={chain}
                index={i}
                imageUrl={imageMap[chain.imageKey] ?? null}
                isAdmin={isPasswordVerified}
                onUpload={handleUpload}
                onDelete={handleDelete}
                isUploading={uploadingKeys.has(chain.imageKey)}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Sachin Chain Group ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-8">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "oklch(var(--gold-dim) / 0.3)" }}
            />
            <span
              className="font-cinzel text-xs tracking-[0.25em] uppercase px-4 py-1.5 rounded-sm border"
              style={{
                color: "oklch(var(--gold-bright))",
                borderColor: "oklch(var(--gold-dim) / 0.4)",
                backgroundColor: "oklch(var(--bg-deep))",
              }}
            >
              Sachin Chain
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "oklch(var(--gold-dim) / 0.3)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SACHIN_CHAINS.map((chain, i) => (
              <ChainCard
                key={chain.name}
                chain={chain}
                index={i}
                imageUrl={imageMap[chain.imageKey] ?? null}
                isAdmin={isPasswordVerified}
                onUpload={handleUpload}
                onDelete={handleDelete}
                isUploading={uploadingKeys.has(chain.imageKey)}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p
            className="text-sm mb-6"
            style={{ color: "oklch(var(--text-secondary))" }}
          >
            All chains are handcrafted to order. Contact us for custom lengths,
            widths, and karat options.
          </p>
          <button
            type="button"
            data-ocid="chains.cta_button"
            onClick={() => {
              const el = document.querySelector("#booking");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold"
          >
            Order a Custom Chain
          </button>
        </motion.div>
      </div>
    </section>
  );
}
