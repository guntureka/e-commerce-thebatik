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
import { signinAuth } from "@/actions/auth";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signinSchema>) {
    startTransition(() => {
      signinAuth(values)
        .then((data) => {
          if (data && data.success) {
            toast({
              title: "Success!",
              description: data.success,
              variant: "success",
            });
            form.reset();
            router.refresh();
            // router.push("/");
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
        <CardTitle className="text-center">Sign in to The Batik</CardTitle>
        <CardDescription className="text-center">
          Enter your details below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            <Link href={"/forgot-password"} className="text-sm">
              Forgot password?
            </Link>
            <Button
              type="submit"
              variant={"destructive"}
              disabled={isPending}
              className={"w-full"}
            >
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <div className="flex">
          <p>
            Dont have an account?
            <span>
              <Link className=" hover:underline " href={"./sign-up"}>
                {" "}
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SigninForm;
