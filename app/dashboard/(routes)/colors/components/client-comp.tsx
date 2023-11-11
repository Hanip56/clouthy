"use client";

import React from "react";
import Heading from "../../../components/Heading";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ColorColumn, columns } from "./columns";
import Link from "next/link";

type Props = {
  data: ColorColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Colors" description="Manage your colors" />
        <Link href="colors/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-4" />
            <span>Add color</span>
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <DataTable data={data} columns={columns} searchKey="name" />
    </>
  );
};

export default ClientComp;
