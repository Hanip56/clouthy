import React from "react";
import Container from "../../components/container";
import ClientComp from "./components/client-comp";
import prisma from "@/lib/db";
import { format } from "date-fns";

const ProductEntrysPage = async () => {
  const productEntrys = await prisma.productEntry.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      color: true,
      size: true,
      product: true,
    },
  });

  const formattedProductEntry = productEntrys.map((entry) => ({
    sku: entry.sku,
    product: entry.product.name,
    color: entry.color.name,
    size: entry.size.name,
    qty: entry.qty,
    updatedAt: format(entry.updatedAt, "MMMM do, yyyy"),
  }));

  return (
    <Container>
      <ClientComp data={formattedProductEntry} />
    </Container>
  );
};

export default ProductEntrysPage;
