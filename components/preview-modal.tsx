"use client";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import usePreview from "@/hooks/use-preview";
import { Button } from "./ui/button";
import { Expand } from "lucide-react";
import ImagesTab from "./images-tab";
import { formatter } from "@/lib/utils";

const PreviewModal = () => {
  const { isOpen, onClose, data } = usePreview();

  const handleChange = (e: boolean) => {
    if (!e) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogContent>
        {data && (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <ImagesTab images={data?.images} />
            </div>
            <div className="flex-1 space-y-2">
              <h1 className="text-xl font-semibold">{data.name}</h1>
              <p className="font-medium">
                {formatter.format(Number(data.price))}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
