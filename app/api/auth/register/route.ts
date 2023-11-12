import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("email is required", { status: 400 });
    }

    if (!password) {
      return new NextResponse("password is required", { status: 400 });
    }

    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      return new NextResponse("User already exist", { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[REGISTER_USER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
