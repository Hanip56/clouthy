"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import useCart from "@/hooks/use-cart";
import { formatter } from "@/lib/utils";
import Image from "next/image";
import { BASE_IMAGE_URL } from "@/constants";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

const CartSheet = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  const { items, removeItem, changeQuantity } = useCart();
  const router = useRouter();

  const handleRemove = (sku: number) => {
    removeItem(sku);
  };

  const handleChangeQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    sku: number,
    stock: number
  ) => {
    let inputNumber = Number(e.target.value);

    if (inputNumber === 0) return;

    if (inputNumber > stock) {
      inputNumber = stock;
    }
    changeQuantity(sku, inputNumber);
  };

  const totalQuantity = items.reduce((acc, cur) => acc + cur.quantity, 0);
  const totalPrice = items.reduce((acc, curr) => {
    const productPrice = Number(curr.product.price) * curr.quantity;

    return acc + productPrice;
  }, 0);

  if (!mounted)
    return (
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full hover:bg-gray-50 relative"
      >
        <ShoppingBag className="w-5 h-5" />
      </Button>
    );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-gray-50 relative"
        >
          <ShoppingBag className="w-5 h-5" />
          <Badge className="absolute top-1 right-0 w-4 h-4 text-xs  flex items-center justify-center p-1">
            {totalQuantity}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 flex flex-col w-full sm:w-[30rem]">
        <SheetHeader className="p-4 sm:p-6 flex justify-center text-xl font-semibold border-b">
          Your Cart
        </SheetHeader>
        <div className="flex flex-col gap-6 flex-1 p-4 sm:px-6 sm:py-4 overflow-y-auto">
          {items.length < 1 && (
            <div className="p-3 bg-slate-100 font-semibold">No items yet</div>
          )}
          {items.length > 0 &&
            items.map((item) => (
              <div
                key={item.product.sku}
                className="flex gap-4 justify-between"
              >
                <div className="w-20 h-20 bg-slate-200 flex-shrink-0">
                  <Image
                    src={`${BASE_IMAGE_URL}/${item.product.image.url}`}
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <strong>{item.product.name}</strong>
                  <p>{formatter.format(Number(item.product.price))}</p>
                  <small>
                    size: {item.product.size} | color: {item.product.color}
                  </small>
                  <div
                    role="button"
                    onClick={() => handleRemove(item.product.sku)}
                    className="cursor-pointer underline"
                  >
                    Remove
                  </div>
                </div>
                <div>
                  <input
                    className="w-14 h-10 px-2 bg-slate-100"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChangeQuantity(
                        e,
                        item.product.sku,
                        item.product.stock
                      )
                    }
                    min={1}
                    max={item.product.stock}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="mt-auto p-4 sm:p-6 border-t w-full space-y-6">
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <b>{formatter.format(totalPrice)}</b>
          </div>
          <Button
            disabled={items.length < 1}
            onClick={() => router.push("/checkout")}
            className="w-full text-lg"
          >
            Continue to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
