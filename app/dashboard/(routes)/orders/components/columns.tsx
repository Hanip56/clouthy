"use client";

import { formatter } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  customerEmail: string;
  amount: number;
  isPaid: boolean;
  paymentChannel: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "customerEmail",
    header: "Customer Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatter.format(row.original.amount),
  },
  {
    accessorKey: "paymentChannel",
    header: "PaymentChannel",
  },
  {
    accessorKey: "isPaid",
    header: "IsPaid",
    cell: ({ row }) => (row.original.isPaid ? "True" : "False"),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
