"use client";

import React, { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/lib/schemas";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { updateCategoryById } from "@/actions/category";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";

interface EditCategoryFormProps {
  category: Category;
}

const EditCategoryForm = ({ category }: EditCategoryFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      description: category.description || "",
    },
  });

  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    startTransition(() => {
      updateCategoryById(category.id, values)
        .then((data) => {
          if (data && data.success) {
            toast({
              title: "Success!",
              description: data.success,
              variant: "success",
            });
            form.watch();
            router.refresh();
          } else {
            toast({
              title: "Error!",
              description: data!.error,
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
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-h-96">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>This is add category form</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category name here..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category description here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryForm;
