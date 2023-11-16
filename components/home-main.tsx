import { Image as ImageType, Product } from "@prisma/client";
import React from "react";
import ProductCard from "./product-card";

type Props = {
  featuredProducts: (Product & { images: ImageType[] })[];
};

const HomeMain = ({ featuredProducts }: Props) => {
  return (
    <div className="max-w-6xl mx-auto my-20 md:my-28 space-y-28 px-2 md:px-4">
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
