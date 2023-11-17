import React from "react";
import Container from "../../components/container";
import ClientComp from "./components/client-comp";
import prisma from "@/lib/db";
import { format } from "date-fns";

const OrdersPage = async () => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: true,
    },
  });

  const formattedOrders = orders.map((order) => ({
    id: order.id,
    customerEmail: order.customer?.email ?? "",
    amount: order.amount ?? 0,
    isPaid: order.isPaid,
    paymentChannel: order.paymentChannel ?? "",
    createdAt: format(order.createdAt, "MMM-dd-yyyy"),
  }));

  return (
    <Container>
      <ClientComp data={formattedOrders} />
    </Container>
  );
};

export default OrdersPage;
