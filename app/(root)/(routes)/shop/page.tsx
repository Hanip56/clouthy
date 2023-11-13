import Heading from "@/components/heading";
import ShopMain from "./components/shop-main";

import React from "react";
import prisma from "@/lib/db";

type ShopPageProps = {
  searchParams: {
    categoryId: string;
    colorId: string;
    sizeId: string;
    sort: string;
    search: string;
  };
};

const ShopPage = async ({ searchParams }: ShopPageProps) => {
  const { categoryId, colorId, sizeId, sort, search } = searchParams;

  let orderBy;

  if (sort) {
    orderBy = { [sort]: "desc" };
  }

  let products = await prisma.product.findMany({
    where: {
      categoryId,
      name: { contains: search, mode: "insensitive" },
      items: {
        some: {
          colorId: colorId || undefined,
          sizeId: sizeId || undefined,
        },
      },
    },
    include: {
      images: true,
    },
    orderBy,
  });
  const categories = await prisma.category.findMany();
  const sizes = await prisma.size.findMany();
  const colors = await prisma.color.findMany();

  return (
    <div>
      <Heading />
      <ShopMain
        products={products}
        categories={categories}
        sizes={sizes}
        colors={colors}
      />
    </div>
  );
};

export default ShopPage;
