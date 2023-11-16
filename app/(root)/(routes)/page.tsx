import Hero from "@/components/hero";
import HomeMain from "@/components/home-main";
import prisma from "@/lib/db";
import React from "react";

const HomePage = async () => {
  const featuredProducts = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: true,
    },
  });

  return (
    <div>
      <Hero />
      <HomeMain featuredProducts={featuredProducts} />
    </div>
  );
};

export default HomePage;
