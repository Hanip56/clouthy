"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";

const CartSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-gray-50"
        >
          <ShoppingBag className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 flex flex-col w-full sm:w-[30rem]">
        <SheetHeader className="p-4 sm:p-6 flex justify-center text-xl font-semibold border-b">
          Your Cart
        </SheetHeader>
        <div className="flex-1 p-4 sm:px-6 sm:py-4 overflow-y-auto">
          {/* item */}
          <div className="flex gap-4 justify-between">
            <div className="w-20 h-20 bg-slate-200 flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <strong>Men&apos;s Lather Belt</strong>
              <p>Rp 65.000,00 IDR</p>
              <div className="cursor-pointer underline">Remove</div>
            </div>
            <div>
              <input
                className="w-14 h-10 px-2 bg-slate-100"
                type="number"
                defaultValue={1}
              />
            </div>
          </div>
        </div>
        <div className="mt-auto p-4 sm:p-6 border-t w-full space-y-6">
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <b>Rp 30.000,00</b>
          </div>
          <Button className="w-full text-lg">Continue to Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
