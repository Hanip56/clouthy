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
import { Category } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1),
  upperId: z.string(),
});

type Props = {
  initialData: Category | null;
  uppers: Category[];
};

const CreateForm = ({ initialData, uppers }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const successMessage = initialData
    ? "Edited succesfully."
    : "Created succesfully.";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      upperId: initialData?.upperId || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const body = {
        name: values.name,
        upperId:
          values.upperId && values.upperId !== "none" ? values.upperId : null,
      };

      if (initialData) {
        await axios.patch(`/api/categories/${initialData.id}`, body);
      } else {
        await axios.post("/api/categories", body);
      }

      router.push("../categories");
      router.refresh();
      toast.success(successMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4">
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
                    placeholder="Enter category name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="upperId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Upper</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select upper category"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {uppers?.map((category) => (
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
