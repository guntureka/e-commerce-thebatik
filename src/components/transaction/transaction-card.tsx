"use client";
import * as React from "react";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { deleteCartById, updateCart } from "@/actions/cart";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type TransactionItemWithMany = Prisma.TransactionItemGetPayload<{
  include: {
    product: true;
  };
}>;

interface TransactionCartProps {
  item: TransactionItemWithMany;
  isCheckout: boolean;
}

export default function TransactionCard({
  item,
  isCheckout,
}: TransactionCartProps) {
  const [currentQuantity, setCurrentQuantity] = React.useState(item.quantity!);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  let subtotal;

  if (item.product.discount) {
    subtotal =
      currentQuantity *
      (item.product.price - (item.product.price * item.product.discount) / 100);
  } else {
    subtotal = currentQuantity * item.product.price;
  }

  return (
    <div className=" ">
      <div className="grid grid-cols-3 sm:grid-cols-5 items-center place-items-center border-2 rounded-lg py-4 ">
        <div className="w-full">
          <Image
            src={`https://utfs.io/f/${item.product.images[0]}`}
            alt={item.product.name}
            width={1000}
            height={1000}
            className="w-20 h-20 object-cover"
          />
          <p className="text-sm truncate">{item.product.name}</p>
        </div>
        <div className="sm:block hidden">
          <span className="text-gray-500 ml-2 ">{`$${item.product.price}`}</span>
        </div>
        <div className="flex items-center">
          <span className="mx-2">{currentQuantity}</span>
        </div>
        <div className="flex items-center">
          <span className="mx-2">{item.product.discount}</span>
        </div>
        <div className="sm:block hidden">
          <span className="text-gray-500 ml-2">{`$${subtotal.toFixed(
            2
          )}`}</span>
        </div>
      </div>
    </div>
  );
}
