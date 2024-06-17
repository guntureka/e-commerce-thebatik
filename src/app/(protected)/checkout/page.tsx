"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  streetAddress: z.string().min(2, {
    message: "Street Address must be at least 2 characters.",
  }),
  apartment: z.string().optional(),
  city: z.string().min(2, {
    message: "Town/City must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone Number must be at least 10 digits.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

export default function Checkout() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      streetAddress: "",
      apartment: "",
      city: "",
      phoneNumber: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <div>
        <div className="flex flex-row justify-between font-[14px] mx-24 mt-10 mb-10">
          <h1>
            Account / My Account / Product / View Cart /{" "}
            <span className="font-semibold">CheckOut</span>
          </h1>
        </div>
        <div className="pb-[140px] flex flex-row justify-around">
          <div className="mt-20 mx-24">
            <Card className="flex flex-col border-none outline-none shadow-none justify-center">
              <CardHeader>
                <CardTitle className="text-[36px] font-medium">
                  Billing Details
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-[50px]">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="w-[330px]">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="shadcn"
                                {...field}
                                className="mb-2 bg-white text-black border-t-0 border-r-0 border-l-0 border-b-1 border-b-black p-0 w-full outline-none hover:ring-0 rounded-none focus-visible:rounded focus-visible:border-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="streetAddress"
                        render={({ field }) => (
                          <FormItem className="w-[330px]">
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="123 Main St"
                                {...field}
                                className="mb-2 bg-white text-black border-t-0 border-r-0 border-l-0 border-b-1 border-b-black p-0 w-full outline-none hover:ring-0 rounded-none focus-visible:rounded focus-visible:border-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="apartment"
                        render={({ field }) => (
                          <FormItem className="w-[330px]">
                            <FormLabel>
                              Apartment, floor, etc. (optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Apartment, floor, etc."
                                {...field}
                                className="mb-2 bg-white text-black border-t-0 border-r-0 border-l-0 border-b-1 border-b-black p-0 w-full outline-none hover:ring-0 rounded-none focus-visible:rounded focus-visible:border-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="w-[330px]">
                            <FormLabel>Town/City</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="City"
                                {...field}
                                className="mb-2 bg-white text-black border-t-0 border-r-0 border-l-0 border-b-1 border-b-black p-0 w-full outline-none hover:ring-0 rounded-none focus-visible:rounded focus-visible:border-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem className="w-[330px]">
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="1234567890"
                                {...field}
                                className="mb-2 bg-white text-black border-t-0 border-r-0 border-l-0 border-b-1 border-b-black p-0 w-full outline-none hover:ring-0 rounded-none focus-visible:rounded focus-visible:border-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="w-[330px]">
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="email@example.com"
                                {...field}
                                className="mb-2 bg-white text-black border-t-0 border-r-0 border-l-0 border-b-1 border-b-black p-0 w-full outline-none hover:ring-0 rounded-none focus-visible:rounded focus-visible:border-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Save this information for faster check-out next time
                      </label>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="w-[422px] mt-[160px] mx-24">
            <div className="flex flex-row justify-between py-4">
              <p>Rayon Short</p>
              <p>$650</p>
            </div>
            <div className="flex flex-row justify-between py-4">
              <p>Modern Batik</p>
              <p>$1110</p>
            </div>
            <div className="flex flex-row justify-between py-4 border-b-[1px] border-b-black">
              <p>Subtotal: </p>
              <p>$1750</p>
            </div>
            <div className="flex flex-row justify-between py-4 border-b-[1px] border-b-black">
              <p>Shipping: </p>
              <p>Free</p>
            </div>
            <div className="flex flex-row justify-between py-4">
              <p>Total:</p>
              <p>$1750</p>
            </div>
            <RadioGroup defaultValue="comfortable" className="gap-8 mb-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Bank</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Cash on delivery</Label>
              </div>
            </RadioGroup>
            <Button
              type="submit"
              variant={"destructive"}
              // disabled={isPending}
              className={"w-full"}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
