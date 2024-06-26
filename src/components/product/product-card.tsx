"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { createCart } from "@/lib/actions/cart";
import { Prisma, type Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { createCart } from "@/actions/cart";
import { useRouter } from "next/navigation";

type productWithMany = Prisma.ProductGetPayload<{
  include: {
    category: true;
  };
}>;

interface ProductCardProps {
  product: productWithMany;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();
  const discountedPrice =
    Number(product.price) -
    (Number(product.discount) / 100) * Number(product.price);
  //   const rating = [] || null;
  const onSubmit = async () => {
    startTransition(() => {
      createCart(product.id, 1)
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
    <Card className="border-none shadow-none">
      <div className="flex flex-col">
        <CardContent>
          <div className="w-full">
            <Image
              src={`https://utfs.io/f/${product.images[0]}`}
              alt="product"
              className="object-cover w-full h-52"
              width={300}
              height={300}
            />
          </div>
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          <div className="flex items-center ">
            <span className="text-red-500 font-bold">{`$${discountedPrice}`}</span>
            <span className="text-gray-500 line-through ml-2">{`$${product.price}`}</span>
          </div>
          <div>
            <button
              className="flex  items-center  mt-2 bg-red-500 text-white px-2 py-1 rounded"
              onClick={onSubmit}
              disabled={isPending}
            >
              Add To Cart
            </button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
