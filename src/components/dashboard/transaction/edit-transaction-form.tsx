"use client";

import { transactionStatusSchema, userSchema } from "@/lib/schemas";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Transaction, TransactionStatus, User, UserRole } from "@prisma/client";
import { updateUserById } from "@/actions/user";
import { updateTransactionStatusById } from "@/actions/transaction";

const EditTransactionForm = ({ transaction }: { transaction: Transaction }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof transactionStatusSchema>>({
    resolver: zodResolver(transactionStatusSchema),
    defaultValues: {
      transactionStatus: transaction.status,
    },
  });

  function onSubmit(values: z.infer<typeof transactionStatusSchema>) {
    startTransition(() => {
      updateTransactionStatusById(transaction.id, values)
        .then((data) => {
          if (data && data.success) {
            toast({
              title: "Success!",
              description: data.success,
              variant: "success",
            });
            router.refresh();
            form.watch();
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            Make changes to transaction status.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="transactionStatus"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TransactionStatus.NONE}>
                          NONE
                        </SelectItem>
                        <SelectItem value={TransactionStatus.PROCESS}>
                          PROCESS
                        </SelectItem>
                        <SelectItem value={TransactionStatus.DECLINE}>
                          DECLINE
                        </SelectItem>
                        <SelectItem value={TransactionStatus.SUCCESS}>
                          SUCCESS
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
              Edit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionForm;
