"use client";
import * as React from "react";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { deleteCartById, updateCart } from "@/actions/cart";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type CartWithMany = Prisma.CartGetPayload<{
  include: {
    product: true;
  };
}>;

interface CartCardProps {
  cart: CartWithMany;
  isCheckout: boolean;
}

export default function CartCard({ cart, isCheckout }: CartCardProps) {
  const [currentQuantity, setCurrentQuantity] = React.useState(cart.quantity);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const subtotal = cart.product.price * currentQuantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setCurrentQuantity(newQuantity);
    startTransition(() => {
      updateCart(cart.id, newQuantity)
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
              description: "Cannot update cart",
              variant: "destructive",
            });
          }
        })
        .catch((e) => {
          toast({
            title: "Error!",
            description: "Something went wrong",
            variant: "destructive",
          });
        });
    });
  };

  const onRemove = (id: string) => {
    deleteCartById(cart.id)
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
            description: "Cannot update cart",
            variant: "destructive",
          });
        }
      })
      .catch((e) => {
        toast({
          title: "Error!",
          description: "Something went wrong",
          variant: "destructive",
        });
      });
  };

  return (
    <div className=" ">
      <div className="grid grid-cols-3 sm:grid-cols-5 items-center place-items-center border-2 rounded-lg py-4 ">
        <div className="w-full">
          <Image
            src={`https://utfs.io/f/${cart.product.images[0]}`}
            alt={cart.product.name}
            width={1000}
            height={1000}
            className="w-20 h-20 object-cover"
          />
          <p className="text-sm truncate">{cart.product.name}</p>
        </div>
        <div className="sm:block hidden">
          <span className="text-gray-500 ml-2 ">{`$${cart.product.price}`}</span>
        </div>
        <div className="flex items-center">
          <button onClick={() => handleQuantityChange(currentQuantity - 1)}>
            -
          </button>
          <span className="mx-2">{currentQuantity}</span>
          <button onClick={() => handleQuantityChange(currentQuantity + 1)}>
            +
          </button>
        </div>
        <div className="sm:block hidden">
          <span className="text-gray-500 ml-2">{`$${subtotal.toFixed(
            2
          )}`}</span>
        </div>
        <div className={isCheckout ? "hidden" : ""}>
          <Button onClick={() => onRemove(cart.id)} variant={"destructive"}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
