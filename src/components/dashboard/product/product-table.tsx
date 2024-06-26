"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category, Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import EditCategoryForm from "./edit-product-form";
import DeleteCategoryButton from "./delete-product-button";
import DeleteProductButton from "./delete-product-button";
import EditProductForm from "./edit-product-form";

interface ProductTableProps {
  products: Product[] | undefined;
  categories: Category[] | undefined;
}

const ProductTable = ({ products, categories }: ProductTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products!.length > 0 ? (
          products!.map((product, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{++index}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  {new Date(product.createdAt).toLocaleString("en-GB")}
                </TableCell>
                <TableCell>
                  {new Date(product.updatedAt).toLocaleString("en-GB")}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center gap-2">
                    <EditProductForm
                      categories={categories}
                      product={product}
                    />
                    <DeleteProductButton id={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No Data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
