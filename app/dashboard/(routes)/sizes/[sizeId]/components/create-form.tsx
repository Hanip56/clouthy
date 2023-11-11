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
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Size } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type Props = {
  initialData: Size | null;
};

const CreateForm = ({ initialData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const successMessage = initialData
    ? "Edited succesfully."
    : "Created succesfully.";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      value: initialData?.value || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(`/api/sizes/${initialData.id}`, values);
      } else {
        await axios.post("/api/sizes", values);
      }

      router.push("../sizes");
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
                    placeholder="Enter size name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    {...field}
                    placeholder="Enter size value"
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
