"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleMapComp from "./google-map";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  text: z.string().min(1),
});

const ContactMain = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.success("Message sended");
    form.reset();
  };

  return (
    <main className="flex flex-col md:flex-row gap-x-6 gap-y-16 my-20 md:my-28 max-w-6xl mx-auto px-2 sm:px-4">
      <div className="basis-[40%] flex flex-col gap-y-4 md:gap-y-6">
        <h2 className="text-3xl font-medium">Contact Us</h2>
        <p className="max-w-xs font-medium text-gray-500 leading-8">
          No. 12870 – Jl Persada Kav 1, Dki Jakarta, 819 Dki Jakarta.
        </p>
        <p className="text-2xl font-medium">+62 857 7084 1135</p>
        <div className="flex items-center gap-2">
          <Mail fill="red" className="text-white" />
          <span className="text-gray-400">demomail@gmail.com</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-100 border flex items-center justify-center cursor-pointer">
            <Facebook className="w-5 h-5" />
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 border flex items-center justify-center cursor-pointer">
            <Twitter className="w-5 h-5" />
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 border flex items-center justify-center cursor-pointer">
            <Instagram className="w-5 h-5" />
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 border flex items-center justify-center cursor-pointer">
            <Youtube className="w-5 h-5" />
          </div>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col gap-y-4"
        >
          <h2 className="text-3xl font-medium">Drop Us a Message</h2>
          <div className="space-y-4">
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter your message"
                      className="h-52"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="self-start text-lg p-6 px-16">Submit</Button>
        </form>
      </Form>
    </main>
  );
};

export default ContactMain;
