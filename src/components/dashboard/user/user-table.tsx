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
import { Category, Product, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
// import EditCategoryForm from "./edit-product-form";
import DeleteCategoryButton from "./delete-user-button";
import DeleteProductButton from "./delete-user-button";
import EditUserForm from "./edit-user-form";
// import EditProductForm from "./edit-product-form";

interface UserTableProps {
  users: User[] | undefined;
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Is Verified</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users && users!.length > 0 ? (
          users &&
          users!.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{++index}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.emailVerified ? "TRUE" : "FALSE"}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleString("en-GB")}
                </TableCell>
                <TableCell>
                  {new Date(user.updatedAt).toLocaleString("en-GB")}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center gap-2">
                    <EditUserForm user={user} />
                    <DeleteProductButton id={user.id} />
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

export default UserTable;
