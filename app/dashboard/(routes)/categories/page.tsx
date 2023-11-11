import React from "react";
import Container from "../../components/container";
import ClientComp from "./components/client-comp";
import prisma from "@/lib/db";

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany({
    include: { upper: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories = categories.map((category) => ({
    id: category.id,
    name: category.name ?? "",
    upper: category.upper?.name || "-",
  }));

  return (
    <Container>
      <ClientComp data={formattedCategories} />
    </Container>
  );
};

export default CategoriesPage;
