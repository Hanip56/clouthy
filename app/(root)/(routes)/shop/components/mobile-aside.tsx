"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import React from "react";
import SearchFilter from "./search-filter";
import { Separator } from "@/components/ui/separator";
import Filter from "./filter";
import { Category, Color, Size } from "@prisma/client";

type Props = {
  colors: Color[];
  categories: Category[];
  sizes: Size[];
};

const MobileAside = ({ categories, colors, sizes }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="blcok sm:hidden rounded-full">
        <Button>
          <FilterIcon className="w-4 h-4 mr-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[90%] pt-12">
        <aside className="flex flex-col gap-4">
          <SearchFilter />
          <Separator />
          <Filter title="Category" data={categories} valueKey="categoryId" />
          <Separator />
          <Filter title="Size" data={sizes} valueKey="sizeId" />
          <Separator />
          <Filter title="Color" data={colors} valueKey="colorId" />
          <Separator />
        </aside>
      </SheetContent>
    </Sheet>
  );
};

export default MobileAside;
