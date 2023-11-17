"use client";

import React from "react";
import Heading from "../../../components/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { OrderColumn, columns } from "./columns";

type Props = {
  data: OrderColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Orders" description="Manage your orders" />
      </div>
      <Separator className="my-4" />
      <DataTable data={data} columns={columns} searchKey="id" />
    </>
  );
};

export default ClientComp;
