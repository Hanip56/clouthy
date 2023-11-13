"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { BASE_IMAGE_URL } from "@/constants";
import { formatter } from "@/lib/utils";
import {
  Category,
  Color,
  Image as ImageType,
  Product,
  ProductEntry,
  Size,
} from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import SelectOption from "./select-option";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export type ProductEntryDetail = ProductEntry & { color: Color; size: Size };

export type ProductDetail = Product & {
  images: ImageType[];
  items: ProductEntryDetail[];
  category: Category;
};

type MainDetailProps = {
  product: ProductDetail | null;
  relatedProducts: (Product & { images: ImageType[] })[];
};

const MainDetail = ({ product, relatedProducts }: MainDetailProps) => {
  const [currentSku, setCurrentSku] = useState(product?.items[0]);
  const [quantity, setQuantity] = useState("1");

  if (!product) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-20 md:gap-28 my-20 md:my-28 max-w-6xl mx-auto px-2 sm:px-4">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="flex-1">
          <Image
            src={`${BASE_IMAGE_URL}/${product.images[0].url}`}
            alt={product.name}
            className="w-full aspect-square object-cover"
            width={500}
            height={500}
            priority
          />
        </div>
        <div className="flex-1 flex flex-col gap-y-6 md:gap-y-8">
          <h3 className="text-3xl font-medium">{product.name}</h3>
          <p className="text-xl md:text-2xl space-x-2 tracking-wide">
            <span>{formatter.format(Number(product.price))}</span>
            <span>IDR</span>
          </p>
          <p className="leading-8 md:leading-10 text-gray-400">
            {product.description}
          </p>
          <div className="w-80 space-y-8">
            {/* Size & Color select */}
            <SelectOption
              currentSku={currentSku}
              setCurrentSku={setCurrentSku}
              product={product}
            />
            <div className="w-full flex gap-4">
              {/* Quantity select */}
              <div className="flex-1 space-y-4">
                <p>Quantity</p>
                <Select
                  defaultValue={quantity}
                  value={quantity}
                  onValueChange={setQuantity}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue defaultValue={quantity} />
                  </SelectTrigger>
                  <SelectContent>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-4">
                <p>In stock</p>
                <div className="bg-slate-200 w-20 h-12 flex items-center justify-center rounded-md text-center text-sm">
                  {currentSku?.qty}
                </div>
              </div>
            </div>
          </div>
          {/* sku info */}
          <div className="space-y-2">
            <p className="tracking-wider">
              <span className="font-medium">SKU: </span>
              <span className="text-slate-500">{currentSku?.sku}</span>
            </p>
            <p className="tracking-wider">
              <span className="font-medium">CATEGORY: </span>
              <span className="text-slate-500">{product.category.name}</span>
            </p>
          </div>
          {/* Add to Cart */}
          <Button className="h-12 self-start w-full sm:w-80">
            <Plus className="w-4 h-4 mr-4" /> Add To Cart
          </Button>
        </div>
      </div>

      {/* review */}
      {/* related Products */}
      <div className="space-y-10 md:space-y-12">
        <div className="text-center leading-10">
          <h2 className="text-4xl md:text-5xl font-medium">Related Products</h2>
          <p>Discover Our New Summer Big Collection.</p>
        </div>
        {relatedProducts.length < 1 && (
          <div className="p-3 w-full bg-gray-200">
            <p>No items found</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="space-y-3 mb-16">
              <Link href={`${product.slug}`} className="relative">
                <Image
                  src={`${BASE_IMAGE_URL}/${product.images?.[0].url}`}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="aspect-square w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/10 opacity-0 hover:opacity-100 transition-opacity" />
              </Link>
              <div>
                <p className="text-gray-400">{product.name}</p>
                <p>{formatter.format(Number(product.price))}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainDetail;
