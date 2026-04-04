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
import { Progress } from "@/components/ui/progress";
import {
  Check,
  ImageIcon,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import type { Product } from "../backend";
import {
  useAddProduct,
  useDeleteProduct,
  useIsAdmin,
  useListProducts,
  useUpdateProduct,
} from "../hooks/useQueries";

const STATIC_PRODUCTS = [
  {
    id: "static-1",
    name: "Bespoke Gold Ring Collection",
    description:
      "Handcrafted 22K gold rings featuring intricate filigree work and precious gemstone settings.",
    price: "From $1,200",
    imageUrl: "/assets/generated/product-jewelry-collection.dim_600x450.jpg",
  },
  {
    id: "static-2",
    name: "Ornate Gold Bangle",
    description:
      "Luxurious gold bangle with precision diamond-cut engraving and sapphire accents.",
    price: "$2,800",
    imageUrl: "/assets/generated/product-gold-bangle.dim_600x450.jpg",
  },
  {
    id: "static-3",
    name: "Engraved Signet Ring",
    description:
      "Personalized 18K gold signet ring with hand-engraved monogram or crest design.",
    price: "$950",
    imageUrl: "/assets/generated/product-signet-ring.dim_600x450.jpg",
  },
  {
    id: "static-4",
    name: "Filigree Gold Pendant",
    description:
      "Delicate 22K filigree pendant necklace with a central cabochon gemstone centerpiece.",
    price: "$1,650",
    imageUrl: "/assets/generated/product-gold-pendant.dim_600x450.jpg",
  },
  {
    id: "static-5",
    name: "Art Deco Cufflinks",
    description:
      "Gold-plated art deco cufflinks with geometric pattern. Ideal for formal occasions.",
    price: "$480",
    imageUrl: "/assets/generated/product-cufflinks.dim_600x450.jpg",
  },
  {
    id: "static-6",
    name: "Antique Brooch Restoration",
    description:
      "Expert restoration of antique gold brooches — returning heirloom pieces to their original splendor.",
    price: "From $600",
    imageUrl: "/assets/generated/product-brooch-restoration.dim_600x450.jpg",
  },
];

interface ProductFormState {
  name: string;
  description: string;
  price: string;
  imageFile: File | null;
  imagePreviewUrl: string | null;
  existingBlob: ExternalBlob | null;
  uploadProgress: number;
}

const EMPTY_FORM: ProductFormState = {
  name: "",
  description: "",
  price: "",
  imageFile: null,
  imagePreviewUrl: null,
  existingBlob: null,
  uploadProgress: 0,
};

function ProductCard({
  product,
  imageUrl,
}: {
  product: { id: string; name: string; description: string; price?: string };
  imageUrl: string | null;
}) {
  return (
    <div className="product-card group">
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: "oklch(var(--bg-section))" }}
          >
            <ImageIcon
              className="w-12 h-12"
              style={{ color: "oklch(var(--gold-dim) / 0.4)" }}
              strokeWidth={1}
            />
          </div>
        )}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, oklch(0.10 0.005 60 / 0.7), transparent 50%)",
          }}
        />
      </div>
      <div className="p-4">
        <h3
          className="font-cinzel font-semibold text-sm tracking-wider uppercase mb-2"
          style={{ color: "oklch(var(--gold-bright))" }}
        >
          {product.name}
        </h3>
        {product.price && (
          <p
            className="font-cinzel text-xs mb-2"
            style={{ color: "oklch(var(--gold-muted))" }}
          >
            {product.price}
          </p>
        )}
        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: "oklch(var(--text-secondary))" }}
        >
          {product.description}
        </p>
      </div>
    </div>
  );
}

