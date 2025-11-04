import { Car } from "@/lib/generated/prisma/client";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UseFavoritosCarrosType {
  favoriteItems: Car[];
  addFavoriteItem: (data: Car) => void;
  removeFavoriteItem: (id: string) => void;
}

export const favoriteCars = create(
  persist<UseFavoritosCarrosType>(
    (set, get) => ({
      favoriteItems: [],
      addFavoriteItem: (data: Car) => {
        const currentFavoriteItems = get().favoriteItems;
        const existingItem = currentFavoriteItems.find(
          (item) => item.id === data.id
        );

        if (existingItem) return toast.error("O veículo já existe");

        set({
          favoriteItems: [...get().favoriteItems, data],
        });

        toast.success("Carro adicionado a lista.");
      },
      removeFavoriteItem: (id: string) => {
        set({
          favoriteItems: [
            ...get().favoriteItems.filter((item) => item.id !== id),
          ],
        });

        toast.success("Carro removido da lista");
      },
    }),
    {
      name: "favorite-products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
