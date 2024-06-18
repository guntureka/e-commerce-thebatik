"use client";
import { Card } from "@/components/ui/card";
import * as React from "react";
export default function ProductsCard({ product }: { product: any }) {
  const { name, price, discount, images, } = product;
  const discountedPrice = price - (discount / 100) * price;
  return (
    <>
      <Card className="w-64 h-80 mx-auto border-none shadow-none">
        <div className="flex flex-col">
          <Card>
            <div className="relative">
              <img src={images} alt="product" className="w-full h-auto" />
            </div>
          </Card>

          <div className="mt-2 ">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex items-center ">
              <span className="text-red-500 font-bold">{`$${price}`}</span>
              <span className="text-gray-500 line-through ml-2">{`$${price}`}</span>
            </div>

            <div>
              <button className="flex  items-center  mt-2 bg-red-500 text-white px-2 py-1 rounded">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}