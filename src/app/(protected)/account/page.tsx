"use client";

import { signinSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { signinAuth } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Account() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
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
      <div className="flex flex-row justify-between font-[14px] mx-24 mt-10 mb-10">
        <h1>
          Home / <span className="font-bold">My Account</span>
        </h1>
        <h1>
          Welcome! <span className="text-[#DB4444]">Md Rimel</span>
        </h1>
      </div>
      <div className="container flex flex-row mt-20 gap-[100px] ">
        <div>
          <div className="text-[16px]">
            <p className="font-bold">Manage My Account</p>
            <div className="ml-9 my-4">
              <p>
                <a href="">My Profile</a>
              </p>
              <p>
                <a href="">Address Book</a>
              </p>
              <p>
                <a href="">My Payment Options</a>
              </p>
            </div>
          </div>
          <div className="text-[16px] mt-2">
            <p className="font-bold">My Orders</p>
            <div className="ml-9 my-4 ">
              <p>
                <a href="">My Returns</a>
              </p>
              <p>
                <a href="">My Cancellations</a>
              </p>
            </div>
          </div>
          <div className="text-[16px] mt-2 ">
            <p className="font-bold">My Wishlist</p>
          </div>
        </div>

        <Card className="flex flex-col border-none outline-none shadow-none justify-center">
          <CardHeader>
            <CardTitle className="text-[20px] text-[#DB4444]">
              Edit Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className=" grid grid-cols-2 gap-[50px]">
                  <FormField
                    control={form.control}
                    name="FirstName"
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
                    name="LastName"
                    render={({ field }) => (
                      <FormItem className="w-[330px]">
                        <FormLabel>Last Name</FormLabel>
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
                    name="FirstName"
                    render={({ field }) => (
                      <FormItem className="w-[330px]">
                        <FormLabel>Email</FormLabel>
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
                    name="FirstName"
                    render={({ field }) => (
                      <FormItem className="w-[330px]">
                        <FormLabel>Address</FormLabel>
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
                    name="FirstName"
                    render={({ field }) => (
                      <FormItem className="w-[330px]">
                        <FormLabel>Password Changes</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="shadcn"
                            {...field}
                            className="mb-2 bg-white text-black border-t-0 border-r-0 border-l-0 border-b-1 border-b-black p-0 w-full outline-none hover:ring-0 rounded-none focus-visible:rounded focus-visible:border-none"
                          />
                        </FormControl>
                        <FormControl>
                          <Input
                            placeholder="shadcn"
                            {...field}
                            className="mb-2 bg-white text-black border-t-0 border-r-0 border-l-0 border-b-1 border-b-black p-0 w-full outline-none hover:ring-0 rounded-none focus-visible:rounded focus-visible:border-none"
                          />
                        </FormControl>
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
                </div>
                <div className="flex flex-row gap-2 mt-4">
                  <Button
                    type="submit"
                    variant={"destructive"}
                    // disabled={isPending}
                    className={"w-full my-2"}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant={"destructive"}
                    // disabled={isPending}
                    className={"w-full my-2"}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
}
