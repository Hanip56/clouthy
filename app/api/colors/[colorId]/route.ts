import prisma from "@/lib/db";
import { options } from "@/lib/nextAuthOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const session = await getServerSession(options);

    if (!session || !session.user.isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const color = await prisma.color.update({
      where: {
        id: params.colorId,
      },
      data: body,
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const session = await getServerSession(options);

    if (!session || !session.user.isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    await prisma.color.delete({
      where: { id: params.colorId },
    });

    return NextResponse.json({ message: "Deleted succesfully" });
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
