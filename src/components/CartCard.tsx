"use client";
import * as React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function CartCard({ cart_item }: { cart_item: any }) {
  const { id, name, price, images,quantity} = cart_item;
  const subtotal = price * quantity;
  return (
    <>
      <div className="container ">
        <div className="flex justify-evenly border-2 rounded-lg py-4 ">
          <div><img src={images} alt="" className="" /></div>
          <div><span className="text-gray-500 line-through ml-2">{`$${price}`}</span></div>
          <div><span className="text-gray-500 line-through ml-2">{`$${quantity}`}</span></div>
          <div><span className="text-gray-500 line-through ml-2">{`$${subtotal}`}</span></div>
        </div>
      </div>
    </>
  );
}
