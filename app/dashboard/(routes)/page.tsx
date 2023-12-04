import React from "react";
import Heading from "../components/Heading";
import { Separator } from "@/components/ui/separator";
import Container from "../components/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { CreditCard, Package } from "lucide-react";
import prisma from "@/lib/db";
import Overview from "../components/Overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

const DashboardPage = async () => {
  const paidOrders = await prisma.order.findMany({
    where: {
      isPaid: true,
    },
  });

  const productSkus = await prisma.productEntry.findMany();

  const totalRevenue = paidOrders.reduce((acc, cur) => {
    return acc + (cur.amount ?? 0);
  }, 0);

  const totalSales = paidOrders.length;
  const productInStocks = productSkus.reduce((acc, cur) => {
    return acc + cur.qty;
  }, 0);
  const graphRevenue = await getGraphRevenue();

  return (
    <Container>
      <Heading title="Dashboard" description="Overview of your store" />
      <Separator className="my-4" />
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between font-semibold">
              <span>Total Revenue</span>
              <span>Rp</span>
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-xl font-bold">
              {formatter.format(totalRevenue)}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between font-semibold">
              <span>Sales</span>
              <CreditCard className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-xl font-bold">+{totalSales}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between font-semibold">
              <span>Products in stock</span>
              <Package className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-xl font-bold">{productInStocks}</span>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4 mt-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={graphRevenue} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default DashboardPage;
