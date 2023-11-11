import React from "react";
import Container from "../../components/container";
import ClientComp from "./components/client-comp";
import prisma from "@/lib/db";

const SizesPage = async () => {
  const sizes = await prisma.size.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes = sizes.map((size) => ({
    id: size.id,
    name: size.name ?? "",
    value: size.value ?? "",
  }));

  return (
    <Container>
      <ClientComp data={formattedSizes} />
    </Container>
  );
};

export default SizesPage;
