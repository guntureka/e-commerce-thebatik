"use client";

import React, { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@prisma/client";
import { Button } from "../../ui/button";
import ProductEditForm from "./edit-form";
import { useToast } from "@/components/ui/use-toast";
import { deleteUserById } from "@/lib/actions/user";
import { useRouter } from "next/navigation";

export interface ProductTableProps {
  products: Product[] | null | undefined;
}

const ProductTable = ({ products }: ProductTableProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = (id: string) => {
    startTransition(() => {
      deleteUserById(id)
        .then((data) => {
          if (data && data.success) {
            toast({
              title: "Success!",
              description: data.success,
              variant: "success",
            });
            router.refresh();
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
  };

  return (
    <Table>
      <TableCaption>A list of products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Sizes</TableHead>
          <TableHead>Colors</TableHead>
          <TableHead>Images</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products ? (
          products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price.toFixed(2)}</TableCell> {/* Formatting as currency */}
              <TableCell>{product.discount?.toFixed(2) || "N/A"}</TableCell> {/* Optional discount */}
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.sizes.join(", ")}</TableCell> {/* Array of strings */}
              <TableCell>{product.colors.join(", ")}</TableCell> {/* Array of strings */}
              <TableCell>{product.images.join(", ")}</TableCell> {/* Array of strings */}
              <TableCell className="flex gap-2 w-full">
                <ProductEditForm product={product} />
                <Button
                  onClick={() => handleDelete(product.id)}
                  disabled={isPending}
                  variant={"destructive"}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-center" colSpan={11}>
              No data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
