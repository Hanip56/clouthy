"use client";

import { Product } from "@prisma/client";
import Link from "next/link";
import { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import { BASE_IMAGE_URL } from "@/constants";
import { Button } from "./ui/button";
import { Expand } from "lucide-react";
import usePreview from "@/hooks/use-preview";
import { MouseEventHandler } from "react";

type Props = {
  product: Product & { images: ImageType[] };
};

const ProductCard = ({ product }: Props) => {
  const { onOpen } = usePreview();

  return (
    <Link href={`/shop/${product.slug}`} key={product.id}>
      <div className="relative group">
        <Image
          src={`${BASE_IMAGE_URL}/${product.images[0].url}`}
          alt=""
          width={200}
          height={200}
          className="w-full h-full aspect-square object-contain"
        />
        <div className="absolute top-0 left-0 z-10 w-full h-full">
          <div className="w-full h-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:bottom-10 transition-all">
            <Button
              // onClick={(e) => {
              //   e.stopPropagation();

              //   onOpen(product);
              // }}
              variant={"secondary"}
              className="hover:bg-white"
            >
              <Expand className="w-5 h-5 mr-2" /> Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
