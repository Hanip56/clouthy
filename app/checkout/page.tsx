import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import CheckoutForm from "./components/checkout-form";
import { getServerSession } from "next-auth";
import { options } from "@/lib/nextAuthOptions";
import CartItems from "./components/cart-items";

const Checkoutpage = async () => {
  const session = await getServerSession(options);

  return (
    <div>
      <header className="w-full h-20 border-b">
        <div className="max-w-5xl mx-auto h-full flex justify-between items-center">
          <Link href="/shop">
            <Button variant={"ghost"} size={"icon"} className="rounded-full">
              <ShoppingBag className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-center">Clouthy</h1>
          <div className="w-4" />
        </div>
      </header>
      <main className="relative max-w-5xl px-2 mx-auto flex">
        <div className="flex-1 w-full">
          <CheckoutForm session={session} />
        </div>
        <div className="hidden md:block sticky top-0 h-fit basis-[40%] p-4 lg:p-12 pr-0 py-8 space-y-8">
          <CartItems />
        </div>
      </main>
    </div>
  );
};

export default Checkoutpage;
