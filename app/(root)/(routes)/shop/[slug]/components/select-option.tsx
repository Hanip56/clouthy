import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { ProductDetail, ProductEntryDetail } from "./main-detail";
import { cn } from "@/lib/utils";

type Props = {
  product: ProductDetail;
  currentSku: ProductEntryDetail | undefined;
  setCurrentSku: React.Dispatch<React.SetStateAction<ProductEntryDetail>>;
};

const SelectOption = ({ product, currentSku, setCurrentSku }: Props) => {
  const [currentSize, setCurrentSize] = useState(currentSku?.sizeId);
  const [currentColor, setCurrentColor] = useState(currentSku?.colorId);

  let availableColors = product.items.filter(
    (item) => item.sizeId === currentSku?.sizeId
  );

  const onChange = (value: string) => {
    const findedData = product.items.find((item) => item.sizeId === value);

    if (!findedData) return;

    setCurrentSize(value);
    setCurrentSku(findedData);
  };

  useEffect(() => {
    if (currentSku?.colorId !== currentColor) {
      setCurrentColor(availableColors[0].colorId);
    }
  }, [currentSize, availableColors, currentColor, currentSku]);

  return (
    <div className="flex gap-8">
      <div className="space-y-4">
        <p>Size</p>
        <Select
          defaultValue={currentSize}
          value={currentSize}
          onValueChange={onChange}
        >
          <SelectTrigger className="h-12 w-20">
            <SelectValue defaultValue={currentSize} placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {product.items.map((item, i) => (
              <SelectItem key={i} value={item.size.id}>
                {item.size.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col justify-between">
        <p className="flex-1">Color</p>
        <div className="flex items-center flex-1">
          {availableColors.map((item) => (
            <button
              onClick={() => setCurrentColor(item.colorId)}
              key={item.colorId}
              className={cn(
                "rounded-full w-8 h-8 p-1",
                item.colorId === currentColor && "ring-black ring-1"
              )}
            >
              <div
                style={{ backgroundColor: item.color.value }}
                className="w-full h-full rounded-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
