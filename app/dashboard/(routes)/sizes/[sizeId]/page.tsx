import Heading from "@/app/dashboard/components/Heading";
import Container from "@/app/dashboard/components/container";
import { Separator } from "@/components/ui/separator";
import React from "react";
import CreateForm from "./components/create-form";
import prisma from "@/lib/db";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <Container>
      <Heading title="Create size" description="Fill up the form" />
      <Separator className="my-4" />
      <CreateForm initialData={size} />
    </Container>
  );
};

export default SizePage;
