import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  if (body.status === "PAID") {
    console.log(
      `Invoice successfully paid with status ${body.status} and id ${body.id}`
    );

    //  update order
    const order = await prisma.order.update({
      where: {
        id: body.external_id,
      },
      data: {
        isPaid: true,
        paymentMethod: body.payment_method,
        paymentChannel: body.payment_channel,
      },
    });
  }
  return NextResponse.json({}, { status: 200 });
}
