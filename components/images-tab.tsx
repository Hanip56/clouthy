"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import { BASE_IMAGE_URL } from "@/constants";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  images: ImageType[];
};

const ImagesTab = ({ images }: Props) => {
  const [activeImage, setActiveImage] = useState(images[0].id);

  if (!images[0].id) return null;

  return (
    <Tabs defaultValue={images[0].id} onValueChange={setActiveImage}>
      {images.map((image) => (
        <TabsContent key={image.id} value={image.id} className="mb-4">
          <Image
            src={`${BASE_IMAGE_URL}/${image.url}`}
            alt={image.id}
            width={500}
            height={500}
            className="w-full h-full object-cover aspect-square"
          />
        </TabsContent>
      ))}
      <TabsList className="w-fit h-20 space-x-2 bg-transparent">
        {images.map((image) => (
          <TabsTrigger
            key={image.id}
            value={image.id}
            className={cn(
              "border-black h-full",
              image.id === activeImage && "border"
            )}
          >
            <Image
              src={`${BASE_IMAGE_URL}/${image.url}`}
              alt={image.id}
              width={300}
              height={300}
              className="w-full h-full object-cover aspect-square"
            />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ImagesTab;
