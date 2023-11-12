import Heading from "@/app/dashboard/components/Heading";
import Container from "@/app/dashboard/components/container";
import { Separator } from "@/components/ui/separator";
import React from "react";
import CreateForm from "./components/create-form";
import prisma from "@/lib/db";

const ProductEntryPage = async ({ params }: { params: { sku: string } }) => {
  console.log({
    sku: Number.isNaN(Number(params.sku)) ? "not number" : "number",
  });

  let productEntry;

  if (!Number.isNaN(Number(params.sku))) {
    productEntry = await prisma.productEntry.findFirst({
      where: {
        sku: Number(params.sku),
      },
    });
  }

  const products = await prisma.product.findMany({});
  const colors = await prisma.color.findMany({});
  const sizes = await prisma.size.findMany({});

  return (
    <Container>
      <Heading title="Create product entry" description="Fill up the form" />
      <Separator className="my-4" />
      <CreateForm
        initialData={productEntry ?? null}
        products={products}
        colors={colors}
        sizes={sizes}
      />
    </Container>
  );
};

export default ProductEntryPage;
