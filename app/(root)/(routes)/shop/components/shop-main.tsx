"use client";

import { Separator } from "@/components/ui/separator";
import {
  Category,
  Color,
  Image as ImageType,
  Product,
  Size,
} from "@prisma/client";
import { Search } from "lucide-react";
import Filter from "./filter";
import Image from "next/image";
import { BASE_IMAGE_URL } from "@/constants";
import SelectFilter from "./select-filter";
import { Button } from "@/components/ui/button";
import SearchFilter from "./search-filter";

type ProductIncludedType = Product & { images: ImageType[] };

type Props = {
  products: ProductIncludedType[];
  categories: Category[];
  sizes: Size[];
  colors: Color[];
};

const ShopMain = ({ products, categories, sizes, colors }: Props) => {
  return (
    <main className="flex gap-6 my-16 max-w-7xl mx-auto px-2 sm:px-4">
      <aside className="flex flex-col gap-8 w-72">
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
        {/* sorting */}
        <div className="self-end">
          <SelectFilter
            data={[
              { label: "Highest price", value: "price" },
              { label: "Latest", value: "createdAt" },
            ]}
            valueKey="sort"
          />
        </div>
        {/* grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative">
              <Image
                src={`${BASE_IMAGE_URL}/${product.images[0].url}`}
                alt=""
                width={200}
                height={200}
                className="w-full h-full aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShopMain;
