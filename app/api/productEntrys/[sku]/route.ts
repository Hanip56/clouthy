import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { sku: string } }
) {
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

    const productEntry = await prisma.productEntry.update({
      where: {
        sku: Number(params.sku),
      },
      data: body,
    });

    return NextResponse.json(productEntry);
  } catch (error) {
    console.log("[PRODUCTENTRY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sku: string } }
) {
  try {
    if (!params.sku) {
      return new NextResponse("sku is required", { status: 400 });
    }

    await prisma.productEntry.delete({
      where: { sku: Number(params.sku) },
    });

    return NextResponse.json({ message: "Deleted succesfully" });
  } catch (error) {
    console.log("[PRODUCTENTRY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
