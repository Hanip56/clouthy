import Heading from "@/app/dashboard/components/Heading";
import Container from "@/app/dashboard/components/container";
import { Separator } from "@/components/ui/separator";
import React from "react";
import CreateForm from "./components/create-form";
import prisma from "@/lib/db";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const categories = await prisma.category.findMany();

  const startIdx = categories?.findIndex(
    (category) => category.id === params.categoryId
  );

  const category = startIdx >= 0 ? categories.splice(startIdx, 1)[0] : null;

  return (
    <Container>
      <Heading title="Create category" description="Fill up the form" />
      <Separator className="my-4" />
      <CreateForm initialData={category} uppers={categories} />
    </Container>
  );
};

export default CategoryPage;
