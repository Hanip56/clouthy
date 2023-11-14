import { Image, Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ProductCart = {
  sku: number;
  name: string;
  price: Decimal;
  image: Image;
  size: string;
  color: string;
  stock: number;
};

type Item = {
  product: ProductCart;
  quantity: number;
};

interface StoreCart {
  items: Item[];
  addItem: (data: Item) => void;
  changeQuantity: (sku: number, quantity: number) => void;
  removeItem: (sku: number) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<StoreCart>(
    (set, get) => ({
      items: [],
      addItem: (data: Item) => {
        const currentItems = [...get().items];

        const itemExist = currentItems.findIndex(
          (item) => item.product.sku === data.product.sku
        );

        if (itemExist > -1) {
          currentItems[itemExist] = {
            ...currentItems[itemExist],
            quantity: currentItems[itemExist].quantity + data.quantity,
          };
        } else {
          currentItems.push(data);
        }

        set({ items: currentItems });
      },
      changeQuantity: (sku, quantity) => {
        const currentItems = [...get().items];

        const itemExist = currentItems.findIndex(
          (item) => item.product.sku === sku
        );

        if (itemExist > -1) {
          currentItems[itemExist].quantity = quantity;
          set({});
        }
      },
      removeItem: (sku: number) => {
        set({ items: get().items.filter((item) => item.product.sku !== sku) });
      },
      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
