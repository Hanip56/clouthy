import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { productId, sizeId, colorId, qty } = body;

    if (!productId) {
      return new NextResponse("ProductId is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("SizeId is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("ColorId is required", { status: 400 });
    }

    if (!qty) {
      return new NextResponse("Qty is required", { status: 400 });
    }

    const productEntryExist = await prisma.productEntry.findUnique({
      where: {
        productId_colorId_sizeId: { productId, colorId, sizeId },
      },
    });

    if (productEntryExist) {
      return new NextResponse("Product already exist.", { status: 409 });
    }

    const productEntry = await prisma.productEntry.create({
      data: body,
    });

    return NextResponse.json(productEntry);
  } catch (error) {
    console.log("[PRODUCTENTRYS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
