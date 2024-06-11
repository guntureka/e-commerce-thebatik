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
import { User } from "@prisma/client";
import { Button } from "../../ui/button";
import UserEditForm from "./edit-form";
import { useToast } from "@/components/ui/use-toast";
import { deleteUserById } from "@/lib/actions/user";
import { useRouter } from "next/navigation";

export interface UserTableProps {
  users: User[] | null | undefined;
}

const UserTable = ({ users }: UserTableProps) => {
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
      <TableCaption>A list of users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users ? (
          <>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{++index}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="flex gap-2 w-full">
                  <UserEditForm user={user} />
                  <Button
                    onClick={() => handleDelete(user.id)}
                    disabled={isPending}
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          <TableRow>
            <TableCell className="text-center" colSpan={5}>
              No data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserTable;
