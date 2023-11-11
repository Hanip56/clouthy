import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, price, description, images, categoryId, isFeatured } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        categoryId,
        isFeatured,
        images: {
          createMany: {
            data: images.map((image: string) => ({ url: image })),
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[POST_PRODUCTS]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
