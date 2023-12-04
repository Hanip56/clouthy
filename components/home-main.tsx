import { Image as ImageType, Product } from "@prisma/client";
import React from "react";
import ProductCard from "./product-card";
import Link from "next/link";
import Image from "next/image";
import bagImage from "@/assets/images/category-bag.jpg";
import shoesImage from "@/assets/images/category-shoes.jpg";
import watchImage from "@/assets/images/category-watch.jpg";
import menImage from "@/assets/images/category-men.jpg";

import BrandSlider from "./brand-slider";

type Props = {
  featuredProducts: (Product & { images: ImageType[] })[];
};

const categories = [
  {
    title: "Bag",
    link: "/shop?categoryId=clpplxhki000wtyvgftzifo6p",
    image: bagImage,
  },
  {
    title: "Shoes",
    link: "/shop?categoryId=clppkag0q0001tyvg7z53ecu4",
    image: shoesImage,
  },
  {
    title: "Watch",
    link: "/shop?categoryId=clovj3wcb0009tyco50kyddwd",
    image: watchImage,
  },
];

const HomeMain = ({ featuredProducts }: Props) => {
  return (
    <div className="max-w-6xl mx-auto my-20 md:my-28 space-y-28 px-2 md:px-4">
      {/* Category */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {categories.map((category, i) => (
          <div
            key={i}
            className="relative p-8 rounded-lg bg-slate-100 h-60 overflow-hidden flex items-center"
          >
            {/* info */}
            <div className="relative z-10">
              <h3 className="font-medium text-3xl leading-normal mb-4">
                Fashion <br /> {category.title}
              </h3>
              <Link href={category.link}>
                <span className="border-b border-black py-1">
                  Discover more
                </span>
              </Link>
            </div>
            {/* img */}
            <div className="absolute w-full h-full top-0 right-0 flex justify-end">
              <Image
                src={category.image}
                alt={`Fashion ${category.title}`}
                width={500}
                height={500}
                className="h-full object-contain w-fit"
              />
            </div>
          </div>
        ))}
      </section>

      <section>
        <BrandSlider />
      </section>

      {/* category 2 */}
      {/* <section className="grid grid-cols-2 gap-10">
        {Array(3)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="relative h-[40rem] rounded-md overflow-hidden"
            >
              <div className="absolute -z-10 w-full h-full top-0 left-0">
                <Image
                  src={menImage}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-full flex flex-col gap-4 items-center justify-end p-8">
                <h3 className="text-white text-3xl">Men&apos;s Fashion</h3>
                <button className="w-40 rounded-full bg-white text-black text-center py-2">
                  Discover more
                </button>
              </div>
            </div>
          ))}
      </section> */}

      {/* Featured product */}
      <section className="text-center space-y-12">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-medium">
            Featured Products
          </h2>
          <p>Discover Our New Summer Big Collection.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeMain;
