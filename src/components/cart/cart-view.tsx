"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
import CartCard from "./cart-card";
import { Button } from "../ui/button";
import { createTransaction } from "@/actions/transaction";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type CartWithMany = Prisma.CartGetPayload<{
  include: {
    product: true;
  };
}>;

interface CartViewProps {
  carts: CartWithMany[] | undefined;
  isCheckout?: boolean;
}

export default function CartView({ carts, isCheckout = false }: CartViewProps) {
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const router = useRouter();
  let total = 0;

  carts?.map((cart) => {
    if (cart.product.discount) {
      total +=
        cart.quantity *
        (cart.product.price -
          (cart.product.price * cart.product?.discount) / 100);
    } else {
      total += cart.quantity * cart.product.price;
    }
  });

  const handleCheckout = () => {
    startTransition(() => {
      createTransaction({ carts })
        .then((data) => {
          if (data && data.success) {
            toast({
              title: "Success!",
              description: data.success,
              variant: "success",
            });
            router.push(`/checkout/${data.transactionId}?token=${data.token}`);
          } else {
            toast({
              title: "Error!",
              description: data?.error,
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
    <div className="flex flex-col gap-5">
      <div className="">
        <div className="grid grid-cols-3 sm:grid-cols-5 items-center place-items-center border-2 rounded-lg py-4">
          <div>Products</div>
          <div className="sm:block hidden">Price</div>
          <div>Quantity</div>
          <div className="sm:block hidden">Subtotal</div>
          <div className={isCheckout ? "hidden" : ""}>Remove</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        {carts &&
          carts.map((cartItem, index) => (
            <div key={index}>
              <CartCard cart={cartItem} isCheckout={isCheckout} />
            </div>
          ))}
      </div>
      <div className="w-full flex items-center justify-between border-2 rounded-lg p-4 lg:px-24">
        <span>Total</span>
        <span>${total}</span>
      </div>
      <div className="w-full flex justify-end items-center">
        <Button
          className=""
          variant={`destructive`}
          onClick={handleCheckout}
          disabled={isPending}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
