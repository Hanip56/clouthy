import Heading from "@/components/heading";
import prisma from "@/lib/db";
import React from "react";
import MainDetail from "./components/main-detail";
import { notFound } from "next/navigation";

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
  const product = await prisma.product.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      images: true,
      category: true,
      items: {
        include: {
          size: true,
          color: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: {
        id: product.id,
      },
    },
    include: {
      images: true,
    },
    take: 4,
  });

  return (
    <div>
      <Heading customPath={`/shop/${product?.name}`} />
      <MainDetail product={product} relatedProducts={relatedProducts} />
    </div>
  );
};

export default ProductDetailPage;
