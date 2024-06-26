"use client";

import { signupSchema } from "@/lib/schemas";
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
import { signupAuth } from "@/actions/auth";

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(() => {
      signupAuth(values)
        .then((data) => {
          if (data && data.success) {
            toast({
              title: "Success!",
              description: data.success,
              variant: "success",
            });
          } else {
            toast({
              title: "Error!",
              description: data.error,
              variant: "destructive",
            });
          }
        })
        .catch((err) => {
          toast({
            title: "Error!",
            description: "Something went wrong!",
            variant: "destructive",
          });
        });
    });
  }

  return (
    <Card className="w-full flex flex-col border-none outline-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Enter your details below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={"Name"}
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
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={"Email"}
                      className="mb-2 bg-white text-black border-t-0 border-r-0 border-l-0 border-b-1 border-b-black p-0 w-full outline-none hover:ring-0 rounded-none focus-visible:rounded focus-visible:border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={"Password"}
                      className="mb-2 bg-white text-black border-t-0 border-r-0 border-l-0 border-b-1 border-b-black p-0 w-full outline-none hover:ring-0 rounded-none focus-visible:rounded focus-visible:border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={"Confirm password"}
                      className="mb-2 bg-white text-black border-t-0 border-r-0 border-l-0 border-b-1 border-b-black p-0 w-full outline-none hover:ring-0 rounded-none focus-visible:rounded focus-visible:border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"destructive"}
              disabled={isPending}
              className={"w-full"}
            >
              Create Account
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <div className="flex">
          <p>
            Already have account?
            <span>
              <Link className=" hover:underline " href={"./sign-in"}>
                {" "}
                Sign in
              </Link>
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
