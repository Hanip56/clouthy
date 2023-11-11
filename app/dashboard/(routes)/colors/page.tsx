import React from "react";
import Container from "../../components/container";
import ClientComp from "./components/client-comp";
import prisma from "@/lib/db";

const ColorsPage = async () => {
  const colors = await prisma.color.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors = colors.map((color) => ({
    id: color.id,
    name: color.name ?? "",
    value: color.value ?? "",
  }));

  return (
    <Container>
      <ClientComp data={formattedColors} />
    </Container>
  );
};

export default ColorsPage;