function AdminProductRow({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-sm border"
      style={{
        borderColor: "oklch(var(--border-subtle))",
        backgroundColor: "oklch(var(--bg-card))",
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {product.imageId ? (
          <img
            src={product.imageId.getDirectURL()}
            alt={product.name}
            className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
          />
        ) : (
          <div
            className="w-10 h-10 flex items-center justify-center rounded-sm flex-shrink-0"
            style={{ backgroundColor: "oklch(var(--bg-section))" }}
          >
            <ImageIcon
              className="w-4 h-4"
              style={{ color: "oklch(var(--gold-dim) / 0.4)" }}
            />
          </div>
        )}
        <div className="min-w-0">
          <p
            className="font-cinzel text-xs tracking-wider truncate"
            style={{ color: "oklch(var(--gold-bright))" }}
          >
            {product.name}
          </p>
          {product.price && (
            <p
              className="text-xs"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              {product.price}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          data-ocid="products.edit_button"
          onClick={() => onEdit(product)}
          className="p-1.5 rounded-sm transition-colors"
          style={{ color: "oklch(var(--gold-muted))" }}
          aria-label="Edit product"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          data-ocid="products.delete_button"
          onClick={() => onDelete(product.id)}
          className="p-1.5 rounded-sm transition-colors"
          style={{ color: "oklch(0.577 0.245 27.325)" }}
          aria-label="Delete product"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function ProductForm({
  form,
  setForm,
  onSubmit,
  isPending,
  onCancel,
  isEditing,
}: {
  form: ProductFormState;
  setForm: (
    f: ProductFormState | ((prev: ProductFormState) => ProductFormState),
  ) => void;
  onSubmit: () => void;
  isPending: boolean;
  onCancel: () => void;
  isEditing: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({
      ...prev,
      imageFile: file,
      imagePreviewUrl: previewUrl,
      existingBlob: null,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="product-name"
            className="block text-xs font-cinzel tracking-wider uppercase mb-2"
            style={{ color: "oklch(var(--gold-muted))" }}
          >
            Product Name *
          </label>
          <input
            id="product-name"
            data-ocid="products.input"
            className="input-gold"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label
            htmlFor="product-price"
            className="block text-xs font-cinzel tracking-wider uppercase mb-2"
            style={{ color: "oklch(var(--gold-muted))" }}
          >
            Price (optional)
          </label>
          <input
            id="product-price"
            data-ocid="products.input"
            className="input-gold"
            value={form.price}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, price: e.target.value }))
            }
            placeholder="e.g. $1,200"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="product-description"
          className="block text-xs font-cinzel tracking-wider uppercase mb-2"
          style={{ color: "oklch(var(--gold-muted))" }}
        >
          Description *
        </label>
        <textarea
          id="product-description"
          data-ocid="products.textarea"
          className="input-gold resize-none"
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Describe this product..."
        />
      </div>

      <div>
        <p
          className="block text-xs font-cinzel tracking-wider uppercase mb-2"
          style={{ color: "oklch(var(--gold-muted))" }}
        >
          Product Image
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {form.imagePreviewUrl || form.existingBlob ? (
          <div className="relative group inline-block">
            <img
              src={form.imagePreviewUrl || form.existingBlob?.getDirectURL()}
              alt="Preview"
              className="w-32 h-24 object-cover rounded-sm border"
              style={{ borderColor: "oklch(var(--border-subtle))" }}
            />
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  imageFile: null,
                  imagePreviewUrl: null,
                  existingBlob: null,
                }))
              }
              className="absolute -top-2 -right-2 p-0.5 rounded-full"
              style={{
                backgroundColor: "oklch(0.577 0.245 27.325)",
                color: "white",
              }}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            data-ocid="products.upload_button"
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-cinzel tracking-wider uppercase border rounded-sm transition-colors"
            style={{
              borderColor: "oklch(var(--border-subtle))",
              color: "oklch(var(--text-secondary))",
              backgroundColor: "oklch(var(--bg-card))",
            }}
          >
            <ImageIcon className="w-4 h-4" />
            Upload Image
          </button>
        )}

        {form.uploadProgress > 0 && form.uploadProgress < 100 && (
          <div className="mt-2">
            <Progress value={form.uploadProgress} className="h-1" />
            <p
              className="text-xs mt-1"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              Uploading... {form.uploadProgress}%
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          data-ocid="products.submit_button"
          type="button"
          onClick={onSubmit}
          disabled={isPending || !form.name || !form.description}
          className="btn-gold flex items-center gap-2 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />{" "}
              {isEditing ? "Update Product" : "Add Product"}
            </>
          )}
        </button>
        <button
          data-ocid="products.cancel_button"
          type="button"
          onClick={onCancel}
          className="btn-gold-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const { data: products = [], isLoading } = useListProducts();
  const { data: isAdmin } = useIsAdmin();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormState>(EMPTY_FORM);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const openAddForm = () => {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price || "",
      imageFile: null,
      imagePreviewUrl: null,
      existingBlob: product.imageId || null,
      uploadProgress: 0,
    });
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.description) return;

    let imageBlob: ExternalBlob | null = null;

    if (form.imageFile) {
      const bytes = new Uint8Array(await form.imageFile.arrayBuffer());
      imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setForm((prev) => ({ ...prev, uploadProgress: pct }));
      });
    } else if (form.existingBlob) {
      imageBlob = form.existingBlob;
    }

    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({
          id: editingProduct.id,
          name: form.name,
          description: form.description,
          imageId: imageBlob,
          price: form.price || null,
        });
        toast.success("Product updated successfully");
      } else {
        await addProduct.mutateAsync({
          name: form.name,
          description: form.description,
          imageId: imageBlob,
          price: form.price || null,
        });
        toast.success("Product added successfully");
      }
      cancelForm();
    } catch {
      toast.error("Failed to save product. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
      setDeleteConfirmId(null);
    } catch {
      toast.error("Failed to delete product");
    }
  };

  // Combine static products with backend products for display
  const allDisplayProducts = [
    ...STATIC_PRODUCTS,
    ...products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      imageUrl: p.imageId ? p.imageId.getDirectURL() : null,
    })),
  ];

  return (
    <section
      id="products"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "oklch(var(--bg-dark))" }}
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
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="section-title text-3xl md:text-4xl gold-underline">
              Product Gallery
            </h2>
          </div>
          <p
            className="text-sm tracking-wider uppercase mt-8 font-cinzel"
            style={{ color: "oklch(var(--text-secondary))" }}
          >
            Handcrafted masterpieces for every occasion
          </p>
        </motion.div>

        {/* Admin toggle */}
        {isAdmin && (
          <div className="flex justify-end mb-6">
            <button
              type="button"
              data-ocid="products.open_modal_button"
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="btn-gold-outline flex items-center gap-2 text-xs"
            >
              <Plus className="w-4 h-4" />
              Manage Products
            </button>
          </div>
        )}

        {/* Admin Panel */}
        <AnimatePresence>
          {isAdmin && showAdminPanel && (
            <motion.div
              data-ocid="products.panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-10"
            >
              <div
                className="p-6 rounded-sm border"
                style={{
                  borderColor: "oklch(var(--border-gold) / 0.4)",
                  backgroundColor: "oklch(var(--bg-section))",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="font-cinzel text-sm tracking-wider uppercase"
                    style={{ color: "oklch(var(--gold-bright))" }}
                  >
                    Product Management
                  </h3>
                  {!showForm && (
                    <button
                      type="button"
                      data-ocid="products.primary_button"
                      onClick={openAddForm}
                      className="btn-gold flex items-center gap-2 text-xs py-2 px-4"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add New Product
                    </button>
                  )}
                </div>

                {/* Form */}
                <AnimatePresence>
                  {showForm && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 rounded-sm border"
                      style={{
                        borderColor: "oklch(var(--border-subtle))",
                        backgroundColor: "oklch(var(--bg-card))",
                      }}
                    >
                      <h4
                        className="font-cinzel text-xs tracking-wider uppercase mb-4"
                        style={{ color: "oklch(var(--gold-muted))" }}
                      >
                        {editingProduct ? "Edit Product" : "Add New Product"}
                      </h4>
                      <ProductForm
                        form={form}
                        setForm={setForm}
                        onSubmit={handleSubmit}
                        isPending={
                          addProduct.isPending || updateProduct.isPending
                        }
                        onCancel={cancelForm}
                        isEditing={!!editingProduct}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Product list */}
                {isLoading ? (
                  <div
                    data-ocid="products.loading_state"
                    className="flex items-center justify-center py-8"
                  >
                    <Loader2
                      className="w-6 h-6 animate-spin"
                      style={{ color: "oklch(var(--gold-muted))" }}
                    />
                  </div>
                ) : products.length === 0 ? (
                  <p
                    data-ocid="products.empty_state"
                    className="text-sm text-center py-6"
                    style={{ color: "oklch(var(--text-secondary))" }}
                  >
                    No custom products yet. Add your first product above.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {products.map((product, i) => (
                      <div
                        key={product.id}
                        data-ocid={`products.item.${i + 1}`}
                      >
                        <AdminProductRow
                          product={product}
                          onEdit={openEditForm}
                          onDelete={(id) => setDeleteConfirmId(id)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Public Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allDisplayProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              data-ocid={`products.item.${i + 1}`}
            >
              <ProductCard
                product={product}
                imageUrl={product.imageUrl || null}
              />
            </motion.div>
          ))}
        </div>

        {allDisplayProducts.length === 0 && !isLoading && (
          <p
            data-ocid="products.empty_state"
            className="text-center py-16 text-sm"
            style={{ color: "oklch(var(--text-secondary))" }}
          >
            No products available yet.
          </p>
        )}
      </div>

      {/* Delete Confirm Dialog */}
      <AlertDialog
        open={!!deleteConfirmId}
        onOpenChange={() => setDeleteConfirmId(null)}
      >
        <AlertDialogContent
          data-ocid="products.dialog"
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
              Delete Product
            </AlertDialogTitle>
            <AlertDialogDescription
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="products.cancel_button"
              className="btn-gold-outline border-none"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="products.confirm_button"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              className="bg-destructive text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
