import Heading from "@/app/dashboard/components/Heading";
import Container from "@/app/dashboard/components/container";
import { Separator } from "@/components/ui/separator";
import React from "react";
import CreateForm from "./components/create-form";
import prisma from "@/lib/db";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <Container>
      <Heading title="Create product" description="Fill up the form" />
      <Separator className="my-4" />
      <CreateForm initialData={product} categories={categories} />
    </Container>
  );
};

export default ProductPage;
