"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Category, Image as ImageType, Product } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImagePicker from "@/components/image-picker";
import Image from "next/image";
import { BASE_IMAGE_URL } from "@/constants";
import { Trash } from "lucide-react";
import { compressImage } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadThing";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 mb
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  images: z
    .array(z.any())
    .refine((files) => files.length > 0, "At least one image is required")
    .refine(
      (files) =>
        files.every(
          (file) => !(file instanceof File) || file?.size <= MAX_FILE_SIZE
        ),
      "Max image size is 4MB."
    )
    .refine(
      (files) =>
        files.every(
          (file) =>
            !(file instanceof File) || ACCEPTED_IMAGE_TYPES.includes(file?.type)
        ),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(1),
  isFeatured: z.boolean().default(false).optional(),
  categoryId: z.string().min(1),
});

type Props = {
  initialData: (Product & { images: ImageType[] }) | null;
  categories: Category[];
};

const CreateForm = ({ initialData, categories }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { startUpload } = useUploadThing("imageUploader");

  const successMessage = initialData
    ? "Edited succesfully."
    : "Created succesfully.";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          description: initialData?.description ?? "",
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          description: "",
          images: [],
          price: 0,
          isFeatured: false,
          categoryId: "",
        },
  });

  const imagesState = form.watch("images");

  // add or update product
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // check if there are any deleted image by user
    const needDeleteImages = initialData?.images
      .filter(
        (image) =>
          !(image instanceof File) &&
          values?.images.every((img) => img.id !== image.id)
      )
      .map((image) => image.url);

    try {
      setIsLoading(true);

      // check if the product has a new image or not
      if (
        imagesState.findIndex((image) => image instanceof File) < 0 &&
        initialData
      ) {
        // update without upload new image
        await axios.patch(`/api/products/${params.productId}`, {
          ...values,
          images: values.images.map((image) => image.url),
          deleteImages: needDeleteImages?.length ? needDeleteImages : undefined,
        });
        toast.success("Product updated");
        router.push("../products");
        router.refresh();
      } else {
        // multiple upload to uploadthing

        // determine which file is a new image
        const needUploadImages = values.images.filter(
          (image) => image instanceof File
        );

        // upload new image to uploadthing
        const imagesRes = await Promise.all(
          needUploadImages.map(async (image, i) => {
            try {
              const compressedImg = await compressImage(image);
              const res = await startUpload([compressedImg]);

              return res?.[0].key;
            } catch (error) {
              console.log(`Failed to upload image: ${i}`);
              return null;
            }
          })
        );

        // if its done uploading
        console.log("Images uploaded");
        if (initialData) {
          // update with new image
          await axios.patch(`/api/products/${params.productId}`, {
            ...values,
            // send images to backend with string[] type
            images: [
              ...values.images
                .filter((image) => !(image instanceof File))
                .map((image) => image.url),
              ...imagesRes.filter((imgRes) => imgRes),
            ],
            deleteImages: needDeleteImages?.length
              ? needDeleteImages
              : undefined,
          });
          toast.success("Product updated");
          router.refresh();
          router.push("../products");
        } else {
          // add new
          await axios.post(`/api/products`, {
            ...values,
            images: imagesRes.filter((imgRes) => imgRes),
          });
          toast.success("Product created");
          router.push("../products");
          router.refresh();
        }
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 items-start">
                <FormLabel>Images</FormLabel>
                <div className="w-full flex flex-wrap gap-4">
                  {imagesState.map((image, i) => (
                    <div key={`preview-image-${i}`} className="relative">
                      <Image
                        src={
                          (image as ImageType).id
                            ? `${BASE_IMAGE_URL}/${image.url}`
                            : URL.createObjectURL(image)
                        }
                        alt="Preview-image"
                        width={200}
                        height={200}
                        className="w-40 h-40 object-contain rounded-lg"
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          field.onChange(
                            field.value.filter((_, targetId) => i !== targetId)
                          )
                        }
                        className="absolute top-1 right-1 w-8 h-8"
                        size="icon"
                        variant="destructive"
                      >
                        <Trash className="w-4 h-4" />{" "}
                      </Button>
                    </div>
                  ))}
                </div>
                <FormControl>
                  <ImagePicker
                    isEmpty={!imagesState}
                    onChange={(files) =>
                      field.onChange([...field.value, ...(files as File[])])
                    }
                    disabled={isLoading}
                    multiple={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter product name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={isLoading}
                      placeholder="Enter price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select category"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
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
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isLoading}
                    placeholder="Enter description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex mt-4 justify-end">
          <Button disabled={isLoading}>
            {initialData ? "Edit" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateForm;
