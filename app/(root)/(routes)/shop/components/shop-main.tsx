"use client";

import { Separator } from "@/components/ui/separator";
import {
  Category,
  Color,
  Image as ImageType,
  Product,
  Size,
} from "@prisma/client";
import { Expand, Search, ShoppingCart } from "lucide-react";
import Filter from "./filter";
import Image from "next/image";
import { BASE_IMAGE_URL } from "@/constants";
import SelectFilter from "./select-filter";
import { Button } from "@/components/ui/button";
import SearchFilter from "./search-filter";
import Link from "next/link";
import MobileAside from "./mobile-aside";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import ProductCard from "@/components/product-card";

type ProductIncludedType = Product & { images: ImageType[] };

type Props = {
  products: ProductIncludedType[];
  categories: Category[];
  sizes: Size[];
  colors: Color[];
};

const ShopMain = ({ products, categories, sizes, colors }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { removeAll } = useCart();

  const success = searchParams.get("success");

  console.log({ success });

  useEffect(() => {
    if (success) {
      toast.success("Payment sucessfull!");

      removeAll();
      router.replace("../shop");
    }
  }, [success, router]);

  return (
    <main className="flex gap-6 my-20 md:my-28 max-w-7xl mx-auto px-2 sm:px-4">
      <aside className="sm:flex flex-col gap-8 w-72 hidden">
        <SearchFilter />
        <Separator />
        <Filter title="Category" data={categories} valueKey="categoryId" />
        <Separator />
        <Filter title="Size" data={sizes} valueKey="sizeId" />
        <Separator />
        <Filter title="Color" data={colors} valueKey="colorId" />
        <Separator />
      </aside>
      <div className="flex-1 flex flex-col gap-12">
        <div className="flex justify-between items-center">
          {/* mobile filter */}
          <MobileAside categories={categories} colors={colors} sizes={sizes} />
          {/* sorting */}
          <div className="ml-auto">
            <SelectFilter
              data={[
                { label: "Highest price", value: "price" },
                { label: "Latest", value: "createdAt" },
              ]}
              valueKey="sort"
            />
          </div>
        </div>
        {/* grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShopMain;
