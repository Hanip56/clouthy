import prisma from "@/lib/db";
import { options } from "@/lib/nextAuthOptions";
import { utapi } from "@/lib/uploadThingServer";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(options);

    if (!session || !session.user.isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const productExist = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
      },
    });

    if (!productExist) {
      return new NextResponse("Product not found", { status: 404 });
    }

    await prisma.$transaction([
      prisma.product.update({
        where: {
          id: params.productId,
        },
        data: {
          ...body,
          images: undefined,
          deleteImages: undefined,
        },
      }),
      prisma.image.deleteMany({
        where: {
          productId: params.productId,
        },
      }),
      prisma.image.createMany({
        data: body.images.map((url: string) => ({
          url,
          productId: params.productId,
        })),
      }),
    ]);

    if (body.deleteImages) {
      await utapi.deleteFiles(body.deleteImages);
    }

    return NextResponse.json("updated");
  } catch (error) {
    console.log("[PATCH_PRODUCT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const session = await getServerSession(options);

  if (!session || !session.user.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!params.productId) {
    return new NextResponse("Product id is required", { status: 400 });
  }

  try {
    const images = await prisma.image.findMany({
      where: {
        productId: params.productId,
      },
    });

    await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    if (images.length) {
      await utapi.deleteFiles(images.map((image) => image.url));
    }

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.log("[DELETE_PRODUCT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
