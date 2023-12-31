import prisma from "@/lib/db";
import { options } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(options);

    if (!session || !session.user.isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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

    const slug = slugify(name, { lower: true, strict: true, replacement: "-" });

    const product = await prisma.product.create({
      data: {
        name,
        price,
        slug,
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
