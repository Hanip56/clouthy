"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Color, Product, ProductEntry, Size } from "@prisma/client";

const formSchema = z.object({
  productId: z.string().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  qty: z.number().min(1),
});

type Props = {
  initialData: ProductEntry | null;
  products: Product[];
  sizes: Size[];
  colors: Color[];
};

const CreateForm = ({ initialData, products, sizes, colors }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const successMessage = initialData
    ? "Edited succesfully."
    : "Created succesfully.";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      productId: "",
      sizeId: "",
      colorId: "",
      qty: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(`/api/productEntrys/${initialData.sku}`, values);
      } else {
        await axios.post("/api/productEntrys", values);
      }

      router.push("../product_entrys");
      router.refresh();
      toast.success(successMessage);
    } catch (error) {
      const e = (error as any)?.response?.data ?? "Something went wrong";
      toast.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="qty"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="Enter quantity"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Product</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select product"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {products?.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="sizeId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select size"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes?.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colorId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select color"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {colors?.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button disabled={isLoading}>
            {initialData ? "Edit" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateForm;
