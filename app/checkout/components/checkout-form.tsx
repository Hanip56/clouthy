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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CartItems from "./cart-items";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import useCart from "@/hooks/use-cart";
import { provincesOfIndonesia } from "@/constants";

const formSchema = z.object({
  email: z
    .union([z.string().email("Enter a valid email"), z.string().length(0)])
    .optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  state: z.string().min(1),
  streetLine1: z.string().min(1),
  streetLine2: z.string().min(1),
});

const CheckoutForm = ({ session }: { session: Session | null }) => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { items } = useCart();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      city: "",
      country: "",
      postalCode: "",
      state: "",
      streetLine1: "",
      streetLine2: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const cartItems = items.map((item) => ({
        sku: item.product.sku,
        quantity: item.quantity,
      }));

      const res = await axios.post("/api/checkout", {
        ...values,
        cartItems,
      });

      window.location = res.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 md:border-r p-2 sm:p-4 lg:px-12 md:py-4 md:pl-0 space-y-8"
      >
        {/* if already login */}
        {session && session.user && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Account</span>
              <Button
                type="button"
                variant="secondary"
                className="text-xs h-6"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </div>
            <div className="py-4 border-b">
              <span>{session.user.email}</span>
            </div>
          </div>
        )}

        {!session && (
          <div className="py-4 border-b">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Delivery */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Delivery</h2>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Country/Region"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indonesia">Indonesia</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter first name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter first name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="State/Province"
                        />
                      </SelectTrigger>
                      <SelectContent className="max-h-40">
                        {provincesOfIndonesia.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter city" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter postal code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="streetLine1"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Street Line 1</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter street line 1" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetLine2"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Street Line 2</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter street line 2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Shipping method */}
        <div className="space-y-6">
          <h3 className="text-xl font-medium">Shipping method</h3>
          <div className="p-3 w-full bg-slate-100 text-slate-500 text-sm">
            Free shipping
          </div>
        </div>

        {/* Mobile order items */}
        <div className="block md:hidden space-y-6">
          <h2 className="text-2xl font-semibold">Order summary</h2>
          <CartItems />
        </div>

        {/* Submit button */}
        <div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full h-14 text-lg"
          >
            Continue to payment
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
