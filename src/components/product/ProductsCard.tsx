"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createCart } from "@/lib/actions/cart";
import { type Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import * as React from "react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ProductsCard({ product }: { product: Product | null }) {
  const session = useSession();
  const { toast } = useToast();
  console.log(session.data?.user);
  console.log(product?.id);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const { name, price, discount, images } = product!;
  const discountedPrice =
    Number(price) - (Number(discount) / 100) * Number(price);
  const rating = [] || null;
  const onSubmit = async () => {
    const response = await createCart({
      userId: session?.data?.user.id!,
      productId: product?.id!,
      quantity: 1,
    })
      .then((data) => {
        if (data && data.success) {
          toast({
            title: "Success!",
            description: data.success,
            variant: "success",
          });
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
  };
  return (
    <>
      <Card className="w-64 h-auto mx-auto border-none shadow-none">
        <div className="flex flex-col">
          <Card>
            <div className="relative">
              <img src={images[0]} alt="product" className="h-auto" />
            </div>
          </Card>
          <CardContent>
            <CardHeader></CardHeader>
            <h3 className="text-lg font-semibold truncate">{name}</h3>
            <div className="flex items-center ">
              <span className="text-red-500 font-bold">{`$${discountedPrice}`}</span>
              <span className="text-gray-500 line-through ml-2">{`$${price}`}</span>
            </div>

            <div className="flex items-center  mt-1">
              {Array(rating)!.map((_, index) => (
                <svg
                  key={index}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              {/* <span className="text-gray-500 ml-1">({timesBought})</span> */}
            </div>

            <div>
              <button
                className="flex  items-center  mt-2 bg-red-500 text-white px-2 py-1 rounded"
                onClick={onSubmit}
              >
                Add To Cart
              </button>
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
}
