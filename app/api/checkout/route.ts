import prisma from "@/lib/db";
import { xenditClient } from "@/lib/xendit";
import { NextResponse } from "next/server";
import { InvoiceItem } from "xendit-node/invoice/models";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      country,
      postalCode,
      state,
      streetLine1,
      streetLine2,
    } = body;

    const cartItems = body.cartItems as { sku: number; quantity: number }[];

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !city ||
      !country ||
      !postalCode ||
      !state ||
      !streetLine1 ||
      !streetLine2
    ) {
      return new NextResponse("Please add all required fields", {
        status: 400,
      });
    }

    if (!cartItems)
      return new NextResponse("cartItems is required", { status: 400 });

    const skus = cartItems.map(({ sku }) => sku);

    const productEntrys = await prisma.productEntry.findMany({
      where: {
        sku: { in: skus },
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    const mappedProducts: InvoiceItem[] = productEntrys.map((product) => ({
      name: product.product.name,
      price: product.product.price.toNumber(),
      category: product.product.category.name ?? "",
      quantity: cartItems.find((item) => item.sku === product.sku)!.quantity,
    }));

    const amount = mappedProducts.reduce(
      (acc, cur) => acc + Number(cur.price) * cur.quantity,
      0
    );

    // create order
    const order = await prisma.order.create({
      data: {
        amount,
        address: {
          create: {
            country,
            state,
            city,
            postalCode,
            streetLine1,
            streetLine2,
          },
        },
        customer: {
          create: {
            email,
            firstName,
            lastName,
            phoneNumber,
          },
        },
        orderItem: {
          create: cartItems.map((item) => ({
            productSku: item.sku,
            qty: item.quantity,
          })),
        },
      },
    });

    // xendit create invoice
    const { Invoice } = xenditClient;

    const invoice = await Invoice.createInvoice({
      data: {
        amount,
        externalId: order.id,
        customer: {
          email,
          givenNames: firstName,
          surname: lastName,
          phoneNumber,
          addresses: [
            {
              city,
              country,
              postalCode,
              state,
              streetLine1,
              streetLine2,
            },
          ],
        },
        currency: "IDR",
        customerNotificationPreference: {
          invoicePaid: ["email", "whatsapp"],
        },
        successRedirectUrl: `${process.env.NEXTAUTH_URL}/shop?success=1`,
        failureRedirectUrl: `${process.env.NEXTAUTH_URL}/shop?failed=1`,
        items: mappedProducts,
      },
    });

    return NextResponse.json({ url: invoice.invoiceUrl });
  } catch (error) {
    console.log("[CHECKOUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
