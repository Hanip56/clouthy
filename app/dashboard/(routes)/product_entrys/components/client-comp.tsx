"use client";

import React from "react";
import Heading from "../../../components/Heading";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ProductEntryColumn, columns } from "./columns";
import Link from "next/link";

type Props = {
  data: ProductEntryColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="ProductEntrys" description="Manage your products" />
        <Link href="product_entrys/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-4" />
            <span>Add product entry</span>
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <DataTable data={data} columns={columns} searchKey="product" />
    </>
  );
};

export default ClientComp;
