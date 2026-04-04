import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Booking, Contact, ExternalBlob, Product } from "../backend";
import { useActor } from "./useActor";

// Extended actor type that includes chain image methods
interface ActorWithChainImages {
  listChainImages(): Promise<Array<[string, ExternalBlob]>>;
  setChainImage(chainKey: string, imageId: ExternalBlob): Promise<void>;
  deleteChainImage(chainKey: string): Promise<void>;
}

// --- Products ---
export function useListProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      imageId: ExternalBlob | null;
      price: string | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addProduct(
        data.name,
        data.description,
        data.imageId,
        data.price,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      name: string;
      description: string;
      imageId: ExternalBlob | null;
      price: string | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProduct(
        data.id,
        data.name,
        data.description,
        data.imageId,
        data.price,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// --- Bookings ---
export function useSubmitBooking() {
  return useMutation({
    mutationFn: async (data: {
      actor: NonNullable<ReturnType<typeof useActor>["actor"]>;
      name: string;
      email: string;
      phone: string;
      preferredDate: string;
      preferredTime: string;
      service: string;
      notes: string;
    }) => {
      const { actor, ...fields } = data;
      return actor.submitBooking(
        fields.name,
        fields.email,
        fields.phone,
        fields.preferredDate,
        fields.preferredTime,
        fields.service,
        fields.notes,
      );
    },
  });
}

export function useListBookings() {
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

// --- Contacts ---
export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: {
      actor: NonNullable<ReturnType<typeof useActor>["actor"]>;
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      const { actor, ...fields } = data;
      return actor.submitContact(
        fields.name,
        fields.email,
        fields.phone,
        fields.message,
      );
    },
  });
}

export function useListContacts() {
  const { actor, isFetching } = useActor();
  return useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

// --- Admin ---
export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// --- Chain Images ---
export function useListChainImages() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[string, ExternalBlob]>>({
    queryKey: ["chainImages"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as unknown as ActorWithChainImages).listChainImages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetChainImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { chainKey: string; imageId: ExternalBlob }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as unknown as ActorWithChainImages).setChainImage(
        data.chainKey,
        data.imageId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chainImages"] });
    },
  });
}

export function useDeleteChainImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (chainKey: string) => {
      if (!actor) throw new Error("Not connected");
      return (actor as unknown as ActorWithChainImages).deleteChainImage(
        chainKey,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chainImages"] });
    },
  });
}
