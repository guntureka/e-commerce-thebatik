"use client";

import React, { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteCategoryById } from "@/actions/category";
import { useRouter } from "next/navigation";

interface DeleteCategoryButtonProps {
  id: string;
}

const DeleteCategoryButton = ({ id }: DeleteCategoryButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = () => {
    startTransition(() => {
      deleteCategoryById(id)
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
        <Button className="">Delete</Button>
      </DialogTrigger>
      <DialogContent className="max-h-96">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={onSubmit}
            disabled={isPending}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryButton;
