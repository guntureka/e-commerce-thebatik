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
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import EditCategoryForm from "./edit-category-form";
import DeleteCategoryButton from "./delete-category-button";

interface CategoryTableProps {
  categories: Category[] | undefined;
}

const CategoryTable = ({ categories }: CategoryTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories && categories!.length > 0 ? (
          categories!.map((category, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{++index}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  {new Date(category.createdAt).toLocaleString("en-GB")}
                </TableCell>
                <TableCell>
                  {new Date(category.updatedAt).toLocaleString("en-GB")}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center gap-2">
                    <EditCategoryForm category={category} />
                    <DeleteCategoryButton id={category.id} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No Data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
