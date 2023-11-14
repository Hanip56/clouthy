"use client";

import { Separator } from "@/components/ui/separator";
import { BASE_IMAGE_URL } from "@/constants";
import useCart from "@/hooks/use-cart";
import { formatter } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartItems = () => {
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const totalPrice = items.reduce((acc, curr) => {
    const productPrice = Number(curr.product.price) * curr.quantity;

    return acc + productPrice;
  }, 0);

  return (
    <>
      <div className="flex flex-col gap-6">
        {items.length > 0 &&
          items.map((item) => (
            <div
              key={item.product.sku}
              className="flex gap-4 items-center justify-between"
            >
              <div className="relative w-16 h-16 bg-slate-200 flex-shrink-0 rounded-md">
                <Image
                  src={`${BASE_IMAGE_URL}/${item.product.image.url}`}
                  alt=""
                  width={200}
                  height={200}
                  className="w-full h-full object-cover aspect-square rounded-md"
                />
                {/* badge */}
                <div className="absolute -top-2 -right-2 w-7 h-7 flex justify-center items-center bg-lime-800 text-white rounded-full text-xs">
                  {item.quantity}
                </div>
              </div>
              <div className="flex flex-col flex-1 space-y-1">
                <p className="text-sm">{item.product.name}</p>
                <small className="text-xs">
                  size: {item.product.size} | color: {item.product.color}
                </small>
              </div>
              <p className="text-xs">
                {formatter.format(Number(item.product.price))}
              </p>
            </div>
          ))}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <span>Subtotal</span>{" "}
          <span className="font-semibold">{formatter.format(totalPrice)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Shipping</span>{" "}
          <span className="text-gray-400 text-xs">Free shipping</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">Total</span>{" "}
          <b>{formatter.format(totalPrice)}</b>
        </div>
      </div>
    </>
  );
};

export default CartItems;
