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

type ProductIncludedType = Product & { images: ImageType[] };

type Props = {
  products: ProductIncludedType[];
  categories: Category[];
  sizes: Size[];
  colors: Color[];
};

const ShopMain = ({ products, categories, sizes, colors }: Props) => {
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
            <Link href={`/shop/${product.slug}`} key={product.id}>
              <div className="relative group">
                <Image
                  src={`${BASE_IMAGE_URL}/${product.images[0].url}`}
                  alt=""
                  width={200}
                  height={200}
                  className="w-full h-full aspect-square object-cover"
                />
                <div className="absolute top-0 left-0 z-10 w-full h-full">
                  <div className="w-full h-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:bottom-10 transition-all">
                    <Button variant={"secondary"} className="hover:bg-white">
                      <Expand className="w-5 h-5 mr-2" /> Expand
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShopMain;
