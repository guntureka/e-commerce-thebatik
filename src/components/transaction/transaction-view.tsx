"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
// import CartCard from "./cart-card";
import { Button } from "../ui/button";
import TransactionCard from "./transaction-card";

type TransactionItemWithMany = Prisma.TransactionItemGetPayload<{
  include: {
    product: true;
  };
}>;

interface TransactionViewProps {
  transactionItem: TransactionItemWithMany[];
  isCheckout?: boolean;
}

export default function TransactionView({
  transactionItem,
  isCheckout = true,
}: TransactionViewProps) {
  const [isPending, startTransition] = React.useTransition();
  let total = 0;

  transactionItem &&
    transactionItem.map((item) => {
      if (item.product.discount) {
        total +=
          item.quantity! *
          (item.product.price -
            (item.product.price * item.product?.discount) / 100);
      } else {
        total += item.quantity! * item.product.price;
      }
    });

  return (
    <div className="flex flex-col gap-5">
      <div className="">
        <div className="grid grid-cols-3 sm:grid-cols-5 items-center place-items-center border-2 rounded-lg py-4">
          <div>Products</div>
          <div className="sm:block hidden">Price</div>
          <div>Quantity</div>
          <div className="sm:block hidden">Subtotal</div>
          <div>Remove</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        {transactionItem &&
          transactionItem.map((item, index) => (
            <div key={index}>
              <TransactionCard item={item} isCheckout={isCheckout} />
            </div>
          ))}
      </div>
      <div className="w-full flex items-center justify-between border-2 rounded-lg p-4 lg:px-24">
        <span>Total</span>
        <span>${total}</span>
      </div>
    </div>
  );
}
