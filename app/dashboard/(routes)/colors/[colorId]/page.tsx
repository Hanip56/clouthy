import Heading from "@/app/dashboard/components/Heading";
import Container from "@/app/dashboard/components/container";
import { Separator } from "@/components/ui/separator";
import React from "react";
import CreateForm from "./components/create-form";
import prisma from "@/lib/db";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await prisma.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <Container>
      <Heading title="Create color" description="Fill up the form" />
      <Separator className="my-4" />
      <CreateForm initialData={color} />
    </Container>
  );
};

export default ColorPage;
