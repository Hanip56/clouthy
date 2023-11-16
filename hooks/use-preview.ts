import { Image, Product } from "@prisma/client";
import { create } from "zustand";

type ProductWithImage = Product & { images: Image[] };

interface UsePreview {
  isOpen: boolean;
  data: ProductWithImage | null;
  onOpen: (product: ProductWithImage) => void;
  onClose: () => void;
}

const usePreview = create<UsePreview>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (product) => set({ isOpen: true, data: product }),
  onClose: () => set({ isOpen: false, data: null }),
}));

export default usePreview;
