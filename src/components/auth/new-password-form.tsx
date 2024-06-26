"use client";

import { newPasswordSchema, signupSchema } from "@/lib/schemas";
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
import { newPassword, signupAuth } from "@/actions/auth";
import { VerificationPasswordToken } from "@prisma/client";

interface NewPasswordFormProps {
  verificationToken: VerificationPasswordToken;
}

const NewPasswordForm = ({ verificationToken }: NewPasswordFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    startTransition(() => {
      newPassword(verificationToken.email, values)
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
              description: data?.error,
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
        <CardTitle className="text-center">New Password</CardTitle>
        <CardDescription className="text-center">
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewPasswordForm;
