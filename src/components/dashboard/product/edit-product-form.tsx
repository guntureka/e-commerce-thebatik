"use client";

import React, { useState, useTransition } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/schemas";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { UploadDropzone, uploadFiles } from "@/utils/uploadthing";
import { Category, Product } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { updateProduct } from "@/actions/product";
import { deleteUTFiles } from "@/actions/uploadthing";

interface EditProductFormProps {
  categories: Category[] | undefined;
  product: Product | undefined;
}

const Sizes = [
  { id: "sm", label: "SM" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
  { id: "xxl", label: "XXL" },
];

const EditProductForm = ({ categories, product }: EditProductFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  console.log(product?.images);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      discount: product?.discount ?? 0,
      quantity: product?.quantity ?? 0,
      sizes: product?.sizes ?? [],
      categoryId: product?.categoryId ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    startTransition(async () => {
      if (files.length > 0) {
        if (product?.images) {
          await deleteUTFiles(product?.images);
        }
        const res = await uploadFiles("imageUploader", {
          files,
        });
        const imageKey = res.map((v) => {
          return v.key;
        });

        values.images = imageKey;
      } else {
        values.images = product?.images;
      }

      updateProduct(product!.id!, values)
        .then((data) => {
          if (data && data.success) {
            toast({
              title: "Success!",
              description: data.success,
              variant: "success",
            });
            form.reset();
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
      <DialogContent className="max-h-96 overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>This is edot product form</DialogDescription>
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
                      placeholder="Enter product name here..."
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
                      placeholder="Enter product description here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter product price here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter product discount here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter product quantity here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <div className="flex justify-evenly items-center ">
                    {Sizes.map((size, index) => (
                      <FormField
                        key={index}
                        name="sizes"
                        control={form.control}
                        render={({ field }) => {
                          return (
                            <FormItem
                              className="flex flex-row items-end space-x-3 space-y-3"
                              key={index}
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(size.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          size.id,
                                        ])
                                      : field.onChange(
                                          field.value.filter(
                                            (value) => value !== size.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {size.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories &&
                        categories.map((category, index) => (
                          <SelectItem value={category.id} key={index}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <UploadDropzone
              config={{ mode: "manual" }}
              endpoint="imageUploader"
              onDrop={(acceptedFiles) => {
                setFiles(acceptedFiles);
                console.log(acceptedFiles);
              }}
            />
            {files.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {files.map((file, index) => (
                  <Image
                    key={index} // Important for React reconciliation
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded Product Image ${index + 1}`}
                    width={200} // Adjust width and height as needed
                    height={200}
                    className="h-32 object-cover"
                  />
                ))}
              </div>
            )}
            {files.length < 1 && product && product.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {product.images.map((image, index) => (
                  <Image
                    key={index} // Important for React reconciliation
                    src={`https://utfs.io/f/${image}`}
                    alt={`Uploaded Product Image ${index + 1}`}
                    width={200} // Adjust width and height as needed
                    height={200}
                    className="h-32 object-cover"
                  />
                ))}
              </div>
            )}
            <Button className="w-full" type="submit" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductForm;
