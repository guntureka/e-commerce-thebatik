"use client";
import { Card } from "@/components/ui/card";
import * as React from "react";
export default function ProductsCard({ product }: { product: any }) {
  const { name, price, discount, rating, images, timesBought } = product;
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
              <span className="text-red-500 font-bold">{`$${discountedPrice}`}</span>
              <span className="text-gray-500 line-through ml-2">{`$${price}`}</span>
            </div>

            <div className="flex items-center  mt-1">
              {Array(rating)
                .fill(null)
                .map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              <span className="text-gray-500 ml-1">({timesBought})</span>
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