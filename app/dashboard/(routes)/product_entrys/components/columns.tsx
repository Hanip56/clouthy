"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ProductEntryColumn = {
  sku: number;
  product: string;
  color: string;
  size: string;
  qty: number;
  updatedAt: string;
};

export const columns: ColumnDef<ProductEntryColumn>[] = [
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "qty",
    header: "Quantity",
  },
  {
    accessorKey: "updatedAt",
    header: "Last updated",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
