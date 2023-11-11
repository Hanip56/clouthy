import React from "react";
import Container from "../../components/container";
import ClientComp from "./components/client-comp";
import prisma from "@/lib/db";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      images: true,
    },
  });

  const formattedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description ?? "",
    price: formatter.format(product.price.toNumber()),
    category: product.category.name ?? "",
    isFeatured: product.isFeatured,
    updatedAt: format(product.updatedAt, "MMMM do, yyyy"),
  }));

  return (
    <Container>
      <ClientComp data={formattedProducts} />
    </Container>
  );
};

export default ProductsPage;
